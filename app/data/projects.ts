export type ProjectImage = {
  src: string;
  alt: string;
  label: string;
  caption: string;
};

export type ProjectDiagramId =
  | "commandant-control-path"
  | "commandant-live-logs"
  | "commandant-local-first"
  | "discipline-execution-loop"
  | "discipline-reset-engine"
  | "discipline-local-persistence"
  | "mordexel-signal-pipeline"
  | "mordexel-sizing-engine"
  | "mordexel-order-lifecycle"
  | "solana-utility-flow"
  | "telegram-fleet-topology"
  | "telegram-signal-pipeline"
  | "telegram-control-plane"
  | "telegram-automation-workers"
  | "telegram-notify-flow"
  | "youtube-release-watcher"
  | "voitodo-voice-command"
  | "voitodo-daily-lifecycle"
  | "strategy-research-architecture"
  | "cabin-control-architecture"
  | "btc-news-impact-architecture"
  | "whale-live-ingestion"
  | "whale-enrichment-report"
  | "whale-runtime-resilience"
  | "weight-tracker-architecture";

export type ProjectView =
  | ({ kind: "image" } & ProjectImage)
  | {
      kind: "diagram";
      diagram: ProjectDiagramId;
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
  views?: ProjectView[];
};

export function getProjectViews(project: Project): ProjectView[] {
  const imageViews = project.images.map((image) => ({
    kind: "image" as const,
    ...image,
  }));

  return project.views ? [...imageViews, ...project.views] : imageViews;
}

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
    href: "https://aegis.fyxtez.com/",
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
    // Feature: ShillTrace is a highlighted end-to-end product, with its four core workflows documented in the gallery.
    slug: "shilltrace",
    title: "ShillTrace",
    category: "Telegram signal intelligence",
    description:
      "A private, self-hosted system that detects token calls across Telegram channels, resolves live market data, and preserves measurable performance histories for every channel and shill.",
    tags: ["Rust", "Axum", "React", "PostgreSQL", "Telegram MTProto", "SSE"],
    href: null,
    linkLabel: null,
    access: "Private · Self-hosted production",
    featured: true,
    images: [
      {
        src: "/projects/shilltrace/01-new-shills.png",
        alt: "ShillTrace New Shills review inbox with token details and a live market-cap chart",
        label: "Live review workspace",
        caption:
          "New Telegram calls arrive in a focused review inbox with source context, contract details, live market-cap tracking, performance multipliers, and direct market links.",
      },
      {
        src: "/projects/shilltrace/02-all-tokens.png",
        alt: "ShillTrace All Tokens archive showing tracked calls and performance metrics",
        label: "Token performance archive",
        caption:
          "Every detected call remains inspectable through a chronological archive that compares its initial and current market cap, current multiplier, maximum multiplier, source channel, and review state.",
      },
      {
        src: "/projects/shilltrace/03-channels.png",
        alt: "ShillTrace Channels page with pinned Telegram channels and their token-call histories",
        label: "Channel intelligence",
        caption:
          "Channel-level histories make each source measurable, while pinning, search, and monitoring controls keep the most relevant Telegram communities close at hand.",
      },
      {
        src: "/projects/shilltrace/04-ignored-channels.png",
        alt: "ShillTrace Ignored Channels management page",
        label: "Monitoring control",
        caption:
          "Ignored and hidden channels stay outside the ingestion workflow without losing administrative control, and monitoring can be restored directly from the same workspace.",
      },
    ],
  },
  {
    // Feature: Weight Tracker joins Additional Work as a complete mobile product with product views and its deployed sync architecture.
    slug: "weight-tracker",
    title: "Weight Tracker",
    category: "Personal health tracking",
    description:
      "An authenticated Android and desktop companion that turns repeat meals, training, sleep, and morning weigh-ins into one-tap daily records, synchronized nutrition history, and exportable progress reports.",
    tags: ["Rust", "Axum", "Tauri", "React", "PostgreSQL", "Android", "Nginx"],
    href: null,
    linkLabel: null,
    access: "Private · Self-hosted personal production",
    featured: false,
    images: [
      {
        src: "/projects/weight-tracker/01-report.png",
        alt: "Weight Tracker Android report showing weekly weight and calorie summaries with export actions",
        label: "Progress and report workflow",
        caption:
          "Weekly weight and calorie context remains readable on mobile, while the report can be previewed inside the app, shared through Android, or saved as a portable CSV.",
      },
      {
        src: "/projects/weight-tracker/02-food-entry.png",
        alt: "Weight Tracker Android food screen with radial categories and today's selected foods",
        label: "One-tap food tracking",
        caption:
          "A radial category model, personal Osnovno collection, preset portions, automatic nutrition totals, and a live daily summary reduce recurring food entry to a few deliberate taps.",
      },
    ],
    views: [
      {
        kind: "diagram",
        diagram: "weight-tracker-architecture",
        label: "Synchronized product architecture",
        caption:
          "Android and desktop Tauri clients autosave one daily document through a typed HTTPS boundary; Nginx terminates TLS, Axum authenticates rotating sessions and isolates records by user, PostgreSQL persists history, and systemd plus Cabin keep the self-hosted runtime observable.",
      },
    ],
  },
  {
    slug: "mordexel",
    title: "Mordexel",
    category: "Automated execution engine",
    description:
      "A modular, event-driven Rust engine that accepts authenticated external trade intents, applies execution policy and risk-aware sizing, and executes protected Binance Futures orders.",
    tags: ["Rust", "Tokio", "Axum", "Binance Futures", "Event-driven", "Risk engine"],
    href: null,
    linkLabel: null,
    access: "Private · Production execution",
    featured: false,
    images: [],
    views: [
      {
        kind: "diagram",
        diagram: "mordexel-signal-pipeline",
        label: "Signal-to-decision pipeline",
        caption:
          "A private signal provider remains outside the public boundary. Mordexel begins at authenticated ingress, normalizes the payload, builds an identified TradeIntent, and routes it through an explicit approval or rejection policy.",
      },
      {
        kind: "diagram",
        diagram: "mordexel-sizing-engine",
        label: "Constraint-aware sizing",
        caption:
          "Entry and stop distance, portfolio equity, configured risk limits, exchange leverage brackets, and symbol filters are combined into a rounded ExecutionPlan that must remain inside the allocated margin.",
      },
      {
        kind: "diagram",
        diagram: "mordexel-order-lifecycle",
        label: "Protected order lifecycle",
        caption:
          "The executor sets leverage, submits the market entry, attaches a full-position stop, resolves the active take-profit strategy, and sends reduce-only exits through an HMAC-signed Binance transport.",
      },
    ],
  },
  {
    slug: "strategy-dashboard",
    title: "Strategy Dashboard",
    category: "Strategy research & analytics",
    description:
      "A private research dashboard that turns structured trade histories into comparable evidence across exit models, timeframes, symbols, expectancy, risk, path outcomes, and equity behavior.",
    tags: ["Rust", "Axum", "Next.js", "TypeScript", "Trading analytics", "Risk metrics"],
    href: null,
    linkLabel: null,
    access: "Private · Research dashboard",
    featured: false,
    images: [
      {
        src: "/projects/strategy-dashboard/01-overview.png",
        alt: "Strategy Dashboard overview showing performance, risk, and system health metrics",
        label: "Strategy overview",
        caption:
          "A consolidated health view across total R, expectancy, win rate, profit factor, drawdown, streaks, adverse excursion, and rolling performance.",
      },
      {
        src: "/projects/strategy-dashboard/02-expectancy.png",
        alt: "Strategy Dashboard expectancy comparison across exit models and timeframes",
        label: "Exit-model expectancy",
        caption:
          "Exit models are compared per timeframe through resolved and unresolved samples, total R, expectancy, win rate, and streak behavior.",
      },
      {
        src: "/projects/strategy-dashboard/03-symbol-analysis.png",
        alt: "Strategy Dashboard symbol analytics table with performance and stability metrics",
        label: "Symbol-level evidence",
        caption:
          "Per-symbol analysis exposes hit rates, expectancy, path probabilities, return contribution, sample share, and stability instead of hiding variance inside one aggregate result.",
      },
      {
        src: "/projects/strategy-dashboard/04-trade-explorer.png",
        alt: "Strategy Dashboard filtered trade history with lifecycle and target states",
        label: "Inspectable trade history",
        caption:
          "The underlying trade history remains inspectable through symbol, timeframe, and lifecycle filters, with direction, entry, stop, target progress, and freshness visible per record.",
      },
    ],
    views: [
      {
        kind: "diagram",
        diagram: "strategy-research-architecture",
        label: "Research system architecture",
        caption:
          "Telegram message history is normalized into ordered trade events, correlated into typed TradeRecords, exposed through a focused Axum boundary, and carried into Next.js research views without losing the underlying trade lifecycle.",
      },
    ],
  },
  {
    // Feature: Cabin joins the additional-work catalog with both product views and its real control architecture.
    slug: "cabin",
    title: "Cabin",
    category: "Desktop infrastructure control",
    description:
      "A private multi-server desktop control room for allow-listed systemd services, combining searchable live journals, state-aware process control, and local SSH execution without a remote admin backend.",
    tags: ["Rust", "Tauri", "React", "TypeScript", "SSH", "systemd", "journald"],
    href: null,
    linkLabel: null,
    access: "Private · Personal infrastructure",
    featured: false,
    images: [
      {
        src: "/projects/cabin/01-service-control.png",
        alt: "Cabin desktop dashboard showing two servers and six running systemd services",
        label: "Multi-server control room",
        caption:
          "Server-specific service maps, grouped runtime states, automatic refresh, and allow-listed start, stop, restart, and log actions share one desktop workspace.",
      },
      {
        src: "/projects/cabin/02-live-logs.png",
        alt: "Cabin live journal viewer with search and systemd process controls",
        label: "Live journal workspace",
        caption:
          "Searchable live journal output stays beside the selected process state and its guarded stop or restart controls, so observation and intervention remain in the same context.",
      },
    ],
    views: [
      {
        kind: "diagram",
        diagram: "cabin-control-architecture",
        label: "Control-plane architecture",
        caption:
          "React sends typed Tauri requests into a Rust policy gate that validates the selected server, unit, and action against server-specific allowlists before invoking short-lived OpenSSH commands for systemd state, lifecycle actions, or bounded journald reads.",
      },
    ],
  },
  {
    slug: "btc-news-impact",
    title: "BTC News Impact",
    category: "Macro reaction research",
    description:
      "A Rust research pipeline that extracts macro releases from Telegram history, aligns every event with real BTC/USDT trades, classifies reaction quality, and renders filterable multi-horizon evidence.",
    tags: ["Rust", "Tokio", "Reqwest", "Binance aggTrades", "Telegram data", "Event research", "Static dashboard"],
    href: null,
    linkLabel: null,
    access: "Private dataset · Research tooling",
    featured: false,
    images: [
      {
        src: "/projects/btc-news-impact/01-reaction-log.png",
        alt: "BTC News Impact macro reaction log with event counts, research filters, and multi-horizon BTC moves",
        label: "Macro reaction log",
        caption:
          "The research workspace brings event categories, full-text search, reaction quality, sorting, and the selected BTC timeframe into one inspectable feed.",
      },
      {
        src: "/projects/btc-news-impact/02-event-analysis.png",
        alt: "BTC News Impact event cards comparing BTC reactions at 20 seconds, 1 minute, 5 minutes, 1 hour, and 12 hours",
        label: "Event-level evidence",
        caption:
          "Every macro message remains attached to its source context, importance and noise assessment, plus the signed BTC move across five reaction windows.",
      },
    ],
    views: [
      {
        kind: "diagram",
        diagram: "btc-news-impact-architecture",
        label: "Event-to-reaction architecture",
        caption:
          "Telegram history is normalized and matched into macro candidates, deterministically classified, aligned with the first Binance aggregated trade at each target timestamp, cached incrementally, and emitted as a filterable research artifact.",
      },
    ],
  },
  {
    slug: "commandant",
    title: "Commandant",
    category: "Infrastructure control",
    description:
      "A local-first Android control surface for remote systemd services: act in seconds, follow live logs, and keep every host preset on the device.",
    tags: ["Rust", "Tauri", "React", "russh", "systemd", "Android"],
    href: null,
    linkLabel: null,
    access: "Private · Personal production",
    featured: false,
    images: [],
    views: [
      {
        kind: "diagram",
        diagram: "commandant-control-path",
        label: "One-tap control path",
        caption:
          "React invokes a restricted Tauri command; Rust loads the selected preset, opens a fresh SSH session, executes one allow-listed systemd action, and disconnects.",
      },
      {
        kind: "diagram",
        diagram: "commandant-live-logs",
        label: "Live log stream",
        caption:
          "A dedicated russh channel follows journalctl and forwards each line into the React log viewer through Tauri events until the user closes the stream.",
      },
      {
        kind: "diagram",
        diagram: "commandant-local-first",
        label: "Local-first design",
        caption:
          "Host presets, service mappings, private-key configuration, and action history remain in Android app-private storage—without a backend, cloud sync, or telemetry.",
      },
    ],
  },
  {
    slug: "discipline-os",
    title: "DisciplineOS",
    category: "Daily execution system",
    description:
      "A focused local-first desktop system for recurring daily and weekly actions—organized by time of day, reset automatically, and kept entirely on the user's machine.",
    tags: ["Rust", "Tauri", "React", "TypeScript", "Tokio", "Local-first"],
    href: null,
    linkLabel: null,
    access: "Private · Personal production",
    featured: false,
    images: [],
    views: [
      {
        kind: "diagram",
        diagram: "discipline-execution-loop",
        label: "Daily execution loop",
        caption:
          "Tasks move from a focused input into a time block, through execution and a five-second completion state, then into global and per-block progress.",
      },
      {
        kind: "diagram",
        diagram: "discipline-reset-engine",
        label: "Automatic reset engine",
        caption:
          "Rust compares local day and ISO-week markers at startup, during every task command, and every 30 seconds—resetting daily and weekly completion independently.",
      },
      {
        kind: "diagram",
        diagram: "discipline-local-persistence",
        label: "Atomic local persistence",
        caption:
          "React calls typed Tauri commands; Rust validates and updates the local task model, writes a temporary JSON file, and atomically replaces the active store.",
      },
    ],
  },
  {
    slug: "hyperliquid-whale-tracker",
    title: "Hyperliquid Whale Tracker",
    category: "Real-time market intelligence",
    description:
      "A long-running Rust monitor that turns live Hyperliquid trade flow into size-qualified wallet intelligence, enriches it with actual positions, and emits ranked periodic reports.",
    tags: ["Rust", "Tokio", "WebSockets", "Hyperliquid", "Reqwest", "Concurrency"],
    href: null,
    linkLabel: null,
    access: "Private · Research tooling",
    featured: false,
    images: [],
    views: [
      {
        kind: "diagram",
        diagram: "whale-live-ingestion",
        label: "Live trade ingestion",
        caption:
          "A reconnecting WebSocket worker subscribes to one symbol, maps every trade to buyer and seller wallets, and accumulates directional flow in shared concurrent state.",
      },
      {
        kind: "diagram",
        diagram: "whale-enrichment-report",
        label: "Qualification and enrichment",
        caption:
          "The reporter snapshots wallet activity, filters by a configurable size threshold, ranks the largest flows, then resolves each wallet's actual position through Hyperliquid's information API.",
      },
      {
        kind: "diagram",
        diagram: "whale-runtime-resilience",
        label: "Long-running runtime",
        caption:
          "Heartbeat, two-second reconnects, configurable report cadence, shared shutdown state, and joined Tokio tasks keep the monitor explicit and operationally predictable.",
      },
    ],
  },
  {
    slug: "solana-grind",
    title: "Solana Grind",
    category: "Wallet utility",
    description:
      "A compact Rust CLI for generating vanity Solana keypairs, reading existing keypair files, converting local key material into hex and Base58, and checking the public address balance through Solana JSON-RPC.",
    tags: ["Rust", "Solana CLI", "JSON-RPC", "Base58", "CLI", "Keypair tooling"],
    href: null,
    linkLabel: null,
    access: "Local utility · Security-sensitive",
    featured: false,
    images: [],
    views: [
      {
        kind: "diagram",
        diagram: "solana-utility-flow",
        label: "Vanity keypair workflow",
        caption:
          "A short prefix invokes solana-keygen grind while a full address selects an existing local keypair. Both paths validate the 64-byte file, produce local encodings, and use only the public address for the mainnet balance request.",
      },
    ],
  },
  {
    slug: "telegram-notify",
    title: "telegram-notify",
    category: "Open-source Rust crate",
    description:
      "A tiny async Rust crate that turns one send(msg).await call into a validated Telegram notification for a configured chat, with explicit errors returned to the caller.",
    tags: ["Rust", "Tokio", "Teloxide", "Telegram Bot API", "Async", "crates.io"],
    href: "https://crates.io/crates/telegram-notify",
    linkLabel: "View on crates.io",
    access: "Public · MIT · crates.io",
    featured: false,
    images: [],
    views: [
      {
        kind: "diagram",
        diagram: "telegram-notify-flow",
        label: "One-call notification flow",
        caption:
          "The public send API trims and validates the message, resolves environment configuration, reuses a OnceLock-backed Teloxide client, sends plain text to one Telegram chat, and returns every failure as a typed NotifyError.",
      },
    ],
  },
  {
    slug: "telegram-intelligence",
    title: "Telegram Intelligence",
    category: "Distributed messaging automation",
    description:
      "A fleet of independently deployable Rust services that turns Telegram activity into validated market events, automated account actions, execution requests, and bounded maintenance work.",
    tags: ["Rust", "Tokio", "MTProto", "Axum", "SQLite", "React", "Event-driven", "Background workers"],
    href: null,
    linkLabel: null,
    access: "Private · Multi-process automation",
    featured: false,
    images: [],
    views: [
      {
        kind: "diagram",
        diagram: "telegram-fleet-topology",
        label: "Distributed worker fleet",
        caption:
          "Telegram MTProto is the shared upstream event fabric, while three separately runnable Rust workloads keep their own session, state, lifecycle, and failure boundary: the intelligence service, the account automation daemon, and a bounded maintenance job.",
      },
      {
        kind: "diagram",
        diagram: "telegram-signal-pipeline",
        label: "Signal-to-action pipeline",
        caption:
          "The Sniper hot path checks the in-memory channel policy before parsing, validates Solana-shaped candidates by decoding them to 32 bytes, submits configured execution requests, records detections, and reports outcomes through the public telegram-notify crate.",
      },
      {
        kind: "diagram",
        diagram: "telegram-control-plane",
        label: "Control plane and state",
        caption:
          "A local React dashboard changes channel activation, night coverage, and per-channel execution parameters through Axum. SQLite remains the source of truth while an RwLock-backed map keeps the message hot path free from database reads.",
      },
      {
        kind: "diagram",
        diagram: "telegram-automation-workers",
        label: "Automation and maintenance",
        caption:
          "The account daemon fans Telegram updates into delayed reactions and auto-read actions while a clock-driven task applies night notification policy. A separate one-shot sweeper handles bulk read-state cleanup with concurrency capped at ten requests.",
      },
    ],
  },
  {
    slug: "youtube-release-watcher",
    title: "YouTube Release Watcher",
    category: "Content monitoring worker",
    description:
      "A stateful Rust worker that monitors selected YouTube Atom feeds, identifies unseen long-form uploads, suppresses Shorts and stale-feed notification bursts, and delivers low-latency ntfy alerts.",
    tags: ["Rust", "reqwest", "quick-xml", "RSS / Atom", "ntfy", "Polling", "Local state"],
    href: null,
    linkLabel: null,
    access: "Private · Long-running worker",
    featured: false,
    images: [],
    views: [
      {
        kind: "diagram",
        diagram: "youtube-release-watcher",
        label: "Polling and recovery loop",
        caption:
          "Every channel keeps an independent last-seen cursor. The worker polls YouTube's Atom feed, parses entries newest-first, resynchronizes quietly when a stale cursor falls outside the feed window, filters Shorts through redirect resolution, delivers new long-form uploads through ntfy, and persists the newest ID.",
      },
    ],
  },
  {
    slug: "voitodo",
    title: "Voitodo",
    category: "Voice-first Android utility",
    description:
      "A local-first Android task app where native speech recognition feeds a Rust command parser, mutates a persistent daily routine, and returns live updates to a swipe-driven React interface.",
    tags: ["Rust", "Tauri 2", "React", "Android", "JNI", "SpeechRecognizer", "Local-first", "JSON"],
    href: null,
    linkLabel: null,
    access: "Private · Android application",
    featured: false,
    images: [],
    views: [
      {
        kind: "diagram",
        diagram: "voitodo-voice-command",
        label: "Native voice command path",
        caption:
          "A tap crosses the Tauri boundary into Android's native SpeechRecognizer. Kotlin returns the transcript through JNI, Rust normalizes and parses it into a bounded add, complete, or remove command, persists the mutation, and emits typed events back to React.",
      },
      {
        kind: "diagram",
        diagram: "voitodo-daily-lifecycle",
        label: "Local daily task lifecycle",
        caption:
          "The app keeps a reusable routine list, today's active tasks, and the last reset date in one local JSON store. Startup and a 30-second date check restore the routine on a new local day, while swipe completion removes only the active instance.",
      },
    ],
  },
];
