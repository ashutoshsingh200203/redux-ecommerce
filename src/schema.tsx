import * as yup from 'yup'

export const schema1 = yup.object().shape({
  id : yup.string(),
  name: yup.string().trim().required('FirstName is required').matches(/^[a-zA-Z]+$/,'Only alphabets are allowed'),
  email: yup.string().trim().required('Email is required').email('Email must be valid email'),
  phone: yup.string().trim().required('Phone is required').matches( /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ , "Phone number is not valid" ),
  password : yup.string().trim().required('Password is required')
})

export const schema2 = yup.object().shape({
  id : yup.string(),
  email: yup.string().trim().required('Email is required').email('Email must be valid email'),
  password : yup.string().trim().required('Password is required')
})