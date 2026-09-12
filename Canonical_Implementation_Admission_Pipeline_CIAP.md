# CIAP Current Canonical — Consolidated after NORM Responsibility Migration

Date: 2026-09-12
Status: `CURRENT CANONICAL — IMPLEMENTATION_ADMITTED`

## Canonical Lineage

This consolidated representation is governed by the CIAP Primary, Amendment 001, Amendment 002 (adopted 2026-09-11), and NORM RC3 as upstream normalization contract. Where inherited Primary wording conflicts with an applicable Amendment, the Amendment controls within its declared scope.

## Current Responsibility Boundary

```text
Design Corpus
    ↓
NORM
Transform / Normalize
    ↓
Canonical Governance
Authority / Canonical / Lineage
    ↓
CIAP
Verify / Classify / Admit
```

CIAP MUST NOT restructure, complete, merge, split, infer, or otherwise transform design meaning merely to make an Admission Gate pass. CIAP MAY detect normalization/readiness defects and route them to NORM, the Canonical Owner, or the existing authorized Human/Governance mechanism.

## Current CIAP Entry Sequence

```text
Normalized Canonical Input
→ Scope / Manifest Binding
→ Independent Readiness Review
→ Finding Classification
→ Canonical Readiness Gate
→ Admission Controller
```

## Operation Mode

CIAP supports BOOTSTRAP and STEADY-STATE review operation. BOOTSTRAP applies when no usable Project Canonical Registry exists or required Authority cannot be deterministically resolved from it. STEADY-STATE applies when the Registry and Canonical structure are usable. In either mode, CIAP does not perform NORM-owned design transformation.

## Scope Freeze

The CIAP Controller fixes Subsystem name, Implementation Scope, Explicit Out-of-Scope, Repository, Branch, Commit/Version, dependencies, Registry status/location, and existing Canonical IDs. This phase makes no new design decision.

## Independent Readiness Review

CIAP independently verifies the authoritative normalized Canonical. Review includes structure and content readiness, but verification does not transfer normalization Authority to CIAP.

Structure review verifies at minimum: unique Canonical entry, deterministic Authority resolution, terminology availability, closed required references, Current/Superseded/Rejected/Hold distinction, machine-unique status/Authority vocabulary, Candidate/Canonical separation, and no requirement for semantic-search-based Authority selection.

Content review verifies at minimum: unique terminology, State/Transition, Authority Boundary, Contract/Schema/Interface consistency, Required/Optional distinction and owner, decided/undecided distinction, no implicit implementation judgment delegated to an Agent, and unique reconstruction without inference.

## Finding Classification

- `BLOCKING`: implementation cannot be uniquely reconstructed from current Canonical; Admission is prohibited until authorized correction/decision and re-review.
- `NON_BLOCKING`: defect does not affect unique reconstruction; record as Evidence without blocking Admission.
- `OUT_OF_SCOPE`: separate from the current Subsystem; do not expand current CIAP scope.

CIAP identifies/classifies Admission defects. Correction within existing Canonical Owner Authority is permitted. Normalization-required correction returns through NORM. New design/Authority decisions return to the existing authorized Human/Canonical Governance mechanism. CIAP actors MUST NOT originate missing Authority to close a finding.

## CIAP Controller / Actor Responsibility

CIAP responsibility owner and Admission Authority is `Dev-Capsule SAFETY / CIAP`. CIAP Controller is the Control Plane for process transition. CONSOLE or other harnesses do not own Admission Authority.

- Scope / Manifest detection: CIAP Controller
- Operation Mode: CIAP Controller
- Structure Review: Independent Fresh Reviewer
- Content Review: Independent Fresh Reviewer
- Finding Classification: Independent Judge
- Correction Dispatch: CIAP Controller
- Canonical Correction: Canonical Owner / Authorized Correction Actor
- Open Ambiguity Meaning/Authority Decision: Human or existing explicit Authority
- Correction re-review: Independent Fresh Reviewer distinct from correction actor
- Final Gate: Independent Gate Reviewer
- Admission issuance after Gate Evidence: CIAP Controller
- Change Impact Classification: Independent Impact Reviewer

## Independent Reviewer Contract

Independent means Fresh Execution plus Context/Authority Isolation. Reviewer must not use past conversation, Memory, prior conclusions, search ranking, filename, recency, or completeness as Authority. Reviewer must use only the closed Manifest input set. Missing, conflicting, or ambiguous material required for reconstruction is BLOCKING; reviewer must not complete it by inference.

## Canonical Readiness Manifest Contract

A Manifest must identify the target Subsystem and bind the closed review set. It records:

- Repository
- Branch
- Commit/Version, or an explicit justified pre-adoption N/A state with content hashes
- Registry status/location
- Registry Version/Hash or explicit N/A state
- Operation Mode
- Required Canonical Inputs with exact version/hash
- Authority/lineage needed to determine Current/Superseded status

The Manifest is the closed input boundary for Fresh review.

## Canonical Readiness Gate

All eight criteria must PASS:

1. Canonical location is uniquely identifiable.
2. Authority is unique for the same matter.
3. Project-specific terminology is identifiable.
4. Required references resolve within the Manifest.
5. Current / Superseded / Rejected / Hold are distinguishable.
6. Contract / Schema / Interface are mutually consistent.
7. Decided and undecided matters are distinguishable.
8. Implementation specification is uniquely reconstructable without inference/completion.

If any criterion fails: `IMPLEMENTATION_BLOCKED`. If all pass, the Independent Reviewer emits Gate PASS Evidence; only CIAP Controller may issue `IMPLEMENTATION_ADMITTED`.

## Admission Binding

Admission binds to the exact Manifest and Canonical version/hash set reviewed. Admission is not transferable to materially different Canonical content.

## Canonical Change After Admission

A change to bound Canonical causes `ADMISSION_STALE` and Impact Classification. Binding-external changes alone do not stale Admission.

- `NON_AFFECTING_CHANGE`: no effect on Implementation Scope/Contract/Behavior/Acceptance is demonstrated by Evidence; Admission may be maintained with Impact Evidence.
- `AFFECTING_CHANGE`: affects the bound implementation or non-impact cannot be uniquely demonstrated; Re-Gate required.

Independent Impact Reviewer performs classification; CIAP Controller transitions Admission state after receiving Impact Evidence.

## M1 Implementation Boundary / OSS Freeze

CIAP M1 is Dev-Capsule Gate 0 and is independent of CONSOLE or a specific Agent harness.

CIAP-specific implementation owns:
- CIAP Controller
- State / Routing / Re-entry
- Canonical Readiness Manifest Contract
- Independent Reviewer Contract
- Finding / Gate Evidence / Admission Record Contract
- Semantic Readiness requirements
- Admission Authority

Adopted generic mechanisms:
- OPA / Rego — Policy Decision; Apache-2.0; no Admission Authority
- JSON Schema + Ajv — structural validation; Ajv MIT
- Git / existing CI event mechanism — Canonical change event source; change event alone does not determine stale/impact

Not adopted in M1 / Hold / Reference:
- Conftest — not adopted in M1
- CUE — not adopted in M1
- in-toto — Hold
- OpenFeature — Hold
- Backstage ADR method — Reference only
- Agent Harness — outside CIAP scope
- NORM runtime/Runner — upstream responsibility, not runtime-coupled

Ajv validates structure. OPA produces Policy Decision. Independent Reviewer produces Semantic Readiness Evidence. CIAP Controller owns Admission state and issuance.

## Explicit Supersession Map

The inherited Primary provisions below are non-normative where they assign normalization/transformation to CIAP:

| Inherited provision | Status | Current authority |
|---|---|---|
| §3.1 legacy BOOTSTRAP sequence `Canonical Inventory → Canonical Structuring → Definition Closure → Review / Correction → Registry Ready` | SUPERSEDED | Current CIAP Entry Sequence |
| §5 Canonical Inventory as CIAP-owned normalization | SUPERSEDED | NORM / Canonical Governance boundary |
| §6 Canonical Structuring as CIAP-owned normalization | SUPERSEDED | NORM / Canonical Governance boundary |
| §18 legacy BOOTSTRAP branch | SUPERSEDED | Current CIAP Entry Sequence |

CIAP retained responsibilities for Scope/Manifest Binding, Independent Readiness Review, Finding Classification, Gate, Admission, binding, change watch, impact classification, `ADMISSION_STALE`, and re-Gate routing remain normative.

## Current Admission State

Post-NORM Migration RC2 passed Independent Fresh Gate `8/8` with no findings on 2026-09-12. CIAP Controller subsequently issued successor Admission.

`IMPLEMENTATION_ADMITTED`

CIAP M1 implementation may proceed against the admitted bound Canonical. Any affecting Canonical change re-enters the stale/impact/re-Gate lifecycle.