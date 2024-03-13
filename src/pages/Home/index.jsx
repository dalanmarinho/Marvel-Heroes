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
  const  localStorageData = JSON.parse(localStorage.getItem("personagens"));
  if(!localStorageData){
    localStorage.setItem("personagens", JSON.stringify(personagensData));
  }


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
    let data;
    if (param !== '') {
      data = personagensData.filter((item) => item.nome.toUpperCase() === param.toUpperCase());
      setPersonagem(data);
    } else {
      setPersonagem(personagensData);
    }
  }

  function filterPersonagem(tipo) {
    if (tipo !== '') {
      setFiltroState((filtro)=> true);
      setPersonagem((personagens)=>[...localStorageData]);
      setPersonagem((personagens)=>[...personagens.filter((item) => item.tipo === tipo)]);
    } else {
      setFiltroState((filtro)=> false);
      setPersonagem(localStorageData);
    }
  }

  useEffect(() => {
    if((personagens?.length < localStorageData?.length) && !filtro){
      //console.log('useEffect ',personagens)
      setPersonagem((personagens)=>[...localStorageData]);
    }
  }, [personagens]);

  

  return (
    <section>
      <Header onHanderSearch={(data) => handleSearch(data)} />
      <Filter onIncrement={(tipo) => filterPersonagem(tipo)} personagens={personagens?personagens:localStorageData} />
      <div className="App-card">
        {personagens.map((personagem) =>
          <Card
            key={personagem.nome}
            personagem={personagem}
          />
        )}
      </div>
    </section>
  );
};

export default HomePage;
