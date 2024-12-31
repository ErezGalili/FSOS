import react, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'


function Calculator() {
    const [num1, setNum1] = useState('')
    const [num2, setNum2] = useState('')
    const [operator, setOperator] = useState('+')
    const [result, setResult] = useState('')
  
    useEffect(() => {
      if (num1 && num2 && operator) {
        setResult(eval(`${num1}${operator}${num2}`))
      } 
    }, [num1, num2, operator])
  
    return (
      <div>
        <input type='number' value={num1} onChange={e => setNum1(e.target.value)}/>
        <select value={operator} onChange={e => setOperator(e.target.value)}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <input type='number' value={num2} onChange={e => setNum2(e.target.value)}/>
        <p>Result: {result}</p>
      </div>
    )
  }

  export default Calculator