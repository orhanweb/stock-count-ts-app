// countFormAPI.ts

// RTK Query'in temel modüllerini içe aktarıyoruz.
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  StructureToCount,
  CountVariant,
  CountType,
  CountArea,
  CountFormData,
  CountList,
} from "../Models/apiTypes";

const BASE_URL = "https://services.ephesus.marketing/depo";

export const countFormAPI = createApi({
  reducerPath: "countFormAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Variants", "CountType", "Areas", "CountList"], // Tag türlerini tanımla
  endpoints: (builder) => ({
    // --- To get all counts
    getCountList: builder.query<CountList[], void>({
      query: () => `/countList`,
      providesTags: ["CountList"],
    }),

    // --- To get structures (warehouses markets and more)
    getStructuresToCount: builder.query<StructureToCount[], void>({
      query: () => `/depolar`,
    }),

    // --- To get count variants
    getCountVariants: builder.query<CountVariant[], void>({
      query: () => `/sayimTuru`,
      providesTags: ["Variants"],
    }),

    // --- To get count types
    getCountType: builder.query<CountType[], { variant: number }>({
      query: ({ variant }) => `/sayimTipi?id=${variant}`,
      providesTags: ["CountType"],
    }),

    // --- To get count areas
    getCountArea: builder.query<CountArea[], void>({
      query: () => `/sayimAlani`,
      providesTags: ["Areas"],
    }),

    // --- To start a count
    startCount: builder.mutation<void, { countId: number; status: string }>({
      query: ({ countId, status }) => ({
        url: `/count_status?countId=${countId}&status=${status}`,
        method: "POST", // PUT veya PATCH
      }),
      invalidatesTags: ["CountList"],
    }),

    // --- To end a count
    endCount: builder.mutation<void, { countId: number; status: string }>({
      query: ({ countId, status }) => ({
        url: `/count_status?countId=${countId}&status=${status}`,
        method: "POST", // PUT veya PATCH
      }),
      invalidatesTags: ["CountList"],
    }),

    // --- To "delete" (lock) a count
    lockCount: builder.mutation<void, { countId: number }>({
      query: ({ countId }) => ({
        url: `/count_delete?countId=${countId}`, // Bu sayımı "silme" (kilitlenme) işlemi için kullanılacak. URl i değiştir sonra
        method: "POST", // PUT veya PATCH
      }),
      invalidatesTags: ["CountList"],
    }),

    // --- To update count dates
    updateCountDates: builder.mutation<
      void,
      { countId: number; startDate?: string; endDate?: string }
    >({
      query: ({ countId, startDate, endDate }) => ({
        url: `/count_date?countId=${countId}`,
        method: "POST",
        body: JSON.stringify({
          ...(startDate ? { baslangic: startDate } : {}), // Eğer başlangıç tarihi varsa gönder
          ...(endDate ? { bitis: endDate } : {}), // Eğer bitiş tarihi varsa gönder
        }),
      }),
      invalidatesTags: ["CountList"],
    }),

    // --- To add a new count
    addCountForm: builder.mutation<void, CountFormData>({
      query: (formData) => ({
        url: "/save",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Variants", "CountType", "Areas", "CountList"],
    }),
  }),
});

export const {
  useGetCountListQuery,
  useGetStructuresToCountQuery,
  useGetCountVariantsQuery,
  useGetCountTypeQuery,
  useGetCountAreaQuery,
  useAddCountFormMutation,
  useStartCountMutation,
  useEndCountMutation,
  useLockCountMutation,
  useUpdateCountDatesMutation,
} = countFormAPI;
