import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import AppRoutes from './AppRoutes'
import Auht0ProviderWithNavigate from './auth/Auht0ProviderWithNavigate'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'sonner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus : false,
    },
  },
})


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auht0ProviderWithNavigate>
            <AppRoutes/>
            <Toaster visibleToasts={1} position='top-right' richColors/>
        </Auht0ProviderWithNavigate>
      </QueryClientProvider> 
    </Router>
  </StrictMode>,
)
