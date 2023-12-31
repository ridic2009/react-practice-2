import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = {
    searchValue: ''
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload
        }
    },
})


export const searchSelector = (state: RootState) => state.search

export const { setSearchValue } = searchSlice.actions

export default searchSlice.reducer