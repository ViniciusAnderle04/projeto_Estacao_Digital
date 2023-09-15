import React, { useState } from 'react';

const Counter = ({ quantity, handleQuantityChange }) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);

  const handleIncrement = () => {
    setLocalQuantity(localQuantity + 1);
  };

  const handleDecrement = () => {
    if (localQuantity > 0) {
      setLocalQuantity(localQuantity - 1);
    }
  };

  const confirmQuantity = () => {
    // Chama a função para atualizar a quantidade no Firestore apenas quando o botão "Confirmar" for pressionado
    handleQuantityChange(localQuantity);
    console.log(localQuantity);
  };

  return (
    <div>
      <button onClick={handleDecrement}>-</button>
      <span>Quantidade: {localQuantity}</span>
      <button onClick={handleIncrement}>+</button>
      <button onClick={confirmQuantity}>Confirmar</button>
    </div>
  );
};

export default Counter;
