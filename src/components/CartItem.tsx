"use client";
import { CartItem as CartItemType } from '@/store/cart-store';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
}

export default function CartItem({ item, onRemove, onQuantityChange }: CartItemProps) {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      onQuantityChange(value);
    } else if (e.target.value === '') {
      onQuantityChange(1);
    }
  };

  const incrementQuantity = () => {
    onQuantityChange(item.quantity + 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.quantity - 1);
    }
  };

  return (
    <div className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                <Link href={`/product/${item.id}`} className="hover:text-blue-600 transition-colors">
                  {item.name}
                </Link>
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                ${item.price.toFixed(2)} each
              </p>
              
              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mb-3 sm:mb-0">
                <span className="text-sm font-medium text-gray-700">Qty:</span>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={decrementQuantity}
                    className="px-2 sm:px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-800 text-sm"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={handleQuantityChange}
                    className="w-12 sm:w-16 text-center border-0 focus:ring-0 focus:outline-none py-1 text-sm"
                    min="1"
                  />
                  <button
                    onClick={incrementQuantity}
                    className="px-2 sm:px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-800 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price and Remove */}
            <div className="flex flex-row sm:flex-col justify-between sm:items-end gap-2 sm:ml-4">
              <div className="text-left sm:text-right">
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                {item.quantity > 1 && (
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 self-start sm:self-end"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}