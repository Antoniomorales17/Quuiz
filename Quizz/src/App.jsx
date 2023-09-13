
import "./App.css";
import React, { useEffect, useMemo, useState} from "react";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import Start from "./components/Start";

function App() {
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("€ 0");
  const [restartGame, setRestartGame] = useState(false);

  const handleRestartGame = () => {
    setRestartGame(true);
    setQuestionNumber(1); // Reinicia el número de pregunta si es necesario
    setTimeOut(false); // Reinicia el temporizador si es necesario
    setEarned("$ 0"); // Reinicia las ganancias si es necesario
  };
  

  const data = [
    {
      id: 1,
      question: "¿Cuál es el lema de la Casa Stark?",
      answers: [
        {
          text: "Familia, deber, honor",
          correct: false,
        },
        {
          text: "Se acerca el invierno",
          correct: true,
        },
        {
          text: "Valar Morghulis",
          correct: false,
        },
        {
          text: "Nuestra es la furia",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "¿Quién es el Rey de la Noche?",
      answers: [
        {
          text: "Jon Snow",
          correct: false,
        },
        {
          text: "Bran Stark",
          correct: false,
        },
        {
          text: "Ninguno de los anteriores",
          correct: true,
        },
        {
          text: "Jaime Lannister",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "¿Dónde se encuentra la Fortaleza Roja en Desembarco del Rey?",
      answers: [
        {
          text: "En el Muro",
          correct: false,
        },
        {
          text: "En las Tierras de la Tormenta",
          correct: false,
        },
        {
          text: "En la Isla de los Rostros",
          correct: false,
        },
        {
          text: "En la Colina del Forca",
          correct: true,
        },
      ],
    },
    {
      id: 4,
      question: "¿Qué casa gobernaba el Norte antes de los Stark?",
      answers: [
        {
          text: "Casa Targaryen",
          correct: false,
        },
        {
          text: "Casa Greyjoy",
          correct: false,
        },
        {
          text: "Casa Bolton",
          correct: true,
        },
        {
          text: "Casa Lannister",
          correct: false,
        },
      ],
    },
    {
      id: 5,
      question: "¿Cuál es el apodo de Tyrion Lannister?",
      answers: [
        {
          text: "El Perro",
          correct: false,
        },
        {
          text: "El Enano",
          correct: true,
        },
        {
          text: "El Lobo Solitario",
          correct: false,
        },
        {
          text: "El Caballero de las Flores",
          correct: false,
        },
      ],
    },
    {
      id: 6,
      question: "¿Quién fue conocido como el 'Rey Loco'?",
      answers: [
        {
          text: "Joffrey Baratheon",
          correct: false,
        },
        {
          text: "Viserys Targaryen",
          correct: false,
        },
        {
          text: "Robert Baratheon",
          correct: false,
        },
        {
          text: "Aerys II Targaryen",
          correct: true,
        },
      ],
    },
    {
      id: 7,
      question: "¿Qué es el 'Trono de Hierro'?",
      answers: [
        {
          text: "Una espada legendaria",
          correct: false,
        },
        {
          text: "Un trono mágico",
          correct: false,
        },
        {
          text: "Un símbolo de poder en Poniente",
          correct: true,
        },
        {
          text: "Una puerta a otro mundo",
          correct: false,
        },
      ],
    },
    {
      id: 8,
      question: "¿Quién lidera a los Caminantes Blancos?",
      answers: [
        {
          text: "Bran Stark",
          correct: false,
        },
        {
          text: "Jon Snow",
          correct: false,
        },
        {
          text: "El Rey de la Noche",
          correct: true,
        },
        {
          text: "Tyrion Lannister",
          correct: false,
        },
      ],
    },
    {
      id: 9,
      question: "¿Cuál es el nombre de la espada de Jon Snow?",
      answers: [
        {
          text: "Agujas",
          correct: false,
        },
        {
          text: "Hielo",
          correct: false,
        },
        {
          text: "Garras",
          correct: true,
        },
        {
          text: "Dragón",
          correct: false,
        },
      ],
    },
    {
      id: 10,
      question: "¿Quién es el 'Rey de la Noche'?",
      answers: [
        {
          text: "Bran Stark",
          correct: false,
        },
        {
          text: "Jon Snow",
          correct: false,
        },
        {
          text: "El Rey de la Noche",
          correct: true,
        },
        {
          text: "Tyrion Lannister",
          correct: false,
        },
      ],
    },
    {
      id: 11,
      question: "¿Quién es conocido como 'El Inmortal' en el khalasar de los Dothraki?",
      answers: [
        {
          text: "Khal Drogo",
          correct: false,
        },
        {
          text: "Rhaegal",
          correct: false,
        },
        {
          text: "Rakharo",
          correct: true,
        },
        {
          text: "Hodor",
          correct: false,
        },
      ],
    },
    {
      id: 12,
      question: "¿Cuál es la casa que tiene un lobo como emblema?",
      answers: [
        {
          text: "Casa Baratheon",
          correct: false,
        },
        {
          text: "Casa Greyjoy",
          correct: false,
        },
        {
          text: "Casa Stark",
          correct: true,
        },
        {
          text: "Casa Tyrell",
          correct: false,
        },
      ],
    },
    {
      id: 13,
      question: "¿Dónde se encuentra el Muro?",
      answers: [
        {
          text: "En Desembarco del Rey",
          correct: false,
        },
        {
          text: "En Invernalia",
          correct: false,
        },
        {
          text: "En el Norte",
          correct: true,
        },
        {
          text: "En Roca Casterly",
          correct: false,
        },
      ],
    },
    {
      id: 14,
      question: "¿Quién es el Cuervo de Tres Ojos?",
      answers: [
        {
          text: "Joffrey Baratheon",
          correct: false,
        },
        {
          text: "Viserys Targaryen",
          correct: false,
        },
        {
          text: "Bran Stark",
          correct: true,
        },
        {
          text: "Aerys II Targaryen",
          correct: false,
        },
      ],
    },
    {
      id: 15,
      question: "¿Cuál es el lema de la Casa Lannister?",
      answers: [
        {
          text: "Ours Is the Fury",
          correct: false,
        },
        {
          text: "We Do Not Sow",
          correct: false,
        },
        {
          text: "Hear Me Roar!",
          correct: true,
        },
        {
          text: "Fire and Blood",
          correct: false,
        },
      ],
    },
  ];

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1.000" },
        { id: 6, amount: "$ 2.000" },
        { id: 7, amount: "$ 4.000" },
        { id: 8, amount: "$ 8.000" },
        { id: 9, amount: "$ 16.000" },
        { id: 10, amount: "$ 32.000" },
        { id: 11, amount: "$ 64.000" },
        { id: 12, amount: "$ 125.000" },
        { id: 13, amount: "$ 250.000" },
        { id: 14, amount: "$ 500.000" },
        { id: 15, amount: "$ 1.000.000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  return (
    <div className="app">
     {!username || restartGame ? (
  <Start setUsername={setUsername} onStartGame={handleRestartGame} />
) : (
        <>
          <div className="main">
            {timeOut ? (
              <div>
              <h1 className="endText">You earned: {earned}</h1>
              <button onClick={handleRestartGame}>Iniciar nuevo juego</button>
            </div>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setTimeOut={setTimeOut}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setTimeOut={setTimeOut}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;