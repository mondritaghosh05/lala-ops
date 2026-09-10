import { useState } from "react";
import "./RequestForm.css";

const STATUS_OPTIONS = [
  "New Request",
  "Needs Clarification",
  "Ready to Assign",
  "In Progress",
  "Waiting on Client",
  "Done",
];

const SOURCE_OPTIONS = ["WhatsApp", "Gmail", "Other"];

function RequestForm({ existingRequest, onSave, onCancel }) {
  const [form, setForm] = useState(
    existingRequest || {
      client: "",
      description: "",
      source: "WhatsApp",
      status: "New Request",
      owner: "",
    }
  );

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      ...form,
      id: existingRequest ? existingRequest.id : null,
      createdAt: existingRequest ? existingRequest.createdAt : new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      owner: form.owner || null,
    });
  }

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <h2>{existingRequest ? "Edit Request" : "New Request"}</h2>

      <label>
        Client
        <input
          type="text"
          value={form.client}
          onChange={(e) => handleChange("client", e.target.value)}
          required
        />
      </label>

      <label>
        Description
        <textarea
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
          required
        />
      </label>

      <div className="form-row">
        <label>
          Source
          <select value={form.source} onChange={(e) => handleChange("source", e.target.value)}>
            {SOURCE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>

        <label>
          Status
          <select value={form.status} onChange={(e) => handleChange("status", e.target.value)}>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
      </div>

      <label>
        Owner (leave blank if unassigned)
        <input
          type="text"
          value={form.owner || ""}
          onChange={(e) => handleChange("owner", e.target.value)}
          placeholder="e.g. Priya"
        />
      </label>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {existingRequest ? "Save Changes" : "Create Request"}
        </button>
      </div>
    </form>
  );
}

export default RequestForm;