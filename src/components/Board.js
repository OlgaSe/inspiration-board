import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

const Board = (props) => {
  
  const API_URL_BOARD = 'https://inspiration-board.herokuapp.com/boards/'
  
  const [cardsList, setCardsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
      axios.get(props.url + props.boardName + '/cards')
      .then((response) => {
          const apiCardsList = response.data;
          setCardsList(apiCardsList)
      })
      .catch((
        error) => {
        setErrorMessage(error.message);
        console.log(error.message);
      });
  }, []);

  const cardComponentsList = cardsList.map((card) => {
    return <Card text={card.card.text} emoji={card.card.emoji} key={card.key}/>
  })
  return (
    <div>
      { errorMessage ? <div><h2 className="error-msg">{errorMessage}</h2></div> : '' }
      <h3>Board</h3>
      {cardComponentsList}
    </div>
  )
};

Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired,
};

export default Board;