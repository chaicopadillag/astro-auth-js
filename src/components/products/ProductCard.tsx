import type { ProductType } from '@/interfaces/products';
import React, { useState } from 'react';

export const ProductCard: React.FC<ProductType> = ({ title, images, price, slug, stock }) => {
  const photos = images.split(',').map((image) => (image.startsWith('http') ? image : `${import.meta.env.PUBLIC_APP_URL}/images/products/${image}`));

  const [currentImage, setCurrentImage] = useState(photos[0]);

  return (
    <div className='bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1'>
      <div className='relative'>
        <a href={`/products/${slug}`} className='block'>
          <img
            src={currentImage}
            alt={title}
            onMouseEnter={() => setCurrentImage(photos[1] ?? photos[0])}
            onMouseLeave={() => setCurrentImage(photos[0])}
            className='w-full h-64 object-cover transition-transform duration-300 hover:scale-105'
          />
        </a>

        <div className='absolute top-4 left-4 flex gap-2'>
          {stock > 0 ? (
            <span className='bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold'>{stock} in stock</span>
          ) : (
            <span className='bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold'>Out of stock</span>
          )}
        </div>
      </div>

      <div className='p-5'>
        <div className='flex items-center gap-2 mb-2'>
          {/* <Tag size={16} className="text-gray-500" /> */}
          {/* <span className="text-sm text-gray-500">{category}</span> */}
        </div>

        <h3 className='text-lg font-semibold text-gray-800 mb-2'>{title}</h3>

        {/* <p className="text-gray-600 text-sm mb-4 line-clamp-2">{price}</p> */}

        <div className='flex items-center justify-between'>
          <span className='text-xl font-bold text-gray-900'>${price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
