import React, { Component } from 'react';
import { Grid, Menu, Segment, Card, Button, Divider } from 'semantic-ui-react'
import { Link, Route, Router, Switch } from 'react-router-dom'
import { getPictures } from '../api/picture-api.js'
import { Item } from './Items.js'

export class Pictures extends React.PureComponent {


    state: PicturesListState = {
      pictures: []
    }
  
    async componentDidMount() {
        try {
          
          const pictures = await getPictures()
          console.log('pictures:', pictures)
          this.setState({
            pictures
          })
         
        } catch (e) {
          alert(`Failed to fetch groups: ${e.message}`)
        }
    }

    render() {
        return (
          <div>
            <h2>Pictures</h2>

    
            <Divider clearing />

            <Card.Group>
                {this.state.pictures.map(picture =>{
                  return (
                   <Card >
                     <Card.Content>
                       <Card.Header> {picture.id}</Card.Header>
                       <Card.Description> {picture.description}</Card.Description>                      
                     </Card.Content>           
                   </Card>
                  )
                })}
            </Card.Group>

            
          </div>
        )
      }

}

