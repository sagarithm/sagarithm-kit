# Examples: Property-Based Testing with Fast-Check

```typescript
import { describe, it } from 'vitest';
import fc from 'fast-check';
import { encodeBase64Url, decodeBase64Url } from './encoding-utils';
import { calculateCartTotal, type CartItem } from './cart-calculator';

describe('Property-Based Invariant Testing', () => {
  it('Property: base64url encoding and decoding is perfectly isomorphic (Round-Trip)', () => {
    fc.assert(
      fc.property(fc.string(), (originalText) => {
        const encoded = encodeBase64Url(originalText);
        const decoded = decodeBase64Url(encoded);
        return decoded === originalText;
      }),
      { numRuns: 500 } // Test across 500 randomly generated edge-case strings
    );
  });

  it('Property: cart total must never be negative regardless of discount or quantity', () => {
    // Generate arbitrary lists of cart items with positive prices and quantities
    const itemArbitrary = fc.record<CartItem>({
      id: fc.uuid(),
      price: fc.float({ min: 0.01, max: 10000, noNaN: true }),
      quantity: fc.integer({ min: 1, max: 100 })
    });

    fc.assert(
      fc.property(fc.array(itemArbitrary), fc.float({ min: 0, max: 1 }), (items, discountRatio) => {
        const total = calculateCartTotal(items, discountRatio);
        return total >= 0 && Number.isFinite(total);
      }),
      { numRuns: 1000 }
    );
  });
});
```
