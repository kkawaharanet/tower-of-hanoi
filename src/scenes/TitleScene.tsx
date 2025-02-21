import { Game } from "../game";
import { IGame } from "../i-game";
import { Save } from "../models/save/save";
import styles from "./TitleScene.module.css";

export function TitleScene(props: {
  saves: Save[];
  onStart: (game: IGame) => void;
}) {
  const levelNames = [
    "かんたん",
    "ふつう",
    "むずかしい",
    "めんどくさい",
    "超めんどくさい",
    "真・究極ウルトラスーパーめんどくさい",
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles["game-title"]}>
        ハノイの塔
        <span className={styles["game-title-diagonal"]}>Extreme Edition</span>
      </h1>
      {levelNames.map((levelName, level) => {
        const classNames = [
          styles.button,
          props.saves.find((s) => s.level === level)
            ? styles.cleared
            : undefined,
        ];
        return (
          <button
            onClick={() => props.onStart(Game.create(level))}
            className={classNames.join(" ")}
            key={levelName}
          >
            {levelName}
          </button>
        );
      })}

      <div className={styles.version}>バージョン: 1.0.0</div>
    </div>
  );
}
