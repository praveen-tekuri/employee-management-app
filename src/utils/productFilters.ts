import type { FormFieldTypes } from "../features/shopping/pages/Products";
import type { ProductApiResponse, ProductTypes } from "../features/shopping/types/shopping.types";

const productFilters = (products:ProductApiResponse | null, formData:FormFieldTypes):ProductTypes[] => {
    const results = [...(products?.data || [])].filter((product) => {
            const searchTitle = product.attributes.title.toLowerCase().includes(formData.search.toLowerCase());
            const category = formData.category === "all" || product.attributes.category === formData.category;
            const company = formData.company === "all" || product.attributes.company === formData.company;
            const price = formData.price === 0 || product.attributes.price <= Number(formData.price);
            const shipping = !formData.shipping || product.attributes.shipping === true;
    
            return searchTitle && category && company && price && shipping;
    })
    
    if(formData.sortBy === "a-z"){
        results.sort((a, b) => a.attributes.title.localeCompare(b.attributes.title));
    }else if(formData.sortBy === "z-a"){
        results.sort((a, b) => b.attributes.title.localeCompare(a.attributes.title));
    }else if(formData.sortBy === "low"){
        results.sort((a, b) => a.attributes.price - b.attributes.price);
    }else if(formData.sortBy === "high"){
        results.sort((a, b) => b.attributes.price - a.attributes.price);
    }

    return results;
}

export default productFilters;