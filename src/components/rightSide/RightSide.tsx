import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Card } from '../ui/card'

const report = {
	date: '2024-02-12',
	summary:
		'Most parameters are within normal range. Slightly elevated glucose detected.',
	suggestions: [
		'Reduce sugar intake',
		'Increase physical activity',
		'Consider repeating glucose test in 2 weeks',
	],
	tests: [
		{
			name: 'Hemoglobin',
			value: 14.2,
			unit: 'g/dL',
			normal: '13.5 - 17.5',
			status: 'Normal',
		},
		{
			name: 'Glucose',
			value: 120,
			unit: 'mg/dL',
			normal: '70 - 99',
			status: 'High',
		},
		{
			name: 'White Blood Cells',
			value: 6000,
			unit: 'cells/mcL',
			normal: '4000 - 11000',
			status: 'Normal',
		},
	],
}

const RightSide = () => {
	return (
		<div className='space-y-6'>
			{/* Report Header */}

			{/* Test Results */}
			<Card className='p-6 shadow-md'>
				<div className='flex justify-between items-center'>
					<div>
						<h2 className='text-xl font-semibold text-slate-800'>
							AI Blood Report Analysis
						</h2>
						<p className='text-sm text-slate-500'>Generated on {report.date}</p>
					</div>

					{/* <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-sm">
            <CheckCircle2 className="w-4 h-4" />
            Stable
          </div> */}
				</div>
				<h3 className='text-lg font-semibold text-slate-800 mb-4'>
					Test Results
				</h3>

				<div className='space-y-4'>
					{report.tests.map((test, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							className='p-4 rounded-lg border border-slate-200 bg-slate-50 flex justify-between items-center'
						>
							<div>
								<p className='font-medium text-slate-700'>{test.name}</p>
								<p className='text-xs text-slate-500'>
									Normal Range: {test.normal} {test.unit}
								</p>
							</div>

							<div className='text-right'>
								<p className='text-lg font-semibold text-slate-800'>
									{test.value} {test.unit}
								</p>

								<Badge
									className={
										test.status === 'Normal'
											? 'bg-emerald-100 text-emerald-700'
											: 'bg-amber-100 text-amber-700'
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
				<h3 className='text-lg font-semibold text-slate-800 '>AI Summary</h3>

				<p className='text-sm text-slate-600 leading-relaxed'>
					{report.summary}
				</p>
			</Card>

			{/* AI Suggestions */}
			<Card className='p-6 shadow-md'>
				<div className='flex items-center gap-2 mb-3'>
					<AlertTriangle className='w-5 h-5 text-amber-600' />
					<h3 className='text-lg font-semibold text-slate-800'>
						AI Suggestions
					</h3>
				</div>

				<ul className='space-y-2'>
					{report.suggestions.map((s, i) => (
						<li
							key={i}
							className='p-3 rounded-lg bg-amber-50 text-sm text-amber-800 border border-amber-100'
						>
							{s}
						</li>
					))}
				</ul>
			</Card>
		</div>
	)
}

export default RightSide
