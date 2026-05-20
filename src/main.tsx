import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import './index.css'
import App from './App.tsx'

const primeReactOptions = {
  ripple: true,
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider value={ primeReactOptions}>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
)
