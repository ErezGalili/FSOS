import react from 'react'
import './App.css'

class Counter extends react.PureComponent {
  render() {
    let count
    if (this.state?.counter) count = this.state.counter;
       else count = 0;
    const increase = () => this.setState({ counter: count + 1 })
    return (
      <div className="counter" onClick={increase}>
        <button>Count: {count}</button>
      </div>
    )
  }
}

class App extends react.PureComponent {
  render() {
    return (
      <div className="App">
        <h1>My App</h1>
        <Counter/>
      </div>
    )
  }
} 

export default App
