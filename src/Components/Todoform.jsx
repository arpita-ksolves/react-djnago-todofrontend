import React, { useState, useRef } from "react";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Todoform = (props) => {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);
  const [val, setVal] = useState();
  const history = useNavigate();

  const mode = props.mode;

  const input = useRef();
  const addTodo = async (Todo) => {
    history("/todos", { replace: true });

    console.log(items, "Items");
    var mappedItems = items.map((item) => ({ title: item }));
    console.log(mappedItems, "mappedItems");
    try {
      fetch("/todos/", {
        method: "post",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: Todo.title,
          items: mappedItems,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addItemeHandler = (e) => {
    setVal(" ");
    e.preventDefault();
    setItems([...items, input.current.value]);
  };
  const addTodoHandler = (e) => {
    e.preventDefault();
    console.log("clicked");
    addTodo({
      title,
      items,
    });
  };

  return (
    <div className="wrapper container text-center py-4 ">
      {mode === "Add" ? (
        <h3 className="py-4"> Create New Todo </h3>
      ) : (
        <h3> Edit Todo</h3>
      )}


      <form className="container text-center ">
        <div className="form-group">
          <div className="form-group">
            <label>Title </label>
            <input
              className="form-control"
              placeholder="Enter Title"
              onChange={(e) => setTitle(e.target.value)
              }
            />
          </div>
          <div className="form-group">
            <label>Items</label>
            <input
              type="text"
              className="form-control"
              placeholder="Items"
              ref={input}
              value={val}
              onChange={(e) => setVal(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary mx-4"
            onClick={addItemeHandler}
          >
            Add more item
          </button>
          <button
            type="submit"
            className="btn btn-primary mx-4"
            onClick={addTodoHandler}
          >
            Add Todo
          </button>
        </div>
      </form>

      <ListGroup>
        {items.map((item, id) => (
          <ListGroup.Item key={id}>{item}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Todoform;
