import React, { Component, useState, useEffect } from 'react';
import api from './services/api'
import "./styles.css";

import Modal from "react-modal";

import { Button } from "react-bootstrap";

import { Player, ControlBar, ClosedCaptionButton } from 'video-react';
import 'video-react/dist/video-react.css';

export default function App() {
  const [filmes, setFilmes] = useState([]);
  const [assistir, setAssistir] = useState('');
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


      <html>

        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <title>Netflix</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script defer src="https://use.fontawesome.com/releases/v5.1.0/js/all.js" integrity="sha384-3LK/3kTpDE/Pkp8gTNp2gR/2gOiwQ6QaO7Td0zV76UFJVhqLl4Vl3KL1We6q6wR9" crossorigin="anonymous"></script>

          <script src="main.js"></script>
        </head>

        <body onLoad={() => getFilmes()}>
          <div class="wrapper">
            <header>
              <div class="netflixLogo">
                <img src="LIMAFLIX_logo.png" alt="Logo Image" />
              </div>
              <nav class="main-nav">
                <a href="#home">Home</a>
                <a href="#tvShows">TV Shows</a>
                <a href="#movies">Movies</a>
                <a href="#originals">Originals</a>
                <a href="#">Recently Added</a>
                {/* <a target="_blank" href="https://codepen.io/cb2307/full/NzaOrm">Portfolio</a> */}
              </nav>
              <nav class="sub-nav">
                <a href="#"><i class="fas fa-search sub-nav-logo"></i></a>
                <a href="#"><i class="fas fa-bell sub-nav-logo"></i></a>
                {/* <a href="#">Account</a> */}
              </nav>
            </header>
            <section class="main-container">
              <div class="location" id="home">
                <h1 id="home">Disponível Atualmente</h1>
                <div class="box">

      {/* <button className="button-catalogo" onClick={() => getFilmes()}>Catálogo</button> */}
      {filmes.map(i => (
        // <p>
        //   <Button className="button-assistir" onClick={() => HandleClick(i.titulo)}>{i.titulo}</Button>
        // </p>
        <>
        <a><img onClick={() => HandleClick(i.titulo)} src={"./files/"+i.thumb} alt={i.titulo}/></a>
        </>
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
          <Button onClick={toggleModal} className='button-close'>Fechar</Button>
          {
            <p>{assistir.substring(assistir.length - 4, 0)}</p>
          }
        </div>

        <div className='player-wrapper'>
          <Player autoPlay className='react-player'
            width='100%'
            height='100%'>
            <source src={`http://localhost:4001/filmes/${assistir}`} />
          </Player>
        </div>
      </Modal>
                  {/* <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p1.PNG?raw=true" alt="" /></a>
                  <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p2.PNG?raw=true" alt="" /></a>
                  <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p3.PNG?raw=true" alt="" /></a>
                  <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p4.PNG?raw=true" alt="" /></a>
                  <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p5.PNG?raw=true" alt="" /></a>
                  <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p6.PNG?raw=true" alt="" /></a>

                  <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p7.PNG?raw=true" alt="" /></a>
                  <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p8.PNG?raw=true" alt="" /></a>
                  <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p9.PNG?raw=true" alt="" /></a>
                  <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p10.PNG?raw=true" alt="" /></a>
                  <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p11.PNG?raw=true" alt="" /></a>
                  <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p12.PNG?raw=true" alt="" /></a> */}
                </div>
              </div>

              {/* <h1 id="myList">Trending Now</h1>
      <div class="box">
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/t1.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/t2.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/t3.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/t4.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/t5.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/t6.PNG?raw=true" alt="" /></a>
      </div> */}

              {/* <h1 id="tvShows">TV Shows</h1>
      <div class="box">
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv1.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv2.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv3.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv4.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv5.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv6.PNG?raw=true" alt="" /></a>

        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv7.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv8.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv9.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv10.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv11.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv12.PNG?raw=true" alt="" /></a>
      </div> */}

              {/* <h1 id="movies">Blockbuster Action & Adventure</h1>
      <div class="box">
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m1.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m2.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m3.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m4.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m5.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m6.PNG?raw=true" alt="" /></a>
      </div> */}

              {/* <h1 id="originals">Netflix Originals</h1>
      <div class="box">
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/o1.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/o2.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/o3.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/o4.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/o5.PNG?raw=true" alt="" /></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/o6.PNG?raw=true" alt="" /></a>
      </div> */}

              <section class="link">
                {/* <div class="logos">
                  <a href="#"><i class="fab fa-facebook-square fa-2x logo"></i></a>
                  <a href="#"><i class="fab fa-instagram fa-2x logo"></i></a>
                  <a href="#"><i class="fab fa-twitter fa-2x logo"></i></a>
                  <a href="#"><i class="fab fa-youtube fa-2x logo"></i></a>
                </div> */}
                {/* <div class="sub-links">
          <ul>
            <li><a href="#">Audio and Subtitles</a></li>
            <li><a href="#">Audio Description</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Gift Cards</a></li>
            <li><a href="#">Media Center</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Legal Notices</a></li>
            <li><a href="#">Corporate Information</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div> */}
              </section>
              <footer>
                <p>copy Netflix, Inc.</p>
                <p>Jordy Lima version</p>
              </footer>
            </section>
          </div>
        </body>

      </html>




    </>
  );
}