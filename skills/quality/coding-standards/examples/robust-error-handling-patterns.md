# Examples: Robust Error Handling Patterns

## 1. Anti-Pattern: Swallowed Errors & Untyped Throws

```typescript
// ❌ BAD: Silent swallow, untyped error, magic strings
async function fetchAccount(id: string): Promise<any> {
  try {
    const res = await api.get('/accounts/' + id);
    return res.data;
  } catch (e) {
    // Error swallowed completely; caller receives null or undefined with no trace
    return null;
  }
}
```

---

## 2. Recommended: Typed Errors with Actionable Context

```typescript
// ✅ GOOD: Custom domain error, strict return types, contextual logging

export class AccountNotFoundError extends Error {
  constructor(public readonly accountId: string, options?: ErrorOptions) {
    super(`Account with ID '${accountId}' was not found`, options);
    this.name = 'AccountNotFoundError';
  }
}

export class ExternalServiceError extends Error {
  constructor(message: string, public readonly statusCode: number, options?: ErrorOptions) {
    super(message, options);
    this.name = 'ExternalServiceError';
  }
}

export async function fetchAccount(id: AccountId): Promise<Account> {
  try {
    const response = await httpClient.get<AccountDto>(`/accounts/${id}`);
    return mapToAccount(response.data);
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response?.status === 404) {
      throw new AccountNotFoundError(id, { cause: error });
    }
    throw new ExternalServiceError('Failed to retrieve account from service', 502, { cause: error });
  }
}
```
