import "../pages/success/success.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "react-bootstrap/Badge";

import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

import { StyledLink } from "../StyleComps";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/userSlice";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

// const SearchContainer = styled.div`
//   border: 0.5px solid lightgray;
//   display: flex;
//   align-items: center;
//   margin-left: 25px;
//   padding: 5px;
// `;

// const Input = styled.input`
//   border: none;
//   ${mobile({ width: "50px" })}
// `;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const admin = user?.data?.isAdmin;

  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          {/* <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} /> 
          </SearchContainer>*/}
        </Left>
        <Center>
          <StyledLink to="/">
            <Logo>HAS.</Logo>
          </StyledLink>
        </Center>
        <Right>
          {!user && (
            <>
              <StyledLink to="/register">
                <MenuItem>REGISTER</MenuItem>
              </StyledLink>
              <StyledLink to="/login">
                <MenuItem>SIGN IN</MenuItem>
              </StyledLink>
            </>
          )}

          {admin && (
            <StyledLink to="/admin">
              <MenuItem>MANAGE PRODUCT</MenuItem>
            </StyledLink>
          )}

          {!!user && (
            <StyledLink>
              <MenuItem
                onClick={() => {
                  dispatch(logout());
                }}
              >
                SIGN OUT
              </MenuItem>
            </StyledLink>
          )}

          <StyledLink to="/cart">
            <MenuItem
              style={{ "white-space": "nowrap", "margin-right": "3px" }}
            >
              <ShoppingCartIcon />
              <Badge bg="secondary">{quantity}</Badge>
            </MenuItem>
          </StyledLink>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
