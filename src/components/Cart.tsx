import { useState } from "react";
import React from "react";

type Hotel = {
  id: number;
  name: string;
  price: number;
};

type Props = {
  items: Hotel[];
  onRemove: (id: number) => void;
  onClear: () => void;
};

export default function Cart({ items, onRemove, onClear }: Props) {
  const [cardNumber, setCardNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handlePurchase = () => {
    const cleaned = cardNumber.replace(/\s+/g, "");
    const isValidCard = /^\d{13,18}$/.test(cleaned);

    if (items.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    if (!isValidCard) {
      alert("Número de tarjeta inválido. Debe tener entre 13 y 18 dígitos.");
      return;
    }

    setIsProcessing(true);

    // Simulación de compra con promesa
    new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() < 0.9; // 90% de probabilidad de éxito
        success ? resolve() : reject(new Error("Error en el procesamiento"));
      }, 2000);
    })
      .then(() => {
        alert("✅ ¡Compra realizada con éxito!");
        onClear();
        setCardNumber("");
      })
      .catch((error) => {
        console.error("Fallo en la compra:", error);
        alert("❌ Error procesando la compra. Intenta de nuevo.");
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <div style={{ marginTop: 40 }}>
      <h2>🛒 Carrito de hoteles</h2>
      {items.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
                <button
                  onClick={() => onRemove(item.id)}
                  style={{ marginLeft: 10 }}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
          <p>
            <strong>Total:</strong> ${total}
          </p>
          <button onClick={onClear}>Cancelar compra</button>

          <div style={{ marginTop: 20 }}>
            <h3>💳 Tarjeta de crédito</h3>
            <input
              type="text"
              placeholder="Número de tarjeta"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
            <br />
            <button
              onClick={handlePurchase}
              disabled={isProcessing}
              style={{ padding: "10px 20px" }}
            >
              {isProcessing ? "Procesando compra..." : "Comprar"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
