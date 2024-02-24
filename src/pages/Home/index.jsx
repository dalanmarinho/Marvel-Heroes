import PropTypes from "prop-types";
import './styles.css';
import Title from "../../components/Title";
import Button from "../../components/Button";
import personagensData from "../../utils/herois";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Filter from "../../components/Filter";

const HomePage = () => {
  const [personagens, setPersonagem] = useState([]);
  const [novosPersonagens, setNovosPersonagens] = useState(personagensData);
  const [filtro, setFiltroState] = useState(false);
  const localStorageData = JSON.parse(localStorage.getItem("personagens"));
  


  // const excluirPersonagem = (nome) => {
  //   const localStorageNewData = personagens.filter(personagem => personagem.nome !== nome);
  //   setPersonagem(localStorageNewData);
  //   localStorage.setItem("personagens", JSON.stringify(localStorageNewData));
  //   alert(`Personagem ${nome} excluído!`);
  // }

  const handleSearch = (data) => {
    search(data);
  }

  function search(param) {
    if (param !== '') {
      const input = new RegExp(param + '.+$', 'i');
      setFiltroState((filtro) => true);
      setPersonagem((personagens) => [...localStorageData]);
      setPersonagem((personagens) => [...personagens.filter((item) => checkName(input, param, item))]);
    } else {
      setPersonagem(personagens);
    }
  }

  function checkName(input, param, item) {
    if (item.nome.toUpperCase() === param.toUpperCase()) {
      return true;
    } else if (item.nome.search(input) !== -1) {
      return true;
    }
    return false;
  }

  function filterPersonagem(tipo) {
    if (tipo !== '') {
      setFiltroState((filtro) => true);
      setPersonagem((personagens) => [...localStorageData]);
      setPersonagem((personagens) => [...personagens.filter((item) => item.tipo === tipo)]);
    } else {
      setFiltroState((filtro) => false);
      setPersonagem(localStorageData);
    }
  }

  useEffect(() => {
    if (!localStorageData) {
      localStorage.setItem("personagens", JSON.stringify(personagensData));
    }

    if ((personagens?.length < localStorageData?.length) && !filtro) {
      //console.log('useEffect ',personagens)
      setPersonagem((personagens) => [...localStorageData]);
    }
  }, [personagens]);



  return (
    <section>
      <Header onHanderSearch={(data) => handleSearch(data)} />
      <Filter onIncrement={(tipo) => filterPersonagem(tipo)} personagens={personagens} />
      <div className="App-card">
        {personagens.map((personagem) =>
          <Card
            key={personagem.nome}
            personagem={personagem}
          />
        )}
        {(personagens.length === 0)?
        <h3>Nenhum resultado encontrado!</h3>
        :null}
      </div>
    </section>
  );
};

export default HomePage;