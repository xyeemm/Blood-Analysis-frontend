import GradientText from '@/components/GradientText'
import ReportHistoryCard from '@/components/reportHistory/ReportHistoryCard'
import sparkling from '../assets/sparkling.gif'
import LeftSide from '../components/leftSide/LeftSide'
import RightSide from '../components/rightSide/RightSide'

const Home = () => {
	return (
		<>

				<section className='py-12 px-4 text-center '>
					{/* Heading */}
					<h1 className="font-sans text-3xl md:ml-6 md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-200">
						Blood Test Analysis Made Simple
					</h1>

					{/* Description */}
					<div className="flex flex-col items-center justify-center">
						<p className='text-center text-sm md:ml-6 md:text-lg max-w-2xl text-gray-800 dark:text-gray-500 leading-relaxed'>
							Upload your blood test results and get detailed, intelligent health insights{' '}
							{/* Inline group */}
							<span className='inline-flex items-center gap-2 justify-center'>
								<GradientText
									className='text-lg md:text-xl font-bold '
									text='Powered by Ai'
								/>

								<img
									src={sparkling}
									alt='AI Icon'
									className='w-6 h-6 md:w-8 md:h-8 rounded-full shadow-md bg-blue-300 p-1'
								/> 
							</span>
						</p>
					</div>
				</section>

			<div className='flex flex-col md:flex-row '>
				{/* Left Side: Input/Report History */}
				<div className='flex-1 p-4'>
					<LeftSide />
				</div>

				{/* Divider */}
				{/* <div className='hidden md:block w-px bg-gray-300 mx-4 dark:bg-gray-800'></div> */}

				{/* Right Side: Results */}
				<div className='md:flex-1 lg:flex-2 p-4'>
					<RightSide />
				</div>
				<div className=' p-4 block md:hidden'>
					<ReportHistoryCard />
				</div>
			</div>
		</>
	)
}

export default Home
