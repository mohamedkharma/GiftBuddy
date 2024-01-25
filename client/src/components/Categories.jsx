import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Heading = styled.h2`
font-size: 28px;
font-weight: 700;
color: black;
text-transform: uppercase;
letter-spacing: 1px;
margin-bottom: 20px;
text-align: center; /* Add this line to horizontally center the heading */

`;

const Categories = () => {
  return (
    <div>
      <Heading>Shop By Category</Heading>
      <Container>
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
    </div>
  );
};

export default Categories;
