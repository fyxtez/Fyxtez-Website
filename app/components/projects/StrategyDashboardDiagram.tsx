function PipelineNode({
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
    <article className={`strategy-node ${accent ? "strategy-node--accent" : ""}`}>
      <div>
        <span>{index}</span>
        <small>{eyebrow}</small>
      </div>
      <strong>{title}</strong>
      <p>{detail}</p>
    </article>
  );
}

function FlowLink({ label }: { label: string }) {
  return (
    <div className="strategy-link">
      <span>{label}</span>
      <i aria-hidden="true" />
    </div>
  );
}

export default function StrategyDashboardDiagram() {
  return (
    <div className="commandant-diagram strategy-diagram">
      <header className="commandant-diagram-heading">
        <div>
          <span>05 / Research architecture</span>
          <h3>From message history to research evidence.</h3>
        </div>
        <p>The current live API deliberately keeps a narrow overview-and-trades boundary.</p>
      </header>

      <div className="strategy-source-strip" aria-label="Strategy Dashboard source preparation">
        <span><small>Source</small><strong>Telegram JSON export</strong></span>
        <span><small>Selection</small><strong>Message type + source filter</strong></span>
        <span><small>Time</small><strong>Belgrade local → UTC</strong></span>
        <b>Chronological input</b>
      </div>

      <div className="strategy-pipeline" aria-label="Strategy Dashboard trade reconstruction pipeline">
        <PipelineNode
          index="01"
          eyebrow="Normalizer"
          title="Clean messages"
          detail="Flatten rich text, remove irrelevant records, parse timestamps, and sort the stream"
        />
        <FlowLink label="parse" />
        <PipelineNode
          index="02"
          eyebrow="Domain parser"
          title="Create TradeEvents"
          detail="Recognize new signals, take-profit progress, and stop-loss outcomes"
        />
        <FlowLink label="correlate" />
        <PipelineNode
          index="03"
          eyebrow="Lifecycle builder"
          title="Join the trade path"
          detail="Match events by symbol, timeframe, and entry while preserving their order"
          accent
        />
        <FlowLink label="publish" />
        <PipelineNode
          index="04"
          eyebrow="Typed record"
          title="TradeRecord"
          detail="Store direction, entry, stop, TP timestamps, first outcome, and closure state"
        />
      </div>

      <div className="strategy-system-layout">
        <section className="strategy-system-card strategy-system-card--rust">
          <header><span>Rust / Axum</span><small>Focused runtime boundary</small></header>
          <div className="strategy-system-state">
            <small>Shared state</small>
            <strong>Arc&lt;Vec&lt;TradeRecord&gt;&gt;</strong>
            <span>Current business view filters the active timeframe before serving data.</span>
          </div>
          <div className="strategy-endpoints">
            <span><b>GET</b> /api/overview</span>
            <span><b>GET</b> /api/trades</span>
          </div>
        </section>

        <div className="strategy-api-bridge" aria-hidden="true">
          <span>typed JSON</span>
          <i />
          <b>HTTP</b>
        </div>

        <section className="strategy-system-card strategy-system-card--next">
          <header><span>Next.js / React</span><small>Research workspaces</small></header>
          <div className="strategy-view-grid">
            <span>Overview</span>
            <span>Trade explorer</span>
            <span>Expectancy models</span>
            <span>Symbol analysis</span>
            <span>Path buckets</span>
            <span>Model equity</span>
          </div>
          <p>Aggregate evidence stays connected to inspectable underlying trades.</p>
        </section>
      </div>

      <div className="strategy-contract-strip">
        <span>One event history</span>
        <i aria-hidden="true" />
        <span>One normalized trade model</span>
        <i aria-hidden="true" />
        <span>Multiple research lenses</span>
        <strong>Trace a metric back to the trade lifecycle</strong>
      </div>
    </div>
  );
}
