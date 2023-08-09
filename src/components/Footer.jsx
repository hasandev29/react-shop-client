import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";

import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Left>
        <Logo>HAS.</Logo>
        <Desc>
          Explore our online HAS. store for a range of styles, from elegant
          gowns to casual sundresses. Find your perfect dress effortlessly and
          embrace the art of dressing up today.
        </Desc>

        <SocialContainer>
          <SocialIcon
            color="3B5999"
            href="https://www.facebook.com/"
            target="_blank"
          >
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon
            color="E4405F"
            href="https://www.instagram.com/"
            target="_blank"
          >
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon
            color="55ACEE"
            href="https://www.twitter.com"
            target="_blank"
          >
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon
            color="E60023"
            href="https://www.pinterest.com/"
            target="_blank"
          >
            <PinterestIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem onClick={() => navigate("/")}>Home</ListItem>
          <ListItem onClick={() => navigate("/cart")}>Cart</ListItem>
          <ListItem onClick={() => navigate("/products/men")}>
            Man Fashion
          </ListItem>
          <ListItem onClick={() => navigate("/products/women")}>
            Woman Fashion
          </ListItem>
          <ListItem onClick={() => navigate("/")}>Accessories</ListItem>
          <ListItem onClick={() => navigate("/")}>My Account</ListItem>
          <ListItem onClick={() => navigate("/")}>Order Tracking</ListItem>
          <ListItem onClick={() => navigate("/")}>Wishlist</ListItem>
          <ListItem onClick={() => navigate("/")}>Wishlist</ListItem>
          <ListItem onClick={() => navigate("/")}>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <LocationOnIcon />{" "}
          <span>622 Dixie Path , South Tobinchester 98336</span>
        </ContactItem>
        <ContactItem>
          <PhoneAndroidIcon />
          <span>+91 8344 568 787</span>
        </ContactItem>
        <ContactItem>
          <EmailIcon />
          <span className="ms-2">contact@hasstore.com</span>
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
