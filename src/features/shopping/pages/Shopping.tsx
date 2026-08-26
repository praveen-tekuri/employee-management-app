import { useEffect, useState } from "react";
import Product from "../../../components/shared/Product";
import { Link } from "react-router-dom";
import heroImage1 from "../../../assets/hero-image-1.webp";
import heroImage2 from "../../../assets/hero-image-2.webp";
import heroImage3 from "../../../assets/hero-image-3.webp";
import { useGetFeaturedProductsQuery } from "../../../services/productsApi";
import getErrorMessage from "../../../utils/getErrorMessage";

const shoppingSliderImages = [heroImage1, heroImage2, heroImage3];

const Shopping = () => {
  const[currentIndex, setCurrentIndex] = useState(0);

  const {data: featuredProducts, isLoading, error} = useGetFeaturedProductsQuery();
  
  useEffect(() => {
     const timer = setInterval(() => {
         setCurrentIndex((prevIndex) => (prevIndex + 1) % shoppingSliderImages.length);
     },5000)

     return () => clearInterval(timer);
  },[])

  return (
    <div className="md:w-[80%] md:mx-auto">
        <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="content">
                <h3 className="text-5xl">Shop products at affordable prices! </h3>
                <p className="text-xl mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ducimus maiores, expedita quaerat sunt ipsa enim vero. 
                    Temporibus eveniet culpa voluptate hic ratione quam nostrum sed illo officiis ab. Voluptates. Temporibus eveniet culpa voluptate hic ratione quam nostrum sed illo officiis ab. Voluptates.
                </p>
                <Link to="/products" className="bg-slate-300 font-semibold mt-5 rounded cursor-pointer p-4 inline-block">Our Products</Link>
            </div>
            <div className="slides">
                <img src={shoppingSliderImages[currentIndex]} className="w-full h-80 rounded"  alt={`hero-image-${currentIndex}`} />
            </div>
        </div>
        
        <div className="featured-products mt-10">
            <h3 className="text-2xl font-semibold border-b pb-5">Featured Products</h3>
            {isLoading && <p className="mt-5">Loading...</p>}
            {error && <p className="mt-5 text-red-500">{getErrorMessage(error)}</p>}
            <div className="mt-7 grid md:grid-cols-4 gap-6">
                {featuredProducts && featuredProducts.data.map((product) => <Product key={product.id} {...product}/>)}
            </div>
        </div>
    </div>
  )
}

export default Shopping