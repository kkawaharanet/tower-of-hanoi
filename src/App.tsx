import { useContext, useState } from "react";
import { IGame } from "./i-game";
import { SaveRepositoryContext } from "./main";
import { GameScene } from "./scenes/GameScene";
import { TitleScene } from "./scenes/TitleScene";

function App() {
  // ゲームの履歴
  const [games, setGames] = useState<IGame[]>([]);

  // 最後のゲーム
  const lastGame = games[games.length - 1];

  // セーブデータ
  const saveRepository = useContext(SaveRepositoryContext);

  function handleGameStart(game: IGame) {
    // ゲームを始めるときは、履歴が1個だけの状態にする
    setGames([game]);
  }

  function handleMove(from: number, to: number) {
    if (!lastGame.canMove(from, to)) {
      // 円盤の移動できない場合は何もしない
      return;
    }
    // 円盤を移動した結果を履歴に追加する
    setGames((games) => [...games, lastGame.move(from, to)]);
  }

  function handleGoBack() {
    // 履歴の最後を削除する
    setGames((games) => games.slice(0, -1));
  }

  function handleGoNext() {}

  function handleQuit(count?: number) {
    if (count !== undefined) {
      // クリア状態で戻る場合はセーブデータに保存する
      saveRepository.update({ level: lastGame.level, count });
    }
    // 履歴を空にする
    setGames([]);
  }

  if (!lastGame) {
    // 履歴がない場合はタイトル画面を表示する
    return (
      <TitleScene onStart={handleGameStart} saves={saveRepository.getAll()} />
    );
  }

  // それ以外の場合はゲーム画面を表示する
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
