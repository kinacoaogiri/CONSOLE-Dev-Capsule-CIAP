# Canonical Implementation Admission Pipeline

## CIAP

**Status:** DRAFT --- Process Contract Candidate (CIAP Correction Applied)\
**Purpose:** Canonical Structuring / Readiness / Implementation
Admission\
**Applies to:** Subsystem-level implementation admission

------------------------------------------------------------------------

## 1. 目的

対象Subsystemについて、散在・重複・競合している設計情報を体系化された正本へ収束させ、その正本体系および正本内容の双方が、Canonical
Readiness・全体最適・Authority一意性・要件逸脱防止の観点で実装可能な状態にあることを確認した上で、実装着手を許可する。

CIAPは実装そのものを行わない。最終出力は `IMPLEMENTATION_ADMITTED`
または `IMPLEMENTATION_BLOCKED` とする。

CIAPは既存の Canonical Readiness Gate を置き換えない。

-   **CIAP** = 正本を実装Admission可能な状態まで収束させる上位Pipeline
-   **Canonical Readiness Gate** = CIAP終端の独立Fresh-read Admission
    Test

------------------------------------------------------------------------

## 2. 適用単位

CIAPは原則として **Subsystem単位**
で実施する。Project全体の完全監査を実装開始条件としてはならない。

対象Subsystemの実装に必要な範囲を閉じた入力集合として扱い、対象外の未確定事項を理由に無関係な実装を停止しない。

例: CCPC Canonical Resolution / Race Control Backend / Mission Scheduler
/ AssistantBOX・HardContext / AIME Browser Bridge

------------------------------------------------------------------------

## 3. Operation Mode

### 3.1 BOOTSTRAP MODE

正本体系が未整備、またはAuthorityを決定論的に解決できない場合に適用する。

Mode判定はCIAP Controllerが機械的に行う。以下のいずれかを満たす場合のみ `BOOTSTRAP MODE` とする。

- Project Canonical Registryが存在しない、または利用可能な状態にない。
- 対象Subsystemに必要なAuthorityをRegistryから決定論的に解決できず、Canonical Readiness Manifestを閉じた入力集合として構築できない。

上記に該当しない場合は `STEADY-STATE MODE` とする。STEADY-STATEで発見された局所的な不足・競合・曖昧性は、必要範囲のみDefinition Closure / Canonical Correctionへ戻し、BOOTSTRAPへ昇格させない。

``` text
Canonical Inventory
→ Canonical Structuring
→ Definition Closure
→ Review / Correction
→ Registry Ready
```

BOOTSTRAP
MODEは初期整備工程であり、通常の実装ごとに全面再実施してはならない。

### 3.2 STEADY-STATE MODE

Registryおよび正本体系が利用可能になった後の通常運用。

``` text
Subsystem Scope
→ Canonical Readiness Manifest
→ Structure Review
→ Content Review
→ Independent Canonical Readiness Gate
→ Implementation Admission
```

不足・競合・曖昧性が発見された場合のみ、必要範囲でDefinition Closure /
Canonical Correctionへ戻る。

------------------------------------------------------------------------

## 4. Phase 0 --- Scope Freeze

実装対象Subsystemを一意に固定する。

最低限、Subsystem名、Implementation Scope、Explicit
Out-of-Scope、Repository、Branch、Commit/Version、既知の依存Subsystem、Project
Canonical Registryの所在、既存Canonical IDを記録する。

このPhaseでは新たな設計判断を行わない。

------------------------------------------------------------------------

## 5. Phase 1 --- Canonical Inventory（BOOTSTRAP MODE）

### Authority ResolutionとDiscoveryの分離

既存Registryが存在する場合、Authority確認の第一入口は必ずRegistryとする。

Semantic Search、Keyword Search、Filename
Search等によるDiscovery結果をそのままAuthorityとして扱ってはならない。探索で発見した資料は、Authorityが明示的Lineage
/ Supersession / Registryから確認されるまで `DISCOVERY_EVIDENCE`
またはAuthority Candidateとして扱う。

Registry未整備のBOOTSTRAP時のみInventory
DiscoveryによるAuthority候補収集を許可する。

内容一致、Recency、Completeness、承認らしい表現、FilenameだけでAuthorityを決定してはならない。

分類:
`CANONICAL / REQUIREMENT / CANDIDATE / AMBIGUOUS / SUPERSEDED / REJECTED / HOLD / EVIDENCE / HISTORY / NOT_AUDITED / MISSING / DISCOVERY_EVIDENCE`

成果物: Canonical Inventory / Authority Candidate Map / Conflict List /
Missing Definition List

------------------------------------------------------------------------

## 6. Phase 2 --- Canonical Structuring（BOOTSTRAP MODE）

最低構成:

-   Canonical Registry / Manifest
-   Domain Dictionary
-   Architecture
-   State / Lifecycle
-   Contracts / Schemas / Interfaces
-   Active Requirements
-   Superseded / Deprecated Map
-   Open Ambiguities
-   Claim Boundary

同一ConceptのAuthorityを決定論的に解決できる構造にする。全情報を巨大な単一文書へ統合しない。Authority、Requirement、Supporting
Context、Evidence、Historyを混同しない。

Governance自身が、散在した非Canonical資料を整理したという理由だけで新たなAuthorityを生成してはならない。

------------------------------------------------------------------------

## 7. Phase 3 --- Definition Closure

固有名詞未定義、State/Transition未定義、Authority不明、Interface不明、Contract欠落、Schema不一致、Current/Superseded不明、意味変遷、同義語競合、文書間参照切れ、Required/Optional不明、Responsibility
owner不明を抽出する。

既存の明示的Authorityから一意に解決できる場合のみ既存Canonicalへ反映する。Supersession / Amendmentが必要な場合は、Canonical Governance側でAuthorityを持つ `Supersession / Amendment Contract` を参照し、そのContractに従う。CIAPはSupersession / Amendment Authorityを生成または二重実装しない。参照可能な同Contractが存在しない場合は `BLOCKING` とする。

複数の非Canonical資料が同じ意味を示すだけではAuthorityは発生しない。既存Authorityなしに統合定義を作る場合は
`CANDIDATE` とする。

Human判断が必要なものは推測で閉じず `OPEN_AMBIGUITY`
とする。対象Subsystemの実装に必要な場合のみBlocking候補となる。

------------------------------------------------------------------------

## 8. Review A --- Canonical Structure Review

### Canonical Readiness観点

1.  正本入口を一意に特定できる。
2.  AuthorityをRegistryから決定論的に解決できる。
3.  DictionaryからProject固有語彙を引ける。
4.  対象Subsystemに必要な文書間依存をManifestへ列挙できる。
5.  Current / Superseded / Rejected / Holdを判定できる。
6.  Status / Authority vocabularyが機械的に一意である。
7.  CandidateとCanonicalのAuthority表現が混在していない。
8.  Semantic SearchなしでAuthorityを解決できる。

「文書間参照が閉じている」とはProject全体の自己完結ではなく、対象Subsystemに必要な依存正本を特定し、Manifestの閉じた入力集合へ収容できることを意味する。

### 全体最適観点

1.  同一責務が複数正本へ不必要に重複していない。
2.  一文書へ責務を集約しすぎていない。
3.  Subsystem境界を侵食していない。
4.  AuthorityとSupporting Evidenceを混同していない。
5.  更新時に意味変遷やAuthority競合を起こしやすくない。
6.  Human / Agent双方がFresh-read可能である。
7.  機械Consumerが決定論的に利用できる。
8.  局所修正が他SubsystemのAuthorityを侵食していない。
9.  Project-wide exhaustive auditを不必要に要求しない。

------------------------------------------------------------------------

## 9. Review B --- Canonical Content Review

### Canonical Readiness観点

1.  固有名詞が一意に定義されている。
2.  State / Transitionが一意である。
3.  Authority Boundaryが明確である。
4.  Contract / Schema / Interfaceが整合している。
5.  Required / Optionalが区別されている。
6.  Required / Optionalを決定する責務主体が明確である。
7.  確定事項と未確定事項を判別できる。
8.  実装判断をAgentへ暗黙に委ねていない。
9.  推測なしで実装仕様を一意に再構築できる。

### 全体最適観点

1.  個別要件同士が衝突していない。
2.  Subsystem間Contractと矛盾していない。
3.  過去の確定事項を意図せず失っていない。
4.  新仕様が既存Architectureを局所最適化していない。
5.  State / Authority / Responsibilityが循環していない。
6.  同一Conceptを別名で再発明していない。
7.  Fail Closed / Escalation Boundaryが一貫している。
8.  実装後に不要な判断をHumanへ押し戻す設計になっていない。
9.  対象外の未確定事項を不必要なBlocking条件へ昇格していない。

------------------------------------------------------------------------

## 10. Finding Classification

Review A/BのFindingは修正前に分類する。

-   `BLOCKING`:
    対象Subsystemを現在の正本から一意に実装できない。修正または必要なHuman
    DecisionまでAdmission不可。
-   `NON_BLOCKING`:
    問題はあるが対象Subsystemの仕様再構築には影響しない。Evidenceへ記録しAdmissionを妨げない。
-   `OUT_OF_SCOPE`: 別Subsystemまたは今回の実装範囲外。Backlog/Open
    Ambiguity/Evidenceへ移し現在のCIAPを拡張しない。

------------------------------------------------------------------------

## 10.1 CIAP Controller / Actor Responsibility

CIAPの責務OwnerおよびAdmission Authorityは **Dev-Capsule SAFETY / CIAP** とし、CIAP ControllerがControl Planeとして機械的にProcessを発火・遷移させる。CONSOLEその他の実装HarnessはCIAPのAdmission Authorityを持たない。

責務を以下に固定する。

- Scope / Manifest確定検知: `CIAP Controller`
- Operation Mode判定: `CIAP Controller`
- Structure Review: `Independent Fresh Reviewer`
- Content Review: `Independent Fresh Reviewer`
- Finding Classification: `Independent Judge`
- Correction Dispatch: `CIAP Controller`
- Canonical Correction実施: `Canonical Owner` または当該Canonicalへの明示的なwrite authorityを持つ `Authorized Correction Actor`
- Open AmbiguityのMeaning / Authority Decision: `Human` または既存の明示的Authority。CIAP / Reviewer / Policy Engineは自動解決しない。
- Correction後Re-review: Correction実行とは別の `Independent Fresh Reviewer`
- Final Canonical Readiness Gate: `Independent Gate Reviewer`
- Gate Evidence受領後のAdmission発行: `CIAP Controller`
- Canonical Change Impact Classification: `Independent Impact Reviewer`
- Re-Gate Trigger / Admission State遷移: `CIAP Controller`

Reviewer / Judge / Impact ReviewerはAdmissionを発行しない。`IMPLEMENTATION_ADMITTED` は、Gate 8/8 PASS、必要Evidence完備、Manifest / Canonical version/hash Binding成立をCIAP Controllerが確認した場合にのみ機械発行する。

CIAPはReview AgentまたはAgent Harnessを内包することを要件としない。Review Executionは外部実行でよく、CIAPは本Contractを満たすReview Evidenceを受領・検証してAdmissionを制御する。

------------------------------------------------------------------------

## 10.2 Independent Reviewer Contract

Independent Reviewerの独立性はModelの別名性ではなく、`Fresh Execution + Context / Authority Isolation` で定義する。

Independent Reviewerは以下をすべて満たさなければならない。

- Fresh session / processで実行する。
- Canonical Readiness ManifestおよびManifest指定Primary Canonicalのみを読む。
- Conversation Historyを使用しない。
- Memoryを使用しない。
- 外部KnowledgeをPASS / FAIL根拠として使用しない。
- Manifest外Searchを行わない。
- Canonical write permissionを持たない。
- Implementation write permissionを持たない。
- Scope Freeze creator、Manifest creator、Canonical editor、Correction executorと同一executionであってはならない。

同一Modelを使用しても、上記条件を満たすFresh Executionであれば独立Reviewerとして扱える。既知情報であってもManifest外情報はPASS / FAIL根拠に使用してはならない。

------------------------------------------------------------------------

## 11. Correction Loop

`BLOCKING` Findingが存在する場合:

``` text
REVIEW_FAIL
→ Finding Evidence固定
→ CIAP ControllerがCanonical Owner / Authorized Correction ActorへCorrectionをDispatch
→ 対象正本のみ修正
→ New Independent Fresh ReviewerによるFresh-read
→ Review A
→ Review B
```

禁止:
Project全体の再監査、指摘範囲外への設計拡張、推測による新仕様追加、Open
Ambiguityの無断Closure、Gate条件の緩和、NON_BLOCKING/OUT_OF_SCOPEを理由とした実装停止。

------------------------------------------------------------------------

## 12. Canonical Readiness Manifest

正式Gate前に対象Subsystemの入力集合を固定する。

``` text
Subsystem:
Implementation Scope:

Repository:
Branch:
Commit:

Registry:
Registry Version / Hash:

Required Canonical Inputs:
- Canonical ID
- path
- exact version / commit / hash

Required Schemas / Contracts:
- path
- exact version / commit / hash

Known Non-Blocking Open Ambiguities:
- ...

Explicitly Excluded Sources:
- Conversation History
- Memory
- unrelated Evidence
- unrelated Project documents
```

Manifest自体もVersion/Hashを持つ。

Gate実施者はManifest外を探索してはならない。不足している場合は検索せず
`FAIL` とする。

------------------------------------------------------------------------

## 13. Independent Canonical Readiness Gate

Gate実施者には以下をHard Ruleとして与える。 Gate実施者は §10.2 Independent Reviewer Contract を満たす `Independent Gate Reviewer` でなければならない。

> あなたは対象Subsystemについて事前知識を持たない第三者である。
> Canonical Readiness
> Manifestに指定された正本だけを読み、実装に必要な現在仕様を再構築せよ。
> 過去会話、Memory、外部Knowledge、Manifest外ファイルを使用してはならない。
> AuthorityをSemantic
> Search、Filename、Recency、Completenessから推測してはならない。
> 不足、競合、曖昧性が存在する場合は検索または推測で補完せず、その箇所を特定してFAILとせよ。

判定項目:

1.  正本の所在を一意に特定できる。
2.  同一事項のAuthorityを一意に特定できる。
3.  固有名詞・Project固有語彙を正本内から特定できる。
4.  必要な文書間参照をManifest内だけで解決できる。
5.  Current / Superseded / Rejected / Holdを判別できる。
6.  Contract / Schema / Interfaceに矛盾がない。
7.  確定事項と未確定事項を判別できる。
8.  推測・補完なしに実装仕様を一意に再構築できる。

8/8のみ `PASS`。

### PASS Evidence

各項目について、判定、Canonical
ID、path、version/hash、根拠section、再構築した仕様要約をEvidenceとして残す。設計者自身の「理解できる」はPASS根拠として認めない。

------------------------------------------------------------------------

## 14. Implementation Admission

Gate PASS後、§10.1の発行条件をすべて満たした場合にのみ、CIAP Controllerが `IMPLEMENTATION_ADMITTED` を機械発行する。Gate Reviewerその他のReview実施者はAdmissionを発行しない。

Admission Recordへ、Subsystem、Implementation Scope、Manifest
version/hash、Repository/Branch/Commit、Canonical input
versions/hashes、Gate executor、Gate Evidence、PASS timestamp、Known
NON_BLOCKING Open Ambiguitiesを固定する。

Implementation TeamはAdmission
RecordにBindingされた正本を実装基準とする。Manifest外資料をAuthorityとして追加採用してはならない。

実装中に仕様不足を発見した場合、実装側で補完せずCIAPへ戻す。再入Pointは以下に固定する。

- `Scope changed` → `Scope Freeze`
- `Canonical input missing / changed` → `Manifest rebuild`
- `Definition / Authority defect` → `Definition Closure`
- `Structure defect` → `Structure Correction`
- `Content defect` → `Content Correction`
- `Implementation ambiguity` → `Finding Classification`
  - `BLOCKING` → Findingに対応するCorrection Phase
  - `NON_BLOCKING` → Evidenceへ記録しAdmissionを妨げない
  - `OUT_OF_SCOPE` → 別Backlog / Open Ambiguity / Evidenceへ分離し現在Scopeを拡張しない

Scope自体が変更されていない場合、Scope Freezeから全面再実施しない。

------------------------------------------------------------------------

## 15. Canonical Change After Admission

AdmissionはPASS時点のManifestおよびCanonical version/hashへBindingする。

Admission後、Change EventをAdmission Record / Manifest Bindingと照合し、Binding対象Canonicalのpath/version/hashに変更が確認された場合のみ `ADMISSION_STALE` とする。Binding対象外の変更だけを理由にAdmissionをSTALE化しない。

Impact Classificationは `Independent Impact Reviewer` が行う。Implementation Team単独、Canonical Correction実施者単独、CIAP Controller単独で `NON_AFFECTING_CHANGE` を自己判定してはならない。CIAP ControllerはImpact Evidenceを受領してAdmission Stateを遷移させる。

-   `NON_AFFECTING_CHANGE`: Implementation Scope / Contract / Behavior /
    Acceptanceへ影響しないことをEvidenceで確認できる。Admission維持 +
    Impact Evidence。
-   `AFFECTING_CHANGE`:
    影響する、または影響なしと一意に証明できない。Re-Gate required。

``` text
Canonical Change
→ ADMISSION_STALE
→ Impact Classification
   ├─ NON_AFFECTING_CHANGE → Admission maintained + Evidence
   └─ AFFECTING_CHANGE → Re-Gate
```

------------------------------------------------------------------------

## 16. FAIL時

Gate項目を1つでも満たさない場合 `IMPLEMENTATION_BLOCKED`。

不足・競合・曖昧箇所をEvidenceへ記録し、`BLOCKING / NON_BLOCKING / OUT_OF_SCOPE`
へ分類する。`BLOCKING`
Findingのみを対象正本側へ戻す。実装側で推測・補完してはならない。

------------------------------------------------------------------------

## 17. CIAP原則

CIAPは「設計者が理解している」ことを証明する仕組みではない。

証明対象は、

> 設計者以外の独立した第三者が、固定された正本だけから、推測せず同一の実装仕様を再構築できること。

正本を探す能力、過去会話を覚えている能力、Projectに詳しい能力をPASS条件へ含めてはならない。

同時にCIAP自身がRelease
Scheduleを阻害する無制限監査へ変質してはならない。

そのため
`Per-Subsystem / Closed Manifest / Finding Classification / BOOTSTRAP・STEADY-STATE分離 / Impact-based Re-Gate`
を必須原則とする。

------------------------------------------------------------------------

## 18. Overall Flow

``` text
BOOTSTRAP MODE
Canonical Inventory
→ Canonical Structuring
→ Definition Closure
→ Registry Ready

STEADY-STATE MODE
Subsystem Scope Freeze
→ Canonical Readiness Manifest
→ Canonical Structure Review
→ Canonical Content Review
→ Finding Classification
   ├─ BLOCKING → Correction → Re-review
   └─ no BLOCKING
→ Independent Canonical Readiness Gate
   ├─ FAIL → IMPLEMENTATION_BLOCKED
   └─ PASS → IMPLEMENTATION_ADMITTED
→ Implementation
→ Canonical Changed?
   ├─ NO → continue
   └─ YES → ADMISSION_STALE → Impact Check
       ├─ NON_AFFECTING_CHANGE → continue + Evidence
       └─ AFFECTING_CHANGE → Re-Gate
```

------------------------------------------------------------------------

## 18.1 M1 Implementation Boundary / OSS Freeze

CIAP M1はDev-CapsuleのGate 0として実装し、CONSOLEその他の特定Harnessへ依存しない。CIAP固有責務と汎用機能の境界を以下に固定する。

### CIAP固有

- CIAP Controller
- State / Routing / Re-entry
- Canonical Readiness Manifest Contract
- Independent Reviewer Contract
- Finding / Gate Evidence / Admission Record Contract
- Semantic Readiness要件
- Admission Authority

### OSS / Existing Mechanism

- `OPA / Rego` — Policy Decision。License: Apache-2.0。Admission Authorityは持たない。
- `JSON Schema + Ajv` — Manifest / Finding / Gate Evidence / Admission Recordの構造検証。Ajv License: MIT。
- `Git / existing CI event mechanism` — Canonical Change Event source。Change Event単独ではSTALE化せず、Admission Binding照合後に対象Canonical変更のみを発火対象とする。Git License: GPL-2.0。CI mechanismのLicenseは採用環境に従う。

### M1 Non-Adopted / Hold / Reference

- `Conftest` — M1不採用。OPAとの責務重複を避ける。License: Apache-2.0。
- `CUE` — M1不採用。JSON Schema / Ajvとの責務重複を避ける。License: Apache-2.0。
- `in-toto` — M1 Hold。Attestation候補。License: Apache-2.0。
- `OpenFeature` — M1 Hold。段階導入候補。License: Apache-2.0。
- `Backstage ADR方式` — Reference Only。Supersession / Amendment Authorityとして採用しない。
- `Agent Harness` — CIAP実装対象外。CIAPへ内包しない。

Policy DecisionとEnforcement / Admission Authorityを分離する。Ajvは構造妥当性、OPAはPolicy Decision、Independent ReviewerはSemantic Readiness Evidence、CIAP ControllerはAdmission Stateと発行を担当する。

------------------------------------------------------------------------

## 19. Acceptance

CIAP自身を正本化する前に、CIAPを対象SubsystemとしてCanonical Readiness
Gateへ通す。

CIAPが自身の要求するAuthority一意性、Terminology、Contract、Status、Review
responsibility、Admission
lifecycleを第三者Fresh-readで一意に再構築できることを確認する。

`PASS`後、CIAPをImplementation Admissionの正式Process
Contractとして採用する。
