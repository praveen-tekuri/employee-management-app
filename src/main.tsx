import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import EmployeeProvider from './context/EmployeeContext.tsx'
import AuthProvider from './context/AuthContext.tsx'
import { store } from './app/store.ts'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store = {store}>
      <BrowserRouter>
        <EmployeeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </EmployeeProvider>
      </BrowserRouter>
      </Provider>
  </StrictMode>,
)
