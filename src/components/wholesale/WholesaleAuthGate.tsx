"use client";

import { useState } from "react";

export function WholesaleAuthGate() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/wholesale/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        setError("Parolă incorectă.");
        setLoading(false);
        return;
      }
      window.location.reload();
    } catch {
      setError("Nu am putut valida parola. Încearcă din nou.");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-[#3D3028]/12 bg-white/90 p-6 shadow-[0_20px_60px_-40px_rgba(61,48,40,0.6)]">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-[#3D3028]">Acces en-gros</h1>
        <p className="mt-2 text-sm text-[#3D3028]/70">
          Introdu parola pentru a accesa pagina privată de calcul și facturare en-gros.
        </p>

        <form className="mt-5 space-y-3" onSubmit={onSubmit}>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[#3D3028]">Parolă</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="min-h-11 w-full rounded-xl border border-[#3D3028]/18 px-3 text-sm outline-none focus:border-[#355E3B]/45"
              required
              autoFocus
            />
          </label>

          {error ? <p className="text-sm font-medium text-[#B23A48]">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#355E3B] px-4 text-sm font-semibold text-white transition hover:bg-[#264A2F] disabled:opacity-60"
          >
            {loading ? "Se verifică..." : "Intră în pagină"}
          </button>
        </form>
      </section>
    </main>
  );
}
