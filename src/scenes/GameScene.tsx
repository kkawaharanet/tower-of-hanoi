import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
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
  onQuit: () => void;
  onClear: (level: number, count: number) => void;
}) {
  const [from, setFrom] = useState<number | undefined>(undefined);

  function handleDragStart(event: DragStartEvent) {
    // ドラッグした要素からどの列
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

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={styles.container}>
        {
          // クリア状態ならクリア画面を表示する
          props.game.cleared ? (
            <div className={styles.cleared}>
              <div>
                {props.game.level}を{props.game.count}手で
              </div>
              <div className={styles["cleared-text"]}>クリア</div>
              <button
                onClick={() =>
                  props.onClear(props.game.level, props.game.count)
                }
                className={styles.button}
              >
                戻る
              </button>
            </div>
          ) : (
            // 未クリア状態なら状態を表示する
            <div className={styles.status}>
              <select
                onChange={(e) => props.onRewind(e.target.selectedIndex)}
                className={styles.select}
                value={props.gameIndex}
              >
                {Array.from({ length: props.gamesLength }).map((g, i) => (
                  <option value={i} key={i}>
                    {i}手目
                  </option>
                ))}
              </select>
              <button onClick={props.onQuit} className={styles.button}>
                諦める
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
