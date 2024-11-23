import React from 'react'
import { Link, Form, redirect, useNavigation } from 'react-router-dom'
import { FormRow, Logo } from '../components'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'

export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login Succesful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.message);
    // console.log(error)
    return error;
  }
}

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo/>
        <h4>Login</h4>
        <FormRow type='email' name='email' labelText='Email'/>
        <FormRow type='password' name='password' labelText='Password'/>
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>{isSubmitting ? 'Submittting...' : 'Submit'}</button>
        <button type='button' className='btn btn-block'>Explore the App</button>
        <p>
          Not a user yet? 
          <Link to='/register'> Register</Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login
