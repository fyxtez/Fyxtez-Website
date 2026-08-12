import "./WhaleTrackerDiagram.css";
import type { ProjectDiagramId } from "../../../data/projects";

type WhaleTrackerDiagramProps = {
  diagram: ProjectDiagramId;
};

function WhaleArrow({ label }: { label: string }) {
  return (
    <div className="whale-arrow">
      <span>{label}</span>
      <i aria-hidden="true" />
    </div>
  );
}

function WhaleNode({
  index,
  eyebrow,
  title,
  detail,
  accent = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  detail: string;
  accent?: boolean;
}) {
  return (
    <article className={`whale-node ${accent ? "whale-node--accent" : ""}`}>
      <div><span>{index}</span><small>{eyebrow}</small></div>
      <strong>{title}</strong>
      <p>{detail}</p>
    </article>
  );
}

function LiveIngestion() {
  return (
    <div className="commandant-diagram whale-diagram whale-diagram--ingestion">
      <header className="commandant-diagram-heading">
        <div>
          <span>01 / Live ingestion</span>
          <h3>Trade flow becomes wallet flow.</h3>
        </div>
        <p>Every fill contributes to a directional wallet profile.</p>
      </header>

      <div className="whale-cli-strip">
        <span><small>Symbol</small><strong>BTC · ETH · SOL · …</strong></span>
        <span><small>Whale threshold</small><strong>configurable base size</strong></span>
        <span><small>Report cadence</small><strong>configurable seconds</strong></span>
        <b>CLI-configured runtime</b>
      </div>

      <div className="whale-ingestion-flow" aria-label="Hyperliquid live trade ingestion flow">
        <WhaleNode
          index="01"
          eyebrow="Hyperliquid"
          title="Trade WebSocket"
          detail="Subscribe to one uppercase coin stream"
        />
        <WhaleArrow label="trades" />
        <WhaleNode
          index="02"
          eyebrow="Parser"
          title="Validate message"
          detail="Accept trade channel data with two wallet users"
        />
        <WhaleArrow label="split" />
        <section className="whale-direction-split">
          <article>
            <span>users[0]</span>
            <strong>Buyer wallet</strong>
            <small>long_size + sz</small>
            <small>long_fills + 1</small>
          </article>
          <article>
            <span>users[1]</span>
            <strong>Seller wallet</strong>
            <small>short_size + sz</small>
            <small>short_fills + 1</small>
          </article>
        </section>
        <WhaleArrow label="write" />
        <WhaleNode
          index="04"
          eyebrow="Shared state"
          title="Wallet map"
          detail="Arc + RwLock + HashMap keyed by address"
          accent
        />
      </div>

      <div className="whale-state-schema">
        <span>long size</span>
        <span>short size</span>
        <span>long fills</span>
        <span>short fills</span>
        <span>last price</span>
        <span>last time</span>
        <strong>WalletData</strong>
      </div>
    </div>
  );
}

function EnrichmentReport() {
  return (
    <div className="commandant-diagram whale-diagram whale-diagram--report">
      <header className="commandant-diagram-heading">
        <div>
          <span>02 / Qualification + enrichment</span>
          <h3>Observed flow meets actual exposure.</h3>
        </div>
        <p>The reporting worker releases shared state before network enrichment.</p>
      </header>

      <div className="whale-report-flow" aria-label="Hyperliquid whale qualification and enrichment flow">
        <WhaleNode
          index="01"
          eyebrow="Read lock"
          title="Snapshot wallets"
          detail="Clone candidates from the shared map"
        />
        <WhaleArrow label="filter" />
        <WhaleNode
          index="02"
          eyebrow="Threshold"
          title="Qualify whales"
          detail="Long or short accumulated size ≥ minimum"
          accent
        />
        <WhaleArrow label="rank" />
        <WhaleNode
          index="03"
          eyebrow="Ordering"
          title="Largest flow first"
          detail="Sort by max(long size, short size)"
        />
        <WhaleArrow label="POST /info" />
        <WhaleNode
          index="04"
          eyebrow="Clearinghouse"
          title="Actual position"
          detail="Resolve signed size, entry, leverage, and PnL"
        />
      </div>

      <div className="whale-position-card">
        <div className="whale-position-card__identity">
          <small>Resolved wallet</small>
          <strong>0x71…d9a4</strong>
          <span><i aria-hidden="true" /> LONG</span>
        </div>
        <dl>
          <div><dt>Observed buy</dt><dd>8.4200 BTC</dd></div>
          <div><dt>Observed sell</dt><dd>1.1800 BTC</dd></div>
          <div><dt>Actual size</dt><dd>+4.2500 BTC</dd></div>
          <div><dt>Entry</dt><dd>64,327.2</dd></div>
          <div><dt>Leverage</dt><dd>10× cross</dd></div>
          <div><dt>Unrealized PnL</dt><dd className="whale-positive">+12,408.16</dd></div>
        </dl>
      </div>

      <div className="whale-report-facts">
        <span>Read lock dropped before HTTP calls</span>
        <span>Flat or closed wallets remain visible as FLAT / GONE</span>
        <strong>Live flow → verified position context</strong>
      </div>
    </div>
  );
}

function RuntimeLane({
  label,
  color,
  items,
}: {
  label: string;
  color: "yellow" | "green";
  items: Array<{ title: string; detail: string }>;
}) {
  return (
    <section className={`whale-runtime-lane whale-runtime-lane--${color}`}>
      <header><i aria-hidden="true" /><span>{label}</span><small>Tokio task</small></header>
      <div>
        {items.map((item, index) => (
          <article key={item.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.title}</strong>
            <small>{item.detail}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function RuntimeResilience() {
  return (
    <div className="commandant-diagram whale-diagram whale-diagram--runtime">
      <header className="commandant-diagram-heading">
        <div>
          <span>03 / Runtime lifecycle</span>
          <h3>Designed to keep watching.</h3>
        </div>
        <p>Two independent workers coordinate through state, not blocking calls.</p>
      </header>

      <div className="whale-runtime-layout" aria-label="Hyperliquid whale tracker runtime">
        <WhaleRuntimeConfig />
        <div className="whale-runtime-lanes">
          <RuntimeLane
            label="Writer · ingestion"
            color="yellow"
            items={[
              { title: "Connect + subscribe", detail: "trade stream for selected symbol" },
              { title: "Heartbeat", detail: "WebSocket ping every 30 seconds" },
              { title: "Recover", detail: "reconnect after 2 seconds" },
            ]}
          />
          <RuntimeLane
            label="Reader · reporting"
            color="green"
            items={[
              { title: "Wait interval", detail: "CLI-defined reporting cadence" },
              { title: "Snapshot + rank", detail: "brief concurrent read access" },
              { title: "Enrich + print", detail: "position API and terminal report" },
            ]}
          />
        </div>
      </div>

      <div className="whale-shutdown-path">
        <span>Ctrl+C</span>
        <i aria-hidden="true" />
        <span>AtomicBool = true</span>
        <i aria-hidden="true" />
        <span>both loops return</span>
        <i aria-hidden="true" />
        <strong>tokio::join!</strong>
      </div>
    </div>
  );
}

function WhaleRuntimeConfig() {
  return (
    <aside className="whale-runtime-config">
      <small>Shared runtime</small>
      <strong>Arc&lt;RwLock&lt;HashMap&gt;&gt;</strong>
      <span>writer: exclusive updates</span>
      <span>reader: short snapshot lock</span>
      <b>Arc&lt;AtomicBool&gt; shutdown</b>
    </aside>
  );
}

export default function WhaleTrackerDiagram({ diagram }: WhaleTrackerDiagramProps) {
  if (diagram === "whale-enrichment-report") return <EnrichmentReport />;
  if (diagram === "whale-runtime-resilience") return <RuntimeResilience />;
  return <LiveIngestion />;
}
