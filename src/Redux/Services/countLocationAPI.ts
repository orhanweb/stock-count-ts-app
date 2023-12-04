import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Market, Corridor, SectionAndLevel } from '../Models/apiTypes';

const BASE_URL = "https://services.ephesus.marketing/depo";


// API tanımı
export const countLocationAPI = createApi({
  reducerPath: "countLocationAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMarkets: builder.query<Market[], void>({
      query: () => `/magazalar`,
    }),
    getCorridors: builder.query<Corridor[], { marketId: number }>({
      query: (args) => {
        const formData = new FormData();
        formData.append('areaid', args.marketId.toString());
        return {
          url: '/alanlar',
          method: 'POST',
          body: formData,
        };
      },
    }),
    getSectionAndLevel: builder.query<SectionAndLevel[], { zoneId: number }>({
      query: (args) => {
        const formData = new FormData();
        formData.append('zonesid', args.zoneId.toString());
        return {
          url: '/bolgeler',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useGetMarketsQuery,
  useGetCorridorsQuery,
  useGetSectionAndLevelQuery,
} = countLocationAPI;