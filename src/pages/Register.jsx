import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { useRef } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  max-width: 200px;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const LinkTag = styled(Link)`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: #000;
`;

const Register = () => {
  const navigate = useNavigate();
  const passRef = useRef();
  const conPassRef = useRef();

  const [registerData, setRegisterData] = useState({});
  const [isAdmin, setisAdmin] = useState(false);
  const [isPassMatched, setIsPassMatched] = useState(true);

  console.log(isAdmin);

  const handleInput = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    // console.log(e.currentTarget.value);
  };

  const userImgUrl =
    "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/1155795/2020/5/22/674d592c-8bcf-4e66-a9b4-b254643c8dfe1590137663576-ether-Men-Black-Slim-Fit-Antimicrobial-Cotton-Stretch-Shirt--1.jpg";

  const handleSubmit = async () => {
    if (passRef.current.value !== conPassRef.current.value) {
      setIsPassMatched(false);
    } else {
      setIsPassMatched(true);
      let ReqObj = {
        firstname: registerData.firstname,
        lastname: registerData.lastname,
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
        img: userImgUrl,
        admin: isAdmin,
      };
      try {
        const register = await publicRequest.post("auth/register", ReqObj);
        console.log(register);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            name="firstname"
            placeholder="First Name"
            onChange={(e) => handleInput(e)}
          />
          <Input
            name="lastname"
            placeholder="Last Name"
            onChange={(e) => handleInput(e)}
          />
          <Input
            name="username"
            placeholder="Username"
            onChange={(e) => handleInput(e)}
          />
          <Input
            name="email"
            placeholder="Email"
            onChange={(e) => handleInput(e)}
          />
          <Input
            name="password"
            placeholder="Password"
            onChange={(e) => handleInput(e)}
            ref={passRef}
          />
          <Input
            name="confirmPassword"
            placeholder="Confirm Password"
            ref={conPassRef}
          />

          <div className="form-check form-switch mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="stockSwitch"
              name="isAdmin"
              checked={isAdmin}
              onChange={(e) => setisAdmin(!isAdmin)}
            />
            <label className="form-check-label" htmlFor="stockSwitch">
              Admin
            </label>

            {!isPassMatched && (
              <p className="text-danger mb-0 mt-2">
                Password & Confirm Password is not matching
              </p>
            )}
          </div>

          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>

          <div className="last-row d-flex flex-column">
            <Button type="button" onClick={handleSubmit}>
              CREATE
            </Button>

            <LinkTag className="mt-4" to="/login">
              ALREADY HAVE AN ACCOUNT ?
            </LinkTag>
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
