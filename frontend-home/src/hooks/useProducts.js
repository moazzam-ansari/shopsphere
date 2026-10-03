import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export function useProducts({ category = 'ALL', search = '', sortBy = 'default' } = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    productService.getProducts({ category, search, sortBy })
      .then((data) => {
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [category, search, sortBy]);

  return { products, loading, error, refresh: () => productService.getProducts({ category, search, sortBy }).then(setProducts) };
}
