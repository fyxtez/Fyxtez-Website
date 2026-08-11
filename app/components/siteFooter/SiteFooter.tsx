export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Fyxtez</p>
      <div className="footer-links">
        <a href="https://github.com/fyxtez" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://t.me/fyxtez" target="_blank" rel="noreferrer">Telegram</a>
        <a href="mailto:fyxtez@gmail.com">Email</a>
      </div>
      <p>Built with Rust discipline.</p>
    </footer>
  );
}
