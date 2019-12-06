import React, { Component } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react'
import { BrowserRouter, Link, Route, Router, Switch } from 'react-router-dom'

import {Pictures} from './components/Pictures.js'
import {PostPicture} from './components/PostPicture.js'

import logo from './logo.svg';
import './App.css';


export interface AppProps {
  history: any
}
export interface AppState {}


class App extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props)
  }

  render() {
    return (
      
      <div className="App">
        <div className="App-header">
          
          <img src={logo} className="App-logo" alt="logo" />
          <h2>'Serverless' Image Uploader</h2>
        </div>
        
        <div>
          <Segment style={{ padding: '8em 0em' }} vertical>
            <Grid container stackable verticalAlign="middle">
              <Grid.Row>
                <Grid.Column width={16}>
                <BrowserRouter>
                      {this.showPictures()}
                      {this.postPicture()}
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



  showMenu(input){
    return (
   
    <Menu>
      <Menu.Item name='menu'>
        <Link to="https://www.yahoo.co.jp"> Yahoo! Japan </Link>
      </Menu.Item>
    </Menu>

    )
  }

  showPictures(){
    return(
      <Route path="/" component={Pictures}/>
    )
  }

  postPicture(){
    return(
      <Route path="/" component={PostPicture}/>
    )
  }
  
}



export default App;
