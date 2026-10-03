import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Measurement, Participant } from '../../types/measurement';
type SessionState = { participant: Participant | null; result: Measurement | null;
  begin: (p: Participant) => void; complete: (m: Measurement) => void; clear: () => void };
const Context = createContext<SessionState | null>(null);
export function SessionProvider({ children }: { children: ReactNode }) {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [result, setResult] = useState<Measurement | null>(null);
  return <Context.Provider value={{ participant, result, begin: p => { setParticipant(p); setResult(null); },
    complete: setResult, clear: () => { setParticipant(null); setResult(null); } }}>{children}</Context.Provider>;
}
export function useSession() { const value = useContext(Context); if (!value) throw new Error('Missing session provider'); return value; }
