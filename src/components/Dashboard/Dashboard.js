import React, { useEffect, useState } from "react";
import ProductCard from "../Product/ProductCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Change this number to adjust items per page
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api-cache-test.leanagri.com/pop/pop_list/en/64/pop_list.json"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const jsonData = await response.json();
      setProducts(jsonData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtering products based on search term
  const filteredProducts = products.filter((product) =>
    product.crop_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logic to paginate the filtered products array
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleNextPage = () => {
    if (indexOfLastItem < filteredProducts.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search crop..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <i className="fa fa-search search-icon"></i>
      </div>
      <div className="row">
        {currentItems.map((product, index) => (
          <div key={index} className="col-md-6">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <div className="pagination-info">
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>
        <div className="pagination-buttons">
          {currentPage !== 1 && (
            <button onClick={handlePrevPage}>Previous</button>
          )}
          {currentPage !== totalPages && (
            <button onClick={handleNextPage}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
