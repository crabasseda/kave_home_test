'use client'
import { useEffect, useState } from "react";
import styles from '../ProductsList/productsList.module.css';
import ProductCard from '../ProductCard/page';
import fetchData from "@/utils/api";

interface Product {
    productSku: string;
    productName: string;
    productImageUrl: string;
    productPrice: string;
  }  

export default function Page(){
    const [products, setProducts] = useState<Product[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
      // Recupera la lista de favoritos del localStorage al cargar la página
      const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(storedFavorites);
    }, []);

    // Obtener solo los productos que son favoritos
    const favoriteProducts = products.filter((product) => favorites.includes(product.productSku));

    useEffect(() => {
      const fetchDataFromApi = async () => {
        try {
          const data = await fetchData();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };
      fetchDataFromApi();
    }, []);

  return(
    <>
      <div className={styles.title}>
        <h1>Lista de Favoritos</h1>
        <p>Lore ipsum dolor sit amet</p>
      </div>
      <div className={styles.containerProducts}>
        {favoriteProducts.map((product) => (
          <ProductCard key={product.productSku} product={product} isFavorite={favorites.includes(product.productSku)}/>
        ))}
      </div> 
    </>
  )
}