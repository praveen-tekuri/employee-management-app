import { useState } from 'react'
import { useParams } from 'react-router-dom'
import type { ProductTypes } from '../../features/shopping/types/shopping.types';
import formatCurrency from '../../utils/currencyFormatter';
import { useGetProductByIdQuery } from '../../services/productsApi';
import getErrorMessage from '../../utils/getErrorMessage';

interface ProductDetailsTypes extends ProductTypes{
    quantity: number;
    color: string;
}

export const ProductDetails = () => {
    const [cartItems, setCartItems] = useState<ProductDetailsTypes[]>([]);
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const {id} = useParams<{id: string}>();
   
    const {isLoading, data:product, error} = useGetProductByIdQuery(id!, {skip: !id});

    console.log(product);
    
    const handleAddToCartItem = (product:ProductTypes) => {
        setCartItems((prev) => {
            const isProductExist = prev.find((item) => item.id === product.id);
            if(!isProductExist){
                return [...prev, {...product, quantity, color}]
            }
            return prev.map((el) => el.id === product.id ? {...el, color, quantity: el.quantity + 1}: el);
        });
    }
    console.log(cartItems);


   if(isLoading) return <h3>Loading...</h3>
   if(error) return <p>{getErrorMessage(error)}</p>
    
   return (
    <div className='grid md:grid-cols-2 gap-10'>
        {product && (
        <>
            <img src={product.data.attributes.image} className='w-full h-[400px] rounded' alt={product.data.attributes.title} />
            <div className="product-details">
                <h3 className='text-2xl'>{product.data.attributes.title}</h3>
                <p className='mt-3'>{product.data.attributes.company}</p>
                <p className='mt-3'>{formatCurrency(Number(product.data.attributes.price))}</p>
                <p className='mt-3'>{product.data.attributes.description}</p>
                <div className="colors mt-3">
                    <p className='font-semibold'>Colors</p>
                    {product.data.attributes.colors.map((color) => <button onClick={() => setColor(color)} key={color} style={{backgroundColor: color}} className="cursor-pointer border w-7 h-7 mr-3 mt-3"></button>)}
                </div>
                <div className="quantity mt-5">
                    <p className='mb-3 font-semibold'>Quantity</p>
                    <button onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))} className='border cursor-pointer rounded px-4 py-2'>-</button>
                    <span className='mx-4'>{quantity}</span>
                    <button onClick={() => setQuantity((prev) => prev + 1)} className='border cursor-pointer rounded px-4 py-2'>+</button>
                </div>
                <button onClick={() => handleAddToCartItem(product.data)} className='mt-3 border rounded py-2 px-5 cursor-pointer'>Add to Cart</button>
            </div>
        </>
        )}
    </div>  
  )
}
