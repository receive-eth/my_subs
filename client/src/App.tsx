import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom'
import RootLayout from './components/RootLayout.tsx/RootLayout'
import AuthPage from './pages/Auth/AuthPage/AuthPage'
import SubsPage from './pages/Auth/SubsPage/SubsPage'
import PrivateRoute from './providers/PrivateRoute'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route path="auth" element={<AuthPage />} />

            <Route element={<PrivateRoute />}>
                <Route path="subs" element={<SubsPage />} />
            </Route>
        </Route>,
    ),
)

function App() {
    return <RouterProvider router={router} />
}

export default App
