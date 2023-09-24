import React from 'react';
import { Link } from 'react-router-dom';
import LogoAnimalHero from './../assets/animal-hero.jpg';

function ReadPosts({ posts, onDelete }) {
  return (
    <div>
      <header>
        <img src={LogoAnimalHero} alt='Logo-animal-hero' />
      </header>
      <h2 className='div-title'>Lista de Animais Perdidos</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <h3>{post.Local}</h3>
            <p>Espécie: {post.especie}</p>
            <p>Sexo: {post.sexo}</p>
            <p>Descrição: {post.descricao}</p>
            {post.foto && <img src={URL.createObjectURL(post.foto)} alt="Foto do animal perdido" />}
            <Link to={`/editar/${index}`}>Editar</Link> {/* Navegação para a página de edição */}
            <button onClick={() => onDelete(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReadPosts;
