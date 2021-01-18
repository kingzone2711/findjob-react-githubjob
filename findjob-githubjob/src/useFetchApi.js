import {useState} from 'react'
import {useReducer,useEffect} from 'react'
import axios from 'axios'

const API_URL='https://www.omdbapi.com/?s=man&apikey=4a3b711b'
const ACTIONS={
    MAKE_REQUEST:'make-request',
    GETDATA:'get-data',
    ERROR:'error',
    UPDATE_HASH_NEXT_PAGE:'update-hash-next-page'
}
function reducer(state,action){
    switch(action.type){
        case ACTIONS.MAKE_REQUEST:
            return {loading:true,jobs:[]}
        case ACTIONS.GETDATA:
            return {...state,loading:false,jobs:action.payload.jobs,hasNextPage: action.payload.hasNextPage}
        case ACTIONS.ERROR:
            return {...state,loading:false,error:action.payload.error,job:[]}
        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return { ...state, hasNextPage: action.payload.hasNextPage }
         default: return state  
    }     
}
function useFetchApi(searchValue,params,page) {
    const [state,dispatch]=useReducer(reducer,{jobs: [], loading: true})
    useEffect(()=>{
        const cancelToken1 = axios.CancelToken.source()
        if(searchValue ===''){
            dispatch({ type:ACTIONS.MAKE_REQUEST })
            axios.get(API_URL).then(res=>{ 
                   dispatch({ type:ACTIONS.GETDATA ,payload:{jobs:res.data.Search} })
                  }
              ).catch(e=>{
                  dispatch({ type:ACTIONS.ERROR,payload:{error:e} })
              })
        }else{
            dispatch({ type:ACTIONS.MAKE_REQUEST })
            axios.get(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(res => {
                if(res.data.Response === "True")
                {
                    dispatch({ type:ACTIONS.GETDATA ,payload:{jobs:res.data.Search} })
                }
                else{
                    dispatch({ type: ACTIONS.ERROR, payload: { error: res } }) 
                }
             // console.log('update-hash-next-page')
            //dispatch({ type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: res.data.length !== 0 } }) 
          }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ACTIONS.ERROR, payload: { error: e } }) 
          })
        }
        
    },[params,page,searchValue])
  return state
}
export {useFetchApi}
