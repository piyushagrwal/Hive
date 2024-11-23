import React, { createContext, useContext } from 'react'
import {JobsContainer, SearchContainer} from '../components'
import {toast} from 'react-toastify';
import {useLoaderData} from 'react-router-dom'
import customFetch from '../utils/customFetch';

export const loader = async () => {
  try {
    const {data} = await customFetch.get('/jobs');
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
}

const AllJobsContext = createContext();

const AllJobs = () => {
  const data = useLoaderData();
  return (
    <AllJobsContext.Provider value={{data}}>
      <SearchContainer/>
      <JobsContainer/>
    </AllJobsContext.Provider>
  )
}

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs
