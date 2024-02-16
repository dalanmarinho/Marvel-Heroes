import './styles.css';
import personagensData from "../../utils/herois";

const Filter = ({onIncrement, personagens  }) => {

  function checkSize(){
    //console.log(personagens);
    return (personagens.length === personagensData.length);
  }

  return (

    <div className="App-filter">
      <span className="filter-description">Bem vindo ao Marvel Heroes</span>
      <h2>Escolha o seu personagem</h2>
      <div className="areaButton">
        <div className="button-hero" onClick={() => onIncrement('heroi')}>
          <img className="icon-button" src={require('../../assets/icons/hero-icon.png')} />
          <span className="tooltiptext">Filtrar Heroís</span>
        </div>
        <div className="button-villain" onClick={() => onIncrement('vilao')}>
          <img className="icon-button" src={require('../../assets/icons/villain-icon.png')} />
          <span className="tooltiptext">Filtrar Vilões</span>
        </div>
        { !checkSize() ? <span className="clear-filter" onClick={() => onIncrement('')}>x Limpar</span> : null }
      </div>
    </div>
  );
};

export default Filter;