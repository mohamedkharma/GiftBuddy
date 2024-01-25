import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FeaturedProductsContainer = styled.section`
  display: flex;
  background: url("https://plus.unsplash.com/premium_photo-1661767406044-f19b0f1e0a5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 80vh; /* Increase the height as desired */

  .fgigs-section-heading {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      font-size: 28px;
      font-weight: 700;
      color: #FCF5E5;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 20px;

      span {
        color: #FCF5E5;
      }
    }

    img {
      /* Add your image source here */
    }
  }

  .carousel {
    display: flex;
    overflow-x: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    padding-bottom: 20px;
  }

  .card {
    flex: 0 0 calc(50% - 10px);
    margin-right: 10px;
    scroll-snap-align: start;
    background: #272727;
    border-radius: 10px; /* Increase the border-radius for more rounded corners */
    padding-top: 25px;
    text-align: center;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      background: #e67e22;
    }

    .box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }

      .text {
        font-size: 25px;
        font-weight: 500;
        margin: 10px 0 7px 0;
        color: #FCF5E5;
      }

      p {
        color: #FCF5E5;
      }
    }

    img {
      height: 150px;
      width: 150px;
      object-fit: cover;
      border-radius: 50%; /* Make the border-radius 50% for a more circular shape */
      border: 3px solid #f37f51;
      transition: all 0.3s ease;

      &:hover {
        border-color: #fff;
      }
    }
  }
`;

const products = [
  {
    _id: 1,
    name: 'Nike T-Shirt',
    desc: 'Nike mens Classic',
    img: 'https://m.media-amazon.com/images/I/51RrSg2H3rL._AC_UY550_.jpg',
  },
  {
    _id: 2,
    name: 'Mens Casual Premium Slim Fit T-Shirts ',
    desc: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    img: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
  },
  {
    _id: 3,
    name: 'Mens Cotton Jacket',
    desc: 'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
    img: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
  },
  {
    _id: 4,
    name: 'Mens Casual Slim Fit',
    desc: 'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
    img: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
  },
];

const FeaturedProducts = () => {
  const carouselRef = useRef(null);
  
  // const [products, setProducts] = useState([]); // State to hold the fetched products

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/products');
  //       setProducts(response.data.slice(0, 6)); // Slice the array to include only the first 6 products
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  // for featured products effect
  useEffect(() => {
    const carouselInterval = setInterval(() => {
      if (carouselRef.current !== null) {
        carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
        
        if (
          carouselRef.current.scrollLeft + carouselRef.current.offsetWidth >=
          carouselRef.current.scrollWidth
        ) {
          carouselRef.current.scrollLeft = 0;
        }
      }
    }, 5000);

    return () => {
      clearInterval(carouselInterval); // Clear the interval when the component is unmounted
    };
  }, []);



  return (
    <FeaturedProductsContainer>
      <div className="max-width">
        <div className="fgigs-section-heading">
          <h2>Featured <span>Products</span></h2>
          <img src="" alt="" />
        </div>
        <div className="carousel" ref={carouselRef}>
          {products.map((product) => (
            <div className="card" key={product._id}>
              <div className="box">
                <img src={product.img} alt={product.title} />
                <div className="text">{product.name}</div>
                <p>{product.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FeaturedProductsContainer>
  );
};


export default FeaturedProducts;