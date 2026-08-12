import type { ProjectDiagramId } from "../../data/projects";

type MordexelDiagramProps = {
  diagram: ProjectDiagramId;
};

function FlowLink({ label }: { label: string }) {
  return (
    <div className="mordexel-link">
      <span>{label}</span>
      <i aria-hidden="true" />
    </div>
  );
}

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
    <article className={`mordexel-node ${accent ? "mordexel-node--accent" : ""}`}>
      <div><span>{index}</span><small>{eyebrow}</small></div>
      <strong>{title}</strong>
      <p>{detail}</p>
    </article>
  );
}

function SignalPipeline() {
  return (
    <div className="commandant-diagram mordexel-diagram mordexel-diagram--pipeline">
      <header className="commandant-diagram-heading">
        <div>
          <span>01 / Governed ingress</span>
          <h3>Private signal in. Explicit decision out.</h3>
        </div>
        <p>Signal generation stays outside the public system boundary.</p>
      </header>

      <div className="mordexel-trust-boundary">
        <section>
          <small>External private system</small>
          <strong>Signal generation</strong>
          <span>strategy and source intentionally undisclosed</span>
        </section>
        <div aria-hidden="true"><i /><span>Bearer-authenticated handoff</span><i /></div>
        <section className="mordexel-trust-boundary__engine">
          <small>Mordexel starts here</small>
          <strong>Authorized ingress</strong>
          <span>source · external id · raw trade text</span>
        </section>
      </div>

      <div className="mordexel-pipeline-flow" aria-label="Mordexel signal decision pipeline">
        <PipelineNode
          index="01"
          eyebrow="IngressEvent"
          title="Normalize event"
          detail="Move the accepted payload into a bounded Tokio channel"
        />
        <FlowLink label="parse" />
        <PipelineNode
          index="02"
          eyebrow="Builder"
          title="Create TradeIntent"
          detail="Sanitize, parse, validate required fields, and assign an intent ID"
        />
        <FlowLink label="evaluate" />
        <PipelineNode
          index="03"
          eyebrow="Policy gate"
          title="Apply execution policy"
          detail="Check permitted market scope and active execution windows"
          accent
        />
        <FlowLink label="route" />
        <PipelineNode
          index="04"
          eyebrow="Decision"
          title="Approved or rejected"
          detail="Separate executable work from structured rejection reasons"
        />
      </div>

      <div className="mordexel-decision-routes">
        <article>
          <span><i aria-hidden="true" /> ApprovedTrade</span>
          <strong>Execution channel</strong>
          <small>continue into sizing and exchange execution</small>
        </article>
        <article>
          <span><i aria-hidden="true" /> RejectedTrade</span>
          <strong>Observable rejection</strong>
          <small>retain intent ID, market context, and rejection category</small>
        </article>
      </div>

      <div className="mordexel-runtime-strip">
        <span>Bounded mpsc stages</span>
        <span>Independent Tokio workers</span>
        <span>Intent-level tracing</span>
        <strong>Ingress → build → evaluate → route</strong>
      </div>
    </div>
  );
}

function SizingInput({
  label,
  title,
  items,
}: {
  label: string;
  title: string;
  items: string[];
}) {
  return (
    <article className="mordexel-sizing-input">
      <small>{label}</small>
      <strong>{title}</strong>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}

function SizingEngine() {
  const calculations = [
    ["01", "Stop distance", "absolute(entry − stop) / entry"],
    ["02", "Allocated margin", "portfolio equity × configured share"],
    ["03", "Effective leverage", "distance cap × safety, bounded by exchange"],
    ["04", "Raw quantity", "allocated notional / entry price"],
    ["05", "Exchange fit", "step-size rounding + minimum checks"],
  ];

  return (
    <div className="commandant-diagram mordexel-diagram mordexel-diagram--sizing">
      <header className="commandant-diagram-heading">
        <div>
          <span>02 / Constraint-aware sizing</span>
          <h3>Risk becomes an executable quantity.</h3>
        </div>
        <p>No order is built from signal size alone.</p>
      </header>

      <div className="mordexel-sizing-layout" aria-label="Mordexel position sizing engine">
        <div className="mordexel-sizing-inputs">
          <SizingInput
            label="TradeIntent"
            title="Market geometry"
            items={["entry price", "stop-loss price", "direction + symbol"]}
          />
          <SizingInput
            label="Account state"
            title="Portfolio boundary"
            items={["wallet equity", "configured margin share", "local leverage cap"]}
          />
          <SizingInput
            label="Exchange metadata"
            title="Tradable constraints"
            items={["leverage bracket", "quantity step + minimum", "tick + minimum notional"]}
          />
        </div>

        <div className="mordexel-calculation-rail">
          {calculations.map(([index, title, detail]) => (
            <article key={index}>
              <span>{index}</span>
              <div><strong>{title}</strong><small>{detail}</small></div>
              <i aria-hidden="true" />
            </article>
          ))}
        </div>

        <aside className="mordexel-execution-plan">
          <small>Validated output</small>
          <h4>ExecutionPlan</h4>
          <div><span>quantity</span><strong>rounded to step</strong></div>
          <div><span>leverage</span><strong>safely capped</strong></div>
          <ul>
            <li>quantity remains positive</li>
            <li>minimum quantity is satisfied</li>
            <li>minimum notional is satisfied</li>
            <li>required margin stays allocated</li>
          </ul>
          <b>Only then can execution begin</b>
        </aside>
      </div>

      <div className="mordexel-sizing-footer">
        <span>Exchange minimums may increase quantity</span>
        <span>Margin verification runs again after rounding</span>
        <strong>Reject the plan if the adjusted order exceeds its boundary</strong>
      </div>
    </div>
  );
}

function OrderLifecycle() {
  return (
    <div className="commandant-diagram mordexel-diagram mordexel-diagram--orders">
      <header className="commandant-diagram-heading">
        <div>
          <span>03 / Exchange execution</span>
          <h3>A position is assembled in guarded stages.</h3>
        </div>
        <p>Every exchange request keeps the same traceable intent context.</p>
      </header>

      <div className="mordexel-transport-strip">
        <span><small>Transport</small><strong>HMAC-SHA256 signed REST</strong></span>
        <span><small>Freshness</small><strong>timestamp + receive window</strong></span>
        <span><small>Environment</small><strong>demo / live selected at boot</strong></span>
        <b>Binance USDⓈ-M Futures</b>
      </div>

      <div className="mordexel-order-flow" aria-label="Mordexel protected order lifecycle">
        <PipelineNode
          index="01"
          eyebrow="Account config"
          title="Set leverage"
          detail="Apply the leverage selected by the validated execution plan"
        />
        <FlowLink label="confirm" />
        <PipelineNode
          index="02"
          eyebrow="Entry"
          title="Market order"
          detail="Open the approved side using the exchange-rounded quantity"
          accent
        />
        <FlowLink label="protect" />
        <PipelineNode
          index="03"
          eyebrow="Risk exit"
          title="Full-position stop"
          detail="Place an opposite-side stop-market order against mark price"
        />
        <FlowLink label="target" />
        <PipelineNode
          index="04"
          eyebrow="Profit exit"
          title="Reduce-only target"
          detail="Resolve the active TP strategy and submit rounded limit exits"
        />
      </div>

      <div className="mordexel-order-contracts">
        <article><small>Entry</small><strong>MARKET</strong><span>planned quantity</span></article>
        <article><small>Protection</small><strong>STOP_MARKET</strong><span>close full position</span></article>
        <article><small>Target</small><strong>LIMIT · GTC</strong><span>reduce only</span></article>
        <article><small>Precision</small><strong>Tick + step aware</strong><span>side-aware rounding</span></article>
      </div>

      <div className="mordexel-failure-path">
        <span>Exchange error</span>
        <i aria-hidden="true" />
        <span>halt remaining submissions</span>
        <i aria-hidden="true" />
        <span>record intent + stage + response</span>
        <strong>Explicit failure, never silent continuation</strong>
      </div>
    </div>
  );
}

export default function MordexelDiagram({ diagram }: MordexelDiagramProps) {
  if (diagram === "mordexel-sizing-engine") return <SizingEngine />;
  if (diagram === "mordexel-order-lifecycle") return <OrderLifecycle />;
  return <SignalPipeline />;
}
