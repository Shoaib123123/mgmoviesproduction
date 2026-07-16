import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const emptyItem = { title: "", category: "Photography", sub_category: "", media_type: "image", url: "", sort_order: 0, storage_path: "" };
const safeFilename = (name) => name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");

function PortfolioManager() {
  const [items, setItems] = useState([]);
  const [draft, setDraft] = useState(emptyItem);
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const { data, error } = await supabase.from("portfolio_items").select("*").order("sort_order").order("created_at");
    if (error) setMessage(error.message); else setItems(data || []);
  }, []);
  useEffect(() => { load(); }, [load]);

  const set = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const reset = () => { setDraft(emptyItem); setFile(null); setEditingId(null); };

  const submit = async (event) => {
    event.preventDefault(); setMessage(""); setBusy(true);
    let next = { ...draft, sort_order: Number(draft.sort_order) || 0 };
    if (file) {
      const storagePath = `portfolio/${Date.now()}-${safeFilename(file.name)}`;
      const { error: uploadError } = await supabase.storage.from("website-media").upload(storagePath, file, { contentType: file.type });
      if (uploadError) { setBusy(false); return setMessage(uploadError.message); }
      next = { ...next, storage_path: storagePath, url: supabase.storage.from("website-media").getPublicUrl(storagePath).data.publicUrl };
    }
    const oldItem = editingId ? items.find((item) => item.id === editingId) : null;
    const request = editingId
      ? supabase.from("portfolio_items").update(next).eq("id", editingId)
      : supabase.from("portfolio_items").insert(next);
    const { error } = await request;
    setBusy(false);
    if (error) return setMessage(error.message);
    if (file && oldItem?.storage_path && oldItem.storage_path !== next.storage_path) await supabase.storage.from("website-media").remove([oldItem.storage_path]);
    setMessage(editingId ? "Portfolio item updated." : "Portfolio item added."); reset(); load();
  };

  const edit = (item) => { setDraft({ title: item.title || "", category: item.category, sub_category: item.sub_category || "", media_type: item.media_type, url: item.url, sort_order: item.sort_order, storage_path: item.storage_path || "" }); setEditingId(item.id); setFile(null); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const remove = async (item) => { if (!window.confirm(`Delete ${item.title || "this item"}?`)) return; const { error } = await supabase.from("portfolio_items").delete().eq("id", item.id); if (error) return setMessage(error.message); if (item.storage_path) await supabase.storage.from("website-media").remove([item.storage_path]); load(); };

  return <section className="admin-panel"><div className="admin-panel-heading"><div><p className="admin-kicker">OUR WORK</p><h2>Portfolio images and videos</h2></div></div>
    <form className="portfolio-form" onSubmit={submit}>
      <label>Title<input value={draft.title} onChange={(event) => set("title", event.target.value)} placeholder="Bridal portraits" /></label>
      <label>Category<input value={draft.category} onChange={(event) => set("category", event.target.value)} required placeholder="Photography" /></label>
      <label>Sub-category (optional)<input value={draft.sub_category} onChange={(event) => set("sub_category", event.target.value)} placeholder="Bridal" /></label>
      <label>Type<select value={draft.media_type} onChange={(event) => set("media_type", event.target.value)}><option value="image">Image</option><option value="video">Video</option></select></label>
      <label>Public URL<input value={draft.url} onChange={(event) => set("url", event.target.value)} placeholder="https://…" required={!file} /></label>
      <label>Display order<input type="number" value={draft.sort_order} onChange={(event) => set("sort_order", event.target.value)} /></label>
      <label>Upload {draft.media_type}<input type="file" accept={`${draft.media_type}/*`} onChange={(event) => setFile(event.target.files?.[0] || null)} /></label>
      <div className="portfolio-actions"><button disabled={busy}>{busy ? "Saving…" : editingId ? "Update item" : "Add item"}</button>{editingId && <button type="button" className="admin-secondary" onClick={reset}>Cancel</button>}</div>
    </form>
    {message && <p className={message.includes(".") && !message.includes("error") ? "admin-success" : "admin-error"}>{message}</p>}
    <div className="portfolio-list">{items.map((item) => <article key={item.id}><div>{item.media_type === "video" ? <video src={item.url} muted /> : <img src={item.url} alt={item.title || "Portfolio item"} />}</div><div><strong>{item.title || "Untitled item"}</strong><p>{item.category}{item.sub_category ? ` / ${item.sub_category}` : ""}</p><button type="button" className="admin-secondary" onClick={() => edit(item)}>Edit</button><button type="button" className="admin-danger" onClick={() => remove(item)}>Delete</button></div></article>)}</div>
  </section>;
}

export default PortfolioManager;
