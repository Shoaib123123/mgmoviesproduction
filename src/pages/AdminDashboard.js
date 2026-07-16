import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentEditor from "../admin/ContentEditor";
import PortfolioManager from "../admin/PortfolioManager";
import { useSiteContent } from "../content/SiteContentContext";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import "./Admin.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const { content, applyContent } = useSiteContent();
  const [state, setState] = useState("checking");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const checkAccess = async () => {
      if (!isSupabaseConfigured) return setState("not-configured");
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return navigate("/admin/login", { replace: true });
      setEmail(userData.user.email || "");
      const { data: admin } = await supabase.from("admin_users").select("user_id").eq("user_id", userData.user.id).maybeSingle();
      setState(admin ? "ready" : "not-authorized");
    };
    checkAccess();
  }, [navigate]);

  const signOut = async () => { await supabase.auth.signOut(); navigate("/admin/login", { replace: true }); };

  if (state === "checking") return <main className="admin-status">Checking access…</main>;
  if (state === "not-configured") return <main className="admin-status">Create `.env` from `.env.example`, add the Supabase URL and Publishable key, then restart `npm start`.</main>;
  if (state === "not-authorized") return <main className="admin-status"><h1>Access not authorised</h1><p>This account is signed in but is not the client administrator. Add its Supabase Auth user UUID to `admin_users` as shown in `supabase/schema.sql`.</p><button onClick={signOut}>Sign out</button></main>;

  return <main className="admin-page"><header className="admin-header"><div><p className="admin-kicker">MG MOVIES</p><h1>Website editor</h1><p>{email}</p></div><button className="admin-secondary" onClick={signOut}>Sign out</button></header>
    <ContentEditor content={content} onSaved={applyContent} />
    <PortfolioManager />
  </main>;
}

export default AdminDashboard;
