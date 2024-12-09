import logo from './logo.svg';
import './App.css';

const Box = props=><div className='box'>{props.text}</div>
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Box text="Hello World!"/>
      </header>
    </div>
  );
}

export default App;
