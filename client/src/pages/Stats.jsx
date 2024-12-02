import React from 'react'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom';
import { ChartsContainer, StatsContainer } from '../components';

export const loader = async () => {
  try {
    const response = await customFetch.get('/jobs/stats');
    return response.data;
  } catch (error) {
    return error;
  }
}
const Stats = () => {
  const {allStats, monthlyApplications} = useLoaderData();
  return (
    <>
      <StatsContainer allStats={allStats}/>
      {monthlyApplications?.length > 1 && (<ChartsContainer data={monthlyApplications}/> )}
    </>
  )
}

export default Stats
