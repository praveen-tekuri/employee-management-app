import { useState } from 'react'
import { useParams } from 'react-router-dom'
import formatCurrency from '../../utils/currencyFormatter';
import { useGetProductByIdQuery } from '../../services/productsApi';
import getErrorMessage from '../../utils/getErrorMessage';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { addToCart } from '../../features/shopping/slices/cartSlice';
import axios from 'axios';
import { useGlobalAuthContext } from '../../context/AuthContext';

export const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const {id} = useParams<{id: string}>();
    const dispatch = useDispatch<AppDispatch>();
    const {user} = useGlobalAuthContext();
   
    const {isLoading, data:product, error} = useGetProductByIdQuery(id!, {skip: !id});

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
                <button onClick={ async() => {
                    try {
                        const resp = await axios.post("http://localhost:3000/shopping/add-product", { 
                            employeeId: user?._id,
                            id: product.data.id,
                            attributes: product.data.attributes,
                            quantity,
                            color
                        })
                        console.log(resp.data.product);
                        dispatch(addToCart(resp.data.product));
                    } catch (error) {
                        console.error(error);
                        alert("Failed to save the data")
                    }
                }} className='mt-3 border rounded py-2 px-5 cursor-pointer'>Add to Cart</button>
            </div>
        </>
        )}
    </div>  
  )
}
