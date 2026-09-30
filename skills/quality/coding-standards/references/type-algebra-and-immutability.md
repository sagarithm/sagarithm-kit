# Reference: Advanced Type Algebra & Concurrency Safety

## 1. Branded (Nominal) Types in Structural Type Systems

In TypeScript, Go, or Python, structural typing allows accidental mixing of identical primitive types (e.g. passing a `CustomerId` into a function expecting an `OrderId` because both are `string`).

### The Branded Type Pattern
```typescript
// Type-safe branded types
export type Brand<K, T> = K & { readonly __brand: T };

export type UserId = Brand<string, 'UserId'>;
export type OrderId = Brand<string, 'OrderId'>;

export function makeUserId(id: string): UserId {
  return id as UserId;
}

export function makeOrderId(id: string): OrderId {
  return id as OrderId;
}

function processOrder(userId: UserId, orderId: OrderId) { /* ... */ }

// Compiler Error: Argument of type 'OrderId' is not assignable to 'UserId'
// processOrder(orderId, userId);
```

---

## 2. Exhaustive Type Narrowing with Discriminated Unions

When handling multi-state workflows (e.g. payment states: `pending`, `authorized`, `captured`, `failed`), use tagged unions and an exhaustiveness helper to guarantee compile-time safety when new states are added:

```typescript
export function assertNever(x: never): never {
  throw new Error(`Unexpected object: ${JSON.stringify(x)}`);
}

type PaymentState =
  | { status: 'PENDING' }
  | { status: 'AUTHORIZED'; authCode: string }
  | { status: 'CAPTURED'; transactionId: string }
  | { status: 'FAILED'; reason: string };

function renderPayment(state: PaymentState): string {
  switch (state.status) {
    case 'PENDING':
      return 'Payment is processing...';
    case 'AUTHORIZED':
      return `Authorized with code: ${state.authCode}`;
    case 'CAPTURED':
      return `Captured transaction: ${state.transactionId}`;
    case 'FAILED':
      return `Payment failed: ${state.reason}`;
    default:
      // If a new status (e.g. 'REFUNDED') is added, TypeScript will fail here at build time!
      return assertNever(state);
  }
}
```

---

## 3. Asynchronous Concurrency & Cancellation Tokens

AI coding agents often write async operations that ignore cancellation or race conditions.
1. **Pass `AbortSignal`**: Any network request, heavy computation, or polling loop must accept an optional `AbortSignal`.
2. **Prevent Stale Race Conditions**: In frontend code, when multiple requests fire for the same entity, cancel previous in-flight requests or ignore responses if a newer request has already resolved.
