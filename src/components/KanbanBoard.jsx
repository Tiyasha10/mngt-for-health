import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import ColumnContainer from "./ColumnContainer";
import TaskCard from "./TaskCard";
import { IconPlus } from "@tabler/icons-react";
import { useKanban } from "../context/KanbanContext";

function KanbanBoard({ state, isPersonalBoard = false, userId }) {
  const { 
    getRecordKanban, 
    setRecordKanban,
    getUserKanban,
    setUserKanban 
  } = useKanban();

  const recordId = state?.id;
  const [isLoading, setIsLoading] = useState(true);
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  // Initialize board data
  useEffect(() => {
    const initializeBoard = () => {
      try {
        if (isPersonalBoard) {
          const userData = getUserKanban(userId);
          setColumns(userData?.columns || []);
          setTasks(userData?.tasks || []);
        } else {
          const storedData = getRecordKanban(recordId);
          const initialColumns = state?.columns || storedData?.columns || [
            { id: "todo", title: "Todo" },
            { id: "doing", title: "Work in Progress" },
            { id: "done", title: "Done" }
          ];
          const initialTasks = state?.tasks || storedData?.tasks || [];
          
          setColumns(initialColumns);
          setTasks(initialTasks);

          if (state?.columns && !storedData?.columns) {
            setRecordKanban(recordId, { columns: initialColumns, tasks: initialTasks });
          }
        }
      } catch (error) {
        console.error("Error initializing board:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeBoard();
  }, [isPersonalBoard, userId, recordId, state]);

  const updateBoard = useCallback((newColumns, newTasks) => {
    const columnsToUpdate = newColumns ?? columns;
    const tasksToUpdate = newTasks ?? tasks;

    if (isPersonalBoard) {
      setUserKanban(userId, { columns: columnsToUpdate, tasks: tasksToUpdate });
    } else {
      setRecordKanban(recordId, { columns: [...columnsToUpdate], tasks: [...tasksToUpdate] });
    }

    if (newColumns) setColumns(newColumns);
    if (newTasks) setTasks(newTasks);
  }, [isPersonalBoard, userId, recordId, columns, tasks, setUserKanban, setRecordKanban]);

  // Task functions
  const createTask = useCallback((columnId) => {
    const newTask = {
      id: `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    updateBoard(null, [...tasks, newTask]);
  }, [tasks, updateBoard]);

  const deleteTask = useCallback((id) => {
    updateBoard(null, tasks.filter(task => task.id !== id));
  }, [tasks, updateBoard]);

  const updateTask = useCallback((id, content) => {
    updateBoard(null, tasks.map(task => task.id === id ? {...task, content} : task));
  }, [tasks, updateBoard]);

  // Column functions
  const createNewColumn = useCallback(() => {
    const newColumn = {
      id: `column-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: `Column ${columns.length + 1}`,
    };
    updateBoard([...columns, newColumn], null);
  }, [columns, updateBoard]);

  const deleteColumn = useCallback((id) => {
    updateBoard(
      columns.filter(col => col.id !== id),
      tasks.filter(task => task.columnId !== id)
    );
  }, [columns, tasks, updateBoard]);

  const updateColumn = useCallback((id, title) => {
    updateBoard(columns.map(col => col.id === id ? {...col, title} : col), null);
  }, [columns, updateBoard]);

  // DND Kit setup
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } }),
  );

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    } else if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const isColumnDrag = active.data.current?.type === "Column";
    if (isColumnDrag) {
      setColumns(prev => {
        const oldIndex = prev.findIndex(c => c.id === active.id);
        const newIndex = prev.findIndex(c => c.id === over.id);
        const sorted = arrayMove(prev, oldIndex, newIndex);
        updateBoard(sorted, null);
        return sorted;
      });
    } else {
      setTasks(prev => {
        const oldIndex = prev.findIndex(t => t.id === active.id);
        const overIndex = prev.findIndex(t => t.id === over.id);
        const isOverTask = over.data.current?.type === "Task";

        let newTasks = [...prev];
        const activeItem = newTasks[oldIndex];

        if (isOverTask) {
          activeItem.columnId = newTasks[overIndex].columnId;
          newTasks = arrayMove(newTasks, oldIndex, overIndex);
        } else {
          activeItem.columnId = over.id;
          newTasks = arrayMove(newTasks, oldIndex, overIndex);
        }

        updateBoard(null, newTasks);
        return newTasks;
      });
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading board data...
      </div>
    );
  }

  return (
    <div className="mt-5 min-h-screen w-full overflow-x-auto text-white">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="m-auto flex gap-4 min-w-max p-4">
          <SortableContext items={columnsId}>
            <div className="flex gap-4">
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </div>
          </SortableContext>
          
          <button
            onClick={createNewColumn}
            className="flex h-[60px] w-[350px] min-w-[350px] cursor-pointer gap-2 rounded-lg border-2 border-columnBackgroundColor bg-mainBackgroundColor p-4 ring-green-500 hover:ring-2"
          >
            <IconPlus />
            Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                isOverlay
              />
            )}
            {activeTask && <TaskCard task={activeTask} isOverlay />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default KanbanBoard;