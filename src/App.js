import './App.css'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const id = uuidv4()
  const [task, setTask] = useState('')
  const [people, setPeople] = useState([])
  const clickHandler = (e) => {
    e.preventDefault()
    if (task) {
      const person = { id, task }
      setPeople([...people, person])
      setTask('')
    }
  }

  const remove = (id) => {
    setPeople(people.filter((item) => item.id !== id))
    console.log(people)
  }
  return (
    <div>
      <div className='font-semibold my-5 text-center '>
        <h1>SIMPLE TO-DO LIST</h1>
        <div className=' h-32 w-auto mx-7 mt-10 bg-neutral-200 flex gap-6 justify-center items-center'>
          <form action='submit' onSubmit={clickHandler} className='flex gap-2 '>
            <label htmlFor='name'>TASK:</label>
            <input
              type='text'
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button
              type='submit'
              className='w-20 h-8 text-white bg-sky-600 hover:bg-sky-900'
            >
              submit
            </button>
          </form>
        </div>
        <div className='flex justify-center flex-col items-center gap-y-6 mt-10'>
          {people.map((item) => {
            return <Items key={item.id} {...item} remove={remove} />
          })}
        </div>
      </div>
    </div>
  )
}
const Items = (props) => {
  const [isChecked, setIsChecked] = useState(false)
  const handleChange = () => {
    setIsChecked(!isChecked)
  }
  const barred = {
    textDecoration: isChecked ? 'line-through' : 'none',
  }
  const { id, task, remove } = props

  return (
    <div key={id} className='flex justify-between	w-96  '>
      <p style={barred}>{task}</p>
      <div className='flex gap-2 '>
        <button
          onClick={() => remove(id)}
          className='w-20 h-8 text-white bg-sky-600 hover:bg-sky-900'
        >
          remove
        </button>

        <input
          className='w-6'
          type={'checkbox'}
          checked={isChecked}
          onChange={handleChange}
        ></input>
      </div>
    </div>
  )
}
export default App
