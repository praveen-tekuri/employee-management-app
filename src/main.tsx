import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import EmployeeProvider from './context/EmployeeContext.tsx'
import AuthProvider from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <EmployeeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </EmployeeProvider>
      </BrowserRouter>
  </StrictMode>,
)
