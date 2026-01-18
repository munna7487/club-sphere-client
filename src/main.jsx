import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom'; // ✅ fixed import
import { router } from './routes/Router.jsx';
import Authprovider from './contex/authcontex/Authprovider.jsx'

// ✅ Create QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> {/* ✅ added client */}
      <Authprovider>
        <RouterProvider router={router} /> {/* ✅ removed extra comma */}
      </Authprovider>
    </QueryClientProvider>
  </StrictMode>
)
