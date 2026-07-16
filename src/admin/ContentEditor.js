import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { mediaFields, textGroups } from "./contentFields";

function safeFilename(name) {
  return name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
}

function ContentEditor({ content, onSaved }) {
  const [draft, setDraft] = useState(content);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploadingKey, setUploadingKey] = useState("");

  useEffect(() => { setDraft(content); }, [content]);
  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }));

  const upload = async (key, file) => {
    if (!file) return;
    setMessage(""); setUploadingKey(key);
    const path = `site/${key}-${Date.now()}-${safeFilename(file.name)}`;
    const { error } = await supabase.storage.from("website-media").upload(path, file, { contentType: file.type });
    if (error) setMessage(error.message);
    else update(key, supabase.storage.from("website-media").getPublicUrl(path).data.publicUrl);
    setUploadingKey("");
  };

  const save = async (event) => {
    event.preventDefault(); setMessage(""); setBusy(true);
    const { error } = await supabase.from("site_content").upsert(
      Object.entries(draft).map(([key, value]) => ({ key, value: String(value || "") })),
      { onConflict: "key" }
    );
    setBusy(false);
    if (error) return setMessage(error.message);
    onSaved(draft); setMessage("Saved. The website now uses these values.");
  };

  return <form className="admin-panel" onSubmit={save}>
    <div className="admin-panel-heading"><div><p className="admin-kicker">WEBSITE CONTENT</p><h2>Headings and text</h2></div><button disabled={busy}>{busy ? "Saving…" : "Save all changes"}</button></div>
    {textGroups.map((group) => <section className="admin-field-group" key={group.title}><h3>{group.title}</h3><div className="admin-fields">
      {group.fields.map((field) => <label key={field.key}>{field.label}{field.multiline ? <textarea value={draft[field.key] || ""} onChange={(event) => update(field.key, event.target.value)} /> : <input value={draft[field.key] || ""} onChange={(event) => update(field.key, event.target.value)} />}</label>)}
    </div></section>)}
    <section className="admin-field-group"><h3>Images and video</h3><p className="admin-help">Paste a public URL, or choose a file. Uploaded files are stored in Supabase Storage after you save this form.</p><div className="admin-media-fields">
      {mediaFields.map((field) => <div className="admin-media-field" key={field.key}><strong>{field.label}</strong>
        {field.type === "video" ? <video src={draft[field.key]} muted controls /> : <img src={draft[field.key]} alt="" />}
        <input aria-label={`${field.label} URL`} value={draft[field.key] || ""} onChange={(event) => update(field.key, event.target.value)} />
        <label className="upload-control">{uploadingKey === field.key ? "Uploading…" : "Choose file"}<input type="file" accept={`${field.type}/*`} onChange={(event) => upload(field.key, event.target.files?.[0])} disabled={Boolean(uploadingKey)} /></label>
      </div>)}
    </div></section>
    {message && <p className={message === "Saved. The website now uses these values." ? "admin-success" : "admin-error"}>{message}</p>}
  </form>;
}

export default ContentEditor;
