import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Shop from './components/Shop.tsx'
import Layout from './components/Layout.tsx'
import Home from './components/Home.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/shop",
        element: <Shop />
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
