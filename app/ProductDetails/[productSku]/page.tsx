'use client'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../productDetails.module.css'
import fetchData from '@/utils/api';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

interface Product {
  productCollection: string;
  productCategoryHierarchy: string;
  productSku: string;
  productName: string;
  productImageUrl: string;
  productPrice: string;
}

const productSkuPage: React.FC = () =>{
  
  const pathname = usePathname();
  const productSku = pathname.split('/').pop();

  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [localIsFavorite, setIsFavorite] = useState<boolean>();

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
  },[]);

  //Obtener el producto seleccionado
  const selectedProduct = products.filter((product) => product.productSku == productSku);
  const product = selectedProduct[0];

  // Obtener si el producto es favorito
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
    if(product != undefined){
      setIsFavorite(favorites.includes(product.productSku));
    }
  }, [product]);
 

  const handleToggleFavorite = () => {
    setIsFavorite((prevFavorite) => !prevFavorite);
    if (!localIsFavorite) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      localStorage.setItem('favorites', JSON.stringify([...favorites, product.productSku]));
    } else {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const updatedFavorites = favorites.filter((sku: string) => sku !== product.productSku);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  if(selectedProduct.length==1 && product && localIsFavorite != undefined){
    return(
      <>  
      <div className={styles.container}>
        <div className={styles.containerImage}>
          <img src={product.productImageUrl} alt={product.productName}/>
          <button onClick={handleToggleFavorite}>
            {localIsFavorite ? <FaHeart size={20} color="red"/> : <FaRegHeart size={20} color="black"/> }
          </button>
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