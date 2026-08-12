import type { ProjectDiagramId } from "../../data/projects";

type DisciplineDiagramProps = {
  diagram: ProjectDiagramId;
};

function DiagramArrow({ label }: { label: string }) {
  return (
    <div className="discipline-arrow">
      <span>{label}</span>
      <i aria-hidden="true" />
    </div>
  );
}

function ExecutionLoop() {
  return (
    <div className="commandant-diagram discipline-diagram discipline-diagram--execution">
      <header className="commandant-diagram-heading">
        <div>
          <span>01 / Product loop</span>
          <h3>A small system for the day.</h3>
        </div>
        <p>Recurring actions replace an endless, passive backlog.</p>
      </header>

      <div className="discipline-execution-flow" aria-label="DisciplineOS daily execution loop">
        <section className="discipline-panel discipline-panel--input">
          <div className="discipline-panel-label">
            <span>01</span>
            <small>Define</small>
          </div>
          <h4>One focused input</h4>
          <ul>
            <li><span>Task</span><b>required</b></li>
            <li><span>Details</span><b>optional</b></li>
            <li><span>Reminder time</span><b>optional</b></li>
            <li><span>Time block</span><b>required</b></li>
          </ul>
        </section>

        <DiagramArrow label="route" />

        <section className="discipline-panel discipline-panel--blocks">
          <div className="discipline-panel-label">
            <span>02</span>
            <small>Execute</small>
          </div>
          <h4>The whole day, one screen</h4>
          <div className="discipline-time-blocks">
            <article><i>◐</i><span>Morning</span><small>6am–12pm</small></article>
            <article><i>●</i><span>Midday</span><small>12pm–5pm</small></article>
            <article><i>◑</i><span>Evening</span><small>5pm onwards</small></article>
            <article><i>◌</i><span>Weekly</span><small>this week</small></article>
          </div>
        </section>

        <DiagramArrow label="complete" />

        <section className="discipline-panel discipline-panel--feedback">
          <div className="discipline-panel-label">
            <span>03</span>
            <small>Feedback</small>
          </div>
          <div className="discipline-progress-demo">
            <span><strong>5</strong>/7</span>
            <small>keep going</small>
            <i><b /></i>
          </div>
          <div className="discipline-completion-state">
            <span>✓</span>
            <div>
              <strong>Completion confirmed</strong>
              <small>visible for 5 seconds</small>
            </div>
          </div>
          <p>Then the finished task leaves the active view while progress remains accurate.</p>
        </section>
      </div>

      <div className="discipline-result-strip">
        <span>Per-block progress</span>
        <i aria-hidden="true" />
        <span>Global progress</span>
        <i aria-hidden="true" />
        <strong>Everything done for today</strong>
      </div>
    </div>
  );
}

function ResetLane({
  type,
  marker,
  scope,
  accent = false,
}: {
  type: string;
  marker: string;
  scope: string;
  accent?: boolean;
}) {
  return (
    <article className={`discipline-reset-lane ${accent ? "discipline-reset-lane--accent" : ""}`}>
      <header>
        <span>{type}</span>
        <small>{marker}</small>
      </header>
      <div>
        <span>01</span>
        <strong>Compare marker</strong>
        <small>current value ≠ last reset</small>
      </div>
      <i aria-hidden="true" />
      <div>
        <span>02</span>
        <strong>Reset completion</strong>
        <small>{scope}</small>
      </div>
      <i aria-hidden="true" />
      <div>
        <span>03</span>
        <strong>Commit new marker</strong>
        <small>write only after task update</small>
      </div>
    </article>
  );
}

function ResetEngine() {
  return (
    <div className="commandant-diagram discipline-diagram discipline-diagram--reset">
      <header className="commandant-diagram-heading">
        <div>
          <span>02 / Rust reset engine</span>
          <h3>The routine renews itself.</h3>
        </div>
        <p>Date and ISO-week checks survive normal use and suspend/resume.</p>
      </header>

      <div className="discipline-reset-triggers" aria-label="DisciplineOS reset check triggers">
        <article><span>Application startup</span><small>immediate check</small></article>
        <article><span>Every task command</span><small>read · save · update · remove</small></article>
        <article><span>Background loop</span><small>every 30 seconds</small></article>
        <i aria-hidden="true" />
        <strong>ensure_resets_are_current()</strong>
      </div>

      <div className="discipline-reset-lanes">
        <ResetLane
          type="Daily lane"
          marker="YYYY-MM-DD"
          scope="morning · midday · evening"
          accent
        />
        <ResetLane
          type="Weekly lane"
          marker="ISO YEAR-WEEK"
          scope="weekly tasks only"
        />
      </div>

      <div className="discipline-reset-facts">
        <span><b>30s</b> monitor interval</span>
        <span><b>2</b> independent reset markers</span>
        <span><b>0</b> cloud schedulers</span>
        <strong>Local time → scoped reset → atomic write</strong>
      </div>
    </div>
  );
}

function PersistenceNode({
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
    <article className={`discipline-persistence-node ${accent ? "discipline-persistence-node--accent" : ""}`}>
      <div><span>{index}</span><small>{eyebrow}</small></div>
      <strong>{title}</strong>
      <p>{detail}</p>
    </article>
  );
}

function LocalPersistence() {
  return (
    <div className="commandant-diagram discipline-diagram discipline-diagram--persistence">
      <header className="commandant-diagram-heading">
        <div>
          <span>03 / Data boundary</span>
          <h3>Local state, committed safely.</h3>
        </div>
        <p>No account, application server, database service, or sync layer.</p>
      </header>

      <div className="discipline-persistence-flow" aria-label="DisciplineOS persistence flow">
        <PersistenceNode
          index="01"
          eyebrow="React 19"
          title="Daily interface"
          detail="Task forms, time blocks, ordering, and progress"
        />
        <DiagramArrow label="invoke" />
        <PersistenceNode
          index="02"
          eyebrow="Tauri 2"
          title="Typed commands"
          detail="get · save · update · remove"
        />
        <DiagramArrow label="Rust" />
        <PersistenceNode
          index="03"
          eyebrow="Domain layer"
          title="Validate + mutate"
          detail="Reset checks run before every task operation"
          accent
        />
        <DiagramArrow label="write" />
        <PersistenceNode
          index="04"
          eyebrow="App data"
          title="Atomic JSON store"
          detail="Temporary file replaces tasks.json only after a full write"
        />
      </div>

      <div className="discipline-file-commit">
        <section>
          <small>Write phase</small>
          <strong>tasks.tmp.json</strong>
          <span>pretty-serialized task array</span>
        </section>
        <div><span>fs::write</span><i aria-hidden="true" /><b>fs::rename</b></div>
        <section className="discipline-file-commit__final">
          <small>Active store</small>
          <strong>tasks.json</strong>
          <span>complete replacement, never partial append</span>
        </section>
      </div>

      <div className="commandant-privacy-strip discipline-privacy-strip">
        <span><i aria-hidden="true" /> No backend</span>
        <span><i aria-hidden="true" /> No account</span>
        <span><i aria-hidden="true" /> No cloud database</span>
        <strong>React → Tauri → Rust → Local file</strong>
      </div>
    </div>
  );
}

export default function DisciplineDiagram({ diagram }: DisciplineDiagramProps) {
  if (diagram === "discipline-reset-engine") return <ResetEngine />;
  if (diagram === "discipline-local-persistence") return <LocalPersistence />;
  return <ExecutionLoop />;
}
