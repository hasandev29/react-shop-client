import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { StyledLink } from "../StyleComps";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { editProduct } from "../redux/cartRedux";
import Butto from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
  position: relative;
`;

const CartInfo = styled.div`
  // position: absolute;
  // left: 300px;
  // right: 100px;
  // top: 100px;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cartEmptyMsg = !cart.products.length;

  const onToken = (token) => {
    setStripeToken(token);
  };

  const dispatch = useDispatch();

  const [removePdt, setRemovePdt] = useState({});

  const removeCartModal = (id, title) => {
    setRemovePdt({ id: id, title: title });
    handleShow();
  };

  const removeCart = (id) => {
    console.log(id);
    const filteredCart = cart.products.filter((pdt) => pdt._id !== id);

    let subTotal = 0;
    const mapCart = filteredCart.map(
      (cart) => (subTotal += cart.price * cart.quantity)
    );

    const newCart = {
      products: filteredCart,
      quantity: filteredCart.length,
      total: subTotal,
    };
    console.log(newCart);
    dispatch(editProduct(newCart));
    console.log(cart);
    handleClose();
  };

  const navigate = useNavigate();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        console.log({ stripeToken, ...cart });
        navigate("/success", { replace: true });
      } catch (error) {}
    };

    stripeToken && makeRequest();
  }, [stripeToken]);

  const getCartData = () => {
    console.log(cart);
  };
  return (
    <Container>
      <Wrapper>
        <Title onClick={handleShow}>YOUR BAG</Title>
        <Top>
          <StyledLink to={`/products/products`}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </StyledLink>
          <TopTexts onClick={getCartData}>
            <TopText>Shopping Bag({cart.products.length})</TopText>
            {/* <TopText>Your Wishlist (0)</TopText> */}
          </TopTexts>
          <TopButton type="filled" onClick={() => navigate("/")}>
            EXPLORE MORE
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            <CartInfo>
              {cartEmptyMsg && (
                <h3>
                  <b>Your Cart is Empty</b>
                </h3>
              )}
            </CartInfo>
            {cart.products.map((product, index) => (
              <Product key={index.toString()}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor
                      color={product.color ? product.color : "lime"}
                    />
                    <ProductSize>
                      <b>Size:</b> {product.size ? product.size : "None"}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer className="mt-4">
                    <button
                      className="btn btn-outline-danger btn-sm d-flex align-items-center"
                      onClick={() =>
                        removeCartModal(product._id, product.title)
                      }
                    >
                      <DeleteOutlinedIcon />
                      Remove
                    </button>
                  </ProductAmountContainer>

                  <ProductAmountContainer>
                    <ProductAmount className="d-flex align-items-center gap-2">
                      <ShoppingBagOutlinedIcon />
                      {product.quantity}
                    </ProductAmount>
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.quantity * product.price}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}

            <Hr />
          </Info>

          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Has. Shop"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnWSxpStO9ibGTJyr9aOdrDRti1GHSXsxsqw&usqp=CAU"
              billingAddress
              shippingAddress
              description={`Your total is ${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button disabled={!cart.total}>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure! Do you want to remove "{removePdt.title}" from your Cart
          ?
        </Modal.Body>
        <Modal.Footer>
          <Butto variant="secondary" onClick={handleClose}>
            Cancel
          </Butto>
          <Butto variant="danger" onClick={() => removeCart(removePdt.id)}>
            Confirm Remove
          </Butto>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Cart;
