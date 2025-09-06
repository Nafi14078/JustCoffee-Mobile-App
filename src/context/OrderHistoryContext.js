import { createContext, useContext, useReducer } from 'react';

const OrderHistoryContext = createContext();

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      };
    case 'CLEAR_ORDERS':
      return {
        ...state,
        orders: []
      };
    default:
      return state;
  }
};

export const OrderHistoryProvider = ({ children }) => {
  const [orderState, dispatch] = useReducer(orderReducer, { orders: [] });

  const addOrder = (order) => {
    dispatch({ type: 'ADD_ORDER', payload: order });
  };

  const clearOrders = () => {
    dispatch({ type: 'CLEAR_ORDERS' });
  };

  const getOrders = () => {
    return orderState.orders;
  };

  return (
    <OrderHistoryContext.Provider value={{
      orders: orderState.orders,
      addOrder,
      clearOrders,
      getOrders
    }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};

export const useOrderHistory = () => {
  const context = useContext(OrderHistoryContext);
  if (!context) {
    throw new Error('useOrderHistory must be used within an OrderHistoryProvider');
  }
  return context;
};