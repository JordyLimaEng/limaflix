import React, { Component, useState, useEffect } from 'react';
import api from './services/api'
import "./styles.css";

import Modal from "react-modal";

import { Button } from "react-bootstrap";

import { Player, ControlBar, ClosedCaptionButton } from 'video-react';
import 'video-react/dist/video-react.css';

export default function App() {
  const [filmes, setFilmes] = useState([]);
  const [assistir, setAssistir] = useState();
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  async function getFilmes() {
    try {
      const res = await api.get("/filmes")
      setFilmes(res.data.filmes)
    } catch (e) {
      console.error(e.message)
    }
  }

  function HandleClick(name) {
    toggleModal();
    setAssistir(name);
  }

  return (
    <>
      <p className="App-intro">LIMAFLIX</p>
      <button onClick={() => getFilmes()}>Catálogo</button>
      {filmes.map(i => (
        <p>
          {i.titulo} <Button onClick={() => HandleClick(i.titulo)}>Assistir</Button>
        </p>
      ))}

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div>
        {/* {assistir} */}
        <Button onClick={toggleModal} className='button-close'>Fechar</Button>
        </div>
          
        <div className='player-wrapper'>
          <Player autoPlay className='react-player'
            width='100%'
            height='100%'>
            <source src={`http://localhost:4001/filmes/${assistir}`} />
          </Player>
        </div>
      </Modal>
    </>
  );
}