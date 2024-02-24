import './styles.css';
import personagensData from "../../utils/herois";
import { useNavigate } from 'react-router-dom';

const Filter = ({ onIncrement, personagens }) => {
  const navigate = useNavigate();
  const localStorageData = JSON.parse(localStorage.getItem("personagens"));
  if (!localStorageData) {
    localStorage.setItem("personagens", JSON.stringify(personagensData));
  }

  function checkSize() {
    //console.log(personagens);
    if(localStorageData){
      return (personagens?.length === localStorageData?.length);
    }
    return true;
  }

  const onClickButton = () => {
    navigate('/form')
  }

  return (

    <div className="App-filter">
      <span className="filter-description">Bem vindo ao Marvel Heroes</span>
      <h2>Escolha o seu personagem</h2>
      <div className="areaButton">
        <div className="buttonGroup">
          <div className="button-hero" onClick={() => onIncrement('heroi')}>
            <img className="icon-button" src={require('../../assets/icons/hero-icon.png')} />
            <span className="tooltiptext">Filtrar Heroís</span>
          </div>
          <div className="button-villain" onClick={() => onIncrement('vilao')}>
            <img className="icon-button" src={require('../../assets/icons/villain-icon.png')} />
            <span className="tooltiptext">Filtrar Vilões</span>
          </div>
          {!checkSize() ? <span className="clear-filter" onClick={() => onIncrement('')}>x Limpar</span> : null}

        </div>
        <div className="button-add" onClick={onClickButton}>
          <img className="icon-add" src={require('../../assets/icons/Mais.png')} />
        </div>
      </div>
    </div>
  );
};

export default Filter;
