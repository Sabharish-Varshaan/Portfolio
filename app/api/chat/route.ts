import { systemPrompt } from "@/lib/twin";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = "nvidia/nemotron-3.5-super-vl:free";
const MAX_MSGS = 16;
const MAX_LEN = 1000;

// Best-effort per-IP limiter. In-memory, so it resets per serverless instance;
// pair it with an OpenRouter spend cap and Vercel Firewall rules.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 20;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_HITS;
}

function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return new Response("Forbidden", { status: 403 });
  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (limited(ip)) return new Response("Too many requests. Please try again in a few minutes.", { status: 429 });

  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return new Response("Server is missing OPENROUTER_API_KEY", { status: 500 });

  let body: { messages?: unknown } | null;
  try {
    body = await req.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  const raw: { role?: unknown; content?: unknown }[] = Array.isArray(body?.messages) ? body.messages : [];
  const messages = raw
    .filter(
      (m): m is { role: "user" | "assistant"; content: string } =>
        !!m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
    )
    .slice(-MAX_MSGS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_LEN) }));
  if (!messages.length || messages[messages.length - 1].role !== "user")
    return new Response("Bad request", { status: 400 });

  const payload = JSON.stringify({
    model: MODEL,
    stream: true,
    temperature: 0.4,
    max_tokens: 2000,
    reasoning: { effort: "low" },
    messages: [{ role: "system", content: systemPrompt }, ...messages],
  });
  const call = () =>
    fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "X-Title": "Sabharish Digital Twin",
      },
      body: payload,
      signal: req.signal,
    });
  // Free models can fail transiently; retry once.
  let upstream = await call().catch(() => null);
  if (!upstream?.ok && !req.signal.aborted) upstream = await call().catch(() => null);

  if (!upstream || !upstream.ok || !upstream.body)
    return new Response("The twin is unavailable right now.", { status: 502 });

  // Convert OpenRouter SSE into a plain text stream of content deltas.
  const dec = new TextDecoder();
  const enc = new TextEncoder();
  let buf = "";
  const stream = upstream.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, ctrl) {
        buf += dec.decode(chunk, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const l of lines) {
          if (!l.startsWith("data:")) continue;
          const d = l.slice(5).trim();
          if (!d || d === "[DONE]") continue;
          try {
            const t = JSON.parse(d).choices?.[0]?.delta?.content;
            if (t) ctrl.enqueue(enc.encode(t));
          } catch {}
        }
      },
    })
  );
  return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}
