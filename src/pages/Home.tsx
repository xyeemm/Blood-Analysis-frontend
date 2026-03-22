import ReportHistoryCard from '@/components/reportHistory/ReportHistoryCard'
import LeftSide from '../components/leftSide/LeftSide'
import RightSide from '../components/rightSide/RightSide'

const Home = () => {
	return (
		<div className='flex flex-col md:flex-row '>
			{/* Left Side: Input/Report History */}
			<div className='flex-1 p-4'>
				<LeftSide />
			</div>

			{/* Divider */}
			<div className='hidden md:block w-px bg-gray-300 mx-4 dark:bg-gray-800'></div>

			{/* Right Side: Results */}
			<div className='md:flex-1 lg:flex-2 p-4'>
				<RightSide />
			</div>
			<div className=' p-4 block md:hidden'>
				<ReportHistoryCard />
			</div>
		</div>
	)
}

export default Home
