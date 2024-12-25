import { useState } from 'react';
import './App.css';

function AddBook({ onAdd }) {
  const [book, setBook] = useState('');
  const [img, setImg] = useState('');
  const [author, setAuthor] = useState('');

  const addBook = () => {
    if (book && img && author) {
      onAdd({ book, img, author });
      setBook('');
      setImg('');
      setAuthor('');
    }
  };

  return (
    <div id="addBook">
      <h1>The library</h1>
      <h3>Enter book name</h3>
      <input type="text" value={book} onChange={(e) => setBook(e.target.value)} />
      <h3>Enter img url</h3>
      <input type="text" value={img} onChange={(e) => setImg(e.target.value)} />
      <h3>Enter author name</h3>
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <button className='addBtn' onClick={addBook}>Add book</button>
    </div>
  );
}

function Books({ books }) {
  return (
    <div id="books">
      {books.map((b, index) => (
        <div key={index} id="book">
          <h3>{b.book}</h3>
          <img src={b.img} alt={b.book} />
          <p>Author: {b.author}</p>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [books, setBooks] = useState([]);

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  return (
    <>
      <AddBook onAdd={handleAddBook} />
      <Books books={books} />
    </>
  );
}

export default App;

