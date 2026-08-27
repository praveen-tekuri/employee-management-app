import type { CartItemTypes } from "../features/shopping/slices/cartSlice";
  
interface CartTotals{
    subTotal: number;
    taxAmount: number;
    shippingAmount: number;
    orderTotal: number;
}

const cartTotals = (cartItems:CartItemTypes[]):CartTotals => {
  const taxRate = 0.18; // 18%
  const shippingRate = 0.02; // 2%
  const totals = cartItems.reduce((acc, product) => {
      acc.subTotal += product.attributes.price * product.quantity;
      return acc;
  },{
      subTotal: 0,
      taxAmount: 0,
      shippingAmount: 0,
      orderTotal: 0
  })

  totals.taxAmount = totals.subTotal * taxRate;
  totals.shippingAmount = totals.subTotal * shippingRate;
  totals.orderTotal = totals.subTotal + totals.taxAmount + totals.shippingAmount;

  return totals;
}

export default cartTotals;