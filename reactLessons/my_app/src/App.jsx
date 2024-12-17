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

function SimpleQ(props) {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("Didn't answer yet");

  const check = () => {
      setMessage(input.toLowerCase() === props.a.toLowerCase() ? "Correct!" : "Incorrect");
  }

  return (    
    <div>
      <h3>{props.q}</h3>
      <input type="text" placeholder="Your answer" value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={check}>Check</button>
      <p>{message}</p>
    </div>
  );
} 
function AllQ(props){
  const checkAll = () => {
      qArr.forEach((props.qArr.q, props.qArr.a))
  }
  return (<div>
    <ol>
    {props.qArr.map((qna, i) => (<li key={i}><SimpleQ q={qna.q} a={qna.a}/></li>)) }
  </ol>
  <button onClick={checkAll}>Check all</button>
  </div>
  )
}

const qnaArr = [{q: "2 + 3", a: "5"}, 
  {q: "2 * 3", a: "6"}, 
  {q: "what the color of the sky", a: "blue"}, 
  {q: "what the color of the sun", a: "yellow"}, 
  {q: "what the color of the grass", a: "green"}, 
  {q: "what the color of the sea", a: "blue"}]

class App extends react.PureComponent {
  render() {
    return (
      <div className="App">
        <h1>My App</h1>
        <NewCounter start="5" jump="3" />
        <ColorSqure/>
        <AllQ qArr={qnaArr}/>
      </div>
    )
  }
} 

export default App
