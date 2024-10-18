import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./favoritos.css";
import {toast} from 'react-toastify'
function Favoritos() {
  const [filmes, setFilmes] = useState([]);
  function excluirFilme(e, id) {
    if (e.type === "click") {
      const confirm = window.confirm("Você deseja deletar o filme?");

      if (confirm) {
        let filtroFilmes = filmes.filter((item) => {
          return item.id !== id;
        });

        setFilmes(filtroFilmes);

        localStorage.setItem("@primeFlix", JSON.stringify(filtroFilmes));
        toast.success("Filme removido com sucesso!")
      } else {
        return;
      }
    }
  }
  useEffect(() => {
    const minhaLista = JSON.parse(localStorage.getItem("@primeFlix"));
    setFilmes(minhaLista || []);
  }, []);
  return (
    <div className="meus-filmes">
      <h1>Meus filmes</h1>
      {filmes.length === 0 && (
        <span>Você não possui nenhum filme salvo :( </span>
      )}
      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                <button onClick={(e) => excluirFilme(e, item.id)}>
                  Excluir
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favoritos;
