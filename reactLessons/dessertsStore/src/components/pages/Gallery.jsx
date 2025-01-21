import React, { useState, useEffect } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import dessertsArr from '../../desserts.json'
import Card from '../card'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Button from '../button';
const PER_PAGE = 6;

const Gallery = () => {
  const [search, setSearch] = useState('');
  const [filteredDesserts, setFilteredDesserts] = useState(dessertsArr);
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [priceRange, setPriceRange] = useState([4, 10]);
  const [page, setPage] = useState(1);
  const [splicedArray, setSplicedArray] = useState([]);
  const countOfButtons = Math.ceil(filteredDesserts.length / PER_PAGE);

  useEffect(() => {
    const start = 0;
    const end = PER_PAGE;
    setSplicedArray(filteredDesserts.slice(start, end));
  }, [filteredDesserts]);

  const onBtnClick = (e) => {
    const pageNum = parseInt(e.target.innerHTML);
    setPage(pageNum);
    const start = (pageNum - 1) * PER_PAGE;
    const end = start + PER_PAGE;
    setSplicedArray(filteredDesserts.slice(start, end));
  }

  const buttonsGenerator = () => {
    const buttonsArr = [];
    for (let i = 1; i <= countOfButtons; i++) {
      buttonsArr.push(<Button key={i} num={i} func={onBtnClick}/>);
    }
    return buttonsArr;
  };
  
  const filterDesserts = () => {
    const filtered = dessertsArr.filter((dessert) => {
      return Object.values(dessert).some(value => 
        String(value).toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredDesserts(filtered);
  };
  
  const sortByPrice = () => {
    const sorted = [...filteredDesserts].sort((a, b) => Number(a.price.replace('$', '')) - Number(b.price.replace(/\$/g, '')));
    setFilteredDesserts(sorted);
  };
  
  const sortByName = () => {
    const sorted = [...filteredDesserts].sort((a, b) => a.dessert.localeCompare(b.dessert));
    setFilteredDesserts(sorted);
  };

  const showThePriceRange = () => {
    return (
      <div>
        <RangeSlider min={4} max={10} step={0.05} value={priceRange}
          onInput={setPriceRange} onChange={filterByPrice} />
        <p>Price Range: ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}</p>
        <button onClick={filterByPrice}>filter</button>
      </div>
    );
  };

  const filterByPrice = () => {
    const filtered = dessertsArr.filter(dessert => {
      const price = Number(dessert.price.replace('$', ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });
    setFilteredDesserts(filtered);
  };
  
  const renderCards = () => {
    return splicedArray.map((dessert, index) => (
      <Card key={index} pic={dessert.image} title={dessert.dessert} des={dessert.description} price={dessert.price} arr={dessert.ingredients}/>
    ));
  };
  return (
    <div className='galleryDiv'>
      <Header title='Gallery'/>
      <main className='galleryMain'>
        <div className='search'>
          <input 
            type="text" 
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && filterDesserts()}
            placeholder="Search by ingredient..."
          />
          <button onClick={filterDesserts}>Search</button>
          <button onClick={() => setFilteredDesserts(dessertsArr)}>Reset</button>
          <select onChange={(e) => {
            if (e.target.value === 'sortPrice') {sortByPrice(); setShowPriceRange(false)}
            else if (e.target.value === 'sortName') {sortByName(); setShowPriceRange(false);}
            else if (e.target.value === 'filterPrice') setShowPriceRange(true);
            else setShowPriceRange(false);
          }}>
            <option value="">Select an action</option>
            <option value="sortPrice">Sort by price</option>
            <option value="sortName">Sort by name</option>
            <option value="filterPrice">Set price range</option>
          </select>
          {showPriceRange && showThePriceRange()}
        </div>
        <div className='container'>
          {renderCards()}
        </div>
        <div className='buttons'>
          {buttonsGenerator()}
          </div>
      </main>
      <Footer />
    </div>
  )
}

export default Gallery
