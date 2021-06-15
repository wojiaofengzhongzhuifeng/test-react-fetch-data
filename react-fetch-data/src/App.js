import axios from 'axios';
import {useState, useEffect} from 'react';

const isDoneStyle = (boolean)=>{
  if(boolean){
    return {
      textDecoration: 'line-through'
    }
  } else {
    return {}
  }
}

const useAsync = (initData)=>{
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(initData);

  const run = async (promise) => {
    try {
      setIsLoading(true)
      const result = await promise

      if (result.data.message === 'success') {
        setIsLoading(false)
        setData(result.data.data);
      } else {
        setIsLoading(false)
        setIsError(true)
        throw new Error('数据请求失败');
      }
    } catch (e) {
      setIsLoading(false)
      setIsError(true)
      alert(e)
    }

  }
  return {isLoading, isError, run, data}

}

function App() {

  const {
    data: todoList,
    run: fetchTodo,
    isError: fetchingTodoListIsError,
    isLoading: fetchingTodoListIsLoading
  } = useAsync([])
  const {
    data: personList,
    run: fetchPerson,
    isError: fetchingPersonIsError,
    isLoading: fetchingPersonIsLoading
  } = useAsync([])
  const [number, setNumber] = useState(0)


  useEffect(()=>{


    fetchTodo(axios({
      url: 'http://localhost:7778/todoList'
    }))

    fetchPerson(axios({
      url: 'http://localhost:7778/person'
    }))

  }, [])




  return (
    <div className="App">


      {
        fetchingTodoListIsLoading ? <div>正在加载</div> : fetchingTodoListIsError ? <div>加载出错</div> : todoList && todoList.map((todo)=>{
          return <div key={todo.id} style={{...isDoneStyle(todo.isDone)}}>{todo.toDoName}</div>
        })
      }

      {
        fetchingPersonIsLoading ? <div>正在加载人物</div> : fetchingPersonIsError ? <div>加载人物出错</div> : personList && personList.map((person)=>{
          return <div key={person.id}>{person.name}</div>
        })
      }
      当前 number : {number}
      <button onClick={()=>{
        setNumber(number + 1)
      }}> + 1</button>




    </div>
  );
}

export default App;
