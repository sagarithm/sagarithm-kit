# Examples: Advanced Defensive Security Patterns

## 1. Timing-Attack-Resistant Signature Verification

```typescript
import { createHmac, timingSafeEqual } from 'node:crypto';

export function verifyWebhookSignature(
  rawPayload: string,
  receivedSignatureHex: string,
  secretKey: string
): boolean {
  // 1. Compute expected HMAC-SHA256 signature
  const hmac = createHmac('sha256', secretKey);
  hmac.update(rawPayload, 'utf8');
  const expectedSignatureHex = hmac.digest('hex');

  // 2. Convert to Buffers for constant-time comparison
  const receivedBuffer = Buffer.from(receivedSignatureHex, 'hex');
  const expectedBuffer = Buffer.from(expectedSignatureHex, 'hex');

  // Prevent length discrepancy leakage
  if (receivedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  // 3. Constant-time comparison: Execution time is completely independent of matching bytes
  return timingSafeEqual(receivedBuffer, expectedBuffer);
}
```

---

## 2. SSRF-Safe URL Validation with Private IP Blocking

```typescript
import { lookup } from 'node:dns/promises';
import { isPrivateIP } from './ip-utils'; // Checks 127.0.0.0/8, 10.0.0.0/8, 169.254.169.254, etc.

export async function validateSafeOutgoingUrl(inputUrl: string): Promise<URL> {
  const parsed = new URL(inputUrl);

  // 1. Enforce strict HTTP/HTTPS protocol
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error(`Forbidden protocol: '${parsed.protocol}'`);
  }

  // 2. Resolve DNS hostname to raw IP address
  const dnsResult = await lookup(parsed.hostname);

  // 3. Block private/internal cloud infrastructure IPs
  if (isPrivateIP(dnsResult.address)) {
    throw new Error(`SSRF blocked: Attempt to access internal network IP '${dnsResult.address}'`);
  }

  return parsed;
}
```
