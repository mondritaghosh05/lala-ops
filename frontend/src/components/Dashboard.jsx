import {
  isFlagged,
  isWaitingOnClient,
  isUnassigned,
  isWaitingOnUs,
} from "../utils/requestHelpers";
import "./Dashboard.css";

function RequestCard({ request }) {
  return (
    <div className="request-card">
      <div className="request-card-top">
        <span className="request-client">{request.client}</span>
        <span className={`status-badge status-${request.status.replace(/\s+/g, "-").toLowerCase()}`}>
          {request.status}
        </span>
      </div>
      <p className="request-description">{request.description}</p>
      <div className="request-card-bottom">
        <span>{request.owner ? request.owner : "Unassigned"}</span>
        <span>{request.source}</span>
      </div>
    </div>
  );
}

function Bucket({ title, requests, accentClass }) {
  return (
    <div className="bucket">
      <div className={`bucket-header ${accentClass}`}>
        <h2>{title}</h2>
        <span className="bucket-count">{requests.length}</span>
      </div>
      <div className="bucket-list">
        {requests.length === 0 ? (
          <p className="empty-state">Nothing here</p>
        ) : (
          requests.map((r) => <RequestCard key={r.id} request={r} />)
        )}
      </div>
    </div>
  );
}

function Dashboard({ requests }) {
  const waitingOnUs = requests.filter(isWaitingOnUs);
  const waitingOnClient = requests.filter(isWaitingOnClient);
  const unassigned = requests.filter(isUnassigned);
  const overdue = requests.filter(isFlagged);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Lala Ops</h1>
      <div className="bucket-grid">
        <Bucket title="Waiting on Us" requests={waitingOnUs} accentClass="accent-blue" />
        <Bucket title="Waiting on Client" requests={waitingOnClient} accentClass="accent-purple" />
        <Bucket title="Unassigned" requests={unassigned} accentClass="accent-yellow" />
        <Bucket title="Overdue" requests={overdue} accentClass="accent-red" />
      </div>
    </div>
  );
}

export default Dashboard;