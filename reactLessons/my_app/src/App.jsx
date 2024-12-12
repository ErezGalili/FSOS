import react from 'react'
import './App.css'

class Counter extends react.PureComponent {
  render() {
    let count
    if (this.state?.counter) count = this.state.counter;
    else if (this.props.start) count = +this.props.start
    else count = 0;
    let type;
    type = (count%2) ? 'odd number' : 'even number';
    let myJump;
    myJump = (this.props.jump) ? +this.props.jump : myJump = 1
    const increase = () => this.setState({ counter: count + myJump })
    return (
      <div>
        <button className="counter" onClick={increase}>Count: {count}</button>
        <p>{type}</p>
      </div>
    )
  }
}

class ColorSqure extends react.PureComponent {
  render() {
    let myBackgrounColor
    (this.state?.color) ? myBackgrounColor = this.state.color : myBackgrounColor = 'white'
    const colorChanged = event=>{
      const color = event.target.value
      this.setState({color})
    }
    return (<>
    <label>
      <div className="squre" style={{backgroundColor: myBackgrounColor}}></div>
      <input type="color" onChange={colorChanged} className='squreInput'/>
      </label>
      </>
    )
  }
}

class App extends react.PureComponent {
  render() {
    return (
      <div className="App">
        <h1>My App</h1>
        <Counter jump="3"/>
        <Counter start="5"/>
        <ColorSqure />
        <ColorSqure />
      </div>
    )
  }
} 

export default App
