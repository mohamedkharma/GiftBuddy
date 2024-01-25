import React from "react";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import Navbar from "../components/Navbar";
import styled from 'styled-components'
import { mobile } from "../responsive";
import { Avatar } from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { PersonAddOutlined } from "@material-ui/icons";
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import Footer from "../components/Footer";


const FriendContainer = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Friend = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ flexDirection: "column" })}
`;


const FriendDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const FriendColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const WishDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WishContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ViewWishes = styled.div`
  font-size: 14px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const AddFriend = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Friends = () =>{
  const [users,setUsers] = useState([])
  const user = useSelector((state) => state.user.currentUser);


  //get all users
  useEffect(() => {
      const getUsers = async () => {
          try{
              const res = await publicRequest.get("/users" );
              setUsers(res.data);
          } catch(err) {
              console.log(err)
          }};

      getUsers();
  } , []);

  // add friend
  const handleAddFriend = async (userId) => {
    try {
      // Make a request to add the friend
      const response = await publicRequest.post(`/users/${user._id}/friends`, {
        friendId: userId, //add the user as a friend by using their own ID
      });
      const updatedUser = response.data;
      console.log(updatedUser); // Log the updated user to the console
    
    } catch (err) {
      console.log(err);
    }
  };

  //remove current user from friends
  const index = users.indexOf(user)
  const newUsersArray = users.splice(index, 1)


 
  return (
    <>
      <Navbar />
      <FriendContainer>
        {users.map((user) => (
          <Friend key={user._id}>
            <FriendDetail>
              <Avatar />
              <Details>
                <div>
                  <b>User Name:</b> {user.username}
                </div>
                <div>
                  <b>First Name:</b> {user.firstname}
                </div>
                <div>
                  <b>Last Name:</b> {user.lastname}
                </div>
              </Details>
            </FriendDetail>
            <WishDetail>
              <WishContainer>
                <Link to={`/profile/${user._id}`}>
                  <ViewWishes>
                    View wishlist
                    <ViewHeadlineIcon />
                  </ViewWishes>
                </Link>
              </WishContainer>
              <AddFriend onClick={() => handleAddFriend(user._id)}>
                <Link><PersonAddIcon /></Link>
              </AddFriend>
            </WishDetail>
          </Friend>
        ))}
      </FriendContainer>
      <Footer/>
    </>
  );  
}  

export default Friends;