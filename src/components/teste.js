import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Importe as funções do Firestore necessárias
import { db } from '../services/firebaseConfig';
import Counter from './redux/Counter';

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    async function fetchCartProducts() {
      try {
        const cartCollectionRef = collection(db, 'carrinho');
        const querySnapshot = await getDocs(cartCollectionRef);

        const cartData = [];
        querySnapshot.forEach((doc) => {
          const product = doc.data();
          cartData.push({ ...product, docId: doc.id }); // Inclua o ID do documento Firestore
        });

        setCartProducts(cartData);
      } catch (error) {
        console.error('Erro ao buscar produtos no carrinho:', error);
      }
    }

    fetchCartProducts();
  }, []);

  // Função para remover um produto do carrinho
  const handleRemoveProduct = async (docId) => {
    try {
      const productDocRef = doc(db, 'carrinho', docId);
      await deleteDoc(productDocRef);
      setCartProducts((prevProducts) => prevProducts.filter((product) => product.docId !== docId));
      console.log('Produto removido com sucesso do carrinho:', docId);
    } catch (error) {
      console.error('Erro ao remover produto do carrinho:', error);
    }
  };

  return (
    <div>
      <h1>Carrinho de Compras</h1>
      <ul>
        {cartProducts.map((product, index) => (
          <li key={product.docId}>
            <img
              src={product.thumbnail}
              alt={product.title}
              width="100"
              height="100"
            />
            <span>
              {product.title} <br />
              Quantidade: {product.quantidade}
              <button onClick={() => handleRemoveProduct(product.docId)}>Remover</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
