'use client'
import React, { useEffect, useState } from 'react';
import styles from './productsList.module.css';
import ProductCard from '../ProductCard/page';
import fetchData from '@/utils/api';
import { useSearchParams  } from 'next/navigation';
import Link from 'next/link';

const itemsPerPage = 20;
const pageNumbersToShow = 8;

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

  const searchParams = useSearchParams();
  const pageNumber = Number(searchParams.get('page'))
  const [favorites, setFavorites] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
      // Recupera la lista de favoritos del localStorage al cargar la página
      const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(storedFavorites);
    }, []);

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

  
  const start = (pageNumber - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const slicedProducts = products.slice(start, end);
  const totalPages = products.length/itemsPerPage;

  const nextMultipleOfX = (x:number, num:number) =>{
    let i = num;
    while(i%x!=0){
      i++;
    }
    return i;
  }
  const lastNumberPage = nextMultipleOfX(pageNumbersToShow,pageNumber)
  const firstNumberPage = lastNumberPage - pageNumbersToShow +1;
  const arrayNumbersPage = [];
  for (let i = firstNumberPage; i <= lastNumberPage; i++) {
    if (i<=totalPages){ arrayNumbersPage.push(i);}
  }

  return (
      <>
      <div className={styles.title}>
        <h1>Productos</h1>
        <p>Lore ipsum dolor sit amet</p>
      </div>
      <div className={styles.containerProducts}>
        {slicedProducts.map((product) => (
          <ProductCard key={product.productSku} product={product} isFavorite={favorites.includes(product.productSku)}/>
        ))}
      </div>
      
      <div className={styles.pagination}>
        {firstNumberPage > 1 &&  <Link href={`/ProductsList?page=${firstNumberPage-1}`}>
          {'<'}
        </Link> }
        {arrayNumbersPage.map((numPage) => (
          <Link key={numPage} href={`/ProductsList?page=${numPage}`}>
            <p className={pageNumber === numPage? styles.currentPage : ''}>
            {numPage}
            </p>
          </Link>
          )
        )}
        {lastNumberPage < totalPages && <Link href={`/ProductsList?page=${lastNumberPage+1}`}>
          {'>'}
        </Link> }
      </div>
    </>
  );
};
  
export default ProductsListPage;