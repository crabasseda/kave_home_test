import { FaRegHeart, FaHeart } from 'react-icons/fa';
import styles from './productCard.module.css';
import React, { useState } from 'react';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
}

interface Product {
  productSku: string;
  productName: string;
  productImageUrl: string;
  productPrice: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isFavorite }) => {
  const [localIsFavorite, setIsFavorite] = useState<boolean>(isFavorite);

  const handleToggleFavorite = () => {
    setIsFavorite((prevFavorite) => !prevFavorite);

    // Guardar la información en el localStorage
    if (!localIsFavorite) {
      // Si no es favorito, agrega el producto al localStorage
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      localStorage.setItem('favorites', JSON.stringify([...favorites, product.productSku]));
    } else {
      // Si ya es favorito, retira el producto del localStorage
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const updatedFavorites = favorites.filter((sku: string) => sku !== product.productSku);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };
  return (
    <div className={styles.productCard}>
      <img src={product.productImageUrl} alt={product.productName} style={{width:'300px', height:'250px'}}/>
      <button onClick={handleToggleFavorite}>
        {localIsFavorite ? <FaHeart size={20} color="red"/> : <FaRegHeart size={20} color="black"/> }
      </button>
      <Link key={product.productSku} href={`/productDetail/${product.productSku}`}>
        <h3><strong>{product.productName}</strong> </h3>
      </Link>
      <p>${product.productPrice}</p> 
    </div>
  );
};

export default ProductCard;
