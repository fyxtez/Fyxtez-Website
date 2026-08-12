import type { ProjectDiagramId } from "../../data/projects";

type VoitodoDiagramProps = {
  diagram: ProjectDiagramId;
};

type FlowNodeProps = {
  index: string;
  eyebrow: string;
  title: string;
  detail: string;
  accent?: boolean;
};

function FlowNode({ index, eyebrow, title, detail, accent = false }: FlowNodeProps) {
  return (
    <article className={`voitodo-node ${accent ? "voitodo-node--accent" : ""}`}>
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
    <div className="voitodo-link" aria-hidden="true">
      <span>{label}</span>
      <i />
    </div>
  );
}

function VoiceCommandPath() {
  return (
    <div className="commandant-diagram voitodo-diagram voitodo-diagram--voice">
      <header className="commandant-diagram-heading">
        <div>
          <span>01 / Native voice command path</span>
          <h3>Speak it. Parse it. Change the list.</h3>
        </div>
        <p>Platform speech recognition with a small, explicit Rust command surface.</p>
      </header>

      <section className="voitodo-runtime" aria-label="Voice runtime boundaries">
        <div>
          <small>App surface</small>
          <strong>React + Tauri 2</strong>
        </div>
        <span><b>Native</b> Android speech API</span>
        <span><b>JNI</b> typed bridge</span>
        <span><b>Rust</b> command ownership</span>
      </section>

      <div className="voitodo-flow" aria-label="Voice command execution flow">
        <FlowNode
          index="01"
          eyebrow="React UI"
          title="Tap to speak"
          detail="Start one recognition session and expose its live status."
        />
        <FlowLink label="invoke" />
        <FlowNode
          index="02"
          eyebrow="Tauri command"
          title="Open native speech"
          detail="Reject overlapping sessions, then call the Android activity."
        />
        <FlowLink label="JVM" />
        <FlowNode
          index="03"
          eyebrow="SpeechRecognizer"
          title="Capture transcript"
          detail="Let Android own microphone input and recognition lifecycle."
          accent
        />
        <FlowLink label="JNI" />
        <FlowNode
          index="04"
          eyebrow="Rust parser"
          title="Resolve intent"
          detail="Normalize speech and bound it to add, complete, or remove."
        />
        <FlowLink label="apply" />
        <FlowNode
          index="05"
          eyebrow="Task store"
          title="Persist change"
          detail="Mutate the active list, save JSON, and return typed events."
        />
      </div>

      <section className="voitodo-command-strip" aria-label="Supported voice commands">
        <header>
          <span>Bounded grammar</span>
          <strong>No arbitrary action execution</strong>
        </header>
        <div>
          <article><span>ADD</span><strong>“Add task music”</strong></article>
          <article><span>COMPLETE</span><strong>By number or fuzzy text</strong></article>
          <article><span>REMOVE</span><strong>By number or best match</strong></article>
        </div>
      </section>

      <footer className="voitodo-return-path">
        <span><i /> voice-status</span>
        <span><i /> voice-command</span>
        <span><i /> tasks-changed</span>
        <strong>Rust events → React state</strong>
      </footer>
    </div>
  );
}

function DailyLifecycle() {
  return (
    <div className="commandant-diagram voitodo-diagram voitodo-diagram--daily">
      <header className="commandant-diagram-heading">
        <div>
          <span>02 / Local daily lifecycle</span>
          <h3>Routine persists. Today starts clean.</h3>
        </div>
        <p>One local file, one date boundary, and no account or application server.</p>
      </header>

      <section className="voitodo-store" aria-label="Local task store model">
        <header>
          <div>
            <span>tasks.json</span>
            <strong>TaskStore</strong>
          </div>
          <small>APP DATA DIRECTORY</small>
        </header>
        <div>
          <article>
            <span>01 / Baseline</span>
            <strong>routine_tasks</strong>
            <p>Reusable tasks that should return at the start of a new local day.</p>
          </article>
          <article className="voitodo-store__accent">
            <span>02 / Today</span>
            <strong>active_tasks</strong>
            <p>The working list shown in React and changed by voice or swipe.</p>
          </article>
          <article>
            <span>03 / Boundary</span>
            <strong>last_reset_date</strong>
            <p>A local YYYY-MM-DD marker prevents duplicate daily restoration.</p>
          </article>
        </div>
      </section>

      <div className="voitodo-daily-flow" aria-label="Daily reset flow">
        <FlowNode
          index="01"
          eyebrow="Startup + 30s"
          title="Read local date"
          detail="React sends the device's current calendar date."
        />
        <FlowLink label="compare" />
        <FlowNode
          index="02"
          eyebrow="Date gate"
          title="Check reset marker"
          detail="Keep today's list when the stored marker still matches."
          accent
        />
        <FlowLink label="new day" />
        <FlowNode
          index="03"
          eyebrow="Reset"
          title="Clone the routine"
          detail="Replace active tasks with the persistent routine baseline."
        />
        <FlowLink label="commit" />
        <FlowNode
          index="04"
          eyebrow="Tauri event"
          title="Refresh the view"
          detail="Save once, then emit the complete updated task list."
        />
      </div>

      <section className="voitodo-interactions">
        <article>
          <span>VOICE ADD</span>
          <strong>Routine + active</strong>
          <p>A new spoken task becomes part of both today&apos;s list and future resets.</p>
        </article>
        <article className="voitodo-interactions__accent">
          <span>SWIPE COMPLETE</span>
          <strong>Active only</strong>
          <p>A 110px gesture removes today&apos;s instance while preserving the routine.</p>
        </article>
        <article>
          <span>OLD FORMAT</span>
          <strong>Migration path</strong>
          <p>A previous Vec&lt;Todo&gt; file is upgraded into the current TaskStore model.</p>
        </article>
      </section>

      <footer className="voitodo-return-path">
        <span><i /> Local JSON</span>
        <span><i /> Daily reset</span>
        <span><i /> Event-driven UI</span>
        <strong>No cloud account required</strong>
      </footer>
    </div>
  );
}

export default function VoitodoDiagram({ diagram }: VoitodoDiagramProps) {
  return diagram === "voitodo-daily-lifecycle" ? <DailyLifecycle /> : <VoiceCommandPath />;
}
