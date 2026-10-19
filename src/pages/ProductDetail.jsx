import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Send, Package, Check } from 'lucide-react';
import products, { CATEGORIES } from '../data/products.js';
import { formatCurrency } from '../utils/formatCurrency.js';

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <section className="product-detail">
        <div className="container">
          <Link to="/katalog" className="back-link">
            <ArrowLeft size={16} />
            Kembali ke Katalog
          </Link>
          <div className="empty-catalog">
            <Package size={48} />
            <h3>Produk tidak ditemukan</h3>
            <p>Produk yang Anda cari tidak tersedia.</p>
            <Link to="/katalog" className="btn btn-primary mt-4">
              Lihat Katalog
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const category = CATEGORIES.find((c) => c.id === product.category);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleOrderThis = () => {
    addToCart(product);
    navigate('/booking');
  };

  return (
    <section className="product-detail">
      <div className="container">
        <Link to="/katalog" className="back-link">
          <ArrowLeft size={16} />
          Kembali ke Katalog
        </Link>

        <div className="product-detail-inner">
          <div className="product-detail-image">
            {!imgError && product.image ? (
              <img
                src={product.image}
                alt={product.name}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="image-placeholder">
                <Package size={48} />
                <span>{product.name}</span>
              </div>
            )}
          </div>

          <div className="product-detail-info">
            {category && (
              <span className="detail-category">{category.name}</span>
            )}

            <h1>{product.name}</h1>

            <p className="detail-description">{product.description}</p>

            {product.price != null ? (
              <p className="detail-price">
                {formatCurrency(product.price)}{' '}
                <span className="price-unit">{product.priceUnit}</span>
              </p>
            ) : (
              <p className="detail-price" style={{ color: 'var(--text-secondary)' }}>
                Tanyakan harga
              </p>
            )}

            <div className="product-detail-actions">
              <button
                className={`btn ${added ? 'btn-outline' : 'btn-primary'}`}
                onClick={handleAddToCart}
              >
                {added ? (
                  <>
                    <Check size={18} />
                    Ditambahkan ke Pesanan
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    Tambah ke Pesanan
                  </>
                )}
              </button>
              <button
                className="btn btn-outline"
                onClick={handleOrderThis}
              >
                <Send size={18} />
                Pesan Barang Ini
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
