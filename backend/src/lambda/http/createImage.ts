import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import * as uuid from 'uuid'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)
const docClient = new XAWS.DynamoDB.DocumentClient()
const picturesTable = process.env.PICTURES_TABLE
const picturesDataTable = process.env.PICTURES_DATA_TABLE

const bucketName = process.env.PICTURES_S3_BUCKET

const s3 = new XAWS.S3({
    signatureVersion: 'v4'
  })

const urlExpiration = process.env.SIGNED_URL_EXPIRATION


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
    const itemId = JSON.parse(event.body).id

    /*
    const validItemId = await itemExists(itemId)
    if (!validItemId) { 
        return {
            statusCode: 404,
            body: JSON.stringify ({error:'item does not exist'})
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            itemId: itemId,
        })
    }
    */


    const imageId = uuid.v4()
    const newImage = await createImage(itemId, imageId, event)

    const url = getUploadUrl(imageId)

    return {
        statusCode: 201,
        body: JSON.stringify({
            imageId: imageId,
            itemId: itemId,
            newImage: newImage,
           
        })
    }

    return {
        statusCode: 201,
        body: JSON.stringify({
            newImage: newImage,
            uploadUrl: url
        })
    }
}

async function createImage(itemId: string, imageId: string, event: any) {
    const timestamp = new Date().toISOString()
    const newImage = JSON.parse(event.body)
  
    const newItem = {
      itemId,
      timestamp,
      imageId,
      ...newImage,
      imageUrl: `https://${bucketName}.s3.amazonaws.com/${imageId}`
    }
    console.log('Storing new item: ', newItem)
  
    await docClient
      .put({
        TableName: picturesDataTable,
        Item: newItem
      })
      .promise()
  
    return newItem
  }


async function itemExists(itemId: string){
    const result = await docClient
        .get({
            TableName: picturesTable,
            Key: {id: itemId}
        }).promise()
    return !!result.Item
}

function getUploadUrl(imageId: string) {
    return s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: imageId,
      Expires: urlExpiration
    })
  }