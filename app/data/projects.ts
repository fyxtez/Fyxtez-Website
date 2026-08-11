export type ProjectImage = {
  src: string;
  alt: string;
  label: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  href: string | null;
  linkLabel: string | null;
  access: string;
  featured: boolean;
  images: ProjectImage[];
};

export const projects: Project[] = [
  {
    slug: "fyxtez-terminal",
    title: "Fyxtez Terminal",
    category: "Trading product",
    description:
      "A focused crypto futures terminal with live charts, persistent drawing systems, risk-aware sizing, order execution, and a workflow shaped around active decision-making.",
    tags: ["Rust", "Axum", "React", "WebSockets"],
    href: "https://demo.terminal.fyxtez.com",
    linkLabel: "Open public demo",
    access: "Public demo · Private production",
    featured: true,
    images: [
      {
        src: "/projects/fyxtez-terminal/02-demo-overview.png",
        alt: "Fyxtez Terminal public demo landing screen",
        label: "Public demo",
        caption:
          "A no-funds public demo built to present the terminal workflow without exposing private execution infrastructure.",
      },
      {
        src: "/projects/fyxtez-terminal/01-live-workspace.png",
        alt: "Fyxtez Terminal live chart, position data, and order controls",
        label: "Live trading workspace",
        caption:
          "Chart context, active position data, order controls, and risk information in one focused workspace.",
      },
      {
        src: "/projects/fyxtez-terminal/03-chart-analysis.png",
        alt: "Fyxtez Terminal chart with persistent technical drawings",
        label: "Persistent analysis",
        caption:
          "Custom chart drawings and annotations remain attached to market time and price while the workspace changes.",
      },
      {
        src: "/projects/fyxtez-terminal/04-market-view.png",
        alt: "Fyxtez Terminal real-time market chart and settings panel",
        label: "Market workspace",
        caption:
          "A responsive real-time market view with granular risk, margin, drawing, and display configuration.",
      },
      {
        src: "/projects/fyxtez-terminal/05-workspace-controls.png",
        alt: "Fyxtez Terminal keyboard shortcuts and display controls",
        label: "Custom controls",
        caption:
          "Keyboard-first chart actions and focused visibility controls keep frequently used operations close at hand.",
      },
    ],
  },
  {
    slug: "aegis",
    title: "Aegis",
    category: "AI trading assistant",
    description:
      "A local-first Linux desktop assistant for Binance, combining AI orchestration with a Rust boundary that keeps exchange access and credentials on the user's machine.",
    tags: ["Rust", "Tauri", "React", "AI agents", "OpenClaw"],
    href: "https://aegis.fyxtez.com",
    linkLabel: "Visit Aegis",
    access: "Public beta · Open source",
    featured: true,
    images: [
      {
        src: "/projects/aegis/01-account-chat.png",
        alt: "Aegis live assistant showing Binance account information",
        label: "Account-aware assistant",
        caption:
          "Natural-language access to Binance account data through the desktop assistant and its local Rust backend.",
      },
      {
        src: "/projects/aegis/02-installation.png",
        alt: "Aegis guided installation screen",
        label: "Guided installation",
        caption:
          "A complete setup flow prepares the runtime, system dependencies, configuration, desktop integration, and AI agent.",
      },
      {
        src: "/projects/aegis/03-binance-setup.png",
        alt: "Aegis Binance environment and API credentials setup",
        label: "Binance integration",
        caption:
          "Users can configure demo or live environments while the application keeps exchange communication behind a controlled boundary.",
      },
      {
        src: "/projects/aegis/04-credentials-guide.png",
        alt: "Aegis step-by-step Binance credentials guide",
        label: "Credential guidance",
        caption:
          "The product explains permissions and credential setup directly inside the workflow instead of sending users to external documentation.",
      },
      {
        src: "/projects/aegis/05-demo-positions.png",
        alt: "Aegis demo assistant explaining account positions",
        label: "Demo account analysis",
        caption:
          "A safe demonstration environment exposes realistic position and account questions without requiring live funds.",
      },
      {
        src: "/projects/aegis/06-domain-knowledge.png",
        alt: "Aegis answering a Binance Futures question",
        label: "Focused domain knowledge",
        caption:
          "The assistant stays focused on Binance, trading concepts, account operations, and the tools available inside Aegis.",
      },
      {
        src: "/projects/aegis/07-telegram.png",
        alt: "Aegis Telegram connection screen",
        label: "Telegram access",
        caption:
          "Optional Telegram pairing makes the local assistant and its monitoring available away from the desktop interface.",
      },
      {
        src: "/projects/aegis/08-alerts.png",
        alt: "Aegis account alert interface",
        label: "Real-time alerts",
        caption:
          "Severity-aware notifications surface account events and risk-relevant changes from the live exchange stream.",
      },
    ],
  },
  {
    slug: "exchange-positions",
    title: "Exchange Positions",
    category: "Mobile operations",
    description:
      "A private Android companion for monitoring Binance and MEXC positions, normalized account state, ROI, pricing, and connection health from one live view.",
    tags: ["Rust", "Tauri", "Android", "Exchange APIs"],
    href: null,
    linkLabel: null,
    access: "Private · Personal production",
    featured: true,
    images: [
      {
        src: "/projects/exchange-positions/02-multi-exchange.png",
        alt: "Exchange Positions Android app showing Binance and MEXC accounts",
        label: "Multi-exchange overview",
        caption:
          "Binance and MEXC account state is normalized behind one Rust API and presented through a consistent mobile interface.",
      },
      {
        src: "/projects/exchange-positions/01-open-positions.png",
        alt: "Exchange Positions Android app showing Binance positions",
        label: "Open positions",
        caption:
          "A compact mobile view of live positions, entry and current prices, margin, liquidation levels, ROI, and PnL.",
      },
    ],
  },
  {
    slug: "commandant",
    title: "Commandant",
    category: "Infrastructure control",
    description:
      "A phone-first control surface for Linux services: start, stop, restart, inspect logs, and understand operational state in seconds.",
    tags: ["Tauri", "Rust", "React", "systemd"],
    href: null,
    linkLabel: null,
    access: "Private",
    featured: false,
    images: [],
  },
  {
    slug: "telegram-intelligence",
    title: "Telegram Intelligence",
    category: "Information automation",
    description:
      "A collection of high-speed Telegram ingestion and automation systems for message routing, signal capture, extraction, and event-driven actions.",
    tags: ["Rust", "MTProto", "Axum", "Automation"],
    href: null,
    linkLabel: null,
    access: "Private",
    featured: false,
    images: [],
  },
  {
    slug: "voice-trade-terminal",
    title: "Voice Trade Terminal",
    category: "Experimental interface",
    description:
      "A local, low-friction voice interface that turns short spoken commands into structured trading actions with explicit confirmation boundaries.",
    tags: ["Rust", "Whisper", "Audio", "Trading"],
    href: null,
    linkLabel: null,
    access: "Private",
    featured: false,
    images: [],
  },
  {
    slug: "news-latency-lab",
    title: "News Latency Lab",
    category: "Market research",
    description:
      "A research environment for measuring how quickly macro and crypto news propagates into market prices across second-level event windows.",
    tags: ["Rust", "Data pipelines", "Backtesting", "Binance"],
    href: null,
    linkLabel: null,
    access: "Private",
    featured: false,
    images: [],
  },
];
