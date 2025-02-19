import { Game } from "../game";
import { IGame } from "../i-game";
import styles from "./TitleScene.module.css";

export function TitleScene(props: { onStart: (game: IGame) => void }) {
  return (
    <div className={styles.container}>
      <h1>ハノイの塔</h1>
      <button
        onClick={() => props.onStart(Game.createLevel1())}
        className={styles.button}
      >
        かんたん
      </button>
      <button
        onClick={() => props.onStart(Game.createLevel2())}
        className={styles.button}
      >
        ふつう
      </button>
      <button
        onClick={() => props.onStart(Game.createLevel3())}
        className={styles.button}
      >
        むずかしい
      </button>
      <button
        onClick={() => props.onStart(Game.createLevel4())}
        className={styles.button}
      >
        めんどくさい
      </button>
      <button
        onClick={() => props.onStart(Game.createLevel5())}
        className={styles.button}
      >
        超めんどくさい
      </button>
      <button
        onClick={() => props.onStart(Game.createLevel6())}
        className={styles.button}
      >
        真・究極ウルトラスーパーめんどくさい
      </button>
      <div className={styles.version}>バージョン: 1.0.0</div>
    </div>
  );
}
