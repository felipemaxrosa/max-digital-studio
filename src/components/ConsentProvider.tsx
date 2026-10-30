"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Consent = "pending" | "accepted" | "rejected";

const STORAGE_KEY = "mds-consent";

type ConsentCtx = {
  consent: Consent;
  accept: () => void;
  reject: () => void;
};

const ConsentContext = createContext<ConsentCtx>({
  consent: "pending",
  accept: () => {},
  reject: () => {},
});

export function useConsent() {
  return useContext(ConsentContext);
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  // SSR e 1º render = "pending" (evita mismatch); o efeito lê a escolha salva.
  const [consent, setConsent] = useState<Consent>("pending");

  useEffect(() => {
    let saved: Consent = "pending";
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "accepted" || v === "rejected") saved = v;
    } catch {
      /* indisponível */
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved !== "pending") setConsent(saved);
  }, []);

  const persist = useCallback((value: Consent) => {
    setConsent(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignora */
    }
  }, []);

  const accept = useCallback(() => persist("accepted"), [persist]);
  const reject = useCallback(() => persist("rejected"), [persist]);

  return (
    <ConsentContext.Provider value={{ consent, accept, reject }}>
      {children}
    </ConsentContext.Provider>
  );
}
