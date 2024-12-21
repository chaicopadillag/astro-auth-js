import { CookieCart } from '@/libs/cookie-cart';
import { totalItemsInCart } from '@/store/cartStore';
import { useStore } from '@nanostores/react';
import { useEffect } from 'react';

export const CounterCart = () => {
  const itemsInCart = useStore(totalItemsInCart);

  useEffect(() => {
    totalItemsInCart.set(CookieCart.getCart().length);
  }, []);

  return (
    <a href='/cart' className='relative inline-block'>
      <span className='absolute -top-2 -right-2 flex justify-center items-center bg-blue-600 text-white text-xs rounded-full w-5 h-5'>
        {itemsInCart}
      </span>

      <svg xmlns='http://www.w3.org/2000/svg' width={32} height={32} viewBox='0 0 32 32'>
        <g fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}>
          <path d='M6 6h24l-3 13H9m18 4H10L5 2H2'></path>
          <circle cx={25} cy={27} r={2}></circle>
          <circle cx={12} cy={27} r={2}></circle>
        </g>
      </svg>
    </a>
  );
};
