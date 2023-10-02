import { createSlice } from '@reduxjs/toolkit';
import { request, setIsCartOpen } from './app.slice';
import axios from '../utils/axios';

export const cartSlice = createSlice({
    name: 'carts',
    initialState: [],
    reducers: {
        setCart: (_, {payload}) => payload,
        updateQuantity: (state, {payload: {quantity, index}}) => {
            state[index].quantity=quantity;
        },
        deleteProduct: (state, {payload: index}) => {
            state.splice(index, 1);
        },
        addProduct: (state, {payload}) => {
            state.push(payload);
        }
    }
})

export const getCart = () => (dispatch) => {
    if(!localStorage.getItem('token')) return;
    dispatch(request(async() => {
        const res = await axios().get('/carts');
        dispatch(setCart(res.data));
    }))
}

export const deleteProductCart = (id, index) => (dispatch) => {
    dispatch(request(async() => {
        await axios().delete(`/carts/${id}`);
        dispatch(deleteProduct(index));
    }))
}

export const addProductCart = (productCart) => dispatch => {
    dispatch(request(async() => {
        const res = await axios().post('/carts', productCart);
        const {data} = await axios().get(`/carts/${res.data.id}`);
        dispatch(addProduct(data));
        dispatch(setIsCartOpen(true));
    }, {
        notificationMessage: "Product added to cart!"
    }));
}

export const checkoutCart = () => dispatch => {
    dispatch(request(async() => {
        await axios().post('/purchases');
        dispatch(setCart([]));
        dispatch(getCart());
    }, {
        notificationMessage: "Cart was succesfully bought"
    }))
}

export const { setCart, updateQuantity, addProduct, deleteProduct } = cartSlice.actions;

export default cartSlice.reducer;
