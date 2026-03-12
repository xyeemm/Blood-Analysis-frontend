import { RouterProvider } from 'react-router-dom'

import routerProvider from './routerProvider'

const App = () => {
	return (
		<>
			<RouterProvider router={routerProvider} />
		</>
	)
}

export default App
