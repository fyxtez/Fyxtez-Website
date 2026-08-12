import "./TelegramIntelligenceDiagram.css";
import type { ProjectDiagramId } from "../../../data/projects";

type TelegramIntelligenceDiagramProps = {
  diagram: ProjectDiagramId;
};

type WorkerCardProps = {
  index: string;
  eyebrow: string;
  title: string;
  detail: string;
  state?: string;
  accent?: boolean;
};

function WorkerCard({ index, eyebrow, title, detail, state, accent = false }: WorkerCardProps) {
  return (
    <article className={`tg-intel-worker-card ${accent ? "tg-intel-worker-card--accent" : ""}`}>
      <div>
        <span>{index}</span>
        <small>{eyebrow}</small>
      </div>
      <strong>{title}</strong>
      <p>{detail}</p>
      {state && <b>{state}</b>}
    </article>
  );
}

function FlowArrow({ label, vertical = false }: { label: string; vertical?: boolean }) {
  return (
    <div className={`tg-intel-arrow ${vertical ? "tg-intel-arrow--vertical" : ""}`} aria-hidden="true">
      <span>{label}</span>
      <i />
    </div>
  );
}

function FleetTopology() {
  return (
    <div className="commandant-diagram tg-intel-diagram tg-intel-diagram--fleet">
      <header className="commandant-diagram-heading">
        <div>
          <span>01 / Worker fleet</span>
          <h3>One event fabric. Three isolated workloads.</h3>
        </div>
        <p>Shared Telegram access without a shared process or failure domain.</p>
      </header>

      <section className="tg-intel-event-fabric" aria-label="Telegram event fabric">
        <div>
          <small>External event fabric</small>
          <strong>Telegram MTProto</strong>
        </div>
        <span>dialogs</span>
        <span>updates</span>
        <span>peer actions</span>
        <b>authenticated sessions</b>
      </section>

      <div className="tg-intel-fleet-lines" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <div className="tg-intel-fleet-grid">
        <WorkerCard
          index="01"
          eyebrow="Long-running service"
          title="Telegram Sniper"
          detail="Filters selected channels, validates token addresses, dispatches execution requests, and exposes a local control API."
          state="Tokio · Axum · SQLite"
          accent
        />
        <WorkerCard
          index="02"
          eyebrow="Background daemon"
          title="Account Automation"
          detail="Consumes live updates for delayed reactions, automatic read state, and scheduled notification policy."
          state="Tokio · grammers · chrono"
        />
        <WorkerCard
          index="03"
          eyebrow="One-shot job"
          title="Read-state Sweeper"
          detail="Loads every dialog and marks it read with bounded request concurrency and predictable resource use."
          state="Tokio · futures · limit 10"
        />
      </div>

      <footer className="tg-intel-boundary-strip">
        <span><i /> Independent binaries</span>
        <span><i /> Separate session state</span>
        <span><i /> Isolated lifecycle</span>
        <strong>One worker can fail without collapsing the fleet</strong>
      </footer>
    </div>
  );
}

function SignalPipeline() {
  return (
    <div className="commandant-diagram tg-intel-diagram tg-intel-diagram--signal">
      <header className="commandant-diagram-heading">
        <div>
          <span>02 / Intelligence hot path</span>
          <h3>From an unstructured message to an explicit action.</h3>
        </div>
        <p>The database stays outside the per-message eligibility check.</p>
      </header>

      <div className="tg-intel-signal-flow" aria-label="Telegram Sniper signal pipeline">
        <WorkerCard
          index="01"
          eyebrow="MTProto update"
          title="New message"
          detail="Resolve the bare peer ID and discard empty or ignored traffic."
        />
        <FlowArrow label="channel id" />
        <WorkerCard
          index="02"
          eyebrow="Hot policy"
          title="RwLock lookup"
          detail="Require an active channel and apply its day or night policy."
          accent
        />
        <FlowArrow label="eligible" />
        <WorkerCard
          index="03"
          eyebrow="Validation"
          title="Address detector"
          detail="Prefilter Base58 candidates, then require a 32-byte Solana public key."
        />
        <FlowArrow label="valid CA" />
        <WorkerCard
          index="04"
          eyebrow="Execution adapter"
          title="Configured buy"
          detail="Build amount, slippage, priority-fee, and pool parameters for the request."
        />
      </div>

      <div className="tg-intel-outcome-grid">
        <section>
          <small>Execution result</small>
          <strong>External trade endpoint</strong>
          <p>A successful response returns a transaction signature; errors stop the success path.</p>
        </section>
        <section>
          <small>Audit trail</small>
          <strong>SQLite detections</strong>
          <p>Channel, chain, token address, raw message, and timestamp remain queryable.</p>
        </section>
        <section className="tg-intel-outcome-grid__accent">
          <small>Delivery adapter</small>
          <strong>telegram-notify</strong>
          <p>The public crate sends the resulting alert and Dexscreener context to one configured chat.</p>
        </section>
      </div>

      <section className="tg-intel-alpha-lane">
        <div>
          <small>Parallel producer</small>
          <strong>Binance Alpha watcher</strong>
        </div>
        <FlowArrow label="new token" />
        <div>
          <small>Tokio channel</small>
          <strong>Contract event</strong>
        </div>
        <FlowArrow label="route" />
        <div>
          <small>Telegram peer</small>
          <strong>Based Bot + notification</strong>
        </div>
      </section>
    </div>
  );
}

function ControlPlane() {
  return (
    <div className="commandant-diagram tg-intel-diagram tg-intel-diagram--control">
      <header className="commandant-diagram-heading">
        <div>
          <span>03 / Control plane</span>
          <h3>Persistent policy. Memory-speed decisions.</h3>
        </div>
        <p>A private localhost interface controls the live ingestion path.</p>
      </header>

      <div className="tg-intel-control-layout" aria-label="Telegram Sniper control plane">
        <section className="tg-intel-dashboard-card">
          <header>
            <span>React dashboard</span>
            <small>SSH-tunnel access</small>
          </header>
          <div className="tg-intel-dashboard-stats">
            <span><b>Channels</b> searchable dialog inventory</span>
            <span><b>Coverage</b> active and night-mode toggles</span>
            <span><b>Execution</b> amount, slippage, priority fee</span>
          </div>
          <div className="tg-intel-watchdog">
            <span><i /> server</span>
            <span><i /> database</span>
            <span><i /> telegram</span>
            <b>5s health polling</b>
          </div>
        </section>

        <div className="tg-intel-api-bridge">
          <span>JSON</span>
          <i />
          <strong>Axum</strong>
          <i />
          <span>state</span>
        </div>

        <section className="tg-intel-state-card">
          <div>
            <small>Source of truth</small>
            <strong>SQLite</strong>
            <p>Dialog metadata, activation, night coverage, execution configuration, and detections.</p>
          </div>
          <div className="tg-intel-state-sync"><span>startup load</span><i /><span>API updates</span></div>
          <div className="tg-intel-hot-state">
            <small>Hot-path replica</small>
            <strong>Arc&lt;RwLock&lt;HashMap&gt;&gt;</strong>
            <p>One in-memory lookup decides whether an incoming message can continue.</p>
          </div>
        </section>
      </div>

      <div className="tg-intel-endpoint-strip">
        <span>GET /health</span>
        <span>GET /channels</span>
        <span>POST /active</span>
        <span>POST /night_mode</span>
        <span>POST /snipe_config</span>
        <span>GET /detections</span>
      </div>

      <footer className="tg-intel-boundary-strip">
        <span><i /> 127.0.0.1 binding</span>
        <span><i /> SQLite query health</span>
        <span><i /> Telegram heartbeat</span>
        <strong>Private control surface · no public API</strong>
      </footer>
    </div>
  );
}

function AutomationWorkers() {
  return (
    <div className="commandant-diagram tg-intel-diagram tg-intel-diagram--automation">
      <header className="commandant-diagram-heading">
        <div>
          <span>04 / Automation workloads</span>
          <h3>Continuous reactions. Bounded maintenance.</h3>
        </div>
        <p>Live account behavior and bulk cleanup use separate runtimes.</p>
      </header>

      <div className="tg-intel-automation-layout">
        <section className="tg-intel-daemon-lane">
          <header>
            <span>Account Automation</span>
            <small>long-running update stream</small>
          </header>
          <div className="tg-intel-daemon-source">
            <small>Telegram update</small>
            <strong>NewMessage</strong>
          </div>
          <FlowArrow label="fan out" vertical />
          <div className="tg-intel-action-grid">
            <article>
              <span>01</span>
              <strong>Reaction worker</strong>
              <p>Spawn a task, wait a randomized 3–10 seconds, then react in configured channels.</p>
            </article>
            <article>
              <span>02</span>
              <strong>Auto-read path</strong>
              <p>Resolve the peer reference and immediately advance read state for selected channels.</p>
            </article>
            <article>
              <span>03</span>
              <strong>Night-mute loop</strong>
              <p>Poll local time, detect boundary changes, and update peer notification settings.</p>
            </article>
          </div>
        </section>

        <section className="tg-intel-sweeper-lane">
          <header>
            <span>Read-state Sweeper</span>
            <small>one-shot maintenance job</small>
          </header>
          <ol>
            <li><span>01</span><div><strong>Authenticate</strong><p>Open a dedicated session and start its sender pool.</p></div></li>
            <li><span>02</span><div><strong>Load dialogs</strong><p>Materialize the account&apos;s complete dialog list.</p></div></li>
            <li><span>03</span><div><strong>Bound concurrency</strong><p>Run at most ten mark-as-read requests in parallel.</p></div></li>
            <li><span>04</span><div><strong>Exit cleanly</strong><p>Finish after the finite workload has drained.</p></div></li>
          </ol>
          <div className="tg-intel-backpressure">
            <span>for_each_concurrent</span>
            <strong>10</strong>
            <small>maximum in-flight requests</small>
          </div>
        </section>
      </div>

      <footer className="tg-intel-boundary-strip">
        <span><i /> Event-driven daemon</span>
        <span><i /> Clock-driven worker</span>
        <span><i /> Finite maintenance job</span>
        <strong>Different workloads · different lifecycles</strong>
      </footer>
    </div>
  );
}

export default function TelegramIntelligenceDiagram({ diagram }: TelegramIntelligenceDiagramProps) {
  if (diagram === "telegram-signal-pipeline") return <SignalPipeline />;
  if (diagram === "telegram-control-plane") return <ControlPlane />;
  if (diagram === "telegram-automation-workers") return <AutomationWorkers />;
  return <FleetTopology />;
}
