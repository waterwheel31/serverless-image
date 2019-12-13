import React, { Component } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react'
import { BrowserRouter, Link, Route, Router, Switch, Button } from 'react-router-dom'
import { decode } from 'jsonwebtoken'

import {Pictures} from './components/Pictures.js'
import {PostPicture} from './components/PostPicture.js'

import logo from './logo.svg';
import './App.css';
import Auth from './auth/Auth'


export interface AppProps {
  auth: Auth,
  history: any
}
export interface AppState {}


class App extends Component {

  constructor(props:AppProps ) {
    super(props)
    this.state = {
      auth: new Auth()
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
   
  }

  handleLogin(){
    
    this.props.auth.login()
    
  }
  handleLogout(){this.props.auth.logout()}

  logInLogOutButton(){
    if(this.props.auth.isAuthenticated()){
      return (
      <button onClick={this.handleLogout}>Logout </button>
      )
    } else {
      return(
      <button onClick={this.handleLogin}>Login to update an image </button>
      )
    }
  }

  render() {
    return (
      
      <div className="App">
        <div className="App-header">
          
          <img src={logo} className="App-logo" alt="logo" />
          <h2>'Serverless' Image Uploader</h2>
        </div>
        <div>
          ID:{this.JWTdecoding(this.props.auth.getIdToken())}

        </div>
       
        <div>
            <Segment style={{ padding: '3em 0em' }} vertical> 
            <BrowserRouter>
               {this.logInLogOutButton()}
            </BrowserRouter>
            </Segment>
        </div>
      
        <div>
          <Segment style={{ padding: '5em 0em' }} vertical>
            <Grid container stackable verticalAlign="middle">
              <Grid.Row>
                <Grid.Column width={16}>
                <BrowserRouter>
                    {this.postPicture()}
                </BrowserRouter>
                  
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Segment style={{ padding: '3em 0em' }} vertical>
            <Grid container stackable verticalAlign="middle">
              < Grid.Row>
                <Grid.Column width={16}>
                <BrowserRouter>
                    {this.showPictures()}
                     
                </BrowserRouter>
                  
                </Grid.Column>
              </Grid.Row>

              
            </Grid>
          </Segment>
        </div>
        <div>
          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"/>
        </div>
      </div>

    )
  }


  showPictures(){
    if (this.props.auth.isAuthenticated()){
      return(
      <Route
          render={props => {
              return <Pictures auth={this.props.auth} {...props} />
          }}
      />
      )
        }
  }

  postPicture(){
    if (this.props.auth.isAuthenticated()){
      return(
        <Route 
          render={props => {
            return <PostPicture auth={this.props.auth} {...props} />
          }}
        />
      )
    }
    
  }

  JWTdecoding(jwtToken){
    if(jwtToken === undefined){
      return null 
    } else {
      const decodedJwt = decode(jwtToken)
      return decodedJwt.sub
      
    }

  }
  
}

export default App;
