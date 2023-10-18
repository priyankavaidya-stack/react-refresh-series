import './App.css'
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';


function App() {

  return (
    <div className='bg-black text-white h-[100vh] todoList'>
     <AddTodo />
     <Todos />
    </div>

  )
}

export default App
