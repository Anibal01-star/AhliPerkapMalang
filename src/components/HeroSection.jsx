import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Sparkles, Package } from 'lucide-react';
import businessConfig from '../config/business.js';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={14} />
              <span>Penyewaan Perlengkapan Acara</span>
            </div>

            <h1>
              Sukseskan Acara Anda dengan{' '}
              <span>Perlengkapan Profesional</span>
            </h1>

            <p className="hero-description">
              {businessConfig.description}
            </p>

            <div className="hero-actions">
              <Link to="/katalog" className="btn btn-primary btn-lg">
                <Package size={18} />
                Lihat Katalog
              </Link>
              <Link to="/katalog" className="btn btn-secondary btn-lg">
                <MessageCircle size={18} />
                Pesan via WhatsApp
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <div className="hero-image-wrapper">
              <div className="hero-placeholder">
                <Package size={48} />
                <span style={{ fontSize: '0.9rem' }}>Foto Perlengkapan Acara</span>
              </div>
            </div>
            <div className="hero-floating-badge">
              <MessageCircle size={18} color="var(--orange)" />
              Pemesanan via WhatsApp
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
