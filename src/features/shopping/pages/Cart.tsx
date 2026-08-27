import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import formatCurrency from "../../../utils/currencyFormatter";
import { clearCart, deleteCartItem, updateCart } from "../slices/cartSlice";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export const Cart = () => {
  const {cartItems} = useSelector((state:RootState) => state.cart);

  const dispatch = useDispatch();
  return (
    <div>
        <h1 className="border-b pb-5">Shopping Cart</h1>
        {cartItems.length > 0 ? (
        <div className="cart-details flex gap-6">
            <section className="w-[70%] product-details">
                {cartItems.map((product) => (
                    <article key={product.id} className="grid md:grid-cols-5 gap-6 mt-5 pb-5 border-b border-b-slate-300">
                        <img src={product.attributes.image} alt={product.attributes.title} className="w-20 h-20 rounded" />
                        <div className="details">
                            <h3 className="font-semibold">{product.attributes.title}</h3>
                            <p className="mt-2">{product.attributes.company}</p>
                            <button style={{backgroundColor: product.color}} className="border w-6 h-6 rounded mt-2"></button>
                        </div>
                        <div className="quantity">
                            <h3 className="mb-2 font-semibold">Quantity</h3>
                            <button onClick={() => dispatch(updateCart({id: product.id, type: 'DEC'}))} className="border px-3 py-1 cursor-pointer rounded">-</button>
                            <span className="mx-2">{product.quantity}</span>
                            <button onClick={() => dispatch(updateCart({id: product.id, type: "INC"}))} className="border px-3 py-1 cursor-pointer rounded">+</button>
                        </div>
                        <div className="price">
                            <h3 className="font-semibold">Price: </h3>
                            <p className="mt-2">{formatCurrency(product.attributes.price * product.quantity)}</p>
                        </div>
                        <button onClick={() => dispatch(deleteCartItem(product.id))} className="cursor-pointer">
                            <MdDelete className="text-4xl"/>
                        </button>
                    </article>
                ))}
                <button onClick={() => dispatch(clearCart())} className="border rounded p-2 mt-3 mx-auto block cursor-pointer">Clear Cart</button>
            </section>
            <section className="w-[30%] product-totals">
                <h1>Totals</h1>
            </section>
        </div>
        ): <div className="text-center">
            <h3 className="font-semibold">No Products added yet</h3>
            <Link className="rounded p-2 border mt-5 inline-block" to="/products">Shop Now</Link>       
         </div>
        }
    </div>
  )
}

export default Cart;