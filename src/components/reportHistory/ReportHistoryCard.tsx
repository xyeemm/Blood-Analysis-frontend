import { ChevronDown, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

import { useEffect, useState } from 'react'

const ReportHistoryCard = () => {
	const [historyOpen, setHistoryOpen] = useState(false)

	const [storedResults, setStoredResults] = useState<any[]>([])

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
					className={`w-5 h-5 text-slate-500 dark:text-gray-400 transition-transform ${
						historyOpen ? 'rotate-180' : ''
					}`}
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
							<p className='text-sm text-slate-500 dark:text-gray-400'>
								No previous reports found
							</p>
							<p className='text-xs text-slate-400 dark:text-gray-500 mt-1'>
								Your analyzed reports will appear here
							</p>
						</div>
					) : (
						storedResults.map((reportEntry, entryIndex) => (
							<div key={entryIndex} className='space-y-2'>
								{reportEntry.data.map((report: any, index: number) => (
									<div
										key={index}
										className='p-4 bg-slate-50 rounded-lg border border-slate-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-gray-700 cursor-pointer transition-colors'
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
												<span className='text-slate-600 dark:text-gray-400'>
													Normal:{' '}
												</span>
												<span className='font-medium dark:text-gray-300'>
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
	)
}

export default ReportHistoryCard
