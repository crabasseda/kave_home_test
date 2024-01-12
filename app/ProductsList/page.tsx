'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './productsList.module.css';
import ProductCard from '../ProductCard/page';
import fetchData from '@/utils/api';


const itemsPerPage = 20;
const totalPages= 10;

interface Product {
  productSku: string;
  productName: string;
  productImageUrl: string;
  productPrice: string;
  isFavorite: boolean;
}

interface ProductsListPageProps {
  products: Product[];
  pageNumber: number;
  totalPages: number;
}

const ProductsListPage: React.FC<ProductsListPageProps> = () => {
  const pageNumber = 1;

  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
      // Recupera la lista de favoritos del localStorage al cargar la página
      const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(storedFavorites);
    }, []);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const start = (pageNumber - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      try {
        const data = await fetchData();
        const slicedProducts = data.slice(start, end);
        setProducts(slicedProducts);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchDataFromApi();
  }, [pageNumber]);

  
  return (
      <>
      <div className={styles.title}>
        <h1>Productos</h1>
        <p>Lore ipsum dolor sit amet</p>
      </div>
      <div className={styles.containerProducts}>
        {products.map((product) => (
          <ProductCard key={product.productSku} product={product} isFavorite={favorites.includes(product.productSku)}/>
        ))}
      </div>
      
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Link key={index} href={`/productsList?page=${index + 1}`}>
            <p className={pageNumber === index + 1 ? styles.currentPage : ''}>
              {index + 1}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
};
  
export default ProductsListPage;