import React from 'react'
import Header from '../components/Header'


const Gallery = () => {
  return (
    <div>
        <Header title='Gallery'/>
        <main>
          <img src="./images/dice1.png" alt="" width={200} height={200}/>
          <img src="./images/dice2.png" alt="" width={200} height={200}/>
          <img src="./images/dice3.png" alt="" width={200} height={200}/>
          <img src="./images/dice4.png" alt="" width={200} height={200}/>
          <img src="./images/dice5.png" alt="" width={200} height={200}/>
          <img src="./images/dice6.png" alt="" width={200} height={200}/>
        </main>
    </div>
  )
}

export default Gallery