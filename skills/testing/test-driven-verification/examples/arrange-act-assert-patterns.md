# Examples: Arrange-Act-Assert (AAA) Test Patterns

## 1. Unit Test Pattern

```typescript
import { describe, it, expect } from 'vitest';
import { DiscountCalculator } from './discount-calculator';

describe('DiscountCalculator', () => {
  it('should apply a 10% discount for orders exceeding $100', () => {
    // Arrange
    const calculator = new DiscountCalculator();
    const orderTotal = 150.00;

    // Act
    const finalPrice = calculator.applyEligibleDiscounts(orderTotal);

    // Assert
    expect(finalPrice).toBe(135.00);
  });

  it('should reject negative order totals with an InvalidOrderError', () => {
    // Arrange
    const calculator = new DiscountCalculator();

    // Act & Assert
    expect(() => calculator.applyEligibleDiscounts(-20)).toThrowError(InvalidOrderError);
  });
});
```

---

## 2. Integration Test Pattern with Mock Boundary

```typescript
import { describe, it, expect, vi } from 'vitest';
import { NotificationService } from './notification-service';
import type { EmailGatewayPort } from '../ports/email-gateway.port';

describe('NotificationService Integration', () => {
  it('should format email payload and dispatch via gateway port', async () => {
    // Arrange (mock boundary port only)
    const emailGatewayMock: EmailGatewayPort = {
      send: vi.fn().mockResolvedValue({ messageId: 'msg-123' })
    };
    const service = new NotificationService(emailGatewayMock);
    const user = { email: 'engineer@sagarithm.com', name: 'Sagar' };

    // Act
    const result = await service.sendWelcomeNotification(user);

    // Assert
    expect(result.success).toBe(true);
    expect(emailGatewayMock.send).toHaveBeenCalledTimes(1);
    expect(emailGatewayMock.send).toHaveBeenCalledWith(expect.objectContaining({
      recipient: 'engineer@sagarithm.com',
      subject: 'Welcome to Sagarithm Kit'
    }));
  });
});
```
