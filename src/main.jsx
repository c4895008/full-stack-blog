import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainLayout from './layouts/MainLayout.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import HomePage from './routes/HomePage.jsx'
import SinglePostPage from './routes/SinglePostPage.jsx'
import PostListPage from './routes/PostListPage.jsx'
import WritePage from './routes/WritePage.jsx'
import LoginPage from './routes/LoginPage.jsx'
import RegisterPage from './routes/RegisterPage.jsx';
import {ClerkProvider} from '@clerk/clerk-react';
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import { ToastContainer  } from 'react-toastify';
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const queryClient = new QueryClient();
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
const router = createBrowserRouter([{
  element: <MainLayout />,
  children:[
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      path: "/posts",
      element: <PostListPage/>,
    },
    {
      path: "/:slug",
      element: <SinglePostPage/>,
    },
    {
      path: "/write",
      element: <WritePage/>,
    },
    {
      path: "/login",
      element: <LoginPage/>,
    },
    {
      path: "/register",
      element: <RegisterPage/>,
    },
  ]
}]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position='bottom-right' /> 
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
)
