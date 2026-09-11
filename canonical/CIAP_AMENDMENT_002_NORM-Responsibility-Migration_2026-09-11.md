# CIAP Amendment 002 — NORM Responsibility Migration

**Status:** CANONICAL AMENDMENT — ADMISSION STALE PENDING RE-GATE
**Date:** 2026-09-11
**Amends:** `Canonical_Implementation_Admission_Pipeline_CIAP.md` §§1, 3, 5, 6, 7, 11, 14, 18, 19 responsibility/flow semantics
**Preserves:** Review A/B, Finding Classification, Independent Reviewer Contract, Canonical Readiness Gate, Admission Controller, Change Watch

## 1. Reason

CIAP was designed while design-normalization work was still being absorbed into the Admission pipeline. NORM — Agent-oriented Design Normalization — has since been separated and frozen as the upstream normalization responsibility.

The resulting architecture separates transformation from admission:

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

CIAP MUST NOT retain ownership of normalization merely because earlier CIAP BOOTSTRAP phases performed similar work.

## 2. Responsibility boundary

### NORM owns

- Inventory required to perform normalization.
- Terminology normalization.
- Identity normalization.
- Authority structuring without Authority origination.
- Responsibility normalization.
- State normalization.
- Contract/interface normalization.
- Reference normalization.
- Dependency normalization.
- Lifecycle/lineage normalization.
- Canonical structure formation as a normalization output.
- Authority-preserving correction/transformation.
- `NORMALIZATION_COMPLETE` / `NORMALIZATION_BLOCKED` termination.

### Canonical Governance owns

- Recognition and maintenance of authoritative Canonical status.
- Authority decisions that NORM is prohibited from originating.
- Explicit lineage / precedence / supersession where required.
- Authorized Canonical mutation.

### CIAP owns

- Subsystem Scope and closed Canonical Readiness Manifest.
- Independent Structure Review.
- Independent Content Review.
- Finding Classification for implementation Admission.
- Independent Canonical Readiness Gate.
- Admission Evidence validation.
- `IMPLEMENTATION_ADMITTED` / `IMPLEMENTATION_BLOCKED` issuance through CIAP Controller.
- Admission binding, stale detection, impact review routing, and Re-Gate.

CIAP MAY independently re-check properties also examined by NORM. Such re-checking is Admission verification and MUST NOT be interpreted as ownership of normalization.

## 3. Replacement for Primary §1 Purpose

For CIAP execution after this Amendment, Primary §1 is interpreted as follows:

> 対象Subsystemについて、Canonical GovernanceによりAuthorityが確立された正本を閉じた入力集合として固定し、その正本体系および正本内容がCanonical Readiness・Authority一意性・要件逸脱防止・実装仕様の決定論的再構築可能性を満たすことを独立Fresh-readで検証した上で、実装着手をAdmissionする。
>
> CIAPは設計情報のNormalization、Canonical Structuring、Definition Closureそのものを所有しない。CIAP ReviewでNormalization defectを検出した場合、CIAP自身が意味を補完・変換せず、Findingを固定してNORM / Canonical Governance / Authorized Correction Actorの適切な上流責務へ返す。

CIAP remains an Admission pipeline, not a normalization pipeline.

## 4. Operation Mode replacement

Primary §3 BOOTSTRAP MODE is superseded as a CIAP-owned normalization mode.

CIAP has one Admission flow:

```text
Subsystem Scope
→ Canonical Readiness Manifest
→ Structure Review
→ Content Review
→ Finding Classification
→ Independent Canonical Readiness Gate
→ Implementation Admission
```

If CIAP cannot build a closed Manifest because Canonical structure, Authority resolution, terminology, identity, state, contract, reference, dependency, responsibility, or lifecycle/lineage is insufficient, CIAP MUST NOT normalize those defects internally.

Instead:

```text
CIAP finding
→ upstream normalization / governance correction required
→ NORM and/or Canonical Governance
→ corrected Canonical
→ new Manifest binding
→ CIAP review resumes
```

The labels `BOOTSTRAP MODE` and `STEADY-STATE MODE` remain historical lineage only and MUST NOT define separate CIAP normalization ownership after this Amendment.

## 5. Primary §§5–7 supersession

Primary §§5 `Canonical Inventory`, 6 `Canonical Structuring`, and 7 `Definition Closure` are superseded as CIAP execution phases.

Their historical checks remain useful as defect categories, but CIAP MUST NOT perform their transformation/correction work.

When equivalent defects are observed during Review A/B or Gate:

- CIAP records the defect as Evidence.
- CIAP classifies impact as `BLOCKING / NON_BLOCKING / OUT_OF_SCOPE`.
- CIAP does not create missing Authority or design meaning.
- `BLOCKING` normalization defects are routed upstream.
- Canonical mutation is performed only by the Authority-preserving normalization/governance/correction responsibility authorized for the target Project.

Amendment 001 remains authoritative for the Authority Resolution rule: explicit target-project Registry / Superseded-Deprecated Register / source-declared lineage or equivalent existing Authority mechanism governs precedence and supersession; inability to resolve required Authority without inference is `BLOCKING`.

## 6. Review A/B preservation

Primary §§8–9 remain normative Admission reviews.

Their purpose is verification, not transformation.

A Review A/B finding that overlaps a NORM dimension does not transfer normalization ownership back to CIAP.

Example:

```text
NORM:
Authority is not deterministic
→ normalize if existing Authority uniquely permits
→ otherwise NORMALIZATION_BLOCKED

CIAP:
Is Authority deterministic in the supplied Canonical?
→ yes: continue Admission review
→ no: BLOCKING finding and upstream correction
```

## 7. Correction Loop replacement

Primary §11 is replaced for normalization-related findings by:

```text
REVIEW_FAIL
→ Finding Evidence fixed
→ CIAP Controller routes finding
   ├─ normalization defect → NORM
   ├─ Authority/design decision → Canonical Governance / Human Authority
   └─ authorized Canonical write → Canonical Owner / Authorized Correction Actor
→ corrected Canonical returned
→ Manifest binding refreshed where affected
→ New Independent Fresh Reviewer
→ Review A / Review B
```

CIAP Controller routes correction but does not itself normalize design meaning.

## 8. Implementation re-entry replacement

For Primary §14 re-entry rules:

- `Scope changed` → Scope Freeze / Manifest rebuild as applicable.
- `Canonical input missing / changed` → Manifest rebuild.
- `Normalization defect` → NORM; after correction, affected Canonical returns to CIAP.
- `Authority / authorized design decision required` → Canonical Governance / Human Authority; NORM may resume after the decision when normalization remains necessary.
- `Canonical write required` → Canonical Owner / Authorized Correction Actor.
- `Implementation ambiguity` → Finding Classification; CIAP does not fill the ambiguity.

## 9. Overall Flow replacement

Primary §18 is superseded by:

```text
UPSTREAM
Design Corpus
→ NORM
   ├─ NORMALIZATION_BLOCKED → Authority Decision → NORM resume
   └─ NORMALIZATION_COMPLETE
→ Canonical Governance
→ Canonical

CIAP
Subsystem Scope
→ Canonical Readiness Manifest
→ Canonical Structure Review
→ Canonical Content Review
→ Finding Classification
   ├─ BLOCKING normalization defect → NORM / Governance correction → return
   ├─ BLOCKING other defect → authorized correction → return
   └─ no BLOCKING
→ Independent Canonical Readiness Gate
   ├─ FAIL → IMPLEMENTATION_BLOCKED
   └─ PASS → CIAP Controller binding/evidence check
             → IMPLEMENTATION_ADMITTED
→ Implementation
→ bound Canonical changed?
   ├─ NO → continue
   └─ YES → ADMISSION_STALE → Impact Check / Re-Gate as defined by Primary §15
```

## 10. NORM dependency boundary

CIAP does not require a particular NORM runtime, Agent product, CLI, CONSOLE instance, or orchestration implementation.

CIAP's Admission contract depends only on the supplied Canonical and its explicit Authority/bindings. A target Project may use NORM upstream to produce normalized design, but CIAP does not invoke or embed NORM as an internal implementation dependency.

The architectural dependency is responsibility ordering, not runtime coupling.

## 11. Admission lifecycle consequence

This Amendment changes CIAP's own bound Process Contract responsibility model.

Therefore the prior CIAP self-admission must not be treated as current for the amended Canonical.

State after this Amendment:

`ADMISSION_STALE — RE-GATE REQUIRED`

The previous Admission Evidence remains historical Evidence for its original bound Canonical and MUST NOT be rewritten as though it admitted this Amendment.

CIAP must run normalization/readiness review against the amended Canonical input set and complete a new Independent Fresh-read Gate before issuing a successor `IMPLEMENTATION_ADMITTED` state.

## 12. Acceptance consequence

Primary §19 remains applicable with this addition:

> CIAP self-admission after Amendment 002 MUST demonstrate that an independent reviewer can reconstruct the NORM / Canonical Governance / CIAP responsibility boundary without relying on conversation history, Memory, or the historical BOOTSTRAP ownership model.

Until that successor Gate passes, CIAP implementation state is `ADMISSION_STALE`.