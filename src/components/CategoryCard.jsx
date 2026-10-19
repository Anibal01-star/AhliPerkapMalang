import { Link } from 'react-router-dom';
import { Radio, Projector, Speaker, ClipboardList, ArrowRight } from 'lucide-react';

const iconMap = {
  Radio,
  Projector,
  Speaker,
  ClipboardList,
};

export default function CategoryCard({ category }) {
  const IconComponent = iconMap[category.icon] || ClipboardList;

  return (
    <Link
      to={`/katalog?kategori=${category.id}`}
      className="category-card"
      aria-label={`Lihat kategori ${category.name}`}
    >
      <div className="category-icon" aria-hidden="true">
        <IconComponent size={28} />
      </div>
      <h3>{category.name}</h3>
      <p>{category.description}</p>
      <span className="btn btn-ghost btn-sm">
        Lihat Produk <ArrowRight size={14} />
      </span>
    </Link>
  );
}
