import { useState } from 'react';
import { Send, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { openWhatsApp } from '../utils/whatsapp.js';
import { formatCurrency } from '../utils/formatCurrency.js';

export default function BookingForm({ items, clearCart }) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    startDate: '',
    endDate: '',
    location: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [waError, setWaError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (waError) setWaError('');
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Nama wajib diisi';
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Nomor WhatsApp wajib diisi';
    } else {
      const phoneClean = formData.customerPhone.replace(/\D/g, '');
      if (phoneClean.length < 10 || phoneClean.length > 15) {
        newErrors.customerPhone = 'Nomor WhatsApp tidak valid (10-15 digit)';
      }
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Tanggal mulai wajib diisi';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'Tanggal selesai wajib diisi';
    }

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        newErrors.endDate = 'Tanggal selesai tidak boleh sebelum tanggal mulai';
      }
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Lokasi acara wajib diisi';
    }

    if (!items || items.length === 0) {
      newErrors.items = 'Pilih minimal satu barang';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWaError('');

    if (!validate()) return;

    const orderData = {
      customerName: formData.customerName.trim(),
      customerPhone: formData.customerPhone.trim(),
      items: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        priceUnit: item.priceUnit,
      })),
      startDate: formData.startDate,
      endDate: formData.endDate,
      location: formData.location.trim(),
      notes: formData.notes.trim(),
    };

    const result = openWhatsApp(orderData);

    if (!result.success) {
      setWaError(result.error);
    }
    // Note: We don't clear the cart or show success because
    // the customer still needs to press Send in WhatsApp
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section className="booking-form-section">
      <div className="container">
        <Link to="/pesanan" className="back-link">
          <ArrowLeft size={16} />
          Kembali ke ringkasan pesanan
        </Link>

        <div className="booking-form-card">
          <h1>Formulir Penyewaan</h1>
          <p className="form-subtitle">
            Lengkapi data di bawah untuk mengajukan penyewaan melalui WhatsApp.
          </p>

          {items && items.length > 0 && (
            <div className="form-items-summary">
              <h3>Daftar Barang ({items.length} jenis)</h3>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    <span>{item.name}</span>
                    <span>
                      {item.quantity} unit
                      {item.price != null && (
                        <> &middot; {formatCurrency(item.price)} {item.priceUnit}</>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {errors.items && (
            <div className="form-wa-error">
              <AlertCircle size={16} />
              {errors.items}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="customerName">
                Nama Lengkap <span className="required">*</span>
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Nama Anda"
                className={errors.customerName ? 'error' : ''}
                autoComplete="name"
              />
              {errors.customerName && (
                <span className="form-error">{errors.customerName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="customerPhone">
                Nomor WhatsApp <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="customerPhone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
                className={errors.customerPhone ? 'error' : ''}
                autoComplete="tel"
              />
              {errors.customerPhone && (
                <span className="form-error">{errors.customerPhone}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">
                  Tanggal Mulai Sewa <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  min={today}
                  className={errors.startDate ? 'error' : ''}
                />
                {errors.startDate && (
                  <span className="form-error">{errors.startDate}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="endDate">
                  Tanggal Selesai Sewa <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={formData.startDate || today}
                  className={errors.endDate ? 'error' : ''}
                />
                {errors.endDate && (
                  <span className="form-error">{errors.endDate}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="location">
                Lokasi Acara <span className="required">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Nama tempat dan alamat acara"
                className={errors.location ? 'error' : ''}
              />
              {errors.location && (
                <span className="form-error">{errors.location}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="notes">Catatan Tambahan</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Informasi tambahan (opsional)"
                rows={3}
              />
            </div>

            {waError && (
              <div className="form-wa-error">
                <AlertCircle size={16} />
                {waError}
              </div>
            )}

            <div className="form-actions">
              <Link to="/pesanan" className="btn btn-outline-dark">
                Kembali
              </Link>
              <button type="submit" className="btn btn-primary">
                <Send size={16} />
                Pesan via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
