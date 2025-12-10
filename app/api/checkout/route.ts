import { NextRequest, NextResponse } from "next/server";
import { createOrder, getUserCart, clearCart } from "@/lib/firebase/firebaseQueries";

// WhatsApp business number - update this with your actual number
const WHATSAPP_NUMBER = "919876543210"; // Replace with actual number (include country code without +)

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, userEmail, userName } = body;

        // Validate required fields
        if (!userId || !userEmail || !userName) {
            return NextResponse.json(
                { success: false, message: "Missing required fields: userId, userEmail, userName" },
                { status: 400 }
            );
        }

        // Get user's cart
        const cartItems = await getUserCart(userId);

        if (!cartItems || cartItems.length === 0) {
            return NextResponse.json(
                { success: false, message: "Cart is empty" },
                { status: 400 }
            );
        }

        // Create order
        const orderResult = await createOrder(userId, userEmail, userName, cartItems);

        if (!orderResult.success) {
            return NextResponse.json(
                { success: false, message: "Failed to create order" },
                { status: 500 }
            );
        }

        // Clear cart after order creation
        await clearCart(userId);

        // Generate WhatsApp message
        const message = generateWhatsAppMessage(
            orderResult.orderId,
            userName,
            cartItems,
            orderResult.totalAmount
        );

        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        return NextResponse.json({
            success: true,
            orderId: orderResult.orderId,
            whatsappUrl,
            message: "Order created successfully. Opening WhatsApp...",
        });
    } catch (error: any) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Checkout failed" },
            { status: 500 }
        );
    }
}

function generateWhatsAppMessage(
    orderId: string,
    userName: string,
    cartItems: any[],
    totalAmount: number
): string {
    let message = `Hello! I'd like to place an order from Siyana Gold & Diamonds:\n\n`;
    message += `Order #: ${orderId}\n`;
    message += `Customer: ${userName}\n\n`;
    message += `Items:\n`;

    cartItems.forEach((item) => {
        message += `- ${item.name} x ${item.quantity} - ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n`;
    });

    message += `\nTotal: ₹${totalAmount.toLocaleString('en-IN')}\n\n`;
    message += `Please confirm availability and delivery details.`;

    return message;
}
