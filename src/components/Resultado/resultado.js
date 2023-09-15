import React, { useContext, useEffect, useState } from 'react';
import './resultado.css';
import AppContext from '../../context/AppContext';
import { useParams, Link } from 'react-router-dom';
import { fetchByID } from '../../api/fetchProducts';
import formatCurrency from '../../utils/formatCurrency';
import Loading from '../Loading/Loading';
import Counter from '../redux/Counter';
import Frete from '../Frete/frete';
import { db } from '../../services/firebaseConfig';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

function ProductResult() {
  const { loading, setLoading } = useContext(AppContext);
  const { id } = useParams();
  const [produto, setProduto] = useState({});
  const [quantity, setQuantity] = useState(0); // Adicione o estado para a quantidade

  useEffect(() => {
    fetchByID(id).then((resultado) => {
      setProduto(resultado);
      setQuantity(resultado.quantity || 0); // Atualize a quantidade do estado
      setLoading(false);
    });
  }, [id, setLoading]);

  // Função para enviar informações do produto para o Firestore
  const handleAddProductToFirestore = async (newQuantity) => {
    try {
      const docRef = await addDoc(collection(db, 'carrinho'), {
        title: produto.title,
        thumbnail: produto.thumbnail,
        id: id,
        quantidade: newQuantity, // Use a nova quantidade
      });
      console.log('Informações do produto adicionadas com sucesso com ID: ', docRef.id);
      // Atualize a quantidade do estado local
      setQuantity(newQuantity);
    } catch (error) {
      console.error('Erro ao adicionar informações do produto ao Firestore: ', error);
    }
  };

  return (
    (loading && <Loading />) || (
      <section className='product-card'>
        <img
          src={produto.thumbnail.replace(/\w\.jpg/gi, 'W.jpg')}
          alt='product'
          className='card-image'
        />
        <div className='Card-info'>
          <h2 className=' card-title'>{produto.title}</h2>
          <h4 className='card-price'> {formatCurrency(produto.price, 'BRL')}</h4>
          <span>{produto.title}</span>
          <Counter productId={id} quantity={quantity} handleQuantityChange={handleAddProductToFirestore} />
          <Frete />
          <Link to="/cart">Ir para o Carrinho</Link>
        </div>
      </section>
    )
  );
}

export default ProductResult;
