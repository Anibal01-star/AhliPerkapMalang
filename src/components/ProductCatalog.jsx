import { useState, useMemo } from 'react';
import { Search, PackageOpen } from 'lucide-react';
import products, { CATEGORIES } from '../data/products.js';
import ProductCard from './ProductCard.jsx';

export default function ProductCatalog({ addToCart, initialCategory }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'semua');

  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by category
    if (activeCategory && activeCategory !== 'semua') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          (CATEGORIES.find((c) => c.id === p.category)?.name || '')
            .toLowerCase()
            .includes(query)
      );
    }

    return result;
  }, [searchQuery, activeCategory]);

  return (
    <section id="katalog" className="section section-gray">
      <div className="container">
        <div className="section-header">
          <h2>Katalog Perlengkapan</h2>
          <p>Temukan perlengkapan yang tepat untuk acara Anda</p>
        </div>

        <div className="catalog-controls">
          <div className="search-box">
            <Search size={18} className="search-icon" aria-hidden="true" />
            <input
              type="search"
              placeholder="Cari perlengkapan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Cari perlengkapan"
            />
          </div>

          <div className="filter-tabs" role="tablist" aria-label="Filter kategori">
            <button
              className={`filter-tab ${activeCategory === 'semua' ? 'active' : ''}`}
              onClick={() => setActiveCategory('semua')}
              role="tab"
              aria-selected={activeCategory === 'semua'}
            >
              Semua
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`filter-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                role="tab"
                aria-selected={activeCategory === cat.id}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="empty-catalog">
            <PackageOpen size={48} />
            <h3>Tidak ada produk ditemukan</h3>
            <p>
              Coba ubah kata kunci pencarian atau pilih kategori yang berbeda.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
