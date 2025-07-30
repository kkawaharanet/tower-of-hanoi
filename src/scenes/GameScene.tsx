import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DraggableItem } from "../components/draggable-item/DraggableItem";
import { DroppableColumn } from "../components/droppable-column/DroppableColumn";
import { IGame } from "../i-game";
import styles from "./GameScene.module.css";

export function GameScene(props: {
  game: IGame;
  gamesLength: number;
  gameIndex: number;
  onMove: (from: number, to: number) => void;
  onRewind: (index: number) => void;
  onGiveUp: () => void;
  onClear: (level: number, count: number, shortestCount: number) => void;
}) {
  const { t } = useTranslation();
  const [from, setFrom] = useState<number | undefined>(undefined);

  function handleDragStart(event: DragStartEvent) {
    // ドラッグした要素からどの列かを求める
    const value = event.active.id as number;

    if (props.game.towers[1].includes(value)) {
      setFrom(1);
    } else if (props.game.towers[2].includes(value)) {
      setFrom(2);
    } else {
      setFrom(0);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    if (!event.over) {
      return;
    }
    if (from == undefined) {
      return;
    }
    const to = event.over.id as number;
    props.onMove(from, to);
    setFrom(undefined);
  }

  function handleUndo() {
    if (props.gameIndex <= 0) {
      return;
    }
    props.onRewind(props.gameIndex - 1);
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges]}
    >
      <div className={styles.container}>
        {
          // クリア状態ならクリア画面を表示する
          props.game.cleared ? (
            <div className={styles.cleared}>
              <div>
                {t("clearedLevelWith", {
                  level: t(`level${props.game.level}`),
                  count: props.game.count,
                  shortestCount: props.game.shortestCount,
                })}
              </div>
              <div className={styles["cleared-text"]}>{t("cleared")}</div>
              <button
                onClick={() =>
                  props.onClear(
                    props.game.level,
                    props.game.count,
                    props.game.shortestCount
                  )
                }
                className={styles.button}
              >
                {t("goBack")}
              </button>
            </div>
          ) : (
            // 未クリア状態なら状態を表示する
            <div
              className={`${styles.status} ${styles["pointer-events-none"]}`}
            >
              <div>{t(`level${props.game.level}`)}</div>
              <div>
                {t("shortestCount", {
                  shortestCount: props.game.shortestCount,
                })}
              </div>
              <select
                onChange={(e) => props.onRewind(e.target.selectedIndex)}
                className={`${styles.select} ${styles["pointer-events-auto"]}`}
                value={props.gameIndex}
              >
                {Array.from({ length: props.gamesLength }).map((_, i) => (
                  <option value={i} key={i}>
                    {t("count", { count: i })}
                  </option>
                ))}
              </select>
              <button
                onClick={handleUndo}
                className={`${styles.button} ${styles["pointer-events-auto"]}`}
              >
                {t("undo")}
              </button>
              <button
                onClick={props.onGiveUp}
                className={`${styles.button} ${styles["pointer-events-auto"]}`}
              >
                {t("giveUp")}
              </button>
            </div>
          )
        }
        <div className={styles.row}>
          {Array.from({ length: 3 }).map((_, x) => (
            <DroppableColumn id={x} key={`column${x}`}>
              {props.game.towers[x].map((value, i, tower) => {
                const draggable = i === tower.length - 1;
                return (
                  <DraggableItem
                    id={value}
                    draggable={draggable}
                    key={`item${i}`}
                  />
                );
              })}
            </DroppableColumn>
          ))}
        </div>
      </div>
    </DndContext>
  );
}
