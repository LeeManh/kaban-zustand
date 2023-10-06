import { useStore } from "../store";

export const Task = ({ title }) => {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );
  const deleteTask = useStore((store) => store.deleteTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);

  return (
    <div
      className="task"
      draggable
      onDragStart={() => {
        setDraggedTask(task.title);
      }}
    >
      {task.title}
      <div className="task-footer">
        <div className="icon-delete" onClick={() => deleteTask(task.title)}>
          Delete
        </div>
        <div className="status">{task.state}</div>
      </div>
    </div>
  );
};
