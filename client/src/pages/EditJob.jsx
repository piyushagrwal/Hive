import React from 'react'
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { Form, redirect, useLoaderData, useNavigation } from 'react-router-dom';
import { FormRow, FormRowSelect } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';

export const loader = async ({params}) => {
  try {
    const {data} = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect('/dashboard/all-jobs');
  }
}

export const action = async({request, params}) => {
  const formData = request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    toast.success('Job edited successfully');
    return redirect('/dashboard/all-jobs');
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
}

const EditJob = () => {
  const {job} = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Edit Job</h4>
        <div className="form-center">
          <FormRow type='text' name='position' defaultValue={job.position}/>
          <FormRow type='text' name='company' defaultValue={job.company}/>
          <FormRow type='text' name='jobLocation' defaultValue={job.jobLocation}/>
          <FormRowSelect name='jobStatus' labelText='Job status' defaultValue={job.jobStatus} list={Object.values(JOB_STATUS)}/>
          <FormRowSelect name='jobType' labelText='Job type' defaultValue={job.jobType} list={Object.values(JOB_TYPE)}/>
          <button type='submit' className='btn btn-block form-btn' disabled={isSubmitting}>
            {isSubmitting ? 'Submitting' : 'Submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default EditJob
