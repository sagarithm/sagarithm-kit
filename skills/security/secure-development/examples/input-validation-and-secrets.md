# Examples: Input Validation & Secrets Hygiene

## 1. Anti-Pattern: String Concatenation & Hardcoded Secrets

```typescript
// ❌ BAD: Hardcoded API secret, vulnerable to SQL Injection
import { db } from './db';

const STRIPE_SECRET = 'sk_live_9837498273498273'; // Secret leaked into source control

export async function findUserOrders(userIdInput: string) {
  // SQL Injection vulnerability!
  const query = `SELECT * FROM orders WHERE user_id = '${userIdInput}'`;
  return db.query(query);
}
```

---

## 2. Recommended: Schema Validation, Parameterization & Env Secrets

```typescript
// ✅ GOOD: Schema validation, parameterized queries, and environment secrets
import { z } from 'zod';
import { db } from './db';

// 1. Perimeter Schema Validation
export const UserIdSchema = z.string().uuid({ message: 'Invalid UUID identifier' });

// 2. Verified Environment Loading
const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
  throw new Error('STRIPE_SECRET_KEY environment variable is missing');
}

// 3. Parameterized Query Execution
export async function findUserOrders(rawUserId: string): Promise<Order[]> {
  const userId = UserIdSchema.parse(rawUserId); // Fails fast on invalid input
  
  // Safe: Database driver handles parameter escaping securely
  return db.query<Order>('SELECT * FROM orders WHERE user_id = $1', [userId]);
}
```
