interface NormalRange {
  min: number
  max: number
}

export type TestStatus = 'normal' | 'low' | 'high'

export interface BloodTestResult {
  testName: string
  value: string
  unit: string
  isNormal: boolean
  status: TestStatus
  normalRange: NormalRange
  message: string
}

export interface BloodAnalysisResponse {
  success: boolean
  checkedAt: string
  data: BloodTestResult[]
}

export interface BloodTestPayloadItem {
  testName: string
  value: string
  unit: string
}

export type BloodAnalysisPayload = BloodTestPayloadItem[]