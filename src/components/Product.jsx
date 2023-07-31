// import {
//     FavoriteBorderOutlined,
//     SearchOutlined,
//     ShoppingCartOutlined,
//   } from "@material-ui/icons";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

  import { Link } from "react-router-dom";
  import styled from "styled-components";
  
  const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;
  
  const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
  
    &:hover ${Info}{
      opacity: 1;
    }
  `;
  
  const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
  `;
  
  const Image = styled.img`
    height: 75%;
    z-index: 2;
  `;
  
  const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;
  
  const Product = ({ item }) => {
    return (
      <Container>
        <Circle />
        {/* <Image src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/1155795/2020/5/22/674d592c-8bcf-4e66-a9b4-b254643c8dfe1590137663576-ether-Men-Black-Slim-Fit-Antimicrobial-Cotton-Stretch-Shirt--1.jpg" /> */}
        <Image src={item.img} />
        <Info>
          <Icon>
            <ShoppingCartIcon />
            {/* <ShoppingCartOutlined /> */}
          </Icon>
          <Icon>
            <Link to={`/product/${item._id}`}>
                <SearchIcon />
            {/* <SearchOutlined /> */}
            </Link>
          </Icon>
          <Icon>
            <FavoriteIcon />
            {/* <FavoriteBorderOutlined /> */}
          </Icon>
        </Info>
      </Container>
    );
  };
  
  export default Product;