import "./CabinDiagram.css";

type CabinNodeProps = {
  index: string;
  eyebrow: string;
  title: string;
  detail: string;
  accent?: boolean;
};

function CabinNode({ index, eyebrow, title, detail, accent = false }: CabinNodeProps) {
  return (
    <article className={`cabin-arch-node ${accent ? "cabin-arch-node--accent" : ""}`}>
      <div><span>{index}</span><small>{eyebrow}</small></div>
      <strong>{title}</strong>
      <p>{detail}</p>
    </article>
  );
}

function CabinLink({ label }: { label: string }) {
  return (
    <div className="cabin-arch-link" aria-hidden="true">
      <span>{label}</span>
      <i />
    </div>
  );
}

// Feature: visualize Cabin's real local control path, server isolation, and bounded log polling model.
export default function CabinDiagram() {
  return (
    <div className="cabin-architecture">
      <header className="cabin-arch-heading">
        <div>
          <span>Desktop control plane</span>
          <h3>One local app. Multiple guarded hosts.</h3>
        </div>
        <p>No remote admin API, arbitrary shell, or cloud control service.</p>
      </header>

      <div className="cabin-arch-flow" aria-label="Cabin request and SSH control path">
        <CabinNode
          index="01"
          eyebrow="React"
          title="Control workspace"
          detail="Select a server, inspect grouped states, search journals, or request a lifecycle action."
        />
        <CabinLink label="typed invoke" />
        <CabinNode
          index="02"
          eyebrow="Tauri / Rust"
          title="Policy gate"
          detail="Resolve server ID, validate its unit allowlist, constrain the action, and cap log volume."
          accent
        />
        <CabinLink label="OpenSSH" />
        <section className="cabin-host-rack">
          <div className="cabin-host-rack__label">
            <span>Managed Linux hosts</span>
            <small>server-specific scope</small>
          </div>
          <article>
            <div><i /><strong>rust-services</strong><small>xxx.xxx.xxx.xxx</small></div>
            <span>6 allow-listed units</span>
          </article>
          <article>
            <div><i /><strong>rust-services-2</strong><small>yyy.yyy.yyy.yyy</small></div>
            <span>2 allowed-listed units</span>
          </article>
        </section>
      </div>

      <div className="cabin-route-grid" aria-label="Cabin remote operation routes">
        <article>
          <div><span>01</span><small>Status route</small></div>
          <strong>systemctl show</strong>
          <p>Fetch every mapped unit in one SSH connection and regroup the returned active/sub states.</p>
          <b>automatic · 60 seconds</b>
        </article>
        <article>
          <div><span>02</span><small>Lifecycle route</small></div>
          <strong>start · stop · restart</strong>
          <p>Require confirmation, execute one allow-listed mutation, then refresh process state and journals.</p>
          <b>one command · fresh session</b>
        </article>
        <article>
          <div><span>03</span><small>Journal route</small></div>
          <strong>journalctl -n 500</strong>
          <p>Return bounded output for safe highlighting and refresh the open viewer while Live mode is enabled.</p>
          <b>live polling · 1.5 seconds</b>
        </article>
      </div>

      <footer className="cabin-security-strip">
        <span><i /> Static host registry</span>
        <span><i /> Per-server unit allowlist</span>
        <span><i /> BatchMode + strict host keys</span>
        <span><i /> No arbitrary shell input</span>
        <strong>React → Rust → SSH → systemd / journald</strong>
      </footer>
    </div>
  );
}
