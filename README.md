# CONSOLE-Dev-Capsule-CIAP

Canonical Implementation Admission Pipeline (CIAP) is Dev-Capsule SAFETY Gate 0. It verifies whether a Subsystem's fixed Canonical specification is sufficiently authoritative, closed, and unambiguous to permit implementation.

## Current status

**ADMISSION_STALE — RE-GATE REQUIRED**

CIAP previously completed self-admission on 2026-09-11 and received `IMPLEMENTATION_ADMITTED` for its then-bound Canonical. That Admission remains valid historical Evidence for the exact Canonical it bound.

NORM — Agent-oriented Design Normalization — has since been frozen as the upstream normalization responsibility. `canonical/CIAP_AMENDMENT_002_NORM-Responsibility-Migration_2026-09-11.md` removes normalization/transformation ownership from CIAP while preserving CIAP's independent verification and Admission responsibilities.

Because Amendment 002 changes CIAP's own Process Contract responsibility model, the prior Admission does not admit the amended Canonical. CIAP is therefore `ADMISSION_STALE` until the amended input set passes normalization/readiness review and a new Independent Fresh-read Gate.

## Responsibility architecture

```text
Design Corpus
    ↓
NORM
Normalize / Transform
    ↓
Canonical Governance
Authority / Canonical status
    ↓
CIAP
Verify / Admit
    ↓
IMPLEMENTATION_ADMITTED or IMPLEMENTATION_BLOCKED
```

NORM performs normalization. Canonical Governance owns authoritative Canonical status and authorized design/Authority decisions. CIAP verifies the resulting Canonical and controls implementation Admission.

CIAP may re-check the same semantic dimensions during Review A/B and Gate, but such checks are verification only and do not make CIAP the owner of normalization.

## Canonical review inputs

- `Canonical_Implementation_Admission_Pipeline_CIAP.md` — Primary Process Contract Candidate
- `canonical/CIAP_AMENDMENT_001_Governance-Authority-Resolution_2026-09-11.md` — target-project Authority Resolution correction to Primary §7
- `canonical/CIAP_AMENDMENT_002_NORM-Responsibility-Migration_2026-09-11.md` — transfers normalization responsibility upstream to NORM and marks prior Admission stale
- `canonical/CIAP_CANONICAL_READINESS_MANIFEST_2026-09-11.md` — historical self-admission Manifest; must be refreshed/rebound before successor Admission

## Evidence

- `evidence/CIAP_SELF_ADMISSION_AUTHORITY_CHECK_2026-09-11.md` — historical authority check and correction Evidence
- `evidence/CIAP_INDEPENDENT_GATE_RESULT_2026-09-11.md` — historical Independent Fresh-read Gate result (`PASS`, `8/8`)
- `evidence/CIAP_IMPLEMENTATION_ADMISSION_2026-09-11.md` — historical CIAP Controller Admission Record (`IMPLEMENTATION_ADMITTED`) for the pre-Amendment-002 binding

Evidence is supporting material, not Canonical Authority unless explicitly promoted by an authorized process.

## M1 implementation boundary

CIAP-specific implementation owns the Controller, state/routing/re-entry, Manifest/Evidence/Admission Record contracts, Semantic Readiness requirements, and Admission Authority. CIAP remains independent of CONSOLE and does not embed an Agent Harness or NORM runtime.

| Component | M1 role | License / status |
|---|---|---|
| OPA / Rego | Policy decision | Apache-2.0 |
| JSON Schema + Ajv | Structural validation | Ajv: MIT |
| Git / existing CI event mechanism | Canonical change event source | Git: GPL-2.0; CI depends on environment |
| Conftest | Not adopted in M1 | Apache-2.0 |
| CUE | Not adopted in M1 | Apache-2.0 |
| in-toto | Hold for later phase | Apache-2.0 |
| OpenFeature | Hold for later phase | Apache-2.0 |
| Backstage ADR method | Reference only | Not an Authority mechanism |
| Agent Harness | Outside CIAP implementation scope | — |
| NORM runtime / Runner | Outside CIAP implementation scope | responsibility is upstream, not runtime-coupled |

## Admission state

```text
Historical Canonical
→ Independent Fresh-read Gate PASS 8/8
→ IMPLEMENTATION_ADMITTED

NORM responsibility separated and frozen
→ CIAP Amendment 002
→ bound Process Contract changed
→ ADMISSION_STALE ← CURRENT
→ amended Canonical normalization/readiness review
→ refreshed Manifest binding
→ Independent Fresh-read Gate
→ successor Admission decision
```

## Historical NON_BLOCKING Gate findings

- `CIAP-GATE-001` — Semantic Readiness Evidence cross-reference tightening
- `CIAP-GATE-002` — Manifest lifecycle-status vocabulary tightening
- `CIAP-GATE-003` — Independent-role contract applicability tightening
- `CIAP-GATE-004` — repository-commit vs file-blob baseline-binding tightening

These remain historical Evidence. Their applicability to the amended Canonical is determined by the successor review rather than assumed.

README is updated alongside Source Code and Evidence/Canonical additions so public repository status remains synchronized with actual artifacts and Admission state.