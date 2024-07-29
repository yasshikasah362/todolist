import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      {
        text: newTask,
        description: newTaskDescription,
        done: false,
        lastUpdated: new Date().toLocaleString(),
        expanded: false,
      },
    ]);
    setNewTask('');
    setNewTaskDescription('');
  };

  const handleUpdateTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editText;
    updatedTasks[index].description = editDescription;
    updatedTasks[index].lastUpdated = new Date().toLocaleString();
    setTasks(updatedTasks);
    setIsEditing(null);
  };

  const handleToggleDone = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const handleExpandTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].expanded = !updatedTasks[index].expanded;
    setTasks(updatedTasks);
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setIsEditing(index);
    setEditText(tasks[index].text);
    setEditDescription(tasks[index].description);
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center">To-Do List</h1>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search tasks"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <textarea
              className="form-control mt-2"
              placeholder="Add a description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <button className="btn btn-primary mt-2" onClick={handleAddTask}>
              Add Task
            </button>
            <ul className="list-group mt-3">
              {filteredTasks.map((task, index) => (
                <li key={index} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{task.text}</span>
                    <div>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={task.done}
                        onChange={() => handleToggleDone(index)}
                      />
                      <button
                        className="btn btn-link"
                        onClick={() => handleExpandTask(index)}
                      >
                        {task.expanded ? 'Collapse' : 'Expand'}
                      </button>
                      <button
                        className="btn btn-link"
                        onClick={() => handleRemoveTask(index)}
                      >
                        Remove
                      </button>
                      <button
                        className="btn btn-link"
                        onClick={() => handleEditTask(index)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  {task.expanded && (
                    <div className="mt-2">
                      <p>Description: {task.description}</p>
                      <p>Last Updated: {task.lastUpdated}</p>
                    </div>
                  )}
                  {isEditing === index && (
                    <form>
                      <input
                        type="text"
                        className="form-control"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <textarea
                        className="form-control mt-2"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                      <button
                        className="btn btn-primary mt-2"
                        onClick={() => handleUpdateTask(index)}
                      >
                        Update Task
                      </button>
                    </form>
                  )}
                </li>






              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoList;