import { useTranslation } from "react-i18next";
import { Game } from "../game";
import { IGame } from "../i-game";
import { Save } from "../models/save/save";
import styles from "./TitleScene.module.css";

export function TitleScene(props: {
  saves: Save[];
  onStart: (game: IGame) => void;
}) {
  const { t } = useTranslation();

  const levels = [0, 1, 2, 3, 4, 5];

  return (
    <div className={styles.container}>
      <h1 className={styles["game-title"]}>
        <span className={styles["game-title-diagonal"]}>{t("super")}</span>
        {t("towerOfHanoi")}
      </h1>
      <div className={styles.scrollable}>
        {levels.map((level) => {
          // セーブデータがあったら色を付ける
          const save = props.saves.find((s) => s.level === level);
          const completelyCleared = (() => {
            if (!save) {
              return false;
            }
            return save.count <= save.shortestCount;
          })();
          const classNames = [
            styles.button,
            completelyCleared
              ? styles["completely-cleared"]
              : save
              ? styles["cleared"]
              : undefined,
          ];
          return (
            <button
              onClick={() => props.onStart(Game.create(level))}
              className={classNames.join(" ")}
              key={level}
            >
              {t(`level${level}`)}
            </button>
          );
        })}
      </div>
      <div className={styles.version}>
        {t("version", { version: import.meta.env.VERSION })}
      </div>
    </div>
  );
}
