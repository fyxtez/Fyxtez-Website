type WatcherNodeProps = {
  index: string;
  eyebrow: string;
  title: string;
  detail: string;
  accent?: boolean;
};

function WatcherNode({ index, eyebrow, title, detail, accent = false }: WatcherNodeProps) {
  return (
    <article className={`yt-watcher-node ${accent ? "yt-watcher-node--accent" : ""}`}>
      <div>
        <span>{index}</span>
        <small>{eyebrow}</small>
      </div>
      <strong>{title}</strong>
      <p>{detail}</p>
    </article>
  );
}

function WatcherLink({ label }: { label: string }) {
  return (
    <div className="yt-watcher-link" aria-hidden="true">
      <span>{label}</span>
      <i />
    </div>
  );
}

export default function YouTubeWatcherDiagram() {
  return (
    <div className="commandant-diagram yt-watcher-diagram">
      <header className="commandant-diagram-heading">
        <div>
          <span>01 / Stateful monitoring loop</span>
          <h3>Detect the upload. Ignore the noise.</h3>
        </div>
        <p>Independent cursor and recovery state for every configured channel.</p>
      </header>

      <section className="yt-watcher-runtime-strip" aria-label="Watcher runtime configuration">
        <div>
          <small>Sources</small>
          <strong>Configured YouTube channels</strong>
        </div>
        <span><b>120s</b> poll cadence</span>
        <span><b>15s</b> HTTP timeout</span>
        <span><b>N</b> independent cursors</span>
      </section>

      <div className="yt-watcher-flow" aria-label="YouTube release detection flow">
        <WatcherNode
          index="01"
          eyebrow="YouTube"
          title="Fetch Atom feed"
          detail="Request the current upload window for one configured channel."
        />
        <WatcherLink label="XML" />
        <WatcherNode
          index="02"
          eyebrow="quick-xml"
          title="Parse entries"
          detail="Extract video ID, title, canonical link, and publish time newest-first."
        />
        <WatcherLink label="cursor" />
        <WatcherNode
          index="03"
          eyebrow="State gate"
          title="Compute unseen set"
          detail="Stop at the last-seen ID and preserve upload order for delivery."
          accent
        />
        <WatcherLink label="new" />
        <WatcherNode
          index="04"
          eyebrow="Redirect check"
          title="Classify format"
          detail="Follow the Shorts URL and inspect its final path before notifying."
        />
        <WatcherLink label="long-form" />
        <WatcherNode
          index="05"
          eyebrow="ntfy"
          title="Deliver alert"
          detail="Send the channel, title, link, and local detection timestamp."
        />
      </div>

      <section className="yt-watcher-recovery" aria-label="Cursor recovery behavior">
        <header>
          <span>Cursor semantics</span>
          <strong>last_video_id_[channel].txt</strong>
        </header>
        <div>
          <article>
            <span>First run</span>
            <strong>Seed current latest</strong>
            <p>Establish a baseline without treating the existing feed as new.</p>
          </article>
          <article className="yt-watcher-recovery__accent">
            <span>Normal delta</span>
            <strong>Notify oldest-first</strong>
            <p>Preserve chronological order when several uploads arrive between polls.</p>
          </article>
          <article>
            <span>Cursor not found</span>
            <strong>Resync without burst</strong>
            <p>Skip the stale feed window and move directly to its newest entry.</p>
          </article>
        </div>
      </section>

      <section className="yt-watcher-decision-strip">
        <span><i /> Short detected → skip</span>
        <span><i /> Long-form detected → notify</span>
        <span><i /> Format unknown → notify safely</span>
        <strong>Always persist the newest feed ID</strong>
      </section>
    </div>
  );
}
