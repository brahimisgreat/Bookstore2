import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Books.css'

export const Books = () => {
  const [books, setBooks] = useState([]);

  
  useEffect(() => {
      const fetchAllBooks = async () => {
        try {
          const res = await axios.get("http://localhost:3000/books");
          setBooks(res.data);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      };
   fetchAllBooks();
  }, []);

  const handleDelete = (id) => {
    try{
        axios.delete('http://localhost:3000/books/'+id)
        window.location.reload()
    }catch(err){
        console.log(err)
    }finally{
        window.location.reload()
    }
}

  return (
    <div>
      <div className="books">
        {books.map((book) => (
          <div key={book.id}>
            {book.cover && <img src={book.cover} alt="book image" />}
            <h3>{book.title}</h3>
            <p>{book.descr}</p>
            <span>{book.price}</span>
            <button className="delete" onClick={()=>handleDelete(book.id)}>delete</button>
            <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
          </div>
        ))}
        <button>
          <Link to={"/add"}>Add new book</Link>
        </button>
      </div>
    </div>
  );
};
