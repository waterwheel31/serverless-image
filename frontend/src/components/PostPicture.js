import React, { Component } from 'react';
import { Grid, Form, Menu, Segment, Card, Button, Divider } from 'semantic-ui-react'
import { Link, Route, Router, Switch } from 'react-router-dom'
import { postPictures } from '../api/picture-api.js'
import { Item } from './Items.js'


export class PostPicture extends React.PureComponent{
    state: NewItem = {
        description: ''
    }

    render(){
        return (
            <div>
               <Divider clearing />
               <h2>Post Pictures</h2>

                <Form onSubmit={this.handleSubmit}>
     
                <Form.Field>
                    <label>Description</label>
                    <input
                    placeholder="Image description"
                    value={this.state.description}
                    onChange={this.handleDescriptionChange}
                    />
                </Form.Field>
                {this.renderButton()}
                </Form>
            </div>

        )
    }

    handleSubmit = async (event: React.SyntheticEvent) => {}

    renderButton() {
        return (
          <Button loading={this.state.uploadingGroup} type="submit">
            Create
          </Button>
        )
      }

    handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ description: event.target.value })
      }
}