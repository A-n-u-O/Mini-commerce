// components/CartItem.tsx
'use client'

import { CartItem as CartItemType } from '@/store/cart-store'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface CartItemProps {
  item: CartItemType
  onRemove: () => void
  onQuantityChange: (quantity: number) => void
}

export default function CartItem({ item, onRemove, onQuantityChange }: CartItemProps) {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <Link href={`/product/${item.slug}`} className="relative h-16 w-16 overflow-hidden rounded">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 640px"
        />
      </Link>
      
      <div className="flex-1">
        <Link href={`/product/${item.slug}`} className="font-medium hover:underline text-3xl">
          {item.name}
        </Link>
        <p className="text-2xl text-muted-foreground">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value)
            onQuantityChange(isNaN(value) ? 1 : value)
          }}
          className="w-16 text-center"
        />
      </div>
      
      <div className="w-20 text-2xl text-right font-medium">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      
      <Button
      asChild
        variant="ghost"
        size="icon"
        onClick={onRemove}
        aria-label="Remove item"
        className="text-destructive hover:text-destructive"
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  )
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
    </svg>
  )
}