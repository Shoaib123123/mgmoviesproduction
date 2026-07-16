import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { defaultSiteContent } from "./defaultSiteContent";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

const SiteContentContext = createContext({
  content: defaultSiteContent,
  loading: false,
  refresh: async () => {},
  applyContent: () => {},
});

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(defaultSiteContent);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    const { data, error } = await supabase.from("site_content").select("key, value");
    if (!error && data) {
      setContent((current) => ({
        ...current,
        ...Object.fromEntries(data.map((item) => [item.key, item.value])),
      }));
    }
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const applyContent = (updates) => {
    setContent((current) => ({ ...current, ...updates }));
  };

  return (
    <SiteContentContext.Provider value={{ content, loading, refresh, applyContent }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
