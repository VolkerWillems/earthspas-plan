"use client";

import * as React from "react";
import { defaultSiteState, type SiteState } from "@/lib/site-model";

const STORAGE_KEY = "earth-spas-multipage-plan-v2";
const LEGACY_KEYS = ["earth-spas-multipage-plan-v1", "earth-spas-choice-guide-v5"];

type SiteStateContextValue = {
  state: SiteState;
  setState: React.Dispatch<React.SetStateAction<SiteState>>;
  update: <K extends keyof SiteState>(key: K, value: SiteState[K]) => void;
  reset: () => void;
};

const SiteStateContext = React.createContext<SiteStateContextValue | null>(null);

export function SiteStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<SiteState>(defaultSiteState);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<SiteState>;
      setState({
        ...defaultSiteState,
        ...parsed,
        toolChoices: { ...defaultSiteState.toolChoices, ...(parsed.toolChoices ?? {}) },
        featureSelections: { ...defaultSiteState.featureSelections, ...(parsed.featureSelections ?? {}) },
        checklist: { ...defaultSiteState.checklist, ...(parsed.checklist ?? {}) },
        workedHours: { ...defaultSiteState.workedHours, ...(parsed.workedHours ?? {}) },
      });
    } catch {
      // A corrupt local record should never break the decision site.
    }
  }, []);

  React.useEffect(() => {
    if (mounted) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [mounted, state]);

  const update = React.useCallback(<K extends keyof SiteState,>(key: K, value: SiteState[K]) => {
    setState((previous) => ({ ...previous, [key]: value }));
  }, []);

  const reset = React.useCallback(() => {
    setState(defaultSiteState);
    localStorage.removeItem(STORAGE_KEY);
    LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
  }, []);

  return <SiteStateContext.Provider value={{ state, setState, update, reset }}>{children}</SiteStateContext.Provider>;
}

export function useSiteState() {
  const context = React.useContext(SiteStateContext);
  if (!context) throw new Error("useSiteState must be used inside SiteStateProvider");
  return context;
}
