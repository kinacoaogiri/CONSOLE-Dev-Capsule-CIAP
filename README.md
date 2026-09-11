# CONSOLE-Dev-Capsule-CIAP

Canonical Implementation Admission Pipeline (CIAP) is Dev-Capsule SAFETY Gate 0. It determines whether a Subsystem's fixed Canonical specification is sufficiently authoritative, closed, and unambiguous to permit implementation.

## Current status

**SELF-ADMISSION IN PROGRESS — IMPLEMENTATION NOT YET ADMITTED**

The CIAP Process Contract Candidate is frozen for review. A self-admission prerequisite defect concerning a presumed universal `Supersession / Amendment Contract` was authority-checked and corrected through Amendment 001. The CIAP self-admission Canonical Readiness Manifest has now been created. The next required step is an Independent Fresh-read Canonical Readiness Gate; 8/8 PASS is required before M1 source implementation starts.

## Canonical review inputs

- `Canonical_Implementation_Admission_Pipeline_CIAP.md` — Primary Process Contract Candidate
- `canonical/CIAP_AMENDMENT_001_Governance-Authority-Resolution_2026-09-11.md` — correction to Primary §7
- `canonical/CIAP_CANONICAL_READINESS_MANIFEST_2026-09-11.md` — closed input set for CIAP self-admission

## Evidence

- `evidence/CIAP_SELF_ADMISSION_AUTHORITY_CHECK_2026-09-11.md` — authority check and correction evidence

Evidence is supporting material, not Canonical Authority unless explicitly promoted by an authorized process.

## M1 implementation boundary

CIAP-specific implementation will own the Controller, state/routing/re-entry, Manifest/Evidence/Admission Record contracts, Semantic Readiness requirements, and Admission Authority. CIAP remains independent of CONSOLE and does not embed an Agent Harness.

Planned OSS boundaries from the Process Contract Candidate:

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

## Admission state

```text
Primary correction applied
        ↓
Canonical Readiness Manifest created
        ↓
Independent Fresh-read Gate   ← NEXT
        ↓
8/8 PASS ?
  ├─ NO  → IMPLEMENTATION_BLOCKED → Correction Loop
  └─ YES → CIAP Controller issues IMPLEMENTATION_ADMITTED
                                      ↓
                               M1 implementation
```

Source code will not be added before CIAP passes its own Admission Gate. README is updated alongside Source Code and Evidence additions so public repository status does not claim work that has not actually been admitted or produced.
