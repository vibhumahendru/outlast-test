import React from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

// Component that renders individual Book cards
const BookCard = ({ book, idx }) => {
  const history = useHistory()

  // function that handles redirecting to book details page
  const handleViewBook =()=>{
    history.push(`/book-detail/${book.id}`)
  }

  return (
    <div className="alert alert-dark m-3 d-flex justify-content-between">
      <div className="m-1 font-weight-bold">
        {idx + 1}. {book.title}
      </div>
      <Button variant="success" onClick={()=>handleViewBook()}>View</Button>
    </div>
  );
};

export default BookCard;
