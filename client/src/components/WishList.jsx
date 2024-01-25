import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Checkbox from '@material-ui/core/Checkbox';
// import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// export default function CheckboxListSecondary() {
//   const classes = useStyles();
//   const [checked, setChecked] = React.useState([1]);

//   const handleToggle = (value) => () => {
//     const currentIndex = checked.indexOf(value);
//     const newChecked = [...checked];

//     if (currentIndex === -1) {
//       newChecked.push(value);
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }

//     setChecked(newChecked);
//   };


//   const Container = styled.div`
//     justify-self: center;
//   `

//   return (
//     <Container>
//     <List dense className={classes.root}>
//       {[0, 1, 2, 3].map((value) => {
//         const labelId = `checkbox-list-secondary-label-${value}`;
//         return (
//           <ListItem key={value} button>
//             <ListItemAvatar>
//               <Avatar
//                 alt={`Avatar n°${value + 1}`}
//                 src={`/static/images/avatar/${value + 1}.jpg`}
//               />
//             </ListItemAvatar>
//             <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
//             <ListItemSecondaryAction>
//               <Checkbox
//                 edge="end"
//                 onChange={handleToggle(value)}
//                 checked={checked.indexOf(value) !== -1}
//                 inputProps={{ 'aria-labelledby': labelId }}
//               />
//             </ListItemSecondaryAction>
//           </ListItem>
//         );
//       })}
//     </List>
//     </Container>
//   );
// }

import { useEffect, useState } from "react";
import Product from "./Product";

const WishlistWrapper = styled.div`
  // grid-area: wishlist;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
`;

const WishList = ({ products }) => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const promises = products.map((productId) =>
        fetch(`http://localhost:5000/api/products/find/${productId}`).then((response) => response.json())
      );
      const data = await Promise.all(promises);
      setProductData(data);
    };

    fetchData();
  }, [products]);

  return (
    <WishlistWrapper>
      {productData.map((product) => (
        <Product key={product._id} item={product} />
      ))}
    </WishlistWrapper>
  );
};

export default WishList;
