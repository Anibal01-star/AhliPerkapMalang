/**
 * Utilitas WhatsApp — Ahli Perkap Malang
 *
 * Menyusun pesan penyewaan dan membuka tautan WhatsApp Click to Chat.
 */

import businessConfig from '../config/business.js';
import { formatCurrency } from './formatCurrency.js';

/**
 * Validasi nomor WhatsApp bisnis.
 * Format harus berupa digit saja dan minimal 10 digit.
 */
export function isWhatsAppNumberValid(number) {
  if (!number || typeof number !== 'string') return false;
  const cleaned = number.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Format tanggal ke format Indonesia (DD/MM/YYYY).
 */
function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Susun pesan WhatsApp dari data pemesanan.
 */
export function composeWhatsAppMessage(orderData) {
  const {
    customerName,
    customerPhone,
    items,
    startDate,
    endDate,
    location,
    notes,
  } = orderData;

  const itemsList = items
    .map(
      (item, index) =>
        `${index + 1}. ${item.name}${item.price ? ` (${formatCurrency(item.price)} ${item.priceUnit || ''})` : ''} — ${item.quantity} unit`
    )
    .join('\n');

  let message = `Halo Ahli Perkap Malang, saya ingin mengajukan penyewaan perlengkapan.\n\n`;
  message += `Nama: ${customerName}\n`;
  message += `Nomor WhatsApp: ${customerPhone}\n\n`;
  message += `Daftar barang:\n\n${itemsList}\n\n`;
  message += `Tanggal mulai: ${formatDate(startDate)}\n`;
  message += `Tanggal selesai: ${formatDate(endDate)}\n`;
  message += `Lokasi acara: ${location}\n`;

  if (notes && notes.trim()) {
    message += `\nCatatan: ${notes.trim()}\n`;
  }

  message += `\nMohon informasi ketersediaan, harga, dan ketentuan penyewaan. Terima kasih.`;

  return message;
}

/**
 * Buka WhatsApp Click to Chat.
 * Mengembalikan objek { success, error }.
 */
export function openWhatsApp(orderData) {
  const { whatsappNumber, whatsappConfirmed } = businessConfig;

  if (!whatsappConfirmed || !isWhatsAppNumberValid(whatsappNumber)) {
    return {
      success: false,
      error:
        'Nomor WhatsApp bisnis belum dikonfirmasi atau tidak valid. Silakan hubungi kami melalui metode lain.',
    };
  }

  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  const message = composeWhatsAppMessage(orderData);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  window.open(url, '_blank', 'noopener,noreferrer');

  return { success: true, error: null };
}
