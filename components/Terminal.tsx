"use client";
import { useEffect, useState } from "react";

const lines = [
  ["c", "# every request is authenticated, authorized, rate-limited"],
  ["k", "@router.get(\"/orders\")"],
  ["k", "async def list_orders("],
  ["p", "    user: User = Depends(require_role(\"admin\")),"],
  ["p", "    db: AsyncSession = Depends(get_db),"],
  ["k", "):"],
  ["p", "    await limiter.hit(user.id)"],
  ["p", "    return await orders.page(db, user)"],
];

export default function Terminal() {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(lines.length);
      return;
    }
    const t = setInterval(() => setN((v) => (v < lines.length ? v + 1 : v)), 380);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="term" aria-hidden="true">
      <div className="term-bar">
        <i /><i /><i />
        <span>api/routes/orders.py</span>
      </div>
      <pre>
        {lines.slice(0, n).map(([c, t], i) => (
          <div key={i} className={`ln ${c}`}>
            <span className="num">{i + 1}</span>
            {t}
          </div>
        ))}
        <span className="caret" />
      </pre>
      <div className="term-foot">
        <span><b className="dot" /> 200 OK</span>
        <span>p95 · tuned</span>
        <span>JWT · RBAC</span>
      </div>
    </div>
  );
}
