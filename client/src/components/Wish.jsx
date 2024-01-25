import { Box } from "@mui/material"
import React, { useContext } from "react"
import styled from "styled-components"



const StyledWish = styled(Box)`
  display: flex;
  flex-direction: inherit;
  justify-content: space-between;
  height: 100%;
  border: 2px solid;
  border-radius: 15px;
  padding: 0 20px;
  margin: 30px;
`

export default function Wish(props) {
  //deconstruct the wish object
  const { title, price, description, category, image, rating } = props.wish



  const viewHandler = () => {
    props.onView(props.wish)
  }

  return (
    <StyledWish onClick={viewHandler}>
      <Box sx={{width: 1/4, display: 'flex', justifyContent: 'center'}}>
      <img
        style={{ width: 'inherit', alignSelf: "auto", objectFit: "contain" }}
        alt={title}
        src={image}
      />
      </Box>
      <h3>{title}</h3>
      <button
        onClick={() => {
          //wishlistCTX.onPopWishList(props.wish)
        }}
      >
        Delete Wish
      </button>
    </StyledWish>
  )
}
