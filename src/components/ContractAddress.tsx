import { useEffect, useRef, useState } from "react";
import { CopyIcon, CheckIcon } from "./icons";
import { site } from "../config/site";

type CopyState = "idle" | "copied" | "error";

function abbreviate(address: string) {
  if (address.length <= 16) return address;
  return `${address.slice(0, 8)}…${address.slice(-6)}`;
}

export function ContractAddress() {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current);
  }, []);

  const address = site.contractAddress;

  async function handleCopy() {
    if (!address) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(address);
      } else {
        throw new Error("Clipboard API unavailable");
      }
      setCopyState("copied");
    } catch {
      setCopyState("error");
    } finally {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopyState("idle"), 2200);
    }
  }

  return (
    <section className="contract-address" aria-label="Contract address">
      <div className="contract-address__meta">
        <span className="contract-address__label">Contract address</span>
        {site.network ? (
          <span className="contract-address__network">{site.network}</span>
        ) : null}
      </div>

      {address ? (
        <div className="contract-address__row">
          <code className="contract-address__value" title={address}>
            <span className="contract-address__value--full">{address}</span>
            <span className="contract-address__value--short">
              {abbreviate(address)}
            </span>
          </code>

          <button
            type="button"
            className="contract-address__copy"
            onClick={handleCopy}
            aria-label={`Copy full contract address ${address}`}
          >
            {copyState === "copied" ? (
              <CheckIcon width={16} height={16} />
            ) : (
              <CopyIcon width={16} height={16} />
            )}
            {copyState === "copied" ? "Copied" : "Copy"}
          </button>
        </div>
      ) : (
        <p className="contract-address__missing">
          Contract address <span className="coming-soon-badge">Coming soon</span>
        </p>
      )}

      <div role="status" aria-live="polite" className="visually-hidden">
        {copyState === "copied" ? "Contract address copied to clipboard." : ""}
        {copyState === "error"
          ? "Copy failed. Please select and copy the address manually."
          : ""}
      </div>

      {copyState === "error" ? (
        <p className="contract-address__error">
          Couldn't copy automatically — select the address above and copy it
          manually.
        </p>
      ) : null}
    </section>
  );
}
