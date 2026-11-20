"use client"

import { useState } from "react"

type State = "pending" | "approved"

export function ApprovalRequest({
  title,
  why,
  effect,
  approveHref,
  approvedNote,
  secondary,
}: {
  title: string
  why: string
  effect: string
  approveHref: string
  approvedNote: string
  secondary: { label: string; href: string }
}) {
  const [state, setState] = useState<State>("pending")
  const [approvedAt, setApprovedAt] = useState<string | null>(null)

  const approve = () => {
    setState("approved")
    setApprovedAt(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }))
    window.location.href = approveHref
  }

  return (
    <section className="request text-[var(--graphite)]" data-state={state} aria-labelledby="request-title" aria-live="polite">
      <div className="request-band" aria-hidden="true" />
      <div className="p-6 sm:p-8">
        {state === "pending" ? (
          <span className="status status-pending">
            <span className="status-dot" aria-hidden="true" />
            Waiting for your approval
          </span>
        ) : (
          <span className="status status-approved">
            <span className="status-dot" aria-hidden="true" />
            Approved{approvedAt ? ` at ${approvedAt}` : ""}
          </span>
        )}

        <p className="muted mt-5 text-sm">Proposed action</p>
        <h2 id="request-title" className="title mt-1 text-2xl sm:text-[1.9rem]">
          {title}
        </h2>

        <dl className="mt-5 space-y-3 text-[0.97rem]">
          <div>
            <dt className="font-semibold">Why</dt>
            <dd className="muted">{why}</dd>
          </div>
          <div>
            <dt className="font-semibold">What happens</dt>
            <dd className="muted">{state === "pending" ? effect : approvedNote}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          {state === "pending" ? (
            <button type="button" className="btn btn-primary" onClick={approve}>
              Approve
            </button>
          ) : (
            <button type="button" className="btn btn-quiet" onClick={() => setState("pending")}>
              Undo
            </button>
          )}
          <a className="btn btn-quiet" href={secondary.href} target="_blank" rel="noopener">
            {secondary.label}
          </a>
        </div>
      </div>
    </section>
  )
}
