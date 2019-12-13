import React, { Component } from 'react';
import { Grid, Menu, Segment, Card, Button, Divider, Image } from 'semantic-ui-react'
import { Link, Route, Router, Switch } from 'react-router-dom'
import { getPictures, deleteItem } from '../api/picture-api.js'
import { Item } from './Items.js'
import { decode } from 'jsonwebtoken'

interface PicruesProps {
  auth: Auth
}

export class Pictures extends React.PureComponent {

    state: PicturesListState = {
      pictures: []
    }
  
    async componentDidMount() {
        try {
          
          const jwtToken = await this.props.auth.getIdToken()
          const decodedJwt = decode(jwtToken)
          const userID = decodedJwt.sub

          console.log('auth:',userID)
          const pictures = await getPictures(jwtToken)
          
          console.log('pictures:', pictures)
          
          this.setState({
            pictures
          })
         
        } catch (e) {
          alert(`Failed to fetch groups: ${e.message}`)
        }
    }

    render() {
        const jwtToken = this.props.auth.getIdToken()
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
                
                       <button onClick={()=> deleteItem(jwtToken, {imageId:picture.imageId})}>delete</button>
                    
                     </Card.Content>           
                   </Card>
                  )
                })}
            </Card.Group>

            
          </div>
        )
      }

 
}

