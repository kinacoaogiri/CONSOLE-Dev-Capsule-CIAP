# CIAP Amendment 001 — Governance Authority Resolution

**Status:** CANONICAL AMENDMENT CANDIDATE — applies to CIAP self-admission review input
**Date:** 2026-09-11
**Amends:** `Canonical_Implementation_Admission_Pipeline_CIAP.md` §7 only
**Base blob:** `80f20d0d92009704bf1c046a04cae34c87f03c83`

## 1. Reason

The CIAP Primary §7 referenced a specifically named `Supersession / Amendment Contract`. A fresh authority check against the existing CONSOLE Canonical Governance baseline at commit `677402ce6b4503de7255b9bf820e9ae2127fd672` found no artifact with that contract identity.

The actual governance baseline uses a Canonical Registry/Manifest, a Superseded / Deprecated Register, and explicit source-declared lineage/precedence. The Registry explicitly states that governance may record Authority or apply precedence already stated by source documents, but may not create Authority from completeness, approval, recency, or consolidation alone. The Superseded / Deprecated Register records only explicit lineage and refuses to mark unresolved conflicts as superseded.

Therefore the named-contract dependency in §7 was over-specific and did not match the existing governance mechanism.

## 2. Replacement rule for Primary §7

The following paragraph supersedes the paragraph in Primary §7 beginning `既存の明示的Authorityから一意に解決できる場合のみ`:

> 既存の明示的Authorityから一意に解決できる場合のみ既存Canonicalへ反映する。Supersession / Amendmentが必要な場合は、対象ProjectのCanonical Governanceが明示的にAuthorityを持つRegistry / Superseded・Deprecated Register / source-declared lineage等の既存Authority Resolution mechanismを参照し、その明示的なprecedence / lineage / supersession記録に従う。CIAPはSupersession / Amendment Authorityを生成または二重実装しない。必要なSupersession / Amendmentについて明示的Authorityまたはlineageを解決できない場合は `BLOCKING` とする。

## 3. Authority boundary

This Amendment does not make CONSOLE Canonical Governance a runtime dependency of CIAP. CIAP remains project- and harness-independent. For each target project, CIAP consumes that project's explicit Authority Resolution mechanism when Supersession / Amendment is actually required.

Absence of a document literally named `Supersession / Amendment Contract` is therefore not itself a CIAP blocking condition. The blocking condition is inability to resolve the required Authority / lineage without inference.

## 4. Evidence baseline used for this correction

- Repository: `kinacoaogiri/CONSOLE`
- Branch/revision inspected: `canonical-governance-audit`
- Commit: `677402ce6b4503de7255b9bf820e9ae2127fd672`
- Governance Registry blob: `a5d051c707e08fc95c15e3316a93af6b6ed22a28`
- Superseded / Deprecated Register blob: `210e6e9b08b97fc9f55513768903c10fe4d7708b`

This evidence establishes the correction target only. These CONSOLE governance artifacts are not automatically part of a future target Subsystem Manifest unless that target requires them.