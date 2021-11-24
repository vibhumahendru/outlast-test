import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import Button from "react-bootstrap/Button";
import { fetchBooks } from "../utils/api";
import Loader from "react-loader-spinner";

const BookList = ({}) => {

  const initialBookUrl = "https://gutendex.com/books/";

  const [bookData, setBookData] = useState([]); // hook to store all books data
  const [nextUrl, setNextUrl] = useState(initialBookUrl); // hook to store url of next set of paginated books
  const [fetching, setFetching] = useState(true); // hook to control display of loader while book data is fetched

  // hook to fetch all books on initial page load
  useEffect(() => {
    fetchBooks(nextUrl).then((res) => {
      setBookData(res.data.results);
      setNextUrl(res.data.next);
      setFetching(false);
    });
  }, []);

  // function to load the next set of paginated books
  const handleLoadMore = () => {
    setFetching(true);
    fetchBooks(nextUrl).then((res) => {
      setBookData([...bookData, ...res.data.results]);
      setNextUrl(res.data.next);
      setFetching(false);
    });
  };

  return (
    <div className="d-flex flex-column align-items-center vh-90">
      <div className="mt-2 font-weight-bold">Book Titles</div>
      <div className="d-flex flex-column align-items-center border border-secondary rounded vh-100 w-50 m-2 overflow-auto">
        <div>
          {bookData.map((b, idx) => (
            <BookCard book={b} idx={idx} />
          ))}
        </div>
        {fetching ? (
          <Loader
            type="TailSpin"
            color="#00BFFF"
          />
        ) : (
          <Button
            className="w-50 m-2"
            onClick={() => handleLoadMore()}
            variant="warning"
          >
            Load More!
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookList;
