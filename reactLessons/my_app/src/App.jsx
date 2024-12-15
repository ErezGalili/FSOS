import react, { useState } from 'react'
import './App.css'


function NewCounter(props) {
  const [count, setCount] = useState(+props.start || 0)
  return (<>
    <div>
      <button className='counter' onClick={() => setCount(count + parseInt(props.jump || 1))}>
        Count: {count}</button>
    </div>
    <div>
       {count%2 ? 'odd' : 'even'} number
    </div>
    </>)
}


function ColorSqure(props) {
  const [color, setColor] = useState(props.color || 'white')
  return (<>
    <label>
      <div className="squre" style={{ backgroundColor: color }}/>
      <input type="color" onChange={e => setColor(e.target.value)} className='squreInput' />
    </label>
    </>)
}


class App extends react.PureComponent {
  render() {
    return (
      <div className="App">
        <h1>My App</h1>
        <NewCounter start="5" jump="3" />
        <ColorSqure/>
      </div>
    )
  }
} 

export default App
