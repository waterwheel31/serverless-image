import React, { Component } from 'react';
import { Grid, Form, Menu, Segment, Card, Button, Divider } from 'semantic-ui-react'
import { postPicture, getURL, updatePicture, postToURL } from '../api/picture-api.js'


interface NewItem {
    description: String,
    file: any
}


export class PostPicture extends React.PureComponent{
    
    state: NewItem = {
        description: '',
        file: undefined
    }

    render(){
        return (
            <div>
               <Divider clearing />
               <h2>Post A New Picture</h2>

                <Form onSubmit={this.handleSubmit}>
     
                <Form.Field>
                    <label>Description</label>
                    <input
                    placeholder="Image description"
                    value={this.state.description}
                    onChange={this.handleDescriptionChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Image</label>
                    <input
                    type="file"
                    accept="image/*"
                    placeholder="Image to upload"
                    onChange={this.handleFileChange}
                    />
                </Form.Field>
                {this.renderButton()}
                </Form>
            </div>

        )
    }

    handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ description: event.target.value })
      }

    handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handling file')
        const files = event.target.files
        if (!files) return
    
        console.log('File change', files, '\nfiles[0]:',files[0])
        await this.setState({file: files[0]})
        console.log('file changed:',this.state.file)
    }

    handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()

    
        try{
            if(!this.state.file){
                alert("File should be selected")
                return 
            }
            console.log('handleSubmit')
            console.log('auth:',this.props.auth)
            const jwtToken = await this.props.auth.getIdToken()
      
            console.log('got jtwtoken')
            const item = await postPicture(jwtToken, {
                description: this.state.description,
            })

            const imageId = item.imageId
            console.log('imageId:',imageId)
            const res = await getURL({imageId: imageId}) 
    
            const postURL = res.uploadUrl
            const imageURL = res.newImage.imageUrl
            console.log('imageURL:', imageURL, 'postURL:', postURL)

            const res2 = await updatePicture(jwtToken, {
                imageId: imageId,
                description: this.state.description,
                imageURL: imageURL
            })

            console.log("image updated")

            const res3 = await postToURL({
                postURL: postURL,
                file: this.state.file,     
            })

            console.log('image successfully posted')

        } catch(e){
            console.log('error:',e)
        }
       

        

    }

    renderButton() {
        return (
          <Button type="submit">
            Create
          </Button>
        )
      }

    handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ description: event.target.value })
      }
}