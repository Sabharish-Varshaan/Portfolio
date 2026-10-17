"use client";
import { useEffect, useRef, useState } from "react";

function clean(t: string) {
  return t.replace(/\s*[\u2014\u2013]\s*/g, ", ").replace(/,\s*,/g, ",");
}

function inline(t: string, k: string) {
  return t.split(/(\*\*[^*]+\*\*|`[^`]+`|https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g).map((x, i) => {
    if (x.startsWith("**") && x.endsWith("**") && x.length > 4) return <strong key={k + i}>{x.slice(2, -2)}</strong>;
    if (x.startsWith("`") && x.endsWith("`") && x.length > 2) return <code key={k + i}>{x.slice(1, -1)}</code>;
    if (/^https?:\/\//.test(x)) return <a key={k + i} href={x} target="_blank" rel="noreferrer">{x.replace(/^https?:\/\//, "").replace(/\/$/, "")}</a>;
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(x)) return <a key={k + i} href={`mailto:${x}`}>{x}</a>;
    return x.replace(/\*\*/g, "");
  });
}

function Rich({ text }: { text: string }) {
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = (i: number) => {
    if (list.length) blocks.push(<ul key={"u" + i}>{list.map((l, j) => <li key={j}>{inline(l, `l${i}${j}`)}</li>)}</ul>);
    list = [];
  };
  clean(text).split("\n").forEach((raw, i) => {
    const line = raw.trim().replace(/^#{1,6}\s+/, "");
    const m = line.match(/^[-*\u2022]\s+(.*)/);
    if (m) list.push(m[1]);
    else { flush(i); if (line) blocks.push(<p key={"p" + i}>{inline(line, `p${i}`)}</p>); }
  });
  flush(9999);
  return <>{blocks}</>;
}

type Msg = { role: "user" | "assistant"; content: string; error?: boolean };
const suggestions = [
  "What's your backend experience?",
  "Tell me about your leadership role",
  "What's your tech stack?",
  "How can I contact you?",
];
const greeting: Msg = {
  role: "assistant",
  content: "Hi, I'm Sabharish's Digital Twin. Ask me anything about my career, skills or background.",
};

export default function TwinChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    const set = (c: string, error = false) =>
      setMsgs((m) => [...m.slice(0, -1), { role: "assistant", content: c, error }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== greeting && !m.error) }),
      });
      if (res.status === 429) { set("You've sent a lot of messages. Please try again in a few minutes.", true); return; }
      if (!res.ok || !res.body) throw new Error();
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        set(acc);
      }
      if (!acc) set("I didn't get a response. Please try again.", true);
    } catch {
      set("Sorry, I couldn't reach the twin just now. Please try again.", true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button className={`twin-fab ${open ? "hide" : ""}`} tabIndex={open ? -1 : 0} onClick={() => setOpen(true)} aria-label="Chat with my Digital Twin">
        <b className="dot" /> Ask my Digital Twin
      </button>
      <div className={`twin ${open ? "open" : ""}`} role="dialog" aria-label="Digital Twin chat" aria-hidden={!open} inert={!open}>
        <div className="twin-head">
          <div>
            <strong>Digital Twin</strong>
            <span><b className="dot" /> Answers about my career</span>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
        </div>
        <div className="twin-body">
          {msgs.map((m, i) => (
            <div key={i} className={`bubble ${m.role}`}>
              {m.content ? (m.role === "assistant" ? <Rich text={m.content} /> : m.content) : <span className="typing"><i /><i /><i /></span>}
            </div>
          ))}
          {msgs.length === 1 && (
            <div className="sugg">
              {suggestions.map((s) => <button key={s} onClick={() => send(s)}>{s}</button>)}
            </div>
          )}
          <div ref={end} />
        </div>
        <form className="twin-input" onSubmit={(e) => { e.preventDefault(); send(input); }}>
          <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about my experience…" maxLength={500} />
          <button disabled={busy || !input.trim()} aria-label="Send">↑</button>
        </form>
      </div>
    </>
  );
}
