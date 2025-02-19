import { useState } from "react";
import { IGame } from "./i-game";
import { GameScene } from "./scenes/GameScene";
import { TitleScene } from "./scenes/TitleScene";

function App() {
  const [games, setGames] = useState<IGame[]>([]);
  const lastGame = games[games.length - 1];

  function handleGameStart(game: IGame) {
    setGames([game]);
  }

  function handleMove(from: number, to: number) {
    if (!lastGame.canMove(from, to)) {
      return;
    }
    setGames((games) => [...games, lastGame.move(from, to)]);
  }

  function handleGoBack() {
    setGames((games) => games.slice(0, -1));
  }

  function handleGoNext() {}

  function handleQuit() {
    setGames([]);
  }

  if (!lastGame) {
    return <TitleScene onStart={handleGameStart} />;
  }

  return (
    <GameScene
      game={lastGame}
      canGoBack={games.length >= 2}
      canGoNext={false}
      onMove={handleMove}
      onGoBack={handleGoBack}
      onGoNext={handleGoNext}
      onQuit={handleQuit}
    />
  );
}

export default App;
