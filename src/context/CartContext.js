import React, { createContext, useContext, useReducer } from 'react';

// Create context
const CartContext = createContext(undefined);

// Initial state
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
};

// Action types
const actionTypes = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
};

// Helper functions
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const calculateItemCount = (items) => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      const existingItem = state.items.find(item =>
        item.id === action.payload.id && item.type === action.payload.type
      );

      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id && item.type === action.payload.type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
          itemCount: calculateItemCount(updatedItems),
        };
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }];
        return {
          ...state,
          items: newItems,
          total: calculateTotal(newItems),
          itemCount: calculateItemCount(newItems),
        };
      }

    case actionTypes.REMOVE_ITEM:
      const filteredItems = state.items.filter(item =>
        !(item.id === action.payload.id && item.type === action.payload.type)
      );
      return {
        ...state,
        items: filteredItems,
        total: calculateTotal(filteredItems),
        itemCount: calculateItemCount(filteredItems),
      };

    case actionTypes.UPDATE_QUANTITY:
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id && item.type === action.payload.type
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);

      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: calculateItemCount(updatedItems),
      };

    case actionTypes.CLEAR_CART:
      return initialState;

    default:
      return state;
  }
};

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item, type = 'product') => {
    dispatch({
      type: actionTypes.ADD_ITEM,
      payload: { ...item, type }
    });
  };

  const removeItem = (id, type = 'product') => {
    dispatch({
      type: actionTypes.REMOVE_ITEM,
      payload: { id, type }
    });
  };

  const updateQuantity = (id, quantity, type = 'product') => {
    dispatch({
      type: actionTypes.UPDATE_QUANTITY,
      payload: { id, quantity, type }
    });
  };

  const clearCart = () => {
    dispatch({ type: actionTypes.CLEAR_CART });
  };

  const value = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
