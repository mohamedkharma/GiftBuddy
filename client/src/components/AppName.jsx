import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AppNameContainer = styled.div`
  /* Section */
  .hero {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 80px);
    text-align: center;
    color: #ffffff;
    padding: 0 20px;
    background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url("https://i.ibb.co/hK09KSg/unnamed.jpg") center;
    background-size: cover;
  }

  .hero h1 {
    font-size: 64px;
    font-weight: bold;
    margin-bottom: 20px;
    overflow: hidden;
    white-space: nowrap;
    animation: typing 3s steps(25) 1s infinite;
  }
  
  .hero h1 span {
    color: #f39c12;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  .hero p {
    font-size: 24px;
    margin-bottom: 40px;
  }

  .hero button {
    background-color: gold;
    border: none;
    color: #333333;
    font-size: 18px;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 4px;
    transition: background-color 0.2s ease-in-out;
  }

  .hero button:hover {
    background-color: #d4af37;
  }
`;

const AppName = () => {
  
    return (
      <AppNameContainer>
        <section id="home-section">
          <div className="hero">
            <h1><span>Gifts</span> for Everyone!</h1>
            <p>
              Find the perfect gift for your loved ones and bring joy to their
              lives with WishList.
            </p>
            <Link to="/products"><button className="cta">Shop Now</button></Link>
          </div>
        </section>
      </AppNameContainer>
    );
  };
  
  export default AppName;
  
  
  
  
  
  
  