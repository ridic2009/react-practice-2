import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store';

type TFetchPizza = {
    search: string,
    category: string,
    currentPage: string,
    sort: { sortMethod: string }
  }

export const fetchPizza = createAsyncThunk(
    'pizza/fetchPizza',
    async ({search, category, currentPage, sort}: TFetchPizza) => {
        const response = await fetch(`https://64e4d6a0c55563802913d5cf.mockapi.io/pizza?${search}page=${currentPage}&limit=4&sortBy=${sort.sortMethod}${category}&order=desc`)
        const data = await response.json();
        return data
    }
)

type TPizzaItem = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    sizes: number[],
    types: number[]
}


interface IPizzaSlice {
    items: TPizzaItem[],
    status: string
}


const initialState: IPizzaSlice = {
    items: [],
    status: 'loading'
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        }
    },

    extraReducers: {
        [fetchPizza.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizza.pending]: (state) => {
            state.status = 'pending'
            state.items = []
        },
        [fetchPizza.rejected]: (state, action) => {
            state.status = 'error cy4ka'
            state.items = []
        }
    }
})

export const pizzaSelector = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer