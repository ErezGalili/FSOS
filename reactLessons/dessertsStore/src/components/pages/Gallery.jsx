import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import dessertsArr from '../../desserts.json'
import Card from '../card'


const Gallery = () => {
  return (
    <div className='galleryDiv'>
      <Header title='Gallery'/>
      <main className='galleryMain'>
        <div className='container'>
        {dessertsArr.map((dessert, index) => (
          <Card key={index} pic={dessert.image} title={dessert.dessert} des={dessert.description} price={dessert.price} arr={dessert.ingredients}/>
        ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Gallery
