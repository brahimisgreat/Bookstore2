import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './Update.css'

export const Update = () => {
  const [books, setBooks] = useState({
    title: "",
    descr: "",
    price: null,
    cover: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const bookid = location.pathname.split("/")[2]

  console.log(location.pathname.split("/")[2]);

  const handleChange = (e) => {
    setBooks({
      ...books,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:3000/books/"+ bookid, books);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="update">
      <h1>Update book</h1>
      <input
        type="text"
        placeholder="Title"
        name="title"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="description"
        name="descr"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="cover"
        name="cover"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
};
