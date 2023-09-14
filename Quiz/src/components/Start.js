import React, { useRef, useState, useEffect } from "react";

// Importa tus imágenes desde la carpeta de activos
import gameOfThronesImage from "./../assets/gottt.webp";
import harryPotterImage from "./../assets/potter.jpg";
import senorDeLosAnillosImage from "./../assets/ring.jpg";
import gameOfThronesAudio from "./../assets/gotsound.mp3"; // Agrega la importación del audio correspondiente
import harryPotterAudio from "./../assets/harrysound.mp3"; // Agrega la importación del audio correspondiente
import senorDeLosAnillosAudio from "./../assets/ringsound.mp3";
import quienQuiereSerMillonarioImage from "./../assets/millonario.jpg";

export default function Start({ setUsername, setTheme }) {
  const inputRef = useRef();
  const [selectedTheme, setSelectedTheme] = useState("Game of Thrones");
  const [currentAudio, setCurrentAudio] = useState(null);
  const [restartGame, setRestartGame] = useState(false);
  const [nameError, setNameError] = useState(false);

  // Restablecer el estado al inicio del juego
  useEffect(() => {
    if (restartGame) {
      inputRef.current.value = "";
      setSelectedTheme("");
      setNameError(false);
    }
  }, [restartGame]);

  const handleInputChange = () => {
    setNameError(false);
  };

  // Define una variable para el fondo basado en la temática seleccionada
  let backgroundImage;

  switch (selectedTheme) {
    case "Game of Thrones":
      backgroundImage = gameOfThronesImage;
      break;
    case "Harry Potter":
      backgroundImage = harryPotterImage;
      break;
    case "Señor de los Anillos":
      backgroundImage = senorDeLosAnillosImage;
      break;
    default:
      backgroundImage = null;
  }

  const handleClick = () => {
    const name = inputRef.current.value.trim(); // Obtener el nombre sin espacios en blanco al principio o al final

    if (name) {
      setUsername(name);
      setTheme(selectedTheme);
      setRestartGame(false);
    } else {
      // Mostrar el mensaje de error si el nombre está en blanco
      setNameError(true);
    }
  };

  // Reproduce la música correspondiente cuando se selecciona una temática
  const playAudio = (audio) => {
    if (currentAudio) {
      // Si hay un audio en reproducción, deténlo antes de reproducir uno nuevo
      currentAudio.pause();
      currentAudio.currentTime = 0; // Reinicia la reproducción al principio
    }
    const newAudio = new Audio(audio);
    newAudio.play();
    setCurrentAudio(newAudio);
  };

  const themeOptions = ["Game of Thrones", "Harry Potter", "Señor de los Anillos"];

  return (
    <div className="start" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <input
        className="startInput"
        placeholder="Su Nombre"
        ref={inputRef}
        onChange={handleInputChange} // Manejar cambios en el campo de entrada
      />
      {nameError && <p className="errorText">Por favor, ingrese su nombre.</p>} {/* Mostrar el mensaje de error */}
      <div className="themeSelection">
        <p>Seleccione temática:</p>
        <select
          className="themeDropdown"
          value={selectedTheme}
          onChange={(e) => {
            setSelectedTheme(e.target.value);
            playAudio(getAudioForTheme(e.target.value)); // Reproduce el audio al seleccionar la temática
          }}
        >
          {themeOptions.map((theme, index) => (
            <option key={index} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
      <button className="startButton" onClick={handleClick} disabled={restartGame}>
        Empezar
      </button>
    </div>
  );
}

// Función para obtener el audio correspondiente a una temática
const getAudioForTheme = (theme) => {
  switch (theme) {
    case "Game of Thrones":
      return gameOfThronesAudio;
    case "Harry Potter":
      return harryPotterAudio;
    case "Señor de los Anillos":
      return senorDeLosAnillosAudio;
    default:
      return null;
  }
};
