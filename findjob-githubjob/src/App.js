import  { useState} from 'react'
import spinner from "./assets/ajax-loader.gif";
import {useFetchApi} from './useFetchApi';
import { Container } from 'react-bootstrap'
import Job from './Job.js'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Pagination from './Paginations'
import Search from './Search'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,

  },
  gridList: {
    height: '100%',
    width: 1300,
    overflow: 'hidden',
  },
}));
export default function App() {
  const [params, setParams] = useState({})
  const [searchValue, setSearchValue] = useState("")
  const [page, setPage] = useState(1)
  const { jobs, loading, error } = useFetchApi(searchValue,params, page)
  const classes = useStyles();
  function search(val) {
      setSearchValue(val)
  }
  return (
    <Container>
      <Search search={search} ></Search>
      
      <h1 className="mb-4">finding movie</h1>
      <Pagination page={page} setPage={setPage}></Pagination>
      {loading && <img className="spinner" src={spinner} alt="Loading spinner" />}
      {error && <h1>hello</h1>}
      <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} >
          {jobs.map((val, index) => {
            return <Job key={index} val={val}></Job>
          })}
        </GridList>
      </div>
     
      <Pagination page={page} setPage={setPage} hasNextPage={true}></Pagination>
    </Container>
  )
}
