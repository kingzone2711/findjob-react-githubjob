import React from 'react'
import {useReducer,useEffect} from 'react'
import axios from 'axios'

const API_URL='https://www.omdbapi.com/?t=man&apikey=4a3b711b'
const ACTIONS={
    MAKE_REQUEST:'make-request',
    GETDATA:'get-data',
    ERROR:'error'
}
function reducer(state,action){
    switch(action.type){
        case ACTIONS.MAKE_REQUEST:
            return {loading:true,jobs:[]}
        case ACTIONS.GETDATA:
            return {...state,loading:false,jobs:action.payload.jobs}
        case ACTIONS.ERROR:
            return {...state,loading:false,error:action.payload.error,job:[]}
         default: return state  
    }     
}
function useFetchApi(params,page) {
    const [state,dispatch]=useReducer(reducer,{jobs: [], loading: true})
    useEffect(()=>{
        const cancelToken1 = axios.CancelToken.source()
        dispatch({ type:ACTIONS.MAKE_REQUEST })
        axios.get( API_URL).then(res=>{ 
            console.log(res.data.Search)
             dispatch({ type:ACTIONS.GETDATA ,payload:{jobs:res.data.Search} })
            }
        ).catch(e=>{
            dispatch({ type:ACTIONS.ERROR,payload:{error:e} })
        })
    },[params,page])
  return state
}
export default useFetchApi
