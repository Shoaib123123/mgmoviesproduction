import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import "./Admin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => { if (data.session) navigate("/admin", { replace: true }); });
  }, [navigate]);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (loginError) return setError(loginError.message);
    navigate("/admin", { replace: true });
  };

  return <main className="admin-login"><form className="admin-login-card" onSubmit={submit}>
    <p className="admin-kicker">MG MOVIES</p><h1>Client admin</h1><p>Sign in to update the website.</p>
    {!isSupabaseConfigured ? <p className="admin-error">Add the two `REACT_APP_SUPABASE_*` values to `.env` first.</p> : <>
      <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
      <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
      {error && <p className="admin-error">{error}</p>}<button disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
    </>}
  </form></main>;
}

export default AdminLogin;
