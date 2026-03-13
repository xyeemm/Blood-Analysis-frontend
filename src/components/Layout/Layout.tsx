import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

const Layout = () => {
	return (
		<div>
			<header>
				<div className='sticky flex justify-end px-5 py-2.5 bg-white shadow-md'>
					{/* <span>Powered by ChatGPT</span> */}
					<span className='bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent'>
						✨ AI-Powered
					</span>
				</div>
			</header>
			<div>
				<Outlet />
				<Toaster richColors position='top-center' />
			</div>
		</div>
	)
}

export default Layout
