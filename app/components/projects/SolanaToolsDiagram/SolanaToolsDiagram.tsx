import "./SolanaToolsDiagram.css";
function LocalNode({
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
    <article className={`solana-node ${accent ? "solana-node--accent" : ""}`}>
      <div><span>{index}</span><small>{eyebrow}</small></div>
      <strong>{title}</strong>
      <p>{detail}</p>
    </article>
  );
}

function FlowLink({ label }: { label: string }) {
  return (
    <div className="solana-link">
      <span>{label}</span>
      <i aria-hidden="true" />
    </div>
  );
}

export default function SolanaToolsDiagram() {
  return (
    <div className="commandant-diagram solana-diagram">
      <header className="commandant-diagram-heading">
        <div>
          <span>01 / Dual-mode CLI</span>
          <h3>Two entry paths. One local key workflow.</h3>
        </div>
        <p>The private-key path remains local; only a public address reaches the network.</p>
      </header>

      <div className="solana-mode-split" aria-label="Solana Grind input modes">
        <article>
          <div><span>Mode A</span><small>input ≤ 10 characters</small></div>
          <strong>Vanity prefix</strong>
          <p>Invoke <b>solana-keygen grind</b> and stream its progress until one matching keypair is written.</p>
          <code>MEME → --starts-with MEME:1</code>
        </article>
        <div><i /><span>or</span><i /></div>
        <article>
          <div><span>Mode B</span><small>full address or filename</small></div>
          <strong>Existing keypair</strong>
          <p>Resolve the matching JSON file in the current working directory and continue without grinding.</p>
          <code>address → address.json</code>
        </article>
      </div>

      <div className="solana-local-boundary">
        <header>
          <span>Local process boundary</span>
          <small>Secret material never belongs in the RPC request</small>
        </header>

        <div className="solana-local-flow" aria-label="Solana keypair conversion flow">
          <LocalNode
            index="01"
            eyebrow="Local JSON"
            title="Load keypair"
            detail="Read the generated or selected file from disk"
          />
          <FlowLink label="validate" />
          <LocalNode
            index="02"
            eyebrow="64 bytes"
            title="Verify structure"
            detail="Reject malformed JSON or an unexpected key length"
            accent
          />
          <FlowLink label="encode" />
          <LocalNode
            index="03"
            eyebrow="Terminal output"
            title="Hex + Base58"
            detail="Render both private-key representations for local use"
          />
        </div>
      </div>

      <div className="solana-network-path" aria-label="Solana public balance lookup">
        <section>
          <small>Public data only</small>
          <strong>Address from filename</strong>
        </section>
        <div><span>POST getBalance</span><i aria-hidden="true" /></div>
        <section className="solana-network-path__rpc">
          <small>Solana mainnet</small>
          <strong>JSON-RPC</strong>
        </section>
        <div><span>result.value</span><i aria-hidden="true" /></div>
        <section>
          <small>Conversion</small>
          <strong>lamports ÷ 1e9 → SOL</strong>
        </section>
      </div>

      <div className="solana-security-strip">
        <span><i aria-hidden="true" /> Keypair file stays local</span>
        <span><i aria-hidden="true" /> RPC receives the public address</span>
        <span><i aria-hidden="true" /> Secret is printed to stdout</span>
        <strong>Treat the JSON file and terminal output as credentials</strong>
      </div>
    </div>
  );
}
