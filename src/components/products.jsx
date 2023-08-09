import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { publicRequest } from "../requestMethods";
import LoadingSpinner from "./spinner/LoadingSpinner";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  if (!cat) {
    cat = "products";
  }
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const res = await publicRequest.get(
          cat === "products" ? `products` : `products?category=${cat}`
        );
        if (res.data.message === "success") {
          setProducts(res.data.data);
          setIsLoading(false);
        } else {
          setProducts([]);
          console.log("No Response");
          // setIsLoading(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);
  useEffect(() => {
    const filteredSet = products.reduce((result, item) => {
      const colorMatch = !filters?.color || item.color.includes(filters?.color);
      const sizeMatch = !filters?.size || item.size.includes(filters?.size);

      if (colorMatch && sizeMatch) {
        result.add(item);
      }

      return result;
    }, new Set());

    setFilteredProducts([...filteredSet]);
  }, [products, cat, filters]);

  useEffect(() => {
    switch (sort) {
      case "newest":
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => a.createdAt - b.createdAt)
        );
        break;

      case "asc":
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => a.price - b.price)
        );
        break;

      case "desc":
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => b.price - a.price)
        );
      default:
        break;
    }
  }, [sort]);

  return (
    <Container>
      {isLoading && <LoadingSpinner />}
      {filteredProducts.length
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products?.map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
