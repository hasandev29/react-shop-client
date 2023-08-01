import { useEffect, useState } from "react";
import styled from "styled-components";
// import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  if (!cat) {
    cat = "products"
    console.log(cat)
  }
  // const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat === "products"
            ? "http://localhost:5000/api/products"
            : `http://localhost:5000/api/products?category=${cat}`
        );
        if (res.data.message === "success") {
          setProducts(res.data.data);
        } else {
          setProducts([]);
        }
      } catch (err) {}
    };
    getProducts();
  }, [cat]);
  console.log(products);
  // useEffect(() => {
  //   cat &&
  //     setFilteredProducts(
  //       products.filter((item) =>
  //         Object.entries(filters).every(([key, value]) =>
  //           item[key].includes(value)
  //         )
  //       )
  //     );
  // }, [products, cat, filters]);

  // useEffect(() => {
  //   if (sort === "newest") {
  //     setFilteredProducts((prev) =>
  //       [...prev].sort((a, b) => a.createdAt - b.createdAt)
  //     );
  //   } else if (sort === "asc") {
  //     setFilteredProducts((prev) =>
  //       [...prev].sort((a, b) => a.price - b.price)
  //     );
  //   } else {
  //     setFilteredProducts((prev) =>
  //       [...prev].sort((a, b) => b.price - a.price)
  //     );
  //   }
  // }, [sort]);

  return (
    <Container>
      {products ? (
        products.map((item) => <Product item={item} key={item._id} />)
      ) : (
        <Product item={"item"} key={"item.id"} />
      )}
      {/* <Product item={"item"} key={"item.id"} /> */}
    </Container>
    // <Container>
    //   {cat
    //     ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
    //     : products?.slice(0, 8)
    //         .map((item) => <Product item={item} key={item.id} />)}
    // </Container>
  );
};

export default Products;
