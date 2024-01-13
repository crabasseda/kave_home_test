'use client'
import Image from 'next/image'
import styles from './home.module.css'
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard/page';
import Link from 'next/link';
import fetchData from '../utils/api';

interface Product {
  productSku: string;
  productName: string;
  productImageUrl: string;
  productPrice: string;
}  

export default function Home() {

  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const data = await fetchData();
        const products = data.slice(0, 20);
        setProducts(products);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchDataFromApi();
  }, []);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  return (
    <> 
    <div className={styles.containerImage}>
      <Image 
        src='/image_home_pc.jpg.avif' 
        alt='Image' 
        layout="fill"
        objectFit="cover" 
        className='hidden md:block'
      />
      <Image 
        src='/image_home_phone.avif' 
        alt='Image'
        layout="fill"
        objectFit="cover" 
        className='block md:hidden'
      />
      <p>
        Cuando la realidad supera la ficción.
        Trucos para estar en casa. 
      </p>
    </div>
    
    <article className={styles.containerLinks}>
    <h1 className={styles.title}>Inspírate</h1>
      <ul>
        <li><a href="#">Estancias</a></li>
        <li><a href="#">Estil</a></li>
        <li><a href="#">Muebles</a></li>
        <li><a href="#">Decoración</a></li>
        <li><a href="#">We are Kave</a></li>
        <li><a href="#">Proyectos</a></li>
      </ul>
    </article>

    <article className={styles.containerLinksImage}>
      <ul>
        <li>
          <Image src='/image_home_pc.jpg.avif' alt='Image' width={250} height={500}/>
          <a href="#">We are Kave</a>
        </li>
        <li>
          <Image src='/image_home_pc.jpg.avif' alt='Image' width={250} height={500}/>
          <a href="#">Estancias</a></li>
        <li>
          <Image src='/image_home_pc.jpg.avif' alt='Image' width={250} height={500}/>
          <a href="#">Muebles</a></li>
        <li>
          <Image src='/image_home_pc.jpg.avif' alt='Image' width={250} height={500}/>
          <a href="#">Decoración</a></li>
        <li>
          <Image src='/image_home_pc.jpg.avif' alt='Image' width={250} height={500}/>
          <a href="#">Proyectos</a></li>
        <li>
          <Image src='/image_home_pc.jpg.avif' alt='Image' width={250} height={500}/>
          <a href="#">Estilos</a></li>
      </ul>
    </article>

    <div className={styles.containerProducts}>
      {products.map((product) => (
          <ProductCard key={product.productSku} product={product} isFavorite={favorites.includes(product.productSku)}/>
        ))}
    </div>

    <div className={styles.buttonProducts}>
      <Link href="/ProductsList?page=1">
        <button>Ver todos los productos</button>
      </Link>
    </div>
    </>
    )
  }
