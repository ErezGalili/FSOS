import React, { useState, useEffect } from 'react';
import './App.css';

function NewCounter(props) {
  const [count, setCount] = useState(+props.start || 0);
  return (
    <>
      <div>
        <button
          className="counter"
          onClick={() => setCount(count + parseInt(props.jump || 1))}
        >
          Count: {count}
        </button>
      </div>
      <div>{count % 2 ? 'odd' : 'even'} number</div>
    </>
  );
}

function ColorSqure(props) {
  const [color, setColor] = useState(props.color || 'white');
  return (
    <>
      <label>
        <div className="squre" style={{ backgroundColor: color }} />
        <input
          type="color"
          onChange={(e) => setColor(e.target.value)}
          className="squreInput"
        />
      </label>
    </>
  );
}

function SimpleQ({ q, a, checkAllTriggered }) {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState("Didn't answer yet");

  const check = () => {
    setMessage(input.toLowerCase() === a.toLowerCase() ? 'Correct!' : 'Incorrect');
  };

  useEffect(() => {
    if (checkAllTriggered) {
      check();
    }
  }, [checkAllTriggered]);

  return (
    <div>
      <h3>{q}</h3>
      <input type="text" placeholder="Your answer" value={input}
        onChange={(e) => setInput(e.target.value)}/>
      <button onClick={check}>Check</button>
      <p>{message}</p>
    </div>
  );
}

function AllQ({ qArr }) {
  const [checkAllTriggered, setCheckAllTriggered] = useState(false);

  const checkAll = () => {
    setCheckAllTriggered(true);
    setTimeout(() => setCheckAllTriggered(false), 0);
  };

  return (
    <div>
      <ol>
        {qArr.map((qna, i) => (
          <li key={i}>
            <SimpleQ q={qna.q} a={qna.a} checkAllTriggered={checkAllTriggered} />
          </li>
        ))}
      </ol>
      <button onClick={checkAll}>Check all</button>
    </div>
  );
}

const qnaArr = [
  { q: '2 + 3', a: '5' },
  { q: '2 * 3', a: '6' },
  { q: 'what the color of the sky', a: 'blue' },
  { q: 'what the color of the sun', a: 'yellow' },
  { q: 'what the color of the grass', a: 'green' },
  { q: 'what the color of the sea', a: 'blue' },
];

function QuestionSelect(props) {
  const [qIndex, setQIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  
  const checkAnswer = () => {
    const selectedQuestion = props.qArr[qIndex];
    const isCorrect = answer.toLowerCase() === selectedQuestion.a.toLowerCase();
    setFeedback(isCorrect ? 'Correct!' : 'Incorrect');
  };

  const [feedback, setFeedback] = useState('');

  return (
    <div>
      <select onChange={e => setQIndex(e.target.value)}>
        {props.qArr.map((qna, i) => (
          <option key={i} value={i}>
            {qna.q}
          </option>
        ))}
      </select>
      <br />
      <input type="text" value={answer} onChange={e => setAnswer(e.target.value)} />
      <button onClick={checkAnswer}>Check</button>
      <div>{feedback}</div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>My App</h1>
      <NewCounter start="5" jump="3" />
      <ColorSqure />
      <QuestionSelect qArr={qnaArr} />
    </div>
  );
}

export default App;
