import AddTodo from './Components/AddTodo';
import EditTodo from './Components/EditTodo'
import Home from './Components/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import TodoList from './Components/TodoList';

function App() {
return(<>
<BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />}>
      </Route>
      <Route path="/todos"  element={<TodoList/>}>
      </Route>

     
      <Route path="add/todos" element={<AddTodo />}>
      </Route>
      <Route path="/edit/todo/:Id" element={<EditTodo/>}>
      </Route>
    </Routes>
  </BrowserRouter>,
      </>
);
 
}

export default App;
