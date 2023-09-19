<<<<<<< HEAD
import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import AppContext from '../../context/AppContext';
import { db } from '../../services/firebaseConfig';
import Counter from '../redux/Counter';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import './Cart.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [showAll, setShowAll] = useState(false); // Novo estado para controlar a exibição
  const { loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    async function fetchCartProducts() {
      setLoading(true); // Defina como true antes da busca
=======
import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import Header from '../Header/Header';
import Counter from '../redux/Counter';
import { Link } from 'react-router-dom';
function Cart() {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    async function fetchCartProducts() {
>>>>>>> 8df8fa879a245663d2cca72b92c6d144a7367c70
      try {
        const cartCollectionRef = collection(db, 'carrinho');
        const querySnapshot = await getDocs(cartCollectionRef);

        const cartData = [];
        querySnapshot.forEach((doc) => {
          const product = doc.data();
          cartData.push({ ...product, docId: doc.id });
        });

        setCartProducts(cartData);
      } catch (error) {
        console.error('Erro ao buscar produtos no carrinho:', error);
<<<<<<< HEAD
        // Exibir notificação de erro
        toast.error('Não foi possível carregar os itens do carrinho');
      } finally {
        setLoading(false); // Defina como false após a busca
      }
    }
=======
      }
    }

>>>>>>> 8df8fa879a245663d2cca72b92c6d144a7367c70
    fetchCartProducts();
  }, []);

  const handleRemoveProduct = async (docId) => {
    try {
      const productDocRef = doc(db, 'carrinho', docId);
      await deleteDoc(productDocRef);
      setCartProducts((prevProducts) => prevProducts.filter((product) => product.docId !== docId));
      console.log('Produto removido com sucesso do carrinho:', docId);
<<<<<<< HEAD

      toast.error('Item removido do carrinho');
=======
>>>>>>> 8df8fa879a245663d2cca72b92c6d144a7367c70
    } catch (error) {
      console.error('Erro ao remover produto do carrinho:', error);
    }
  };

  const handleUpdateQuantity = async (docId, newQuantity) => {
    try {
      const productDocRef = doc(db, 'carrinho', docId);
      await updateDoc(productDocRef, { quantidade: newQuantity });
<<<<<<< HEAD
=======
      // Atualize a quantidade no estado local para refletir as alterações
>>>>>>> 8df8fa879a245663d2cca72b92c6d144a7367c70
      setCartProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.docId === docId ? { ...product, quantidade: newQuantity } : product
        )
      );
      console.log('Quantidade do produto atualizada com sucesso:', docId, newQuantity);
    } catch (error) {
      console.error('Erro ao atualizar a quantidade do produto:', error);
    }
  };

<<<<<<< HEAD
  // Renderiza apenas os primeiros 3 produtos se showAll for falso
  const productsToRender = showAll ? cartProducts : cartProducts.slice(0, 3);

  return (
    <div className='buycart'>
      <div className='header-cart'>
        <h2>Carrinho de Compras</h2>
        <Link to="/"><button>Adicionar mais itens ao carrinho</button></Link>
      </div>
      {cartProducts.length === 0 ? (
        <h1 className='vazio'>O seu carrinho de compras está vazio!:( <br/>Continue realizando suas compras clicando no botão acima</h1>
      ) : (
        <>
          {productsToRender.map((product) => (
            <div className='prod' key={product.docId}>
              <img className='prod' src={product.thumbnail} alt={product.title} />
              <span>
                {product.title} <br />
                <Counter
                  quantity={product.quantidade}
                  handleQuantityChange={(newQuantity) =>
                    handleUpdateQuantity(product.docId, newQuantity)
                  }
                />
                <button onClick={() => handleRemoveProduct(product.docId)}>Remover</button>
              </span>
            </div>
          ))}
          {/* Renderize o botão "Ver Mais" se houver mais de 3 produtos */}
          {cartProducts.length > 3 && !showAll && (
            <button onClick={() => setShowAll(true)}>Ver Mais</button>
          )}
        </>
      )}
    </div>
=======
  return (<>
  <Link to="/">Voltar</Link>
    <div>

      <h1>Carrinho de Compras</h1>
      <ul>
        {cartProducts.map((product) => (
          <div key={product.docId}>
            <img src={product.thumbnail}/>
            <span>
              {product.title} <br />
              <Counter // Use o componente Counter aqui
                quantity={product.quantidade} // Passe a quantidade do produto como prop
                handleQuantityChange={(newQuantity) => handleUpdateQuantity(product.docId, newQuantity)} // Passe a função de atualização de quantidade
              />
              <button onClick={() => handleRemoveProduct(product.docId)}>Remover</button>
            </span>
          </div>
        ))}
      </ul>
    </div>
    </>
>>>>>>> 8df8fa879a245663d2cca72b92c6d144a7367c70
  );
}

export default Cart;
