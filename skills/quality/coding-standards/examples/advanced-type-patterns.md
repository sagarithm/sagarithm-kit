# Examples: Advanced Type Patterns & Result Types

## 1. The Result Monad (Type-Safe Errors Without Throws)

Throwing exceptions bypasses normal control flow and can easily be forgotten by callers. The `Result<T, E>` pattern forces callers to handle failure explicitly:

```typescript
export type Result<T, E = Error> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };

export function Ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function Err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

// Usage Example:
export function parsePortNumber(input: string): Result<number, string> {
  const port = Number.parseInt(input, 10);
  if (Number.isNaN(port)) {
    return Err(`Port '${input}' is not a valid number`);
  }
  if (port < 1 || port > 65535) {
    return Err(`Port ${port} must be between 1 and 65535`);
  }
  return Ok(port);
}

// Caller must explicitly branch on .ok:
const result = parsePortNumber('8080');
if (result.ok) {
  console.log('Listening on port:', result.value);
} else {
  console.error('Configuration error:', result.error);
}
```
