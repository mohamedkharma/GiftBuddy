import React, { useState, useEffect } from "react"
import styled from "styled-components"

import UserInfo from "../components/UserInfo"
import WishList from "../components/WishList"
import { publicRequest } from "../requestMethods"

import { useLocation } from "react-router-dom"; // import the useLocation hook
import Navbar from "../components/Navbar"

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-areas:
    "UserInfo"
    "wishlist";
`

const Friend = styled.div`
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export default function Profile() {
  const { pathname } = useLocation(); // get the current location object
  const userId = pathname.split("/")[2];
  const [user, setUser] = useState({});
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [userFriends, setUserFriends] = useState([]);


  // Fetch the user data from the backend API
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await publicRequest.get(`/users/find/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [userId]);

  useEffect(() => {
    //get the wishlist products for the user
    const getWishlistProducts = async () => {
      try {
        const response = await publicRequest.get(`/users/${userId}/wishlist`);
        setWishlistProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getWishlistProducts();
    
    //get friends of user
    const getUserFriends = async () => {
      try {
        // this only return the friends ids
        const response = await publicRequest.get(`/users/${userId}/friends`);
        const friendIds = response.data; // Get the friend IDs
        console.log("working?"+ friendIds);
  
        // Fetch the actual friend information using the friend ids
        const friendPromises = friendIds.map(async (friendId) => {
          try {
            const friendResponse = await publicRequest.get(`/users/find/${friendId}`);
            return friendResponse.data; // Return the friend object
          } catch (error) {
            console.log(error);
            return null;
          }
        });
  
        // Resolve all the friend promises
        const friends = await Promise.all(friendPromises);
        setUserFriends(friends);
      } catch (error) {
        console.log(error);
      }
    };
    getUserFriends();

  }, [userId]);

  // console.log(wishlistProducts);

  return (
    <Wrapper>
      <Navbar />
      <UserInfo name={user.firstname +" "+ user.lastname} bio={" "} />
      <h1>{user.firstname}'s  WishList</h1>
      <WishList products={wishlistProducts} />
      <h1>{user.firstname}'s  Friends</h1>
      {userFriends.map((friend) => (
      <Friend key={friend._id}>
         <div><b>Firstname:</b> {friend.firstname}</div>
         <div><b>Lastname:</b> {friend.lastname}</div>
      </Friend>
    ))}
    </Wrapper>
  );
}
