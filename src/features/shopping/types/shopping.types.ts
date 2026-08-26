
export interface ProductTypeAttributes{
    title: string;
    price: number;
    image: string;
    company:string;
    category: string;
    shipping:boolean;
    description: string;
    colors: string[];
}

export interface ProductTypes{
    id: number;
    attributes: ProductTypeAttributes;
}

export interface ProductListApiResponse{
    data: ProductTypes[];
}

export interface ProductApiResponse{
    data: ProductTypes
}