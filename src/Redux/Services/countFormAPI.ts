// countFormAPI.ts

// RTK Query'in temel modüllerini içe aktarıyoruz.
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StructureToCount,  CountVariant, CountType, CountArea, CountFormData, CountList } from '../Models/apiTypes';

const BASE_URL = "https://services.ephesus.marketing/depo";

export const countFormAPI = createApi({
  reducerPath: 'countFormAPI',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL }), 
  tagTypes: ['Variants', 'CountType','Areas','CountList'], // Tag türlerini tanımla
  endpoints: (builder) => ({

    getCountList: builder.query<CountList[], void>({
      query: () => `/countList`,
      providesTags: ['CountList'],
    }),

    getStructuresToCount: builder.query<StructureToCount[], void>({
      query: () => `/depolar`,
    }),

    getCountVariants: builder.query<CountVariant[], void>({
      query: () => `/sayimTuru`,
      providesTags: ['Variants'], 
    }),

    getCountType: builder.query<CountType[], {variant:number}>({
      query: ({variant}) => `/sayimTipi?id=${variant}`,
      providesTags: ['CountType'], 
    }),

    getCountArea: builder.query<CountArea[], void>({
      query: () => `/sayimAlani`,
      providesTags: ['Areas'],
    }),

    addCountForm: builder.mutation<{}, CountFormData>({ 
      query: (formData) => ({
        url: '/save',
        method: 'POST',
        body: formData,
      }), 
      invalidatesTags: ['Variants', 'CountType', 'Areas','CountList'],
    }),
  }),
});

export const {useGetCountListQuery, useGetStructuresToCountQuery, useGetCountVariantsQuery, useGetCountTypeQuery, useGetCountAreaQuery, useAddCountFormMutation } = countFormAPI;