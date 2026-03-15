import type { BloodAnalysisResponse } from '@/types/Analysis'
import { createSlice } from '@reduxjs/toolkit'
import { bloodAnalysisActions } from './actions'

interface AnalysisState {
	loading: boolean
	error: string | null
	results: BloodAnalysisResponse[]
}

const initialState: AnalysisState = {
	loading: false,
	error: null,
	results: [],
}

const analysisSlice = createSlice({
	name: 'analysis',
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder

			// pending
			.addCase(bloodAnalysisActions.pending, (state) => {
				state.loading = true
				state.error = null
			})

			// success
			.addCase(bloodAnalysisActions.fulfilled, (state, action) => {
				state.loading = false
				state.results = [action.payload]

				// LOCAL STORAGE Logic
				const existing = localStorage.getItem('bloodTestResults')
				const history = existing ? JSON.parse(existing) : []
				localStorage.setItem(
					'bloodTestResults',
					JSON.stringify([action.payload, ...history]),
				)
			})

			// error
			.addCase(bloodAnalysisActions.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
	},
})

const analysisReducer = analysisSlice.reducer
export default analysisReducer
