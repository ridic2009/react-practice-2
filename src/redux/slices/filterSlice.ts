import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { SortItem } from '../../components/Sort'

export interface IFilterSlice {
    categoryId: number,
    currentPage: number,
    sort: SortItem
}

const initialState: IFilterSlice = {
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortMethod: 'rating'
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        onChangeSort(state, action: PayloadAction<SortItem>) {
            state.sort = action.payload
        },

        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },

        setFilters(state, action: PayloadAction<IFilterSlice>) {
            state.sort = action.payload.sort
            state.categoryId = Number(action.payload.categoryId)
            state.currentPage = Number(action.payload.currentPage)
        }
    },
})


export const filterSelector = (state: RootState) => state.filter

export const { setCategoryId, onChangeSort, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer