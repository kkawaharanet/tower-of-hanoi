import { useDraggable } from "@dnd-kit/core";
import styles from "./DraggableItem.module.css";

export function DraggableItem(props: { id: number; draggable: boolean }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    touchAction: "none",
  };

  const className = [
    styles.disc,
    styles[`value-${props.id}`],
    props.draggable ? styles.draggable : "",
  ];

  if (props.draggable) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={className.join(" ")}
        {...listeners}
        {...attributes}
      >
        {props.id}
      </div>
    );
  }

  return (
    <div className={className.join(" ")} {...listeners} {...attributes}>
      {props.id}
    </div>
  );
}
