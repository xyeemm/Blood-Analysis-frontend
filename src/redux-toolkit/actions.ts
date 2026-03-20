import { createAsyncThunk } from "@reduxjs/toolkit"
import type { BloodAnalysisPayload, BloodAnalysisResponse } from "@/types/Analysis"
import axiosInstance from "@/config/axios.config"

export const bloodAnalysisActions = createAsyncThunk<
  BloodAnalysisResponse,
  BloodAnalysisPayload
>(
  "bloodAnalysis/fetch",
  async (payload, thunkApi) => {
    try {
    const res = await axiosInstance.post<BloodAnalysisResponse>("/checkBloodTest", payload)
    return res.data
    } catch (error) {
      return thunkApi.rejectWithValue("Blood analysis failed")
    }
  }
)