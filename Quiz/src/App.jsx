
import "./App.css";
import React, { useEffect, useMemo, useState} from "react";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import Start from "./components/Start";

function App() {
  const [theme, setTheme] = useState(null);
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("€ 0");
  const [restartGame, setRestartGame] = useState(false);

  const handleRestartGame = () => {
    setRestartGame(true);
    setQuestionNumber(1); // Reinicia el número de pregunta si es necesario
    setTimeOut(false); // Reinicia el temporizador si es necesario
    setEarned("€ 0"); // Reinicia las ganancias si es necesario
  };
  

  const themes = {
    "Game of Thrones": [
      {
        id: 1,
        question: "¿Quién es el autor de la serie de novelas 'Canción de Hielo y Fuego' en la que se basa 'Juego de Tronos'?",
        answers: [
          {
            text: "J.R.R. Tolkien",
            correct: false,
          },
          {
            text: "George R.R. Martin",
            correct: true,
          },
          {
            text: "J.K. Rowling",
            correct: false,
          },
          {
            text: "Terry Pratchett",
            correct: false,
          },
        ],
      },
      {
        id: 2,
        question: "¿Cuál es el lema de la Casa Stark?",
        answers: [
          {
            text: "Fuego y Sangre",
            correct: false,
          },
          {
            text: "Nuestra es la Furia",
            correct: false,
          },
          {
            text: "Ours is the Fury",
            correct: false,
          },
          {
            text: "Se acerca el Invierno",
            correct: true,
          },
        ],
      },
      {
        id: 3,
        question: "¿Quién es conocido como 'El Perro'?",
        answers: [
          {
            text: "Gregor Clegane",
            correct: false,
          },
          {
            text: "Sandor Clegane",
            correct: true,
          },
          {
            text: "Bran Stark",
            correct: false,
          },
          {
            text: "Jaime Lannister",
            correct: false,
          },
        ],
      },
      {
        id: 4,
        question: "¿Qué ciudad es conocida como 'La Ciudad del Rey'?",
        answers: [
          {
            text: "Desembarco del Rey",
            correct: true,
          },
          {
            text: "Invernalia",
            correct: false,
          },
          {
            text: "Meereen",
            correct: false,
          },
          {
            text: "Roca Casterly",
            correct: false,
          },
        ],
      },
      {
        id: 5,
        question: "¿Cuál es el nombre del continente en el que se desarrolla la mayor parte de 'Juego de Tronos'?",
        answers: [
          {
            text: "Westeros",
            correct: true,
          },
          {
            text: "Essos",
            correct: false,
          },
          {
            text: "Poniente",
            correct: false,
          },
          {
            text: "Valyria",
            correct: false,
          },
        ],
      },
      {
        id: 6,
        question: "¿Quién es el Treserón de la Guardia de la Noche en la primera temporada de la serie?",
        answers: [
          {
            text: "Jeor Mormont",
            correct: true,
          },
          {
            text: "Eddard Stark",
            correct: false,
          },
          {
            text: "Jon Snow",
            correct: false,
          },
          {
            text: "Samwell Tarly",
            correct: false,
          },
        ],
      },
      {
        id: 7,
        question: "¿Cuál es el nombre del dragón de Daenerys Targaryen?",
        answers: [
          {
            text: "Drogon",
            correct: true,
          },
          {
            text: "Viserion",
            correct: false,
          },
          {
            text: "Rhaegal",
            correct: false,
          },
          {
            text: "Balerion",
            correct: false,
          },
        ],
      },
      {
        id: 8,
        question: "¿Qué casa utiliza el lema 'Fuego y Sangre'?",
        answers: [
          {
            text: "Targaryen",
            correct: true,
          },
          {
            text: "Baratheon",
            correct: false,
          },
          {
            text: "Stark",
            correct: false,
          },
          {
            text: "Lannister",
            correct: false,
          },
        ],
      },
      {
        id: 9,
        question: "¿Qué material es necesario para matar a un Caminante Blanco?",
        answers: [
          {
            text: "Acero valyrio",
            correct: true,
          },
          {
            text: "Acero común",
            correct: false,
          },
          {
            text: "Obsidiana",
            correct: true,
          },
          {
            text: "Plata",
            correct: false,
          },
        ],
      },
      {
        id: 10,
        question: "¿Quién es apodado 'El Conquistador' y fundó la Casa Targaryen en Poniente?",
        answers: [
          {
            text: "Viserys Targaryen",
            correct: false,
          },
          {
            text: "Aerys Targaryen",
            correct: false,
          },
          {
            text: "Aegon Targaryen",
            correct: true,
          },
          {
            text: "Rhaegar Targaryen",
            correct: false,
          },
        ],
      },
      {
        id: 11,
        question: "¿Cuál es el nombre del consejo de asesores del Rey en Desembarco del Rey?",
        answers: [
          {
            text: "Consejo Privado",
            correct: false,
          },
          {
            text: "Pequeño Consejo",
            correct: true,
          },
          {
            text: "Consejo de Sabios",
            correct: false,
          },
          {
            text: "Consejo de Reyes",
            correct: false,
          },
        ],
      },
      {
        id: 12,
        question: "¿Quién es el Maestre de la Ciudadela que ayuda a Samwell Tarly en su entrenamiento?",
        answers: [
          {
            text: "Maestre Luwin",
            correct: false,
          },
          {
            text: "Maestre Pycelle",
            correct: false,
          },
          {
            text: "Maestre Aemon",
            correct: false,
          },
          {
            text: "Maestre Ebrose",
            correct: true,
          },
        ],
      },
      {
        id: 13,
        question: "¿Cuál es el nombre de la espada de acero valyrio de Jon Snow?",
        answers: [
          {
            text: "Hielo",
            correct: false,
          },
          {
            text: "Aguja",
            correct: false,
          },
          {
            text: "Garralonga",
            correct: false,
          },
          {
            text: "Garras de Acero",
            correct: true,
          },
        ],
      },
      {
        id: 14,
        question: "¿Cuál es el lema de la Casa Lannister?",
        answers: [
          {
            text: "Ours is the Fury",
            correct: false,
          },
          {
            text: "Hear Me Roar",
            correct: false,
          },
          {
            text: "Unbowed, Unbent, Unbroken",
            correct: false,
          },
          {
            text: "Hear Me Roar!",
            correct: true,
          },
        ],
      },
      {
        id: 15,
        question: "¿Cuál es el nombre del consejero principal de Daenerys Targaryen en su búsqueda del Trono de Hierro?",
        answers: [
          {
            text: "Tyrion Lannister",
            correct: true,
          },
          {
            text: "Jorah Mormont",
            correct: false,
          },
          {
            text: "Barristan Selmy",
            correct: false,
          },
          {
            text: "Grey Worm",
            correct: false,
          },
        ],
      },
      // Agrega más preguntas de Game of Thrones aquí
    ],
    "Harry Potter": [
      {
        id: 1,
        question: "¿Cuál es la casa a la que pertenece Harry Potter?",
        answers: [
          {
            text: "Slytherin",
            correct: false,
          },
          {
            text: "Ravenclaw",
            correct: false,
          },
          {
            text: "Hufflepuff",
            correct: false,
          },
          {
            text: "Gryffindor",
            correct: true,
          },
        ],
      },
      {
        id: 2,
        question: "¿Cuál es el nombre completo de Hermione Granger?",
        answers: [
          {
            text: "Hermione Jane Granger",
            correct: false,
          },
          {
            text: "Hermione Elizabeth Granger",
            correct: false,
          },
          {
            text: "Hermione Jean Granger",
            correct: true,
          },
          {
            text: "Hermione Mary Granger",
            correct: false,
          },
        ],
      },
      {
        id: 3,
        question: "¿Cuál es el deporte favorito de Ron Weasley?",
        answers: [
          {
            text: "Quidditch",
            correct: true,
          },
          {
            text: "Ajedrez mágico",
            correct: false,
          },
          {
            text: "Golf mágico",
            correct: false,
          },
          {
            text: "Tenis mágico",
            correct: false,
          },
        ],
      },
      {
        id: 4,
        question: "¿Qué criatura mágica protege la entrada a la bóveda de Bellatrix Lestrange en Gringotts?",
        answers: [
          {
            text: "Hipogrifo",
            correct: false,
          },
          {
            text: "Dragón",
            correct: true,
          },
          {
            text: "Elves domésticos",
            correct: false,
          },
          {
            text: "Thestrals",
            correct: false,
          },
        ],
      },
      {
        id: 5,
        question: "¿Cuál es el nombre del elfo doméstico que sirve a la familia Malfoy?",
        answers: [
          {
            text: "Dobby",
            correct: false,
          },
          {
            text: "Kreacher",
            correct: true,
          },
          {
            text: "Winky",
            correct: false,
          },
          {
            text: "Hokey",
            correct: false,
          },
        ],
      },
      {
        id: 6,
        question: "¿Cuál es el nombre del hermano de Ron Weasley que trabaja como Auror?",
        answers: [
          {
            text: "Fred",
            correct: false,
          },
          {
            text: "George",
            correct: false,
          },
          {
            text: "Charlie",
            correct: true,
          },
          {
            text: "Percy",
            correct: false,
          },
        ],
      },
      {
        id: 7,
        question: "¿Cuál es el nombre del mejor amigo de Harry Potter?",
        answers: [
          {
            text: "Hermione Granger",
            correct: true,
          },
          {
            text: "Ron Weasley",
            correct: true,
          },
          {
            text: "Neville Longbottom",
            correct: false,
          },
          {
            text: "Luna Lovegood",
            correct: false,
          },
        ],
      },
      {
        id: 8,
        question: "¿Qué objeto mágico permite a Harry ver los recuerdos de otras personas?",
        answers: [
          {
            text: "Espejo de Oesed",
            correct: false,
          },
          {
            text: "Varita de Saúco",
            correct: false,
          },
          {
            text: "La piedra de la resurrección",
            correct: false,
          },
          {
            text: "Pensadero",
            correct: true,
          },
        ],
      },
      {
        id: 9,
        question: "¿Cuál es el nombre de la tienda donde Harry compra su varita?",
        answers: [
          {
            text: "Borgin y Burkes",
            correct: false,
          },
          {
            text: "Ollivander's",
            correct: true,
          },
          {
            text: "Weasleys' Wizard Wheezes",
            correct: false,
          },
          {
            text: "Flourish y Blotts",
            correct: false,
          },
        ],
      },
      {
        id: 10,
        question: "¿Qué objeto mágico permite a los magos viajar en el tiempo?",
        answers: [
          {
            text: "Varita de Saúco",
            correct: false,
          },
          {
            text: "Gira el Tiempo",
            correct: true,
          },
          {
            text: "Reloj de Arena Mágico",
            correct: false,
          },
          {
            text: "Piedra de la Resurrección",
            correct: false,
          },
        ],
      },
      {
        id: 11,
        question: "¿Cuál es el nombre del profesor de Defensa Contra las Artes Oscuras en el primer libro/película?",
        answers: [
          {
            text: "Severus Snape",
            correct: false,
          },
          {
            text: "Remus Lupin",
            correct: true,
          },
          {
            text: "Gilderoy Lockhart",
            correct: false,
          },
          {
            text: "Quirinus Quirrell",
            correct: false,
          },
        ],
      },
      {
        id: 12,
        question: "¿Quién es el director de la escuela de Hogwarts en el segundo libro/película?",
        answers: [
          {
            text: "Albus Dumbledore",
            correct: true,
          },
          {
            text: "Severus Snape",
            correct: false,
          },
          {
            text: "Gilderoy Lockhart",
            correct: false,
          },
          {
            text: "Horace Slughorn",
            correct: false,
          },
        ],
      },
      {
        id: 13,
        question: "¿Cuál es el nombre del hermano mayor de Ron Weasley?",
        answers: [
          {
            text: "Bill",
            correct: true,
          },
          {
            text: "Charlie",
            correct: false,
          },
          {
            text: "Fred",
            correct: false,
          },
          {
            text: "George",
            correct: false,
          },
        ],
      },
      {
        id: 14,
        question: "¿Cuál es la materia que enseña Severus Snape en Hogwarts?",
        answers: [
          {
            text: "Pociones",
            correct: true,
          },
          {
            text: "Defensa Contra las Artes Oscuras",
            correct: false,
          },
          {
            text: "Transformaciones",
            correct: false,
          },
          {
            text: "Adivinación",
            correct: false,
          },
        ],
      },
      {
        id: 15,
        question: "¿Cuál es el nombre del director de la escuela de Durmstrang en el Torneo de los Tres Magos?",
        answers: [
          {
            text: "Igor Karkaroff",
            correct: true,
          },
          {
            text: "Viktor Krum",
            correct: false,
          },
          {
            text: "Gellert Grindelwald",
            correct: false,
          },
          {
            text: "Barty Crouch Jr.",
            correct: false,
          },
        ],
      },
      // Agrega más preguntas de Harry Potter aquí
    ],
    "Señor de los Anillos": [
      {
        id: 1,
        question: "¿Quién es el autor de la serie de novelas 'El Señor de los Anillos'?",
        answers: [
          {
            text: "J.K. Rowling",
            correct: false,
          },
          {
            text: "George R.R. Martin",
            correct: false,
          },
          {
            text: "J.R.R. Tolkien",
            correct: true,
          },
          {
            text: "Terry Pratchett",
            correct: false,
          },
        ],
      },
      {
        id: 2,
        question: "¿Cuál es el nombre del protagonista principal en 'El Señor de los Anillos'?",
        answers: [
          {
            text: "Frodo Baggins",
            correct: true,
          },
          {
            text: "Aragorn",
            correct: false,
          },
          {
            text: "Gandalf",
            correct: false,
          },
          {
            text: "Legolas",
            correct: false,
          },
        ],
      },
      {
        id: 3,
        question: "¿Cuál es el nombre del lugar donde Frodo y su compañía deben destruir el Anillo Único?",
        answers: [
          {
            text: "Rivendel",
            correct: false,
          },
          {
            text: "Gondor",
            correct: false,
          },
          {
            text: "La Comarca",
            correct: false,
          },
          {
            text: "Mordor",
            correct: true,
          },
        ],
      },
      {
        id: 4,
        question: "¿Cuál es el nombre de la espada que es forjada para Aragorn en 'El Señor de los Anillos'?",
        answers: [
          {
            text: "Andúril",
            correct: true,
          },
          {
            text: "Sting",
            correct: false,
          },
          {
            text: "Glamdring",
            correct: false,
          },
          {
            text: "Narsil",
            correct: false,
          },
        ],
      },
      {
        id: 5,
        question: "¿Quién es el gobernante oscuro y principal antagonista en 'El Señor de los Anillos'?",
        answers: [
          {
            text: "Sauron",
            correct: true,
          },
          {
            text: "Saruman",
            correct: false,
          },
          {
            text: "Gollum",
            correct: false,
          },
          {
            text: "Theoden",
            correct: false,
          },
        ],
      },
      {
        id: 6,
        question: "¿Cuál es el nombre de la comunidad formada para llevar el Anillo Único a Mordor?",
        answers: [
          {
            text: "Compañía de los Tres",
            correct: false,
          },
          {
            text: "Compañía del Anillo",
            correct: true,
          },
          {
            text: "Compañía de los Elfos",
            correct: false,
          },
          {
            text: "Compañía de los Enanos",
            correct: false,
          },
        ],
      },
      {
        id: 7,
        question: "¿Cuál es el nombre del mago que lidera la Comunidad del Anillo?",
        answers: [
          {
            text: "Radagast",
            correct: false,
          },
          {
            text: "Gandalf",
            correct: true,
          },
          {
            text: "Saruman",
            correct: false,
          },
          {
            text: "Alatar",
            correct: false,
          },
        ],
      },
      {
        id: 8,
        question: "¿Qué objeto mágico es llamado 'El Anillo Único'?",
        answers: [
          {
            text: "Elendil",
            correct: false,
          },
          {
            text: "Nenya",
            correct: false,
          },
          {
            text: "Narya",
            correct: false,
          },
          {
            text: "Anillo Único",
            correct: true,
          },
        ],
      },
      {
        id: 9,
        question: "¿Qué criatura ayuda a Frodo y Sam en su viaje hacia Mordor?",
        answers: [
          {
            text: "Águilas",
            correct: false,
          },
          {
            text: "Ents",
            correct: false,
          },
          {
            text: "Elfo Legolas",
            correct: false,
          },
          {
            text: "Gollum",
            correct: true,
          },
        ],
      },
      {
        id: 10,
        question: "¿Cuál es el nombre del reino de los elfos gobernado por Galadriel y Celeborn?",
        answers: [
          {
            text: "Gondor",
            correct: false,
          },
          {
            text: "Rohan",
            correct: false,
          },
          {
            text: "Lothlórien",
            correct: true,
          },
          {
            text: "Erebor",
            correct: false,
          },
        ],
      },
      {
        id: 11,
        question: "¿Cuál es el nombre del pueblo de los hobbits donde comienza la historia?",
        answers: [
          {
            text: "Rohan",
            correct: false,
          },
          {
            text: "Minas Tirith",
            correct: false,
          },
          {
            text: "La Comarca",
            correct: true,
          },
          {
            text: "Gondor",
            correct: false,
          },
        ],
      },
      {
        id: 12,
        question: "¿Quién es el heredero legítimo del trono de Gondor en 'El Señor de los Anillos'?",
        answers: [
          {
            text: "Aragorn",
            correct: true,
          },
          {
            text: "Faramir",
            correct: false,
          },
          {
            text: "Boromir",
            correct: false,
          },
          {
            text: "Denethor",
            correct: false,
          },
        ],
      },
      {
        id: 13,
        question: "¿Cuál es el nombre de la espada que Frodo hereda de Bilbo?",
        answers: [
          {
            text: "Andúril",
            correct: false,
          },
          {
            text: "Glamdring",
            correct: false,
          },
          {
            text: "Dardo",
            correct: false,
          },
          {
            text: "Sting",
            correct: true,
          },
        ],
      },
      {
        id: 14,
        question: "¿Cuál es el lema de la Casa Stark en 'El Señor de los Anillos'?",
        answers: [
          {
            text: "Winter is Coming",
            correct: true,
          },
          {
            text: "Hear Me Roar",
            correct: false,
          },
          {
            text: "Fire and Blood",
            correct: false,
          },
          {
            text: "We Do Not Sow",
            correct: false,
          },
        ],
      },
      {
        id: 15,
        question: "¿Cuál es el nombre del mago que se enfrenta a Balrog en la Batalla de Khazad-dûm?",
        answers: [
          {
            text: "Saruman",
            correct: false,
          },
          {
            text: "Radagast",
            correct: false,
          },
          {
            text: "Gandalf",
            correct: true,
          },
          {
            text: "Alatar",
            correct: false,
          },
        ],
      },
      // Agrega más preguntas de El Señor de los Anillos aquí
    ],
  };

  const data = theme ? themes[theme] : [];

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "€ 100" },
        { id: 2, amount: "€ 200" },
        { id: 3, amount: "€ 300" },
        { id: 4, amount: "€ 500" },
        { id: 5, amount: "€ 1.000" },
        { id: 6, amount: "€ 2.000" },
        { id: 7, amount: "€ 4.000" },
        { id: 8, amount: "€ 8.000" },
        { id: 9, amount: "€ 16.000" },
        { id: 10, amount: "€ 32.000" },
        { id: 11, amount: "€ 64.000" },
        { id: 12, amount: "€ 125.000" },
        { id: 13, amount: "€ 250.000" },
        { id: 14, amount: "€ 500.000" },
        { id: 15, amount: "€ 1.000.000" },
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
  <Start setUsername={setUsername} setTheme={setTheme} restartGame={restartGame} />

) : (
        <>
          <div className="main">
            {timeOut ? (
              <div className="endTextContainer">
              <h1 className="endText">Has ganado: {earned}</h1>
              <button className="restartButton" onClick={handleRestartGame}>Iniciar nuevo juego</button>
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
    key={m.id} // Agrega una clave única aquí
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