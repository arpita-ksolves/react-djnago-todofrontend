import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [show, setShow] = useState(false);

  const history = useNavigate();

  const getTodos = async () => {
    try {
      const response = await fetch(`/todos/`);

      const data = await response.json();

      if (data) {
        setTodos(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  function createTodo(e) {
    e.preventDefault();
    history("/add/todos", { replace: true });
  }

  const deleteTodo = async (id) => {
    console.log(id);
    try {
      fetch(`/todo/${id}/`, {
        method: "DELETE",
      });
      getTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTodo = () => {
    setShow(true);
  };

  const handleDelete = (id) => {
    console.log(id);
    deleteTodo(id);
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <div className="wrapper">
        <div className="container ">
          <h1 className="container text-center py-4">My Todo LIst </h1>
          {todos.map((todo, index) => (
            <>
              <ListGroup key={index}>
                <h3>{todo.title}</h3>
                {todo.items.map((items, id) => (
                  <ListGroup.Item className="mx-4 pb-6" key={id}>
                    <li>{items.title}</li>
                    <button className="btn btn-primary btn-sm float-right">
                      <i className="fa fa-edit"></i>
                    </button>
                    <button className="btn btn-danger btn-sm  mx-4 float-right">
                      <i className="fa fa-trash"> </i>
                    </button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <button className="btn btn-primary my-4 px-4">Edit List</button>

              <button
                className="btn btn-danger my-4 mx-4"
                onClick={handleDeleteTodo}
              >
                Delete List
              </button>
             

              <button className="btn btn-secondary my-4 mx-4 float-right">
                <i className="fa fa-plus"> Add Item</i>
              </button>

              <Modal show={show}>
                <Modal.Body>Are you sure to delete?</Modal.Body>
                <Modal.Footer>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => {
                      handleDelete(todo.id);
                    }}
                  >
                    Yes
                  </button>

                
                </Modal.Footer>
              </Modal>
            </>
          ))}
        </div>

        <button
          className="btn btn-danger float-right my-4 mx-4"
          onClick={createTodo}
        >
          Create New Todo List
        </button>
      </div>
    </>
  );
};

export default TodoList;
