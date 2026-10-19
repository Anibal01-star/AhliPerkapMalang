import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Plus, Check, Package } from 'lucide-react';
import { CATEGORIES } from '../data/products.js';
import { formatCurrency } from '../utils/formatCurrency.js';

export default function ProductCard({ product, addToCart }) {
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const category = CATEGORIES.find((c) => c.id === product.category);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="product-card">
      <div className="product-card-image">
        {!imgError && product.image ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder">
            <Package size={32} />
            <span>{product.name}</span>
          </div>
        )}
        {category && (
          <span className="product-card-category">{category.name}</span>
        )}
      </div>

      <div className="product-card-body">
        <h3>{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        {product.price != null ? (
          <p className="product-price">
            {formatCurrency(product.price)}{' '}
            <span className="price-unit">{product.priceUnit}</span>
          </p>
        ) : (
          <p className="product-price-ask">Tanyakan harga</p>
        )}

        <div className="product-card-actions">
          <Link
            to={`/produk/${product.id}`}
            className="btn btn-outline-dark btn-sm"
          >
            <Eye size={14} />
            Detail
          </Link>
          <button
            className={`btn btn-sm ${added ? 'btn-outline' : 'btn-primary'}`}
            onClick={handleAddToCart}
            aria-label={`Pilih ${product.name}`}
          >
            {added ? (
              <>
                <Check size={14} />
                Dipilih
              </>
            ) : (
              <>
                <Plus size={14} />
                Pilih Barang
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
