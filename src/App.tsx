import { useContext, useEffect, useState } from "react";
import { IGame } from "./i-game";
import { SaveRepositoryContext } from "./main";
import { GameScene } from "./scenes/GameScene";
import { TitleScene } from "./scenes/TitleScene";

function App() {
  // ゲームの履歴
  const [games, setGames] = useState<IGame[]>([]);
  const [gameIndex, setGameIndex] = useState(-1);

  // 現在のゲーム
  const currentGame = games[gameIndex];

  // セーブデータ
  const saveRepository = useContext(SaveRepositoryContext);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameIndex]); // gameIndexを入れないとイベントハンドラで値を正しく取得できない

  function handleKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === "z") {
      // Ctrl+Zで1手戻る
      event.preventDefault();
      if (gameIndex >= 1) {
        handleRewind(gameIndex - 1);
      }
    } else if (event.ctrlKey && event.key === "y") {
      // Ctrl+Zで1手やり直す
      event.preventDefault();
      if (gameIndex < games.length - 1) {
        handleRewind(gameIndex + 1);
      }
    }
  }

  function handleGameStart(game: IGame) {
    // ゲームを始めるときは、履歴が1個だけの状態にする
    setGames([game]);
    setGameIndex(0);
  }

  function handleMove(from: number, to: number) {
    if (!games[gameIndex].canMove(from, to)) {
      // 円盤の移動できない場合は何もしない
      return;
    }

    let updatedGames = [...games];
    if (gameIndex !== games.length - 1) {
      // 巻き戻し済みなら、巻き戻しから先の履歴を削除する
      updatedGames = updatedGames.slice(0, gameIndex + 1);
    }
    // 円盤を移動した結果を履歴に追加する
    updatedGames = [...updatedGames, currentGame.move(from, to)];
    setGames(updatedGames);
    setGameIndex(updatedGames.length - 1);
  }

  function handleRewind(index: number) {
    setGameIndex(index);
  }

  function handleGiveUp() {
    // ゲームを未開始状態にする
    setGames([]);
    setGameIndex(-1);
  }

  function handleClear(level: number, count: number, shortestCount: number) {
    const save = saveRepository.find(level);
    if (!save) {
      // セーブデータがなかったらセーブデータを保存する
      saveRepository.update({ level, count, shortestCount });
    } else if (count < save.count) {
      // セーブデータがあり、最高記録を更新していたらセーブデータを保存する
      saveRepository.update({ level, count, shortestCount });
    }
    // 履歴を空にする
    setGames([]);
    setGameIndex(-1);
  }

  if (!currentGame) {
    // 履歴がない場合はタイトル画面を表示する
    return (
      <TitleScene onStart={handleGameStart} saves={saveRepository.findAll()} />
    );
  }

  // それ以外の場合はゲーム画面を表示する
  return (
    <GameScene
      game={currentGame}
      gameIndex={gameIndex}
      gamesLength={games.length}
      onMove={handleMove}
      onRewind={handleRewind}
      onGiveUp={handleGiveUp}
      onClear={handleClear}
    />
  );
}

export default App;
