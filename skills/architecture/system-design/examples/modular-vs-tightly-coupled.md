# Examples: Modular vs. Tightly Coupled Design

## 1. Anti-Pattern: Tightly Coupled Leaky Architecture

```typescript
// ❌ BAD: UI Component leaks database calls, external SDKs, and business logic
import { db } from '../../infrastructure/database';
import stripeSdk from 'stripe';

export function CheckoutButton({ cartId }: { cartId: string }) {
  async function handleCheckout() {
    // Direct raw database query in UI layer
    const cart = await db.query('SELECT * FROM carts WHERE id = $1', [cartId]);
    
    // Direct vendor payment call without domain abstraction
    const stripe = new stripeSdk('sk_live_...');
    const session = await stripe.checkout.sessions.create({
      line_items: cart.items.map(item => ({ price: item.priceId, quantity: item.qty }))
    });
    
    window.location.href = session.url;
  }
  return <button onClick={handleCheckout}>Pay Now</button>;
}
```

---

## 2. Recommended: Decoupled Port & Adapter Design

```typescript
// ✅ GOOD: Explicit boundary with domain service and port abstraction

// 1. Port Interface (Domain / Contract)
export interface PaymentGatewayPort {
  createCheckoutSession(cart: Cart): Promise<CheckoutSessionResult>;
}

// 2. Application Service (Orchestration)
export class CheckoutService {
  constructor(
    private readonly cartRepository: CartRepositoryPort,
    private readonly paymentGateway: PaymentGatewayPort
  ) {}

  async processCheckout(cartId: CartId): Promise<CheckoutSessionResult> {
    const cart = await this.cartRepository.findById(cartId);
    if (!cart) throw new CartNotFoundError(cartId);
    if (cart.isEmpty()) throw new EmptyCartError(cartId);
    
    return this.paymentGateway.createCheckoutSession(cart);
  }
}

// 3. UI Layer (Presentation only consumes service via action/hook)
export function CheckoutButton({ onCheckout }: { onCheckout: () => Promise<void> }) {
  return <button onClick={onCheckout}>Pay Now</button>;
}
```
