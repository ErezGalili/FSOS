import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

const Home = () => {
  return (
    <div className='homeDiv'>
      <Header title='Desserts Store home page' bgColor='lightblue' />
      <main>
        <h2>Welcome to the Desserts Store</h2>
        <p>
          We offer a wide variety of delicious desserts. 
          You can place an order online and have it delivered to your door.
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default Home