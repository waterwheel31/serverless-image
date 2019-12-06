import React, { Component } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react'
import { BrowserRouter, Link, Route, Router, Switch } from 'react-router-dom'

import {Pictures} from './components/Pictures'

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
        
        <div>Hello React ! </div> 

        <div>
          <Segment style={{ padding: '8em 0em' }} vertical>
            <Grid container stackable verticalAlign="middle">
              <Grid.Row>
                <Grid.Column width={16}>
                <BrowserRouter>
                      {this.generateCurrentPage()}
                     
                </BrowserRouter>
                  
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
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

  generateCurrentPage(){
    return(
      // <Route path="/" component={Pictures}/>
      <Route path="/">
        {Pictures.render()}
      </Route>
    )
  }
  
}



export default App;
