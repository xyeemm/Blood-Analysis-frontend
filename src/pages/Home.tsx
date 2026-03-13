import { useState } from 'react'
import LeftSide from '../components/leftSide/LeftSide'
import RightSide from '../components/rightSide/RightSide'

const Home = () => {
	const [analysisResults, setAnalysisResults] = useState<any[]>([])

	return (
		<div className='flex flex-col md:flex-row '>
			{/* Left Side: Input/Report History */}
			<div className='flex-1 p-4'>
				<LeftSide onAnalysisComplete={setAnalysisResults} />
			</div>

			{/* Divider */}
			<div className='hidden md:block w-px bg-gray-300 mx-4'></div>

			{/* Right Side: Results */}
			<div className='flex-2 p-4'>
				<RightSide results={analysisResults} />
			</div>
		</div>
	)
}

export default Home
