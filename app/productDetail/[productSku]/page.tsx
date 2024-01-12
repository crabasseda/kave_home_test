'use client'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../productDetail.module.css'
import fetchData from '@/utils/api';

interface Product {
  productCollection: string;
  productCategoryHierarchy: string;
  productSku: string;
  productName: string;
  productImageUrl: string;
  productPrice: string;
}  

const productSkuPage: React.FC = () => {

  const pathname = usePathname();
  const productSku  = pathname.split('/').pop();

 
  //configurar favoritos per la details page!!!!!!!!!!!!!!!!!!!
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  
  const [products, setProducts] = useState<Product[]>([]);

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

  //Mostrar solo un producto
  const selectedProduct = products.filter((product) => product.productSku == productSku);
  const product = selectedProduct[0];

  if(selectedProduct.length==1){
    return (
      <>  
      <div className={styles.container}>
        <div className={styles.containerImage}>
          <img src={product.productImageUrl} alt={product.productName}/>
        </div>   
        <div className={styles.containerInfo}>
          <h1>{product.productCollection}</h1>
          <p className={styles.categoryHierarchy}>{product.productCategoryHierarchy}</p>
          <p className={styles.price}>{product.productPrice}</p>
          <p className={styles.name}>{product.productName}</p>
        </div>
      </div>
      </>
    );
  }
};

export default productSkuPage;