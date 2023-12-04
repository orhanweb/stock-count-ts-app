import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from '../Models/apiTypes'; // Product interface'ini import ediyoruz

const BASE_URL = "https://services.ephesus.marketing/depo";

export const productsInfosAPI = createApi({
  reducerPath: "productsInfosAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    
    getBarcodes: builder.query<Product[], { barcode: string }>({
      query: (arg) => {
        const formData = new FormData();
        formData.append("barcode", arg.barcode);
        return {
          url: "/urunler",
          method: "POST",
          body: formData,
        };
      },
    }),

    getProductNames: builder.query<Product[], { productName: string }>({
      query: (arg) => {
        const formData = new FormData();
        formData.append("code", arg.productName);
        return {
          url: "/urunler",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useGetBarcodesQuery,
  useGetProductNamesQuery,
} = productsInfosAPI;
