import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LogoAnimalHero from './../assets/animal-hero.jpg';
import './../styles/classes.css';
import './../styles/tags.css';


function EditOrDeletePost({ posts, onUpdate, onDelete }) {
  const { id } = useParams();
  const [local, setLocal] = useState('');
  const [especie, setEspecie] = useState('');
  const [descricao, setDescricao] = useState('');
  const [sexo, setSexo] = useState('');
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    if (id >= 0 && id < posts.length) {
      const post = posts[id];
      setLocal(post.Local);
      setEspecie(post.especie);
      setDescricao(post.descricao);
      setSexo(post.sexo);
      setFoto(post.foto);
    }
  }, [id, posts]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedPost = {
      Local: local,
      especie: especie,
      descricao: descricao,
      sexo: sexo,
      foto: foto
    };
    onUpdate(id, updatedPost);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFoto(file);
  };

  return (
    <>
      <header>
        <img src={LogoAnimalHero} className='logo-animal' alt='Logo Animal Hero'></  img>
      </header>
      <h3>Editar Animal Perdido</h3>
      <form onSubmit={handleSubmit}>
        {/* Campos de edição semelhantes aos campos de criação */}
        <button type="submit">Salvar Edições</button>
        <button type="button" onClick={() => onDelete(id)}>Deletar</button>
      </form>

    </>
  );
}

export default EditOrDeletePost;
