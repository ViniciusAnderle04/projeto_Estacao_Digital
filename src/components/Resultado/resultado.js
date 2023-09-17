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
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

function ProductResult() {
  const { loading, setLoading } = useContext(AppContext);
  const { id } = useParams();
  const [produto, setProduto] = useState({});
  const [quantity, setQuantity] = useState(0);
  const auth = getAuth();
  const [userID, setUserID] = useState(null); // Estado para armazenar o userID

  // Verificar se o usuário está autenticado
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userID = user.uid;
        setUserID(userID); // Armazena o userID no estado
      } else {
        // O usuário não está autenticado
        setUserID(null); // Limpa o userID se o usuário não estiver autenticado
      }
    });
  }, [auth]);

  useEffect(() => {
    fetchByID(id).then((resultado) => {
      setProduto(resultado);
      setQuantity(resultado.quantity || 0);
      setLoading(false);
    });
  }, [id, setLoading]);

  const handleAddProductToFirestore = async (newQuantity) => {
    try {
      const docRef = await addDoc(collection(db, 'carrinho'), {
        title: produto.title,
        thumbnail: produto.thumbnail,
        id: id,
        quantidade: newQuantity,
        userID: userID, // Inclua o userID ao enviar para o Firestore
      });
      console.log('Informações do produto adicionadas com sucesso com ID: ', docRef.id);
      setQuantity(newQuantity);
    } catch (error) {
      console.error('Erro ao adicionar informações do produto ao Firestore: ', error);
    }
  };

  // Função para realizar o logout do usuário


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
          <Frete />
          <Counter productId={id} quantity={quantity} handleQuantityChange={handleAddProductToFirestore} />
          <Link to="/cart">Ir para o Carrinho</Link>
          
        </div>
      </section>
    )
  );
}

export default ProductResult;
