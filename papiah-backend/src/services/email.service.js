import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Resend's shared sandbox sender; works without domain verification but can
// only deliver to the email that owns the Resend account. Set EMAIL_FROM to
// an address on a domain verified in Resend (e.g. orders@papiah.com) to send
// to real customers.
const FROM_ADDRESS = process.env.EMAIL_FROM || "Papiah <onboarding@resend.dev>";
const ADMIN_EMAIL = process.env.ADMIN_NOTIFY_EMAIL || "products@incubr.com";

const formatCurrency = (value) => `₹${Number(value).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const itemsRows = (items) =>
  items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #E9E5DF;">${item.product_title}</td>
          <td style="padding:8px 0;border-bottom:1px solid #E9E5DF;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 0;border-bottom:1px solid #E9E5DF;text-align:right;">${formatCurrency(item.total)}</td>
        </tr>`
    )
    .join("");

const addressBlock = (address) => {
  if (!address) return "";
  return `${address.full_name}<br/>${address.address_line1}${address.address_line2 ? `, ${address.address_line2}` : ""}<br/>${address.city}, ${address.state} ${address.postal_code}<br/>Phone: ${address.phone}`;
};

/**
 * Sends an order confirmation email to the customer who placed the order.
 * Failures are swallowed by the caller so a broken email config never blocks
 * order placement -- see order.service.js.
 */
export const sendOrderConfirmationEmail = async (order, customerEmail) => {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set - skipping order confirmation email");
    return;
  }

  await resend.emails.send({
    from: FROM_ADDRESS,
    to: customerEmail,
    subject: `Order Confirmed - ${order.order_number}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#2E3B2E;">
        <h2 style="font-weight:500;">Thank you for your order!</h2>
        <p>Your order <strong>${order.order_number}</strong> has been placed successfully.</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <thead>
            <tr>
              <th style="text-align:left;padding-bottom:8px;border-bottom:2px solid #2E3B2E;">Item</th>
              <th style="text-align:center;padding-bottom:8px;border-bottom:2px solid #2E3B2E;">Qty</th>
              <th style="text-align:right;padding-bottom:8px;border-bottom:2px solid #2E3B2E;">Total</th>
            </tr>
          </thead>
          <tbody>${itemsRows(order.order_items || [])}</tbody>
        </table>
        <table style="width:100%;font-size:14px;">
          <tr><td>Subtotal</td><td style="text-align:right;">${formatCurrency(order.subtotal)}</td></tr>
          <tr><td>Shipping</td><td style="text-align:right;">${formatCurrency(order.shipping)}</td></tr>
          <tr><td>Tax</td><td style="text-align:right;">${formatCurrency(order.tax)}</td></tr>
          ${order.discount > 0 ? `<tr><td>Discount</td><td style="text-align:right;">-${formatCurrency(order.discount)}</td></tr>` : ""}
          <tr style="font-weight:bold;font-size:16px;"><td style="padding-top:8px;">Total</td><td style="text-align:right;padding-top:8px;">${formatCurrency(order.total)}</td></tr>
        </table>
        <p style="margin-top:24px;"><strong>Payment method:</strong> ${order.payment_method}</p>
        <p><strong>Shipping to:</strong><br/>${addressBlock(order.addresses)}</p>
        <p style="margin-top:24px;color:#2E3B2E80;font-size:13px;">We'll email you again once your order ships. Thank you for shopping with Papiah.</p>
      </div>
    `,
  });
};

/**
 * Notifies the store admin of a newly placed order with full order details.
 */
export const sendAdminOrderNotification = async (order, customerEmail) => {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set - skipping admin order notification email");
    return;
  }

  await resend.emails.send({
    from: FROM_ADDRESS,
    to: ADMIN_EMAIL,
    subject: `New Order Received - ${order.order_number} (${formatCurrency(order.total)})`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#2E3B2E;">
        <h2 style="font-weight:500;">New order placed</h2>
        <p><strong>Order:</strong> ${order.order_number}<br/>
        <strong>Customer:</strong> ${customerEmail}<br/>
        <strong>Payment:</strong> ${order.payment_method} (${order.payment_status})</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <thead>
            <tr>
              <th style="text-align:left;padding-bottom:8px;border-bottom:2px solid #2E3B2E;">Item</th>
              <th style="text-align:center;padding-bottom:8px;border-bottom:2px solid #2E3B2E;">Qty</th>
              <th style="text-align:right;padding-bottom:8px;border-bottom:2px solid #2E3B2E;">Total</th>
            </tr>
          </thead>
          <tbody>${itemsRows(order.order_items || [])}</tbody>
        </table>
        <p style="font-weight:bold;font-size:16px;">Order Total: ${formatCurrency(order.total)}</p>
        <p><strong>Ship to:</strong><br/>${addressBlock(order.addresses)}</p>
      </div>
    `,
  });
};
