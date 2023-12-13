import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <div className="card-container">
        <div className="image-container" onClick={handleShow}>
          <img
            src={product.thumbnails[0].image}
            className="card-img-top"
            alt={product.detail}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{product.detail}</h5>
          <p className="card-text">Crop: {product.crop_name}</p>
          <a
            href={product.payment_link}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download link
          </a>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{product.detail}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={product.thumbnails[0].image}
            alt={product.detail}
            className="img-fluid"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductCard;
