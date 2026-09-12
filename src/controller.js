export const AdmissionState = Object.freeze({
  UNASSESSED: 'UNASSESSED',
  BLOCKED: 'IMPLEMENTATION_BLOCKED',
  ADMITTED: 'IMPLEMENTATION_ADMITTED',
  STALE: 'ADMISSION_STALE'
});

export const FindingClass = Object.freeze({
  BLOCKING: 'BLOCKING',
  NON_BLOCKING: 'NON_BLOCKING',
  OUT_OF_SCOPE: 'OUT_OF_SCOPE'
});

export function determineOperationMode({ registryUsable, authorityResolvable, manifestClosable }) {
  if (!registryUsable || !authorityResolvable || !manifestClosable) return 'BOOTSTRAP';
  return 'STEADY_STATE';
}

export function classifyGate({ gateResults, findings = [] }) {
  const allEightPresent = Array.isArray(gateResults) && gateResults.length === 8;
  const allPass = allEightPresent && gateResults.every((g) => g?.decision === 'PASS');
  const blocking = findings.filter((f) => f?.classification === FindingClass.BLOCKING);
  return {
    gate: allPass && blocking.length === 0 ? 'PASS' : 'FAIL',
    blockingCount: blocking.length,
    score: allEightPresent ? gateResults.filter((g) => g?.decision === 'PASS').length : 0
  };
}

export function issueAdmission({ gateEvidence, manifestBinding }) {
  if (!manifestBinding?.manifestId || !Array.isArray(manifestBinding?.canonical)) {
    throw new Error('CIAP_MANIFEST_BINDING_REQUIRED');
  }
  if (gateEvidence?.gate !== 'PASS' || gateEvidence?.score !== 8 || gateEvidence?.blockingCount !== 0) {
    return {
      state: AdmissionState.BLOCKED,
      reason: 'CANONICAL_READINESS_GATE_NOT_PASS'
    };
  }
  return {
    state: AdmissionState.ADMITTED,
    manifestId: manifestBinding.manifestId,
    canonical: manifestBinding.canonical
  };
}

export function onCanonicalChange({ admission, changedBindings }) {
  if (admission?.state !== AdmissionState.ADMITTED) return admission;
  const bound = new Set((admission.canonical || []).map((x) => `${x.path}:${x.hash}`));
  const affectsBinding = (changedBindings || []).some((x) => {
    for (const entry of bound) {
      const [path, hash] = entry.split(':');
      if (path === x.path && hash !== x.hash) return true;
    }
    return false;
  });
  return affectsBinding ? { ...admission, state: AdmissionState.STALE } : admission;
}

export function applyImpactEvidence({ admission, impactEvidence }) {
  if (admission?.state !== AdmissionState.STALE) return admission;
  if (impactEvidence?.decision === 'NON_AFFECTING_CHANGE' && impactEvidence?.independent === true) {
    return { ...admission, state: AdmissionState.ADMITTED, impactEvidenceId: impactEvidence.id };
  }
  return { ...admission, state: AdmissionState.STALE, reGateRequired: true };
}
