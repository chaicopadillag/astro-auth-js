import type { ProductType } from '@/interfaces/products';
import React from 'react';
import { ProductCard } from './ProductCard';

type Props = {
  products: ProductType[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className='py-12 px-4 sm:px-6 lg:px-8'>
      <h1 className='text-3xl font-bold text-gray-900 mb-8 text-center'>Featured Products</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};
