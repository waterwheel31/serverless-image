import React, { Component } from 'react';
import { Grid, Menu, Segment, Card, Button, Divider, Image } from 'semantic-ui-react'
import { Link, Route, Router, Switch } from 'react-router-dom'
import { getPictures, deleteItem } from '../api/picture-api.js'
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
                   <Card>
                     <Image src={picture.imageURL}/>
                     <Card.Content>
                       
                       <Card.Header> {picture.description}</Card.Header>
                      
                       <button onClick={()=> deleteItem({id:picture.id})}>delete</button>
                
                                        
                     </Card.Content>           
                   </Card>
                  )
                })}
            </Card.Group>

            
          </div>
        )
      }

 
}

