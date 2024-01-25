import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Redeem } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from "../redux/userRedux";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

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

const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity)
  const currentUser = useSelector((state) => state.user.currentUser);

  // to hand
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          {/*<SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} /></SearchContainer>*/}
            {currentUser ? (
            <>
              <Link to={`/profile/${currentUser._id}`}>
                <MenuItem>
                  <Badge  color="primary">
                    <Redeem/>
                  </Badge>
                </MenuItem>
              </Link>
              <Link to="/cart">
                <MenuItem>
                  <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartIcon/>
                  </Badge>
                </MenuItem>
              </Link>
            </>)
            :
            null
          }
        </Left>
        <Center>
        <LinkWrapper to="/">
          <Logo>Wishlist</Logo>
        </LinkWrapper>
        </Center>
        <Right>
          {currentUser ? (
            <>
              <LinkWrapper to="/products">
                <MenuItem>EXPLORE</MenuItem>
              </LinkWrapper>
              <LinkWrapper to="/friends">
                <MenuItem>FRIENDS</MenuItem>
              </LinkWrapper>
              <LinkWrapper to="/">
                <MenuItem onClick={handleLogout}>LOG OUT</MenuItem>
              </LinkWrapper>
            </>
            ) : (
              <>
                <LinkWrapper to="/register">
                  <MenuItem>REGISTER</MenuItem>
                </LinkWrapper>
                <LinkWrapper to="/login">
                  <MenuItem>SIGN IN</MenuItem>
                </LinkWrapper>
                
              </>
            )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;