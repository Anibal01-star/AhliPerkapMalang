/**
 * Konfigurasi Bisnis — Ahli Perkap Malang
 *
 * Edit file ini untuk memperbarui informasi bisnis.
 * Pastikan nomor WhatsApp menggunakan format internasional tanpa
 * tanda plus, spasi, atau tanda hubung (contoh: 6281234567890).
 */

const businessConfig = {
  // Nama usaha
  name: 'Ahli Perkap Malang',

  // Tagline
  tagline: 'Penyewaan Perlengkapan Acara Profesional',

  // Deskripsi singkat
  description:
    'Menyediakan penyewaan perlengkapan acara untuk kebutuhan event, seminar, rapat, dan kegiatan organisasi di Malang.',

  // Nomor WhatsApp bisnis — format internasional tanpa + atau spasi
  // Ganti dengan nomor yang sudah dikonfirmasi
  whatsappNumber: '',

  // Apakah nomor WhatsApp sudah dikonfirmasi valid?
  whatsappConfirmed: false,

  // Informasi kontak lainnya (kosongkan jika belum dikonfirmasi)
  email: '',
  phone: '',

  // Alamat (kosongkan jika belum dikonfirmasi)
  address: '',

  // Kota operasional
  city: 'Malang',

  // Jam operasional (kosongkan jika belum dikonfirmasi)
  operatingHours: '',

  // Media sosial (kosongkan jika belum dikonfirmasi)
  socialMedia: {
    instagram: '',
    facebook: '',
    tiktok: '',
  },

  // FAQ
  faq: [
    {
      question: 'Bagaimana cara menyewa perlengkapan?',
      answer:
        'Pilih barang yang diinginkan dari katalog, tentukan jumlah dan tanggal penyewaan, lalu kirim pesanan melalui WhatsApp. Tim kami akan merespons untuk konfirmasi ketersediaan dan detail penyewaan.',
    },
    {
      question: 'Apakah tersedia layanan antar-jemput barang?',
      answer:
        'Silakan tanyakan langsung melalui WhatsApp mengenai ketersediaan layanan antar-jemput untuk wilayah Anda.',
    },
    {
      question: 'Berapa lama minimal durasi penyewaan?',
      answer:
        'Durasi minimal penyewaan dapat bervariasi tergantung jenis barang. Hubungi kami melalui WhatsApp untuk informasi lebih lanjut.',
    },
    {
      question: 'Bagaimana jika barang rusak selama penyewaan?',
      answer:
        'Ketentuan mengenai kerusakan barang akan dijelaskan saat konfirmasi penyewaan. Silakan hubungi kami untuk informasi detail.',
    },
    {
      question: 'Apakah harga sudah termasuk ongkos kirim?',
      answer:
        'Harga yang tertera belum tentu mencakup biaya pengiriman. Silakan konfirmasi melalui WhatsApp untuk rincian biaya lengkap.',
    },
  ],
};

export default businessConfig;
