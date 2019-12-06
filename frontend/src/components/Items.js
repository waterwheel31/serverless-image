import React, { Component } from 'react';
import { Grid, Menu, Segment, Card, Button, Divider } from 'semantic-ui-react'
import { Link, Route, Router, Switch } from 'react-router-dom'
import { getPictures } from '../api/picture-api.js'


interface ItemCardProps {
  group: {
    id: string,
    description: string
  }
}

interface ItemCardState {
}

export class Item extends React.PureComponent{

  render() {
    return (
      "222"
    )}
}