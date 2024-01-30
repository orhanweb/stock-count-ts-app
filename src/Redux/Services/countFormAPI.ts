// countFormAPI.ts

// RTK Query'in temel modüllerini içe aktarıyoruz.
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CountFormData } from '../Models/apiTypes';

const BASE_URL = ''; 

export const countFormAPI = createApi({
  reducerPath: 'countFormAPI',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL }), 
  endpoints: (builder) => ({
    
    addCountForm: builder.mutation<{}, CountFormData>({ //success: boolean; message: string
        query: (formData) => ({
          url: '/counts',
          method: 'POST',
          body: formData,
        }), 
    }),
  }),
});

export const { useAddCountFormMutation } = countFormAPI;
