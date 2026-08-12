import "./TelegramNotifyDiagram.css";
type NotifyNodeProps = {
  index: string;
  eyebrow: string;
  title: string;
  detail: string;
  accent?: boolean;
};

function NotifyNode({ index, eyebrow, title, detail, accent = false }: NotifyNodeProps) {
  return (
    <article className={`notify-node ${accent ? "notify-node--accent" : ""}`}>
      <div>
        <span>{index}</span>
        <small>{eyebrow}</small>
      </div>
      <strong>{title}</strong>
      <p>{detail}</p>
    </article>
  );
}

function NotifyLink({ label }: { label: string }) {
  return (
    <div className="notify-link" aria-hidden="true">
      <span>{label}</span>
      <i />
    </div>
  );
}

export default function TelegramNotifyDiagram() {
  return (
    <div className="commandant-diagram notify-diagram">
      <header className="commandant-diagram-heading">
        <div>
          <span>01 / Public crate API</span>
          <h3>One await. One delivered alert.</h3>
        </div>
        <p>Small surface, explicit failure modes, no hidden runtime.</p>
      </header>

      <div className="notify-signature" aria-label="telegram-notify public API">
        <span>telegram-notify 1.0.0</span>
        <code>send(&quot;worker finished&quot;).await?;</code>
        <small>MIT · Tokio async</small>
      </div>

      <div className="notify-flow" aria-label="Telegram notification delivery flow">
        <NotifyNode
          index="01"
          eyebrow="Caller"
          title="send(msg).await"
          detail="One public async function returns Result<(), NotifyError>"
        />
        <NotifyLink label="&str" />
        <NotifyNode
          index="02"
          eyebrow="Guard"
          title="Validate message"
          detail="Trim whitespace, reject empty input, enforce 4096 characters"
          accent
        />
        <NotifyLink label="valid" />
        <NotifyNode
          index="03"
          eyebrow="Environment"
          title="Resolve target"
          detail="Load TELEGRAM_CHAT_ID and initialize the bot token once"
        />
        <NotifyLink label="OnceLock" />
        <NotifyNode
          index="04"
          eyebrow="Teloxide"
          title="Bot client"
          detail="Reuse the client and issue send_message for plain text"
        />
        <NotifyLink label="HTTPS" />
        <NotifyNode
          index="05"
          eyebrow="Telegram"
          title="Configured chat"
          detail="Deliver one notification to the selected conversation"
        />
      </div>

      <section className="notify-error-surface" aria-label="Typed error surface">
        <header>
          <span>Typed error surface</span>
          <strong>NotifyError → caller</strong>
        </header>
        <div>
          <span>MissingEnv</span>
          <span>InvalidChatId</span>
          <span>EmptyMessage</span>
          <span>MessageTooLong</span>
          <span>Telegram(RequestError)</span>
        </div>
      </section>

      <footer className="notify-contract-strip">
        <span><i aria-hidden="true" /> Plain text only</span>
        <span><i aria-hidden="true" /> One configured chat</span>
        <span><i aria-hidden="true" /> Errors stay explicit</span>
        <strong>Application → crate → Telegram</strong>
      </footer>
    </div>
  );
}
