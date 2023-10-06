import { useRef, useState } from "react";
import { useStore } from "../store";
import { Task } from "./Task";
import useClickOutSide from "../hooks/useClickOutSide";
import clsx from "clsx";

const Column = ({ state }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const [isDrop, setDrop] = useState(false);

  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.state === state)
  );

  const addTask = useStore((store) => store.addTask);
  const draggedTask = useStore((store) => store.draggedTask);

  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const moveTask = useStore((store) => store.moveTask);

  const modalRef = useRef();

  useClickOutSide(modalRef, () => setOpen(false));

  return (
    <div
      className={clsx("col", { "is-drop": isDrop })}
      onDragOver={(e) => {
        e.preventDefault();
        setDrop(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDrop(false);
      }}
      onDrop={() => {
        moveTask(draggedTask, state);
        setDrop(false);

        setDraggedTask(null);
      }}
    >
      <div className="head">
        <div>{state}</div>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add+
        </button>
      </div>

      {tasks?.map((task) => (
        <Task {...task} key={task.title} />
      ))}

      {open && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <input
              type="text"
              className=""
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={() => {
                addTask(text, state);
                setOpen(false);
                setText("");
              }}
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Column;
