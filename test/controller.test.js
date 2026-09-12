import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AdmissionState,
  determineOperationMode,
  classifyGate,
  issueAdmission,
  onCanonicalChange,
  applyImpactEvidence
} from '../src/controller.js';

const passEight = Array.from({ length: 8 }, (_, i) => ({ gate: i + 1, decision: 'PASS' }));
const binding = { manifestId: 'M1', canonical: [{ path: 'canonical/a.md', hash: 'a'.repeat(64) }] };

test('BOOTSTRAP when registry is unusable', () => {
  assert.equal(determineOperationMode({ registryUsable: false, authorityResolvable: true, manifestClosable: true }), 'BOOTSTRAP');
});

test('STEADY_STATE only when registry/authority/manifest are usable', () => {
  assert.equal(determineOperationMode({ registryUsable: true, authorityResolvable: true, manifestClosable: true }), 'STEADY_STATE');
});

test('8/8 no blocking findings passes gate', () => {
  assert.deepEqual(classifyGate({ gateResults: passEight, findings: [] }), { gate: 'PASS', blockingCount: 0, score: 8 });
});

test('controller issues Admission only after PASS 8/8', () => {
  const result = issueAdmission({ gateEvidence: { gate: 'PASS', score: 8, blockingCount: 0 }, manifestBinding: binding });
  assert.equal(result.state, AdmissionState.ADMITTED);
});

test('bound canonical change makes Admission stale', () => {
  const admission = issueAdmission({ gateEvidence: { gate: 'PASS', score: 8, blockingCount: 0 }, manifestBinding: binding });
  const changed = onCanonicalChange({ admission, changedBindings: [{ path: 'canonical/a.md', hash: 'b'.repeat(64) }] });
  assert.equal(changed.state, AdmissionState.STALE);
});

test('unbound change does not stale Admission', () => {
  const admission = issueAdmission({ gateEvidence: { gate: 'PASS', score: 8, blockingCount: 0 }, manifestBinding: binding });
  const unchanged = onCanonicalChange({ admission, changedBindings: [{ path: 'other.md', hash: 'b'.repeat(64) }] });
  assert.equal(unchanged.state, AdmissionState.ADMITTED);
});

test('independent NON_AFFECTING impact may restore Admission', () => {
  const stale = { state: AdmissionState.STALE, ...binding };
  const result = applyImpactEvidence({ admission: stale, impactEvidence: { id: 'I1', decision: 'NON_AFFECTING_CHANGE', independent: true } });
  assert.equal(result.state, AdmissionState.ADMITTED);
});

test('affecting/insufficient impact requires re-gate', () => {
  const stale = { state: AdmissionState.STALE, ...binding };
  const result = applyImpactEvidence({ admission: stale, impactEvidence: { id: 'I2', decision: 'AFFECTING_CHANGE', independent: true } });
  assert.equal(result.reGateRequired, true);
});
