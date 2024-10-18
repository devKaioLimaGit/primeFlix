import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../service/api";
import {toast} from 'react-toastify'
import './filmeInfo.css'

function Filmes() {
  const { id } = useParams();
  const navegate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loadFilme, setLoadFilme] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "bc0820000620dc88604fb3d1f8418bc7",
            language: "pt-BR",
            page: 1,
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoadFilme(false);
        })
        .catch(() => {
          toast.warn("Filme não encontrado!");
          navegate("/", {replace: true})
          return;
        });
    }

    loadFilme();
  }, [navegate, id]);

  function salvaFilme() {
  
    const minhaLista = localStorage.getItem("@primeFlix");
    let filmesSalvos = JSON.parse(minhaLista) || [];
  
    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

  
    if (hasFilme) {
      toast.warn("Esse filme já existe na lista!");
      return;
    }
  
    filmesSalvos.push(filme);
    localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
  
    toast.success("Filme salvo com sucesso!");
  }
  

  if (loadFilme) {
    return (
      <div className="filme-info">
        <h1>Carregado os detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average} / 10</strong>


      <div className="area-buttons">
      <button onClick={() => { salvaFilme(); }}>Salvar</button>
        <button><a target="black" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a></button>
      </div>
    </div>
  );
}

export default Filmes;
