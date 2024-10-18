import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../service/api";
import './filmeInfo.css'

function Filmes() {
  const { id } = useParams();
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
          console.log("FILME NÃO ENCONTRADO");
        });
    }

    loadFilme();

    return () => {
      console.log("Componete foi desmontado");
    };
  }, []);

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
      <button>Salvar</button>
        <button><a href="#">Trailer</a></button>
      </div>
    </div>
  );
}

export default Filmes;
