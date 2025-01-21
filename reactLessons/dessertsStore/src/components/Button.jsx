import React from 'react'

const button = (props) => {
  return (
    <button className='button1' onClick={props.func}>{props.num}</button>
  )
}

export default button