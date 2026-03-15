import { createAsyncThunk } from "@reduxjs/toolkit"
import type { BloodAnalysisPayload, BloodAnalysisResponse } from "@/types/Analysis"
import axios from "axios"

export const bloodAnalysisActions = createAsyncThunk<
  BloodAnalysisResponse,
  BloodAnalysisPayload
>(
  "bloodAnalysis/fetch",
  async (payload, thunkApi) => {
    try {
    const res = await axios.post<BloodAnalysisResponse>("http://localhost:5000/api/checkBloodTest", payload)
    return res.data
    } catch (error) {
      return thunkApi.rejectWithValue("Blood analysis failed")
    }
  }
)