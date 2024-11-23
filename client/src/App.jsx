import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  HomeLayout, 
  Login,
  Register,
  DashboardLayout,
  Error,
  Landing,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  EditJob,
  Admin
} from './pages'

import {action as registerAction} from './pages/Register.jsx';
import {action as loginAction} from './pages/Login.jsx';
import {loader as dashboardLoader} from './pages/DashboardLayout.jsx'
import {action as addJobAction} from './pages/AddJob.jsx'
import {loader as allJobsLoader} from './pages/AllJobs.jsx'
import {action as editJobAction} from './pages/EditJob.jsx'
import {loader as editJobLoader} from './pages/EditJob.jsx'
import {action as deleteJobAction} from './pages/DeleteJob.jsx'

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
}
checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout/>,
    errorElement: <Error/>,
    children: [
      // To show other pages on paths relative to home layout.
      {
        // To show landing page on home layout
        index: true,
        element: <Landing/>
      },
      {
        path: 'register',
        element: <Register/>,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login/>,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout/>,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob/>,
            action: addJobAction,
          },
          {
            path: 'stats',
            element: <Stats/>  
          },
          {
            path: 'all-jobs',
            element: <AllJobs/>,
            loader: allJobsLoader,
          },
          {
            path: 'profile',
            element: <Profile/>  
          },
          {
            path: 'admin',
            element: <Admin/> 
          },
          {
            path: 'edit-job/:id',
            element: <EditJob/>,
            loader: editJobLoader,
            action: editJobAction,
          },
          {
            path: 'delete-job/:id',
            action: deleteJobAction
          }
        ]
      },
    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
