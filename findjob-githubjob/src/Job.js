import React from 'react'
import { Card } from 'react-bootstrap'

export default function Job({val}) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={val.Poster} />
            <Card.Body>
                <Card.Title>{val.Title}</Card.Title>
                <Card.Text>
                   {val.year}
            </Card.Text>
             
            </Card.Body>
        </Card>
    )
}
