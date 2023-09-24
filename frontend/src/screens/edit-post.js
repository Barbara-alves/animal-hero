import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Constants from '../utils/Constants';
import LogoAnimalHero from './../assets/animal-hero.jpg';
import './../styles/classes.css';
import './../styles/tags.css';


function EditPost() {

  const { state: { post, user, jwt } } = useLocation();
  const navigate = useNavigate();

  const [local, setLocal] = useState('');
  const [especie, setEspecie] = useState('');
  const [descricao, setDescricao] = useState('');
  const [sexo, setSexo] = useState('');
  const [foto, setFoto] = useState(null);

  React.useEffect(() => {
    setLocal(post.local);
    setEspecie(post.especie);
    setDescricao(post.descricao);
    setSexo(post.sexo);
  }, [post]);

  async function handleSubmit(event) {
    event.preventDefault();

    const updatedPost = {
    };

    let hasChanges = false;

    for (const [key, value] of Object.entries(post)) {
      const el = event.target.querySelector(`#${key},[name=${key}]`);
      if (el && el.value !== "" && value !== el.value) {
        updatedPost[key] = el.value;
        hasChanges = true;
      }
    }

    if (hasChanges) {
      if(updatedPost.foto){
        updatedPost.foto = foto;
      }
      const response = await fetch(`${Constants.POST_URL}/${post.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(updatedPost)
      });

      if (response.ok) {
        navigate('/posts', { replace: true, state: { user, jwt } });
      } else {
        alert("Falha ao atualizar postagem! " + (await response.json()).message || "Erro desconhecido");
      }
    }
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFoto(reader.result);
      }
    }
  };

  return (
    <>
      <header>
        <img src={LogoAnimalHero} className='logo-animal' alt='Logo Animal Hero'></  img>
      </header>
      <h3>Editar Animal Perdido</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="local">Local:</label>
          <input
            type="text"
            id="local"
            value={local}
            onChange={(event) => setLocal(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="especie">Espécie:</label>
          <input
            type="text"
            id="especie"
            value={especie}
            onChange={(event) => setEspecie(event.target.value)}
          />
        </div>
        <div className='label'>
          <label htmlFor="sexo" >Sexo:</label>
          <div>
            <label htmlFor="sexo-macho">
              <input
                type="radio"
                id="sexo-macho"
                name="sexo"
                value="M"
                checked={sexo === 'M'}
                onChange={(event) => setSexo(event.target.value)}
              />
              Macho
            </label>
          </div>
          <div>
            <label htmlFor="sexo-femea">
              <input
                type="radio"
                id="sexo-femea"
                name="sexo"
                value="F"
                checked={sexo === 'F'}
                onChange={(event) => setSexo(event.target.value)}
              />
              Fêmea
            </label>
          </div>
          <div>
            <label htmlFor="sexo-desconhecido">
              <input
                type="radio"
                id="sexo-desconhecido"
                name="sexo"
                value="D"
                checked={sexo === 'D'}
                onChange={(event) => setSexo(event.target.value)}
              />
              Desconhecido
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="foto">Foto:</label>
          <input
            type="file"
            id="foto"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Salvar Edições</button>
      </form>
      <footer></footer>

    </>
  );
}

export default EditPost;
