import { useAppSelector } from '@/redux-toolkit/store'
import { motion } from 'framer-motion'
import ReportHistoryCard from '../reportHistory/ReportHistoryCard'
import { Badge } from '../ui/badge'
import { Card } from '../ui/card'

// const report = {
// 	date: '2024-02-12',
// 	summary:
// 		'Most parameters are within normal range. Slightly elevated glucose detected.',
// 	suggestions: [
// 		'Reduce sugar intake',
// 		'Increase physical activity',
// 		'Consider repeating glucose test in 2 weeks',
// 	],
// }

const RightSide = () => {
	const results = useAppSelector((state) => state.analysis.results)

	// If no results yet
	if (results.length === 0) {
		return (
			<Card className='p-6 text-center dark:text-gray-400'>
				Submit a test to see analysis
			</Card>
		)
	}

	// latest report
	const latestReport = results[results.length - 1]

	return (
		<div className='space-y-6'>
			{/* Test Results */}
			<Card className='p-6 shadow-md'>
				<div className='flex justify-between items-center'>
					<div>
						<h2 className='text-xl font-semibold dark:text-gray-100'>
							AI Blood Report Analysis
						</h2>

						{latestReport.checkedAt && (
							<p className='text-sm dark:text-gray-400'>
								Generated on{' '}
								{new Date(latestReport.checkedAt).toISOString().split('T')[0]}
							</p>
						)}
					</div>
				</div>

				<h3 className='text-lg font-semibold dark:text-gray-100 mb-4'>
					Test Results
				</h3>

				<div className='space-y-4'>
					{latestReport.data.map((test: any, index: number) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							className='p-4 rounded-lg border border-slate-200 bg-slate-50 dark:bg-gray-800 dark:border-gray-700 flex justify-between items-center'
						>
							<div>
								<p className='font-medium dark:text-gray-200'>
									{test.testName}
								</p>

								<p className='text-xs text-slate-500 dark:text-gray-400'>
									Normal Range: {test.normalRange}{' '}
								</p>
							</div>

							<div className='text-right'>
								<p className='text-lg font-semibold dark:text-gray-100'>
									{test.value} {test.unit}
								</p>

								<Badge
									className={
										test.status === 'normal'
											? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
											: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
									}
								>
									{test.status}
								</Badge>
							</div>
						</motion.div>
					))}
				</div>
			</Card>

			{/* AI Summary */}
			<Card className='p-6 shadow-md'>
				<h3 className='text-lg font-semibold dark:text-gray-100 '>
					AI Summary
				</h3>

				<p className='text-sm text-slate-600 dark:text-gray-300 leading-relaxed'>
					{latestReport.aiSummary}
				</p>
			</Card>

			{/* AI Suggestions */}
			<Card className='p-6 shadow-md'>
				<div className='flex items-center gap-2 mb-3'>
					{/* <AlertTriangle className='w-5 h-5 text-amber-600' /> */}

					<h3 className='text-lg font-semibold dark:text-gray-100'>
						AI Suggestions
					</h3>
				</div>

				<ul className='space-y-2'>
					{latestReport.aiSuggestions.map((s, i) => (
						<li
							key={i}
							className='p-3 rounded-lg 
bg-amber-50 dark:bg-gray-800 
text-sm text-amber-800 dark:text-gray-300 
'
						>
							{s}
						</li>
					))}
				</ul>
			</Card>
			<div className='block md:hidden'>
				<ReportHistoryCard />
			</div>
		</div>
	)
}

export default RightSide
