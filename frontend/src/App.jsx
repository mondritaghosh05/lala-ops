import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import RequestsList from "./components/RequestsList";
import RequestForm from "./components/RequestForm";
import ClientProfile from "./components/ClientProfile";
import { fetchRequests, createRequest, updateRequestDoc } from "./services/requestsService";
import "./App.css";

function App() {
  const [view, setView] = useState("dashboard");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRequest, setEditingRequest] = useState(null);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    setLoading(true);
    const data = await fetchRequests();
    setRequests(data);
    setLoading(false);
  }

  async function handleSave(request) {
    const { id, ...fields } = request;
    if (id && requests.some((r) => r.id === id)) {
      await updateRequestDoc(id, fields);
    } else {
      await createRequest(fields);
    }
    await loadRequests();
    setEditingRequest(null);
    setView("list");
  }

  function handleNewRequest() {
    setEditingRequest(null);
    setView("form");
  }

  function handleEditRequest(request) {
    setEditingRequest(request);
    setView("form");
  }

  if (loading) {
    return <div className="loading-screen">Loading Lala Ops...</div>;
  }

  return (
    <div>
      <nav className="app-nav">
        <button className={view === "dashboard" ? "nav-active" : ""} onClick={() => setView("dashboard")}>
          Dashboard
        </button>
        <button className={view === "list" ? "nav-active" : ""} onClick={() => setView("list")}>
          All Requests
        </button>
        <button className={view === "clients" ? "nav-active" : ""} onClick={() => setView("clients")}>
          Clients
        </button>
        <button className="nav-cta" onClick={handleNewRequest}>
          + New Request
        </button>
      </nav>

      {view === "dashboard" && <Dashboard requests={requests} />}
      {view === "list" && <RequestsList requests={requests} onSelectRequest={handleEditRequest} />}
      {view === "clients" && (
        <ClientProfile requests={requests} onSelectRequest={handleEditRequest} />
      )}
      {view === "form" && (
        <RequestForm
          existingRequest={editingRequest}
          onSave={handleSave}
          onCancel={() => setView("list")}
        />
      )}
    </div>
  );
}

export default App;