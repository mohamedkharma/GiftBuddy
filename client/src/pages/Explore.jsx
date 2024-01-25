// import React from "react"
// import { Grid, Card } from '@material-ui/core';
// import { Link } from "react-router-dom"
// import styled from "styled-components"
// import Navbar from "../components/Navbar";
// import { useSelector } from "react-redux";
// import { Redeem } from "@material-ui/icons";
// import Footer from "../components/Footer";


// import CardHeader from '@material-ui/core/CardHeader';
// import Avatar from '@material-ui/core/Avatar';
// import { blue } from '@material-ui/core/colors';

// const categories = [
//   { type: "Men's Clothing", id: "01" },
//   { type: "Women's Clothing", id: "02" },
//   { type: "Electronics", id: "03" },
//   { type: "Jewelery", id: "04" },
//   { type: "Accessories", id: "05" },
//   { type: "Miscellaneous", id: "06" },
// ]

// const MainContainer = styled.div`
//   padding: 30px;
// `

// export default function Explore() {

//     //fetch available items
//     const user = useSelector((state) => state);

//     console.log(user)


//   return (
//     <MainContainer>
//         <Navbar/>
//       <Grid direction="row" container spacing={3}>
//         {categories.map((cat) => {
//           // const url = cat.type.replace(/\s+/g, "-"); // use this to remove the %20 from the url
//           return (
//             <Grid key={cat.id} item xs={6} sm={4}>
//               <Card variant="outlined" sx={{ maxWidth: 345 }}>
//                 <CardHeader
//                   avatar={
//                     <Avatar sx={{ bgcolor: blue[500] }} >
//                       WL
//                     </Avatar>
//                   }
//                   title={cat.type}
//                 />
//                 <Link style={{ textDecoration: "none" }} to={cat.type}>
//                   <div
//                     style={{
//                       textAlign: "center",
//                       margin: "auto",
//                       width: "70%",
//                       padding: "15px",
//                     }}
//                   >
//                     <Redeem fontSize="large"/>
//                   </div>
//                 </Link>
//               </Card>
//             </Grid>
//           )
//         })}
//       </Grid>
//       <Footer/>
//     </MainContainer>
//   )
// }

import React from "react";
import { Grid, Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Redeem } from "@material-ui/icons";
import Footer from "../components/Footer";
import Categories from "../components/Categories";
import { mainCategories } from "../data";
import CategoryItem from "../components/CategoryItem";
import { mobile } from "../responsive";

const MainContainer = styled.div`
  padding: 30px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

export default function Explore() {
  //fetch available items
  const user = useSelector((state) => state);

  console.log(user);

  const chunkSize = 3; // Number of items to display in each chunk

  // Create chunks of mainCategories array
  const categoryChunks = mainCategories.reduce(
    (chunks, category, index) =>
      index % chunkSize === 0
        ? [...chunks, mainCategories.slice(index, index + chunkSize)]
        : chunks,
    []
  );

  return (
    <MainContainer>
      <Navbar />
      {categoryChunks.map((chunk, index) => (
        <Container key={index}>
          {chunk.map((item) => (
            <CategoryItem item={item} key={item.id} />
          ))}
        </Container>
      ))}
      <Footer />
    </MainContainer>
  );
}


