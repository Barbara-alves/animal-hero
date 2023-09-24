import React, { useState } from 'react';
import DrawerNavigation from '../utils/DrawerNavigation';
import LogoAnimalHero from './../assets/animal-hero.jpg';
import './../styles/classes.css';
import './../styles/tags.css';

function CreatePost() {
    const [local, setLocal] = useState('');
    const [especie, setEspecie] = useState('');
    const [descricao, setDescricao] = useState('');
    const [sexo, setSexo] = useState('');
    const [foto, setFoto] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const animalPerdido = {
            Local: local,
            especie: especie,
            descricao: descricao,
            sexo: sexo,
            foto: foto
        };
        console.log(animalPerdido);
        setLocal('');
        setEspecie('');
        setDescricao('');
        setSexo('');
        setFoto(null);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFoto(file);
    };

    return (
        <>
            {/* <DrawerNavigation /> */}
            <header>
                <img src={LogoAnimalHero} className='logo-animal' alt='Logo Animal Hero'></  img>
            </header>

            <div className='div-form'>
                <h3>Cadastro de Animal Perdido</h3>
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
                                    value="Macho"
                                    checked={sexo === 'Macho'}
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
                                    value="Fêmea"
                                    checked={sexo === 'Fêmea'}
                                    onChange={(event) => setSexo(event.target.value)}
                                />
                                Fêmea
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
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </>
    );
}

export default CreatePost;
