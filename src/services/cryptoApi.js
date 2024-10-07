import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_CRYPTO_API_URL,
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-host', process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST);
      headers.set('x-rapidapi-key', process.env.REACT_APP_RAPIDAPI_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => `/coins?limit=${count}`,
    }),

    getCryptoDetails: builder.query({
      query: (coinId) => `/coin/${coinId}`,
    }),

    // Note: Change the coin price history endpoint from this - `coin/${coinId}/history/${timeperiod} to this - `coin/${coinId}/history?timeperiod=${timeperiod}`
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => `coin/${coinId}/history?timeperiod=${timeperiod}`,
    }),

    // Note: To access this endpoint you need premium plan
    getExchanges: builder.query({
      query: () => '/exchanges?',
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetExchangesQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
