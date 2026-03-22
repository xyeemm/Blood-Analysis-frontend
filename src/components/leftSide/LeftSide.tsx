import { bloodAnalysisActions } from '@/redux-toolkit/actions'
import { useAppDispatch } from '@/redux-toolkit/store'
import { motion } from 'framer-motion'
import { Plus, Trash2, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import ReportHistoryCard from '../reportHistory/ReportHistoryCard'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
interface Test {
	testName: string
	value: string
	unit: string
}

const COMMON_TESTS = [
	{ name: 'Hemoglobin', unit: 'g/dL' },
	{ name: 'White Blood Cells', unit: 'cells/mcL' },
	{ name: 'Red Blood Cells', unit: 'million cells/mcL' },
	{ name: 'Platelets', unit: 'cells/mcL' },
	{ name: 'Hematocrit', unit: '%' },
	{ name: 'Glucose', unit: 'mg/dL' },
	{ name: 'Cholesterol', unit: 'mg/dL' },

	{ name: 'Creatinine', unit: 'mg/dL' },
	{ name: 'Urea', unit: 'mg/dL' },
	{ name: 'Sodium', unit: 'mEq/L' },
	{ name: 'Potassium', unit: 'mEq/L' },
	{ name: 'Calcium', unit: 'mg/dL' },
	{ name: 'Hdl', unit: 'mg/dL' },
	{ name: 'Ldl', unit: 'mg/dL' },
	{ name: 'Triglycerides', unit: 'mg/dL' },
]

const LeftSide = () => {
	const dispatch = useAppDispatch()
	// const [historyOpen, setHistoryOpen] = useState(false)
	const [tests, setTests] = useState<Test[]>([
		{ testName: '', value: '', unit: '' },
	])
	const [loading, setLoading] = useState(false)
	// const [storedResults, setStoredResults] = useState<any[]>([])

	const updateTest = (index: number, field: keyof Test, value: string) => {
		const newTests = [...tests]
		newTests[index][field] = value
		setTests(newTests)
	}

	const addTest = () => {
		setTests([...tests, { testName: '', value: '', unit: '' }])
	}

	const removeTest = (index: number) => {
		setTests(tests.filter((_, i) => i !== index))
	}

	// 🔹 API Submit Handler
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const hasEmpty = tests.some((t) => !t.testName || !t.value)

		if (hasEmpty) {
			toast.error('Please fill in all test names and values before analyzing')
			return
		}

		setLoading(true)

		try {
			const payload = tests.map((t) => ({
				testName: t.testName,
				value: t.value,
				unit: t.unit,
			}))

			const result = await dispatch(bloodAnalysisActions(payload)).unwrap()
			console.log(result)
			toast.success('Report analyzed successfully!')
		} catch (err) {
			toast.error('Analysis failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			{/* Test_Input_Form Card*/}
			<Card className='p-3 shadow-md'>
				{/* onSubmit={} */}
				<form className='space-y-6' onSubmit={handleSubmit}>
					<div className='space-y-4'>
						{tests.map((test, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								className='grid grid-cols-6 md:grid-cols-12 gap-3 md:gap-4 p-4 rounded-lg border border-slate-200 dark:bg-gray-800 dark:border-gray-700  bg-gray-50 '
							>
								{/* Test Name */}
								<div className='col-span-6 md:col-span-5'>
									<Label className='text-sm text-slate-600 dark:text-gray-400 mb-1 block'>
										Test Name
									</Label>
									<Select
										value={test.testName}
										onValueChange={(value) => {
											const selectedTest = COMMON_TESTS.find(
												(t) => t.name === value,
											)
											updateTest(index, 'testName', value)
											if (selectedTest) {
												updateTest(index, 'unit', selectedTest.unit)
											}
										}}
									>
										<SelectTrigger className='w-full bg-white dark:bg-gray-900  border-slate-200 dark:border-gray-700 focus:border-emerald-500 rounded-lg'>
											<SelectValue placeholder='select test ...' />
										</SelectTrigger>
										<SelectContent>
											{COMMON_TESTS.map((t) => (
												<SelectItem key={t.name} value={t.name}>
													{t.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								{/* Value + unit + deleteIcon in a single div*/}
								{/* <div className='grid grid-cols-3 gap-2 md:contents'> */}
								{/* Value */}
								<div className='col-span-2 md:col-span-3'>
									<Label className='text-sm text-slate-600 dark:text-gray-400 mb-1 block'>
										Value
									</Label>
									<Input
										type='number'
										step='0.01'
										placeholder='0.0'
										value={test.value}
										onChange={(e) => updateTest(index, 'value', e.target.value)}
										className='w-full bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-700 focus:border-emerald-500 rounded-lg'
									/>
								</div>

								{/* Unit */}
								<div className='col-span-2 md:col-span-3'>
									<Label className='text-sm text-slate-600 dark:text-gray-400 mb-1 block'>
										Unit
									</Label>
									<Input
										placeholder='unit'
										disabled
										value={test.unit}
										className='w-full bg-gray-100 dark:bg-gray-700 border-slate-200 dark:border-gray-700 rounded-lg'
									/>
								</div>

								{/* Delete */}
								<div className='col-span-2 md:col-span-1 flex justify-end md:justify-center items-end'>
									{tests.length > 1 && (
										<Button
											type='button'
											variant='ghost'
											size='icon'
											onClick={() => removeTest(index)}
											className='text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
										>
											<Trash2 className='w-4 h-4' />
										</Button>
									)}
								</div>
								{/* </div> */}
							</motion.div>
						))}
					</div>

					<div className='flex gap-4'>
						<Button
							type='button'
							variant='outline'
							onClick={addTest}
							className='rounded-full border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/20'
							data-testid='add-test-button'
						>
							<Plus className='w-4 h-4 mr-2' />
							Add Another Test
						</Button>
					</div>

					<Button
						type='submit'
						disabled={loading}
						className='w-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg shadow-emerald-900/20 rounded-full px-8 py-3 font-medium transition-all hover:-translate-y-0.5'
						data-testid='analyze-button'
					>
						{loading ? (
							<span className='flex items-center gap-2'>
								<TrendingUp className='w-5 h-5 animate-pulse' />
								Analyzing...
							</span>
						) : (
							<span className='flex items-center gap-2'>
								<TrendingUp className='w-5 h-5' />
								Analyze Blood Report
							</span>
						)}
					</Button>
				</form>
			</Card>

			{/* Report History Card */}
			<div className=' hidden md:block'>
				<ReportHistoryCard />
			</div>
		</div>
	)
}

export default LeftSide
