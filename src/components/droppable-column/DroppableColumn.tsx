import { useDroppable } from "@dnd-kit/core";
import React from "react";
import styles from "./DroppableColumn.module.css";

export function DroppableColumn(props: {
  id: number;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const className = [styles.column, isOver ? styles["is-over"] : ""];

  return (
    <div ref={setNodeRef} className={className.join(" ")}>
      {props.children}
    </div>
  );
}
