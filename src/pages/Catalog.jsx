import { useSearchParams } from 'react-router-dom';
import ProductCatalog from '../components/ProductCatalog.jsx';

export default function Catalog({ addToCart }) {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('kategori') || 'semua';

  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      <ProductCatalog addToCart={addToCart} initialCategory={initialCategory} />
    </div>
  );
}
