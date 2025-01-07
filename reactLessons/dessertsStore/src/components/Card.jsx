import React from 'react'

const Card = (props) => {
const liIng = ()=>{
  const ingredients = props.arr
  const liList = ingredients.map((ing, i) => {
    return <li key={i}>{ing}</li>
  })
  return liList
}
  return (
    <div className="card my-2" style={{ width: "18rem" }}>
      <img src={props.pic} className="card-img-top" alt={props.title} loading="lazy" />
      <div className="card-body bg-light">
        <h5 className="card-title">{props.title}</h5>
        <ul className="liIng">
          {liIng()}
        </ul>
        <p className="card-text">{props.des}</p>
        <p className="card-text"><strong>Price: </strong>{props.price}</p>
        <a href="#" className="btn btn-primary">Add to cart</a>
      </div>
    </div>
  )
}

export default Card
