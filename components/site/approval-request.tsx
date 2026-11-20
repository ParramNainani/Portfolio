"use client"

import { useState } from "react"

type State = "pending" | "approved"

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function ApprovalRequest() {
  const [state, setState] = useState<State>("pending")
  const [approvedAt, setApprovedAt] = useState<string | null>(null)

  const approve = () => {
    setState("approved")
    setApprovedAt(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }))
    const target = document.getElementById("work")
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" })
      const heading = document.getElementById("work-heading")
      heading?.focus({ preventScroll: true })
    }
  }

  const undo = () => {
    setState("pending")
    setApprovedAt(null)
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })
  }

  return (
    <section className="request" data-state={state} aria-labelledby="request-title" aria-live="polite">
      <div className="request-band" aria-hidden="true" />
      <div className="p-6 sm:p-7">
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
        <h2 id="request-title" className="title mt-1 text-2xl sm:text-[1.7rem]">
          Show you Parram’s selected work
        </h2>

        <dl className="mt-5 space-y-3 text-[0.97rem]">
          <div>
            <dt className="font-semibold">Why</dt>
            <dd className="muted">
              Six projects with public source code, real tests and shipped builds, including an assistant that asks
              before it acts.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">What happens</dt>
            <dd className="muted">The page scrolls down to Selected work. You can undo it from here.</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          {state === "pending" ? (
            <>
              <button type="button" className="btn btn-primary" onClick={approve}>
                Approve
              </button>
              <a className="btn btn-quiet" href="/Parram_Nainani_Resume.pdf" target="_blank" rel="noopener">
                Open résumé instead
              </a>
            </>
          ) : (
            <>
              <button type="button" className="btn btn-quiet" onClick={undo}>
                Undo
              </button>
              <a className="btn btn-quiet" href="/Parram_Nainani_Resume.pdf" target="_blank" rel="noopener">
                Open résumé
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
