import {
    Action,
    combineReducers,
    configureStore,
    ThunkAction,
} from '@reduxjs/toolkit';
import {createTransform, persistReducer} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

import authSlice from "./slices/auth-slice/authSlice";
import categorySlice from "./slices/category-slice/categorySlice";
import commonSlice from "./slices/common/commonSlice";
import taskSlice from "./slices/task-slice/taskSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    common: commonSlice,
    category: categorySlice,
    task: taskSlice
});
const transformCircular = createTransform(
    (inboundState, key) => JSON.stringify(inboundState),
    (outboundState, key) => JSON.parse(outboundState)
)


const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: {warnAfter: 300},
        serializableCheck: false,
    }),
    devTools: process.env.NODE_ENV !== 'production',

});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
