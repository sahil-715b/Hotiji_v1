import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { formatPrice } from '../../utils/pricing';

export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex gap-4 py-4 border-b border-[#D8D8D8] bg-white group">
      {/* Product Image */}
      <Link to={`/product/${item.id}`} className="shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-24 sm:w-24 sm:h-28 object-cover bg-neutral-100 border border-[#D8D8D8]"
        />
      </Link>

      {/* Details */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                {item.code}
              </span>
              <Link
                to={`/product/${item.id}`}
                className="text-xs sm:text-sm font-bold text-[#080808] hover:underline line-clamp-1"
              >
                {item.name}
              </Link>
            </div>
            <button
              onClick={() => onRemove(item.cartKey)}
              className="p-1 text-neutral-400 hover:text-red-600 transition-colors shrink-0"
              aria-label="Remove item"
              title="Remove from bag"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Selected attributes */}
          <div className="flex items-center gap-2 text-xs text-neutral-600 mt-1">
            {item.size && (
              <span>
                Size: <strong className="text-black">{item.size}</strong>
              </span>
            )}
            {item.size && item.color && <span>·</span>}
            {item.color && (
              <span>
                Color: <strong className="text-black">{item.color}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Quantity Controls & Subtotal */}
        <div className="flex items-center justify-between pt-2">
          {/* Stepper */}
          <div className="inline-flex items-center border border-[#D8D8D8]">
            <button
              onClick={() => onUpdateQuantity(item.cartKey, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center text-sm font-semibold hover:bg-neutral-100 text-neutral-700"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-8 text-center text-xs font-bold tabular-nums">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.cartKey, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center text-sm font-semibold hover:bg-neutral-100 text-neutral-700"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            <span className="text-xs sm:text-sm font-bold text-[#080808] tabular-nums block">
              {formatPrice(item.price * item.quantity)}
            </span>
            {item.quantity > 1 && (
              <span className="text-[10px] text-neutral-400 tabular-nums">
                ({formatPrice(item.price)} each)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
