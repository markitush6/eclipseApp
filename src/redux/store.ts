import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiAuth } from "./service/apiAuth";
import { apiMole } from "./service/apiMole";

export const store = configureStore({
  reducer: {
    // Agrega el reducer de la API
    [apiMole.reducerPath]: apiMole.reducer,
    [apiAuth.reducerPath]: apiAuth.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMole.middleware, apiAuth.middleware),
});

// Opcional: configuración de listeners para refetch automático
setupListeners(store.dispatch);

// Tipos para TypeScript (opcional)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
