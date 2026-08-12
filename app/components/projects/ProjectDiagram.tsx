"use client";

import dynamic from "next/dynamic";
import type { ProjectDiagramId } from "../../data/projects";

function DiagramLoadingState() {
  return (
    <div className="diagram-loading-state" role="status" aria-live="polite">
      Loading architecture view…
    </div>
  );
}

const DisciplineDiagram = dynamic(() => import("./DisciplineDiagram"), {
  loading: DiagramLoadingState,
});
const MacroImpactDiagram = dynamic(() => import("./MacroImpactDiagram"), {
  loading: DiagramLoadingState,
});
const MordexelDiagram = dynamic(() => import("./MordexelDiagram"), {
  loading: DiagramLoadingState,
});
const SolanaToolsDiagram = dynamic(() => import("./SolanaToolsDiagram"), {
  loading: DiagramLoadingState,
});
const StrategyDashboardDiagram = dynamic(
  () => import("./StrategyDashboardDiagram"),
  { loading: DiagramLoadingState },
);
const TelegramIntelligenceDiagram = dynamic(
  () => import("./TelegramIntelligenceDiagram"),
  { loading: DiagramLoadingState },
);
const TelegramNotifyDiagram = dynamic(
  () => import("./TelegramNotifyDiagram"),
  { loading: DiagramLoadingState },
);
const WhaleTrackerDiagram = dynamic(() => import("./WhaleTrackerDiagram"), {
  loading: DiagramLoadingState,
});
const YouTubeWatcherDiagram = dynamic(
  () => import("./YouTubeWatcherDiagram"),
  { loading: DiagramLoadingState },
);
const VoitodoDiagram = dynamic(() => import("./VoitodoDiagram"), {
  loading: DiagramLoadingState,
});

type ProjectDiagramProps = {
  diagram: ProjectDiagramId;
};

type DiagramNodeProps = {
  index: string;
  eyebrow: string;
  title: string;
  detail: string;
  accent?: boolean;
};

function DiagramNode({ index, eyebrow, title, detail, accent = false }: DiagramNodeProps) {
  return (
    <article className={`commandant-node ${accent ? "commandant-node--accent" : ""}`}>
      <div>
        <span>{index}</span>
        <small>{eyebrow}</small>
      </div>
      <strong>{title}</strong>
      <p>{detail}</p>
    </article>
  );
}

function FlowLink({ label, stream = false }: { label: string; stream?: boolean }) {
  return (
    <div className={`commandant-flow-link ${stream ? "commandant-flow-link--stream" : ""}`}>
      <span>{label}</span>
      <i aria-hidden="true" />
    </div>
  );
}

function ControlPath() {
  return (
    <div className="commandant-diagram commandant-diagram--control">
      <header className="commandant-diagram-heading">
        <div>
          <span>01 / Command execution</span>
          <h3>One tap. One restricted action.</h3>
        </div>
        <p>Fresh connection for every standard operation.</p>
      </header>

      <div className="commandant-main-flow" aria-label="Commandant control flow">
        <DiagramNode
          index="01"
          eyebrow="Android"
          title="React UI"
          detail="Start, stop, restart, status or logs"
        />
        <FlowLink label="invoke" />
        <DiagramNode
          index="02"
          eyebrow="Tauri"
          title="Command bridge"
          detail="Typed request crosses the app boundary"
        />
        <FlowLink label="validate" />
        <DiagramNode
          index="03"
          eyebrow="Rust"
          title="Command gate"
          detail="Allow-list action and load host preset"
          accent
        />
        <FlowLink label="russh" />
        <DiagramNode
          index="04"
          eyebrow="SSH"
          title="Fresh session"
          detail="Private-key auth with inactivity timeout"
        />
        <FlowLink label="systemctl" />
        <DiagramNode
          index="05"
          eyebrow="Linux host"
          title="systemd"
          detail="Execute one command and return its result"
        />
      </div>

      <div className="commandant-operation-strip">
        <div>
          <small>Allowed operations</small>
          <strong>start&nbsp;&nbsp; stop&nbsp;&nbsp; restart&nbsp;&nbsp; is-active&nbsp;&nbsp; journalctl</strong>
        </div>
        <div className="commandant-session-cycle" aria-label="Session lifecycle">
          <span>Connect</span>
          <i aria-hidden="true" />
          <span>Execute</span>
          <i aria-hidden="true" />
          <span>Disconnect</span>
        </div>
      </div>

      <div className="commandant-fact-grid">
        <article>
          <small>Status refresh</small>
          <strong>On launch + every 10 minutes</strong>
        </article>
        <article>
          <small>Normal action</small>
          <strong>No persistent SSH connection</strong>
        </article>
        <article>
          <small>Remote scope</small>
          <strong>No arbitrary shell interface</strong>
        </article>
      </div>
    </div>
  );
}

function LiveLogs() {
  return (
    <div className="commandant-diagram commandant-diagram--logs">
      <header className="commandant-diagram-heading">
        <div>
          <span>02 / Streaming path</span>
          <h3>journalctl, live in the user&apos;s hand.</h3>
        </div>
        <p>A dedicated channel exists only while the viewer is open.</p>
      </header>

      <div className="commandant-main-flow commandant-main-flow--logs" aria-label="Commandant live log flow">
        <DiagramNode
          index="01"
          eyebrow="React UI"
          title="Open live logs"
          detail="Choose a mapped service"
        />
        <FlowLink label="start" stream />
        <DiagramNode
          index="02"
          eyebrow="Rust task"
          title="Stream owner"
          detail="Own the channel and stop signal"
          accent
        />
        <FlowLink label="SSH" stream />
        <DiagramNode
          index="03"
          eyebrow="Remote host"
          title="journalctl -f"
          detail="Begin with the latest 50 lines"
        />
        <FlowLink label="event" stream />
        <DiagramNode
          index="04"
          eyebrow="Tauri events"
          title="Log viewer"
          detail="Simple or full output mode"
        />
      </div>

      <div className="commandant-log-terminal" aria-label="Example live log event stream">
        <div className="commandant-log-terminal__bar">
          <span>LIVE / service-unit.service</span>
          <b><i aria-hidden="true" /> streaming</b>
        </div>
        <p><span>21:42:07</span> service-unit[8421]: worker cycle completed</p>
        <p><span>21:42:08</span> service-unit[8421]: waiting for next event</p>
        <p><span>21:42:11</span> service-unit[8421]: event received · processing</p>
      </div>

      <div className="commandant-stop-path">
        <span>Close viewer</span>
        <i aria-hidden="true" />
        <span>one-shot stop signal</span>
        <i aria-hidden="true" />
        <strong>SSH disconnect</strong>
      </div>
    </div>
  );
}

function LocalFirst() {
  return (
    <div className="commandant-diagram commandant-diagram--local">
      <header className="commandant-diagram-heading">
        <div>
          <span>03 / Local-first model</span>
          <h3>The phone is the control plane.</h3>
        </div>
        <p>Single-user infrastructure control without an application server.</p>
      </header>

      <div className="commandant-local-layout" aria-label="Commandant local-first architecture">
        <section className="commandant-storage-card">
          <div className="commandant-card-label">
            <span>Android app-private storage</span>
            <small>commandant.json</small>
          </div>
          <ul>
            <li><span>Host presets</span><b>host · port · user</b></li>
            <li><span>SSH configuration</span><b>private key</b></li>
            <li><span>Service map</span><b>unit → preset</b></li>
            <li><span>Action history</span><b>latest 20 / service</b></li>
          </ul>
        </section>

        <div className="commandant-local-bridge">
          <div className="commandant-phone-boundary">
            <small>On-device boundary</small>
            <strong>React + Tauri + Rust</strong>
            <span>read preset</span>
            <span>validate action</span>
            <span>open SSH</span>
          </div>
          <i aria-hidden="true" />
          <small>private-key SSH</small>
        </div>

        <section className="commandant-host-card">
          <div className="commandant-card-label">
            <span>Remote Linux hosts</span>
            <small>multiple presets</small>
          </div>
          <div className="commandant-host-rack">
            <article><i aria-hidden="true" /><span>Host 01</span><b>systemd</b></article>
            <article><i aria-hidden="true" /><span>Host 02</span><b>systemd</b></article>
            <article><i aria-hidden="true" /><span>Host 03</span><b>systemd</b></article>
          </div>
        </section>
      </div>

      <div className="commandant-privacy-strip">
        <span><i aria-hidden="true" /> No backend server</span>
        <span><i aria-hidden="true" /> No cloud sync</span>
        <span><i aria-hidden="true" /> No telemetry</span>
        <strong>Device → SSH → Host</strong>
      </div>
    </div>
  );
}

export default function ProjectDiagram({ diagram }: ProjectDiagramProps) {
  if (diagram === "btc-news-impact-architecture") {
    return <MacroImpactDiagram />;
  }
  if (diagram.startsWith("voitodo-")) {
    return <VoitodoDiagram diagram={diagram} />;
  }
  if (diagram === "youtube-release-watcher") {
    return <YouTubeWatcherDiagram />;
  }
  if (diagram.startsWith("telegram-") && diagram !== "telegram-notify-flow") {
    return <TelegramIntelligenceDiagram diagram={diagram} />;
  }
  if (diagram === "telegram-notify-flow") {
    return <TelegramNotifyDiagram />;
  }
  if (diagram === "solana-utility-flow") {
    return <SolanaToolsDiagram />;
  }
  if (diagram === "strategy-research-architecture") {
    return <StrategyDashboardDiagram />;
  }
  if (diagram.startsWith("mordexel-")) {
    return <MordexelDiagram diagram={diagram} />;
  }
  if (diagram.startsWith("whale-")) {
    return <WhaleTrackerDiagram diagram={diagram} />;
  }
  if (diagram.startsWith("discipline-")) {
    return <DisciplineDiagram diagram={diagram} />;
  }
  if (diagram === "commandant-live-logs") return <LiveLogs />;
  if (diagram === "commandant-local-first") return <LocalFirst />;
  return <ControlPath />;
}
