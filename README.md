# CONSOLE-Dev-Capsule-CIAP

Canonical Implementation Admission Pipeline (CIAP) is Dev-Capsule SAFETY Gate 0. It verifies whether a Subsystem's authoritative Canonical specification is sufficiently closed and unambiguous to permit implementation.

## Current status

**IMPLEMENTATION_ADMITTED — M1 IMPLEMENTATION STARTED**

Post-NORM Responsibility Migration RC2 completed the required lifecycle on 2026-09-12:

```text
Amendment 002 ADOPTED
→ prior Admission ADMISSION_STALE
→ NORM(CIAP) NORMALIZATION_COMPLETE
→ consolidated Current Canonical RC2
→ Independent Fresh Gate PASS 8/8
→ Findings NONE
→ CIAP Controller IMPLEMENTATION_ADMITTED
→ M1 implementation STARTED
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
- `canonical/CIAP_AMENDMENT_001_Governance-Authority-Resolution_2026-09-11.md`
- `canonical/CIAP_AMENDMENT_002_NORM-Responsibility-Migration_2026-09-11.md`
- `canonical/CIAP_AMENDMENT_002_ADOPTION_RECORD_2026-09-11.md`
- `canonical/CIAP_CANONICAL_READINESS_MANIFEST_NORM_MIGRATION_RC2_2026-09-12.md`
- `evidence/NORM_CIAP_RC3_NORMALIZATION_COMPLETE_2026-09-11.md`
- `evidence/CIAP_INDEPENDENT_GATE_RESULT_NORM_MIGRATION_RC2_2026-09-12.md`
- `evidence/CIAP_IMPLEMENTATION_ADMISSION_NORM_MIGRATION_RC2_2026-09-12.md`

Historical pre-NORM Manifest/Gate/Admission evidence remains lineage and does not override current RC2 state.

## M1 implementation

Implemented first executable slice:

- `src/controller.js`
  - BOOTSTRAP / STEADY_STATE mode determination
  - Gate 8/8 classification
  - Controller-only Admission issuance
  - exact Canonical binding change → `ADMISSION_STALE`
  - independent Impact Evidence handling
- `schemas/manifest.schema.json`
  - closed Manifest structural contract
- `schemas/gate-evidence.schema.json`
  - eight Gate results + Finding structure
- `test/controller.test.js`
  - lifecycle invariants for mode, Gate, Admission, stale, unbound change, impact/re-Gate
- `package.json`
  - Node 20+ / Ajv M1 baseline

### Remaining M1 sequence

1. Finding + Admission Record schemas
2. Ajv validation adapter / CLI
3. OPA/Rego policy boundary
4. explicit routing/re-entry model
5. Git/CI change-event adapter and exact binding comparison
6. full M1 tests + implementation Evidence

## M1 OSS boundary

| Component | M1 role | License / status |
|---|---|---|
| OPA / Rego | Policy decision | Apache-2.0 |
| JSON Schema + Ajv | Structural validation | Ajv: MIT |
| Git / existing CI event mechanism | Canonical change event source | Git: GPL-2.0; CI depends on environment |
| Conftest | Not adopted in M1 | Apache-2.0 |
| CUE | Not adopted in M1 | Apache-2.0 |
| in-toto | Hold | Apache-2.0 |
| OpenFeature | Hold | Apache-2.0 |
| Backstage ADR method | Reference only | Not Authority |
| Agent Harness | Outside CIAP | — |
| NORM runtime / Runner | Outside CIAP runtime | upstream responsibility |

README is updated alongside Source Code and Evidence/Canonical additions so repository status remains synchronized with actual artifacts and Admission state.
