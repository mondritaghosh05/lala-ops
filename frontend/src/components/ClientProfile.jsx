import { useState } from "react";
import { isFlagged } from "../utils/requestHelpers";
import "./ClientProfile.css";

function ClientProfile({ requests, onSelectRequest, onBack }) {
  const clients = [...new Set(requests.map((r) => r.client))].sort();
  const [selectedClient, setSelectedClient] = useState(clients[0] || null);

  const clientRequests = requests.filter((r) => r.client === selectedClient);
  const active = clientRequests.filter((r) => r.status !== "Done");
  const completed = clientRequests.filter((r) => r.status === "Done");

  return (
    <div className="client-profile">
      <div className="client-profile-layout">
        <aside className="client-sidebar">
          <h2>Clients</h2>
          {clients.length === 0 ? (
            <p className="empty-state">No clients yet</p>
          ) : (
            clients.map((c) => (
              <button
                key={c}
                className={`client-item ${c === selectedClient ? "client-active" : ""}`}
                onClick={() => setSelectedClient(c)}
              >
                {c}
              </button>
            ))
          )}
        </aside>

        <main className="client-main">
          {selectedClient ? (
            <>
              <h1>{selectedClient}</h1>

              <section>
                <h3>Active Requests ({active.length})</h3>
                <div className="client-request-grid">
                  {active.length === 0 ? (
                    <p className="empty-state">No active requests</p>
                  ) : (
                    active.map((r) => (
                      <div
                        key={r.id}
                        className={`client-request-card ${isFlagged(r) ? "row-flagged" : ""}`}
                        onClick={() => onSelectRequest(r)}
                      >
                        <div className="request-card-top">
                          <span className={`status-badge status-${r.status.replace(/\s+/g, "-").toLowerCase()}`}>
                            {r.status}
                          </span>
                        </div>
                        <p className="request-description">{r.description}</p>
                        <div className="request-card-bottom">
                          <span>{r.owner || "Unassigned"}</span>
                          <span>{r.source}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>

              <section>
                <h3>Completed ({completed.length})</h3>
                <div className="client-request-grid">
                  {completed.length === 0 ? (
                    <p className="empty-state">Nothing completed yet</p>
                  ) : (
                    completed.map((r) => (
                      <div
                        key={r.id}
                        className="client-request-card completed-card"
                        onClick={() => onSelectRequest(r)}
                      >
                        <div className="request-card-top">
                          <span className={`status-badge status-${r.status.replace(/\s+/g, "-").toLowerCase()}`}>
                            {r.status}
                          </span>
                        </div>
                        <p className="request-description">{r.description}</p>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </>
          ) : (
            <p className="empty-state">Select a client to see their requests</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default ClientProfile;