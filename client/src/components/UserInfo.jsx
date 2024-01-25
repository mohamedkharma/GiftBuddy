import React, { useState, useContext } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"



const Wrapper = styled.div`
  margin: auto;
  width: 95%;
  background-color: grey; 
  border-radius: 30px;
`

export default function UserInfo(props) {

  //Profile information
  const { name, bio } = props

  return (
    <Wrapper>
      <div style={{ display: "flex", justifyContent: 'center'}}>
        <div>
          <h1 style={{ textAlign: 'center' }}>{name}</h1>
          <div style={{ display: "flex", justifyContent: 'center'}}>
            <div style={{ width: '50%' }}>
              <p>{bio}</p>
            </div>
          </div>
        </div>
      </div>
      <Link style={{float: 'right'}} to={'editprofile'}>
              <button>Edit profile</button>
            </Link>
    </Wrapper>
  )
}
