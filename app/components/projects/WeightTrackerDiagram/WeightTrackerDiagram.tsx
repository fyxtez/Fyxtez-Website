import "./WeightTrackerDiagram.css";

function FlowArrow({ label }: { label: string }) {
  return (
    <div className="weight-flow-arrow" aria-hidden="true">
      <span>{label}</span>
      <i />
    </div>
  );
}

export default function WeightTrackerDiagram() {
  return (
    <div className="commandant-diagram weight-architecture">
      <header className="commandant-diagram-heading">
        <div>
          <span>03 / Deployed product architecture</span>
          <h3>One tap becomes one synchronized day.</h3>
        </div>
        <p>A shared authenticated history across Android and desktop.</p>
      </header>

      <div className="weight-client-row" aria-label="Weight Tracker client applications">
        <article>
          <div className="weight-platform-icon">A</div>
          <div><small>Primary client</small><strong>Android</strong><p>One-thumb meal, weight, sleep, and training input</p></div>
        </article>
        <div className="weight-shared-runtime">
          <span>Tauri 2</span><b>React + TypeScript</b><small>same product model</small>
        </div>
        <article>
          <div className="weight-platform-icon weight-platform-icon--desktop">D</div>
          <div><small>Companion client</small><strong>Desktop</strong><p>The same daily history and report workflow</p></div>
        </article>
      </div>

      <div className="weight-sync-strip">
        <span><b>Tap</b> preset portion or daily value</span>
        <i aria-hidden="true" />
        <span><b>Derive</b> calories and macros locally</span>
        <i aria-hidden="true" />
        <span><b>Autosave</b> without a confirmation step</span>
      </div>

      <div className="weight-runtime-flow" aria-label="Weight Tracker production request flow">
        <section className="weight-layer weight-layer--edge">
          <header><span>Public edge</span><small>tracker.fyxtez.com</small></header>
          <strong>Nginx + Let&apos;s Encrypt</strong>
          <p>HTTPS termination, reverse proxy, private upstream</p>
          <div className="weight-layer-meta"><span>443 public</span><span>auto-renew TLS</span></div>
        </section>

        <FlowArrow label="typed JSON" />

        <section className="weight-layer weight-layer--api">
          <header><span>Rust boundary</span><small>127.0.0.1:8585</small></header>
          <strong>Axum API</strong>
          <div className="weight-api-grid">
            <span><b>Auth</b> register · login · refresh</span>
            <span><b>Days</b> list · upsert · delete</span>
            <span><b>Guard</b> user-scoped access</span>
            <span><b>Model</b> camelCase contract</span>
          </div>
        </section>

        <FlowArrow label="SQLx" />

        <section className="weight-layer weight-layer--data">
          <header><span>Persistent state</span><small>private network</small></header>
          <strong>PostgreSQL</strong>
          <div className="weight-table-list">
            <span>users</span><span>auth_sessions</span><span>daily_records</span><span>user_preferences</span>
          </div>
          <p>One revisioned JSONB document per user and local date</p>
        </section>
      </div>

      <div className="weight-security-row">
        <article><small>Password boundary</small><strong>Argon2id</strong><span>Only password hashes persist</span></article>
        <article><small>Access session</small><strong>15 minutes</strong><span>Opaque bearer token</span></article>
        <article><small>Refresh session</small><strong>30 days</strong><span>Rotated after every use</span></article>
        <article><small>Stored session data</small><strong>SHA-256</strong><span>Only token digests reach PostgreSQL</span></article>
      </div>

      <div className="weight-operations-strip">
        <div><i aria-hidden="true" /><span><small>Process</small><strong>systemd restart policy</strong></span></div>
        <div><i aria-hidden="true" /><span><small>Observation</small><strong>Cabin service control</strong></span></div>
        <div><i aria-hidden="true" /><span><small>Deployment</small><strong>Health check + rollback</strong></span></div>
        <b>Self-hosted on DigitalOcean</b>
      </div>
    </div>
  );
}
