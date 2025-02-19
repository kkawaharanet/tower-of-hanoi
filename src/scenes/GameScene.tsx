import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import { DraggableItem } from "../components/draggable-item/DraggableItem";
import { DroppableColumn } from "../components/droppable-column/DroppableColumn";
import { IGame } from "../i-game";
import styles from "./GameScene.module.css";

export function GameScene(props: {
  game: IGame;
  canGoBack: boolean;
  canGoNext: boolean;
  onMove: (from: number, to: number) => void;
  onGoBack: () => void;
  onGoNext: () => void;
  onQuit: () => void;
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
        {props.game.cleared ? (
          <div className={styles.cleared}>
            <div>
              {props.game.name}を{props.game.count}回の操作で
            </div>
            <div className={styles["cleared-text"]}>クリア</div>
            <button onClick={props.onQuit} className={styles.button}>
              戻る
            </button>
          </div>
        ) : (
          <div className={styles.status}>
            <button
              onClick={props.onGoBack}
              disabled={!props.canGoBack}
              className={styles.button}
            >
              1手戻る
            </button>
            <div>{props.game.name}</div>
            <div>{props.game.count}回</div>
            <button onClick={props.onQuit} className={styles.button}>
              諦める
            </button>
          </div>
        )}
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
