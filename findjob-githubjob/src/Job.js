import React from 'react'
import './App.css';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';



export default function Job({val}) {
    return (
    <GridListTile cols={1} className='pt mr mb'>
        <img  src={val.Poster}  />
        <GridListTileBar
              title={val.Title}
              subtitle={<span>by: {val.Title}</span>} 
            />
      </GridListTile>
    )
}
