import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Package,
} from 'lucide-react';

export default function CartSummary({ items, updateQuantity, removeFromCart }) {
  const totalTypes = items.length;
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <section className="cart-summary-section">
        <div className="container">
          <div className="cart-empty">
            <ShoppingBag size={56} />
            <h2>Belum ada barang dipilih</h2>
            <p>
              Pilih perlengkapan dari katalog untuk ditambahkan ke daftar
              pesanan Anda.
            </p>
            <Link to="/katalog" className="btn btn-primary">
              <Package size={18} />
              Lihat Katalog
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-summary-section">
      <div className="container" style={{ maxWidth: 720 }}>
        <h1 style={{ marginBottom: 8 }}>Ringkasan Pesanan</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>
          Periksa daftar barang sebelum melanjutkan pemesanan.
        </p>

        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Package size={20} color="var(--gray-400)" />
                  </div>
                )}
              </div>

              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>
                  {item.price != null
                    ? `${new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(item.price)} ${item.priceUnit || ''}`
                    : 'Tanyakan harga'}
                </p>
              </div>

              <div className="cart-item-qty">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  aria-label={`Kurangi jumlah ${item.name}`}
                >
                  <Minus size={14} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label={`Tambah jumlah ${item.name}`}
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                className="cart-item-remove"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Hapus ${item.name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-totals">
          <p>
            <strong>{totalTypes}</strong> jenis barang
          </p>
          <p>
            Total: <strong>{totalUnits}</strong> unit
          </p>
        </div>

        <Link to="/booking" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
          Lanjutkan Pemesanan
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
