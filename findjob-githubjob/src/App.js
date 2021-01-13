import React from 'react'
import spinner from "./assets/ajax-loader.gif";
import useFetchApi from './useFetchApi';
import {Container} from 'react-bootstrap'
import Job from './Job.js'

export default function App() {
  const {jobs,loading,error}=useFetchApi()
  return (
    <Container>
      {loading&& <img className="spinner" src={spinner} alt="Loading spinner" />}
       {error && <h1>hello</h1>}
       {jobs.map((val,index)=>{
         return <Job key={index} val={val}></Job>
       })}
    </Container>
  )
}
