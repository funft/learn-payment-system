// ts-node .\index.ts
type TransactionDetails = { id: string; amount: number; status: string };

interface PaymentGateway {
    charge(amount: number): boolean;
    refund(transactionId: string): boolean;
    getTransactionDetails(transactionId: string): TransactionDetails;
}

class Loggable {
    log(message: string): void {
        console.log(`[LOG] ${message}`);
    }
}

class StripePaymentGateway extends Loggable implements PaymentGateway {
    charge(amount: number): boolean {
        this.log(`Charged ${amount} via Stripe.`);
        return true;
    }

    refund(transactionId: string): boolean {
        this.log(`Refund transaction ${transactionId} via Stripe.`);
        return true;
    }

    getTransactionDetails(transactionId: string): TransactionDetails {
        this.log(`Get transaction details for ${transactionId} via Stripe.`);
        return { id: transactionId, amount: 100, status: "Completed" };
    }
}

class PaypalPaymentGateway extends Loggable implements PaymentGateway {
    charge(amount: number): boolean {
        this.log(`Charged ${amount} via PayPal.`);
        return true;
    }

    refund(transactionId: string): boolean {
        this.log(`Refund transaction ${transactionId} via PayPal.`);
        return true;
    }

    getTransactionDetails(transactionId: string): TransactionDetails {
        this.log(`Get transaction details for ${transactionId} via PayPal.`);
        return { id: transactionId, amount: 150, status: "Pending" };
    }
}

class BankPaymentGateway extends Loggable implements PaymentGateway {
    charge(amount: number): boolean {
        this.log(`Charged ${amount} via Bank.`);
        return true;
    }

    refund(transactionId: string): boolean {
        this.log(`Refund transaction ${transactionId} via Bank.`);
        return true;
    }

    getTransactionDetails(transactionId: string): TransactionDetails {
        this.log(`Get transaction details for ${transactionId} via Bank.`);
        return { id: transactionId, amount: 200, status: "Failed" };
    }
}

class PaymentService {
    private gateway: PaymentGateway;

    constructor(gateway: PaymentGateway) {
        this.gateway = gateway;
    }

    processPayment(amount: number): boolean {
        return this.gateway.charge(amount);
    }

    refundPayment(transactionId: string): boolean {
        return this.gateway.refund(transactionId);
    }

    getDetails(transactionId: string): TransactionDetails {
        return this.gateway.getTransactionDetails(transactionId);
    }
}

class PaymentController {
    chargeStripe(amount: number): void {
        const paymentService = new PaymentService(new StripePaymentGateway());
        paymentService.processPayment(amount);
    }

    chargePaypal(amount: number): void {
        const paymentService = new PaymentService(new PaypalPaymentGateway());
        paymentService.processPayment(amount);
    }
}

const controller = new PaymentController();
controller.chargeStripe(100);
controller.chargePaypal(200);
