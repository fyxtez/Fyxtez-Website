import "./MacroImpactDiagram.css";
function PipelineStage({
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
    <article className={`macro-impact-stage ${accent ? "macro-impact-stage--accent" : ""}`}>
      <div>
        <span>{index}</span>
        <small>{eyebrow}</small>
      </div>
      <strong>{title}</strong>
      <p>{detail}</p>
    </article>
  );
}

const reactionWindows = [
  ["t0", "Baseline"],
  ["+20s", "Instant"],
  ["+1m", "Immediate"],
  ["+5m", "Short"],
  ["+1h", "Headline"],
  ["+12h", "Follow-through"],
];

export default function MacroImpactDiagram() {
  return (
    <div className="commandant-diagram macro-impact-diagram">
      <header className="commandant-diagram-heading">
        <div>
          <span>03 / Evidence pipeline</span>
          <h3>Line the release up with the tape.</h3>
        </div>
        <p>Every horizon is anchored to the first real aggregated trade at or after its target time.</p>
      </header>

      <div className="macro-impact-source-strip" aria-label="BTC News Impact data sources and runtime">
        <span><small>Event source</small><strong>JSON history</strong></span>
        <span><small>Selection</small><strong>9 macro categories</strong></span>
        <span><small>Market source</small><strong>Binance aggTrades</strong></span>
        <span><small>Runtime</small><strong>Bounded Tokio concurrency</strong></span>
      </div>

      <div className="macro-impact-flow" aria-label="Macro event to market reaction pipeline">
        <PipelineStage
          index="01"
          eyebrow="Normalizer"
          title="Flatten the feed"
          detail="Keep real messages, flatten Telegram rich text, parse timestamps, and restore chronological order."
        />
        <PipelineStage
          index="02"
          eyebrow="Keyword gate"
          title="Select macro events"
          detail="Whole-word matching finds FOMC, Fed, inflation, labor, CPI, PCE, and PPI releases without duplicating a message."
        />
        <PipelineStage
          index="03"
          eyebrow="Evidence model"
          title="Score the context"
          detail="Classify release type and source authority, assign importance, flag noise, and mark likely actionable events."
          accent
        />
        <PipelineStage
          index="04"
          eyebrow="Market alignment"
          title="Measure the reaction"
          detail="Fetch the baseline and five future prices, then compute signed percentage change and direction for every window."
        />
      </div>

      <section className="macro-impact-timeline" aria-label="Market reaction measurement windows">
        <header>
          <div>
            <small>Reaction windows</small>
            <strong>First trade at or after each timestamp</strong>
          </div>
          <code>(price_after − baseline) / baseline × 100</code>
        </header>
        <div className="macro-impact-window-grid">
          {reactionWindows.map(([time, label], index) => (
            <article key={time} className={index === 0 ? "is-baseline" : ""}>
              <span>{time}</span>
              <i aria-hidden="true" />
              <small>{label}</small>
            </article>
          ))}
        </div>
        <p>
          The lookup window expands only when no trade is found. Missing market data remains null instead of becoming a fabricated observation.
        </p>
      </section>

      <div className="macro-impact-output-grid">
        <section>
          <header><span>Incremental analyzer</span><small>Rust CLI</small></header>
          <div className="macro-impact-runtime-steps">
            <span><b>01</b> Reuse prior results by message ID</span>
            <span><b>02</b> Fetch only unseen candidates</span>
            <span><b>03</b> Back off on exchange rate limits</span>
          </div>
        </section>
        <section className="macro-impact-output-grid__accent">
          <header><span>Research artifact</span><small>analysis_output.json</small></header>
          <div className="macro-impact-view-grid">
            <span>Category filters</span>
            <span>Search + sort</span>
            <span>Quality gates</span>
            <span>Multi-horizon bars</span>
          </div>
        </section>
      </div>

      <div className="macro-impact-privacy-strip">
        <span><i aria-hidden="true" /> Local event history</span>
        <span><i aria-hidden="true" /> Public market endpoint</span>
        <span><i aria-hidden="true" /> Deterministic output</span>
        <strong>Private dataset stays outside the portfolio</strong>
      </div>
    </div>
  );
}
