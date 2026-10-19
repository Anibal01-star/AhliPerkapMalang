import HeroSection from '../components/HeroSection.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import ProductCatalog from '../components/ProductCatalog.jsx';
import FAQ from '../components/FAQ.jsx';
import { CATEGORIES } from '../data/products.js';
import businessConfig from '../config/business.js';
import {
  Shield,
  Truck,
  HeadphonesIcon,
  ThumbsUp,
  Package,
} from 'lucide-react';

export default function Home({ addToCart }) {
  return (
    <>
      <HeroSection />

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Kategori Perlengkapan</h2>
            <p>Pilih kategori sesuai kebutuhan acara Anda</p>
          </div>
          <div className="categories-grid">
            {CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Preview */}
      <ProductCatalog addToCart={addToCart} />

      {/* About */}
      <section id="tentang" className="section">
        <div className="container">
          <div className="about-content">
            <div>
              <h2>Tentang {businessConfig.name}</h2>
              <p>{businessConfig.description}</p>
              <p>
                Kami berkomitmen menyediakan perlengkapan berkualitas dengan
                layanan yang dapat diandalkan untuk berbagai jenis acara di{' '}
                {businessConfig.city}.
              </p>

              <div className="about-features">
                <div className="about-feature">
                  <div className="feature-icon">
                    <Shield size={20} />
                  </div>
                  <p>Peralatan Terawat</p>
                </div>
                <div className="about-feature">
                  <div className="feature-icon">
                    <HeadphonesIcon size={20} />
                  </div>
                  <p>Konsultasi Gratis</p>
                </div>
                <div className="about-feature">
                  <div className="feature-icon">
                    <ThumbsUp size={20} />
                  </div>
                  <p>Layanan Responsif</p>
                </div>
                <div className="about-feature">
                  <div className="feature-icon">
                    <Truck size={20} />
                  </div>
                  <p>Area {businessConfig.city}</p>
                </div>
              </div>
            </div>

            <div className="about-image">
              <Package size={64} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />
    </>
  );
}
