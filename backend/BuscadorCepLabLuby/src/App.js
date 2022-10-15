import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import api from "./services/api";
import "./style.css";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function HandleSearch() {
    if (input === "") {
      alert("Preencha algum cep!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);

      setCep(response.data);
      setInput("");
    } catch {
      setInput("");
      alert("Ops, erro ao buscar!");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <button className="buttonSearch" onClick={HandleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          {cep.logradouro && (
            <span>{cep.logradouro}</span>
          )}

          {cep.complemento && (
            <span>Complemento: {cep.complemento}</span>
          )}

          {cep.bairro && (
            <span>{cep.bairro}</span>
          )}

          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
