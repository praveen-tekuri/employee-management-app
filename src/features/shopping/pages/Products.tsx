
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import useFetch from '../../../hooks/useFetch'
import type { ProductApiResponse, ProductTypes } from '../types/shopping.types';
import Product from '../../../components/shared/Product';
import productFilters from '../../../utils/productFilters';

export interface FormFieldTypes{
    search: string;
    category: string;
    company: string;
    sortBy: string;
    price: number;
    shipping: boolean
}

const formFields:FormFieldTypes = { search: "", category: "all", company: "all", sortBy: "a-z", price: 0, shipping: false}

const Products = () => {
  const {loading, data:products, error, fetchData} = useFetch<ProductApiResponse>();
  const [formData, setFormData] = useState(formFields);
  const [filteredProducts, setFilteredProducts] = useState<ProductTypes[]>([]);

  useEffect(() => {
     fetchData('https://strapi-store-server.onrender.com/api/products');
  },[fetchData])

  useEffect(() => {
    if(products?.data) setFilteredProducts(products.data);
  },[products])

  const categories = ["all","Beds","Sofas","Chairs","Tables","Kids"];
  const companies = ["all","Artifex","Luxora","Comfora","Modenza","Homestead"];

  const handleChange = (event:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    setFormData((prev) => ({...prev, [name]: value}));
  }

  const handleCheckBox = (event:ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = event.target;
    setFormData((prev) => ({
        ...prev, [name]:checked
    }))
  }

  const results = useMemo(() => productFilters(products, formData),[formData, products]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    console.log("form submitted");
    setFilteredProducts(results);
  }

  const handleClear = () => {
    setFormData(formFields);
    setFilteredProducts(products?.data || []);
  }

  if(loading) return <h3>Loading...</h3>
  if(error) return <h3 className='text-red-500'>{error}</h3>
  
  return (
    <div>
        <div className="filters">
            <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-6 border p-5 rounded">
                <div className="filter-control">
                    <label htmlFor="search">Search Product</label>
                    <input value={formData.search} onChange={handleChange} name='search' type="text" className='border rounded p-2 h-[38px] mt-3 w-full' />
                </div>
                <div className="filter-control">
                    <label htmlFor="category">Select Category</label>
                    <select value={formData.category} onChange={handleChange} name="category" className='border rounded p-2 mt-3 block w-full'>
                        {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                    </select>
                </div>
                <div className="filter-control">
                    <label htmlFor="company">Select Company</label>
                    <select value={formData.company} onChange={handleChange} name="company" className='border rounded p-2 mt-3 block w-full'>
                        {companies.map((company) => <option key={company} value={company}>{company}</option>)}
                    </select>
                </div>
                <div className="filter-control">
                    <label htmlFor="sortBy">Sort By</label>
                    <select value={formData.sortBy} onChange={handleChange} name="sortBy" className='border rounded p-2 mt-3 block w-full'>
                        <option value="a-z">a-z</option>
                        <option value="z-a">z-a</option>
                        <option value="low">low</option>
                        <option value="high">high</option>
                    </select>
                </div>
                <div className="filter-control">
                    <label htmlFor="price" className='flex justify-between'>
                        <span>Select price</span>
                        <span>{formData.price}</span>
                    </label>
                    <input value={formData.price} onChange={handleChange} type="range" name='price' id='price' min="0" max="100000" step="1000" className='w-full' />
                    <div className='flex justify-between'>
                        <span>0</span>
                        <span>Max:100000 </span>
                    </div>
                </div>
                <div className="filter-control">
                    <label htmlFor="shipping">Free Shipping</label>
                    <input checked={formData.shipping} onChange={handleCheckBox} name='shipping' type="checkbox" className='ml-2'/>
                </div>
                <button type='submit' className='border rounded  px-5 h-[38px] cursor-pointer'>Search</button>
                <button type="button" onClick={handleClear} className='border rounded h-[38px] text-center pt-1 cursor-pointer'>Reset</button>
            </form>
        </div>
        <div className="products">
            <h3 className='mt-5 border-b-2 pb-5'>{filteredProducts.length} Products</h3>
            <div className="grid grid-cols-4 gap-6 mt-5">
                {products && filteredProducts.map((product) => <Product key={product.id} {...product}/>)}
            </div>
        </div>
    </div>
  )
}

export default Products