import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Constants from '../utils/Constants';
import LogoAnimalHero from './../assets/animal-hero.jpg';

const SEXO = {
  M: 'Macho',
  F: 'Fêmea',
  D: 'Desconhecido'
}


function ReadPosts() {
  const { state } = useLocation();
  React.useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(Constants.POST_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.jwt}`
        }
      });
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [state]);

  const [posts, setPosts] = React.useState([]);

  async function deletePost(postId) {
    const response = await fetch(`${Constants.POST_URL}/${postId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${state.jwt}`,
      },
    });

    if (response.ok) {
      const newPosts = posts.filter(post => post.id !== postId);
      setPosts(newPosts);
    } else {
      alert("Falha ao deletar postagem!", (await response.json()).message)
    }
  }

  function canEditOrDeletePost(postUserId) {
    const { user } = state;
    return user && (user.isAdmin || user.id === postUserId);
  }

  return (
    <div>
      <header>
        <img src={LogoAnimalHero} alt='Logo-animal-hero' />
      </header>
      <h2 className='div-title'>Lista de Animais Perdidos</h2>
      <h3 className='div-title'><Link to="/create" state={state} >Criar postagem</Link></h3>
      <ul>
        {posts?.map((post, index) => (
          <li key={index}>
            <h3>{post.Local}</h3>
            <h6>Publicado por: {post.user.name}</h6>
            <p>Espécie: {post.especie}</p>
            <p>Sexo: {SEXO[post.sexo]}</p>
            <p>Descrição: {post.descricao}</p>
            {post.foto && <img src={post.foto} alt="Foto do animal perdido" />}
            {canEditOrDeletePost(post.user.id) && <>
              <Link to={`/edit/${post.id}`} state={{ ...state, post }}>Editar</Link>
              <button onClick={() => deletePost(post.id)}>Excluir</button>
            </>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReadPosts;
