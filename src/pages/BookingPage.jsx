import BookingForm from '../components/BookingForm.jsx';

export default function BookingPage({ items, clearCart }) {
  return <BookingForm items={items} clearCart={clearCart} />;
}
