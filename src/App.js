import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
      console.log(response.data);
    }
  )}, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repositório ${Date.now()}`,
      url: `http://github.com/repositorio_${Date.now()}`,
      techs: ["Nada.js", "Algo.cpp"]
    });

    const repository = response.data;

    setRepositories([... repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if(response.status !== 204) console.log("Erro. Tente novamente.");
    else {
      const filteredRepositories = repositories.filter(repository => repository.id !== id);
      setRepositories(filteredRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
            <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
            </button>
            </li>
          )
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
