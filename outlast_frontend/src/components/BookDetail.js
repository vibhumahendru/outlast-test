import React, { useEffect, useState } from "react";
import {
  fetchBookDetail,
  fetchFavorites,
  setFavoriteBooks,
} from "../utils/api";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";

const BookDetail = ({ match }) => {
  const history = useHistory();

  const [fetching, setFetching] = useState(true); //hook to control display of loader whole book data is fetched
  const [savingFav, setSavingFav] = useState(true); //hook to control display of loader when favorited data is fetched
  const [favorites, setFavorites] = useState([]); //hook to store info on favorited books
  const [book, setBook] = useState({}); //hook to store selected book data

  // hook to fetch favorited books and book deatils on initial page load
  useEffect(() => {
    if (match.params.id) {
      fetchFavorites()
      .then((res) => {
        setFavorites(res.data.favorites)
        setSavingFav(false)
      });
      fetchBookDetail(match.params.id).then((res) => {
        setBook(res.data);
        setFetching(false);
      });
    }
  }, []);

  //function that handles adding or removing a book as a favorite
  const handleSetFavorite = () => {
    let data = [...favorites];
    if (data.includes(book.id)) {
      data = data.filter((b) => b.id === book.id);
    } else {
      data.push(book.id);
    }
    setSavingFav(true);
    setFavoriteBooks(data)
      .then((res) => {
        setFavorites(res.data.favorites);
        setSavingFav(false);
      })
      .catch(() => {
        setSavingFav(false);
      });
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        {fetching ? (
          <Loader type="TailSpin" color="#00BFFF" />
        ) : (
          <>
            <div className="d-flex flex-column border border-secondary rounded w-50 m-2 overflow-auto">
              <div className="d-flex justify-content-center m-2">
                <img
                  className="image-height"
                  src={book.formats["image/jpeg"]}
                  alt=""
                />
              </div>
              <div className="m-3">
                <h4>{book.title}</h4>
                <div>
                  <h6>Authors:</h6>
                  <ul>
                    {book.authors.map((a) => (
                      <li>{a.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                {savingFav ? (
                  <Loader type="TailSpin" color="#00BFFF" />
                ) : (
                  <Button
                    className="w-25 m-2"
                    onClick={() => handleSetFavorite()}
                    variant={
                      favorites.includes(book.id)
                        ? "success"
                        : "outline-success"
                    }
                  >
                    {favorites.includes(book.id)
                      ? "Favorited!"
                      : "Mark as favorite?"}
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
        <Button
          className="w-25"
          onClick={() => history.push(`/`)}
          variant="warning"
        >
          Back
        </Button>
      </div>
    </>
  );
};

export default BookDetail;
