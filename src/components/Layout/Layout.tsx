import { Sparkles } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

const Layout = () => {
	return (
		<div>
			<header>
				<div className='sticky flex justify-end px-5 py-2.5 bg-white shadow-md'>
					<div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium shadow-lg'>
						<Sparkles  className='w-4 h-4 animate-pulse'  />
						<span>Enchanted by AI Alchemy </span>
					</div>
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
