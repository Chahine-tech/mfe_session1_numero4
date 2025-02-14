import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const ItemCardContainer = styled.div`
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);

    img {
      opacity: 0.8;
    }
  }

  img {
    width: 100%;
    height: 330px;
    object-fit: cover;
    transition: opacity 0.3s ease;
  }
`;

const ItemCard = ({ imageSrc, alt, onClick }) => {
  return (
    <ItemCardContainer onClick={onClick}>
      <img src={imageSrc} alt={alt} />
    </ItemCardContainer>
  );
};

ItemCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ItemCard;
