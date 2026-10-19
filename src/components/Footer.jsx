import { Link } from 'react-router-dom';
import { Megaphone, MapPin, Mail, Phone } from 'lucide-react';
import businessConfig from '../config/business.js';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="kontak">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <h3>
              <Megaphone
                size={18}
                style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }}
              />
              {businessConfig.name}
            </h3>
            <p>{businessConfig.description}</p>
          </div>

          <div className="footer-links">
            <h4>Navigasi</h4>
            <Link to="/">Beranda</Link>
            <Link to="/katalog">Katalog</Link>
            <a href="#tentang">Tentang</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="footer-contact">
            <h4>Kontak</h4>
            {businessConfig.city && (
              <p>
                <MapPin size={16} />
                {businessConfig.city}
              </p>
            )}
            {businessConfig.email && (
              <p>
                <Mail size={16} />
                {businessConfig.email}
              </p>
            )}
            {businessConfig.phone && (
              <p>
                <Phone size={16} />
                {businessConfig.phone}
              </p>
            )}
            {!businessConfig.email && !businessConfig.phone && (
              <p style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>
                Hubungi kami melalui WhatsApp
              </p>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} {businessConfig.name}. Seluruh hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
