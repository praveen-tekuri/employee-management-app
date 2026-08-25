
export interface ProductTypeAttributes{
    title: string;
    price: number;
    image: string;
    company:string;
    category: string;
    shipping:boolean;
}

export interface ProductTypes{
    id: number;
    attributes: ProductTypeAttributes;
}

export interface ProductApiResponse{
    data: ProductTypes[];
}