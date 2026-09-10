import { useState } from "react";
import { isFlagged } from "../utils/requestHelpers";
import "./RequestsList.css";

const STATUS_OPTIONS = [
  "All",
  "New Request",
  "Needs Clarification",
  "Ready to Assign",
  "In Progress",
  "Waiting on Client",
  "Done",
];

function RequestsList({ requests, onSelectRequest }) {
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = requests.filter((r) =>
    statusFilter === "All" ? true : r.status === statusFilter
  );

  return (
    <div className="requests-list">
      <div className="list-header">
        <h1>All Requests</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="list-table">
        <div className="list-row list-row-header">
          <span>Client</span>
          <span>Description</span>
          <span>Status</span>
          <span>Owner</span>
          <span>Source</span>
        </div>
        {filtered.map((r) => (
          <div
            key={r.id}
            className={`list-row ${isFlagged(r) ? "row-flagged" : ""}`}
            onClick={() => onSelectRequest(r)}
          >
            <span>{r.client}</span>
            <span className="desc-cell">{r.description}</span>
            <span className={`status-badge status-${r.status.replace(/\s+/g, "-").toLowerCase()}`}>
              {r.status}
            </span>
            <span>{r.owner || "Unassigned"}</span>
            <span>{r.source}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestsList;