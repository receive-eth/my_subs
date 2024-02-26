import ThemeProvider from './providers/ThemeContext/ThemeContext.tsx'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <App />
    </ThemeProvider>,
)
