import { siteConfig } from '../config/siteConfig';
import { formatPrice } from './pricing';

/**
 * Constructs the structured WhatsApp order message and opens WhatsApp
 * @param {Array} cartItems - items in cart
 * @param {Number} totalAmount - subtotal
 * @param {Object} customerInfo - optional notes or customer name
 */
export const sendOrderViaWhatsApp = (cartItems, totalAmount, customerInfo = {}) => {
  if (!cartItems || cartItems.length === 0) {
    return false;
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  let message = `Hello ${siteConfig.name}!\n\n`;
  message += `I would like to place an order.\n\n`;
  
  if (customerInfo.name) {
    message += `Customer Name: ${customerInfo.name}\n`;
  }
  if (customerInfo.phone) {
    message += `Contact: ${customerInfo.phone}\n`;
  }
  if (customerInfo.city) {
    message += `City/Location: ${customerInfo.city}\n`;
  }
  if (customerInfo.name || customerInfo.phone || customerInfo.city) {
    message += `\n`;
  }

  message += `ORDER DETAILS:\n\n`;

  cartItems.forEach((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    const imageUrl = item.image.startsWith('http')
      ? item.image
      : `${origin}${item.image}`;

    message += `Product ${index + 1}:\n`;
    message += `Name: ${item.name}\n`;
    message += `Product Code: ${item.code || item.id}\n`;
    message += `Size: ${item.size || 'Standard'}\n`;
    message += `Color: ${item.color || 'Default'}\n`;
    message += `Quantity: ${item.quantity}\n`;
    message += `Price: ${formatPrice(item.price)}\n`;
    message += `Subtotal: ${formatPrice(itemSubtotal)}\n`;
    message += `Image: ${imageUrl}\n\n`;
  });

  message += `--------------------------------\n\n`;
  message += `Total Items: ${totalItemsCount}\n`;
  message += `Order Subtotal: ${formatPrice(totalAmount)}\n\n`;
  message += `Please confirm product availability, delivery charges and final order details.\n\n`;
  message += `Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${siteConfig.contacts.primaryWhatsAppNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
  return true;
};

/**
 * Quick product inquiry on WhatsApp
 */
export const sendProductInquiryViaWhatsApp = (product, selectedSize, selectedColor) => {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const productUrl = typeof window !== 'undefined' ? `${window.location.origin}/product/${product.id}` : '';
  const firstImage = product.images?.[0] || '';
  const imageUrl = firstImage.startsWith('http') ? firstImage : `${origin}${firstImage}`;

  let message = `Hello ${siteConfig.name}!\n\n`;
  message += `I have a question about this item:\n\n`;
  message += `Product: ${product.name}\n`;
  message += `Product Code: ${product.code}\n`;
  message += `Price: ${formatPrice(product.price)}\n`;
  if (selectedSize) message += `Selected Size: ${selectedSize}\n`;
  if (selectedColor) message += `Selected Color: ${selectedColor}\n`;
  message += `Image: ${imageUrl}\n`;
  message += `Link: ${productUrl}\n\n`;
  message += `Could you share more details regarding availability and delivery? Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${siteConfig.contacts.primaryWhatsAppNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
};

/**
 * General direct chat on WhatsApp
 */
export const openWhatsAppGeneralChat = (phoneNumber = siteConfig.contacts.primaryWhatsAppNumber) => {
  const message = `Hello ${siteConfig.name}! I would like to inquire about your men's clothing collection.`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};
