import { useState } from "react";
import CustomerForm from "./components/CustomerForm";
import HotelList from "./components/HotelList";
import Cart from "./components/Cart";
import React from "react";

function App() {
  const [customer, setCustomer] = useState<{ name: string; budget: number } | null>(null);
  const [cart, setCart] = useState<any[]>([]);

  const handleAddToCart = (hotel: any) => {
    const total = cart.reduce((sum, p) => sum + p.price, 0) + hotel.price;
    if (customer && total > customer.budget) {
      alert("Has superado tu presupuesto!");
      return;
    }
    setCart([...cart, hotel]);
  };

  const handleRemove = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleClear = () => {
    setCart([]);
  };

  if (!customer) {
    return <CustomerForm onSubmit={(name, budget) => setCustomer({ name, budget })} />;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Bienvenido, {customer.name}</h1>
      <p>Presupuesto: ${customer.budget}</p>

      <HotelList onAdd={handleAddToCart} />
      <Cart items={cart} onRemove={handleRemove} onClear={handleClear} />
    </div>
  );
}

export default App;
