"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCatalog } from "@/data/catalog";

const CART_STORAGE_KEY = "fishleads_cart_v1";

export type CartLine = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type CartItem = CartLine & {
  key: string;
  productName: string;
  variantLabel: string;
  unitPriceRon: number;
  lineTotalRon: number;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPriceRon: number;
  isHydrated: boolean;
  addItem: (input: { productId: string; variantId: string; quantity?: number }) => void;
  setQuantity: (input: { productId: string; variantId: string; quantity: number }) => void;
  removeItem: (input: { productId: string; variantId: string }) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function lineKey(productId: string, variantId: string) {
  return `${productId}::${variantId}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  const catalogIndex = useMemo(() => {
    const map = new Map<string, { name: string; variants: Map<string, { label: string; priceRon: number }> }>();
    getCatalog().forEach((product) => {
      map.set(product.id, {
        name: product.name,
        variants: new Map(product.variants.map((variant) => [variant.id, { label: variant.label, priceRon: variant.priceRon }])),
      });
    });
    return map;
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) {
        setIsHydrated(true);
        return;
      }
      const parsed = JSON.parse(raw) as CartLine[];
      if (!Array.isArray(parsed)) {
        setIsHydrated(true);
        return;
      }
      const safe = parsed
        .filter((line) => typeof line?.productId === "string" && typeof line?.variantId === "string")
        .map((line) => ({
          productId: line.productId,
          variantId: line.variantId,
          quantity: Math.max(1, Number(line.quantity) || 1),
        }));
      setLines(safe);
    } catch {
      setLines([]);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
  }, [isHydrated, lines]);

  const items = useMemo<CartItem[]>(() => {
    return lines
      .map((line) => {
        const product = catalogIndex.get(line.productId);
        const variant = product?.variants.get(line.variantId);
        if (!product || !variant) {
          return null;
        }
        return {
          ...line,
          key: lineKey(line.productId, line.variantId),
          productName: product.name,
          variantLabel: variant.label,
          unitPriceRon: variant.priceRon,
          lineTotalRon: variant.priceRon * line.quantity,
        };
      })
      .filter((item): item is CartItem => item !== null);
  }, [catalogIndex, lines]);

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const totalPriceRon = useMemo(() => items.reduce((sum, item) => sum + item.lineTotalRon, 0), [items]);

  const addItem: CartContextValue["addItem"] = ({ productId, variantId, quantity = 1 }) => {
    const safeQty = Math.max(1, quantity);
    setLines((prev) => {
      const idx = prev.findIndex((line) => line.productId === productId && line.variantId === variantId);
      if (idx === -1) {
        return [...prev, { productId, variantId, quantity: safeQty }];
      }
      return prev.map((line, lineIndex) =>
        lineIndex === idx ? { ...line, quantity: line.quantity + safeQty } : line,
      );
    });
  };

  const setQuantity: CartContextValue["setQuantity"] = ({ productId, variantId, quantity }) => {
    const safeQty = Math.max(1, quantity);
    setLines((prev) =>
      prev.map((line) =>
        line.productId === productId && line.variantId === variantId ? { ...line, quantity: safeQty } : line,
      ),
    );
  };

  const removeItem: CartContextValue["removeItem"] = ({ productId, variantId }) => {
    setLines((prev) => prev.filter((line) => !(line.productId === productId && line.variantId === variantId)));
  };

  const clearCart = () => {
    setLines([]);
  };

  const value: CartContextValue = {
    items,
    totalItems,
    totalPriceRon,
    isHydrated,
    addItem,
    setQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
