import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: [],
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductDetials : (state, action) => {
           state.product = action.payload
           console.log(action.payload, 'product payload')
        }
    }
})

export const {setProductDetials} = productSlice.actions;

export default productSlice.reducer;