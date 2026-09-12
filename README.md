# CONSOLE-Dev-Capsule-CIAP

Canonical Implementation Admission Pipeline (CIAP) is Dev-Capsule SAFETY Gate 0. It verifies whether a Subsystem's authoritative Canonical specification is sufficiently closed and unambiguous to permit implementation.

## Current status

**IMPLEMENTATION_ADMITTED — M1 IMPLEMENTATION MAY PROCEED**

Post-NORM Responsibility Migration RC2 completed the required lifecycle on 2026-09-12:

```text
Amendment 002 ADOPTED
→ prior Admission ADMISSION_STALE
→ NORM(CIAP) NORMALIZATION_COMPLETE
→ consolidated Current Canonical RC2
→ Independent Fresh Gate PASS 8/8
→ Findings NONE
→ CIAP Controller IMPLEMENTATION_ADMITTED
```

## Responsibility architecture

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

NORM performs design normalization. Canonical Governance owns authoritative Canonical status and authorized design/Authority decisions. CIAP independently verifies the resulting Canonical and controls implementation Admission. CIAP does not normalize design meaning merely to make a Gate pass.

## Current Canonical / Evidence

- `Canonical_Implementation_Admission_Pipeline_CIAP.md` — consolidated current CIAP Process Contract after NORM migration
- `canonical/CIAP_AMENDMENT_001_Governance-Authority-Resolution_2026-09-11.md` — historical/current lineage for Authority Resolution correction
- `canonical/CIAP_AMENDMENT_002_NORM-Responsibility-Migration_2026-09-11.md` — responsibility migration amendment
- `canonical/CIAP_AMENDMENT_002_ADOPTION_RECORD_2026-09-11.md` — adoption record
- `canonical/CIAP_CANONICAL_READINESS_MANIFEST_NORM_MIGRATION_RC2_2026-09-12.md` — RC2 review/admission Manifest record
- `evidence/NORM_CIAP_RC3_NORMALIZATION_COMPLETE_2026-09-11.md` — NORM completion evidence
- `evidence/CIAP_INDEPENDENT_GATE_RESULT_NORM_MIGRATION_RC2_2026-09-12.md` — Fresh Gate PASS 8/8
- `evidence/CIAP_IMPLEMENTATION_ADMISSION_NORM_MIGRATION_RC2_2026-09-12.md` — successor Admission record

Historical pre-NORM Manifest/Gate/Admission evidence remains in the repository as lineage and does not override the current RC2 state.

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
| NORM runtime / Runner | Outside CIAP implementation scope | upstream responsibility, not runtime-coupled |

## M1 implementation sequence

1. CIAP Controller and lifecycle state model
2. Manifest / Finding / Gate Evidence / Admission Record JSON Schemas with Ajv validation
3. OPA/Rego policy boundary for mechanical policy decisions
4. Routing and re-entry behavior
5. Canonical binding and Git/CI change-event handling
6. tests and Evidence

README is updated alongside Source Code and Evidence/Canonical additions so repository status remains synchronized with actual artifacts and Admission state.
