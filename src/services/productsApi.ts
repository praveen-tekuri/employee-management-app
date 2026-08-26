import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductListApiResponse, ProductApiResponse } from "../features/shopping/types/shopping.types";

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://strapi-store-server.onrender.com/api/',
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<ProductListApiResponse, void>({
            query: () => 'products',
        }),
        getFeaturedProducts: builder.query<ProductListApiResponse, void>({
            query: () => 'products?featured=true'
        }),
        getProductById: builder.query<ProductApiResponse, string>({
            query: (id) => `products/${id}`
        })
    })
})

export const {useGetProductsQuery, useGetFeaturedProductsQuery, useGetProductByIdQuery} = productsApi;