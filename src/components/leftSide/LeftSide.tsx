import { bloodAnalysisActions } from '@/redux-toolkit/actions'
import { useAppDispatch } from '@/redux-toolkit/store'
import { motion } from 'framer-motion'
import { ChevronDown, Plus, Trash2, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
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
	const [historyOpen, setHistoryOpen] = useState(false)
	const [tests, setTests] = useState<Test[]>([
		{ testName: '', value: '', unit: '' },
	])
	const [loading, setLoading] = useState(false)
	const [storedResults, setStoredResults] = useState<any[]>([])

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
	// Load history from localStorage on mount
	useEffect(() => {
		const stored = localStorage.getItem('bloodTestResults')
		setStoredResults(stored ? JSON.parse(stored) : [])
	}, [])

	// Handler to clear history
	const clearHistory = (e: React.MouseEvent) => {
		e.stopPropagation()
		localStorage.removeItem('bloodTestResults')
		setStoredResults([])
		toast.success('History cleared successfully!')
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
			<Card className='p-6 mt-8 shadow-md'>
				<div
					className='mb-4 flex justify-between items-center cursor-pointer'
					onClick={() => setHistoryOpen(!historyOpen)}
				>
					<div>
						<h3 className='text-lg font-semibold text-slate-800 dark:text-gray-100'>
							Report History
						</h3>
						<p className='text-sm text-slate-500 dark:text-gray-400'>
							View your past blood report analysis
						</p>
					</div>
					<ChevronDown
						className={`w-5 h-5 text-slate-500 transition-transform ${historyOpen ? 'rotate-180' : ''}`}
					/>
				</div>

				{historyOpen && (
					<div className='space-y-3'>
						{storedResults.length > 0 && (
							<div className='flex justify-end mb-2'>
								<Button
									type='button'
									variant='outline'
									size='sm'
									onClick={clearHistory}
									className='text-red-600 dark:text-white border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20'
								>
									<Trash2 className='w-4 h-4 mr-2' />
									Clear History
								</Button>
							</div>
						)}

						{storedResults.length === 0 ? (
							<div className='p-4 bg-slate-50 rounded-lg border border-slate-200 dark:bg-gray-800 dark:border-gray-700 text-center'>
								<p className='text-sm text-slate-500'>
									No previous reports found
								</p>
								<p className='text-xs text-slate-400 mt-1'>
									Your analyzed reports will appear here
								</p>
							</div>
						) : (
							storedResults.map((reportEntry, entryIndex) => (
								<div key={entryIndex} className='space-y-2'>
									{reportEntry.data.map((report: any, index: number) => (
										<div
											key={index}
											className='p-4 bg-slate-50 rounded-lg border border-slate-200 dark:bg-gray-800 dark:border-gray-700  hover:bg-slate-100 dark:hover:bg-gray-800 cursor-pointer transition-colors'
										>
											<div className='flex justify-between items-start mb-2'>
												<div>
													<p className='text-sm font-medium dark:text-gray-200'>
														{report.testName}
													</p>
													<p className='text-xs dark:text-gray-400'>
														{reportEntry.checkedAt
															? new Date(
																	reportEntry.checkedAt,
																).toLocaleDateString()
															: 'Unknown Date'}
													</p>
												</div>
												<span
													className={`text-xs px-2 py-1 rounded-full ${
														report.status === 'normal'
															? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
															: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
													}`}
												>
													{report.status}
												</span>
											</div>

											<div className='flex justify-between items-center mt-2 text-sm'>
												<div>
													<span className='dark:text-gray-400'>Value: </span>
													<span className='font-medium dark:text-gray-100'>
														{report.value} {report.unit}
													</span>
												</div>
												<div>
													<span className='text-slate-600'>Normal: </span>
													<span className='font-medium dark:text-gray-400'>
														{report.normalRange}
													</span>
												</div>
											</div>
										</div>
									))}
								</div>
							))
						)}
					</div>
				)}
			</Card>
		</div>
	)
}

export default LeftSide
