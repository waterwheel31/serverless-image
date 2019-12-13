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
  
    const imageId = JSON.parse(event.body).imageId

    const imageCode = uuid.v4()
    const newImage = await createImage(imageId, imageCode, event)

    const url = getUploadUrl(imageCode)
    
    return {
        statusCode: 201,
        headers : {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify({
            newImage: newImage,
            uploadUrl: url
        })
    }
}

function getUploadUrl(imgId: string) {
    return s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: imgId,
      Expires: parseInt(urlExpiration)
    })
  }

async function createImage(id: string, imageCode: string, event: any) {
    const timestamp = new Date().toISOString()
    const newImage = JSON.parse(event.body)
  
    const newItem = {
      id,
      timestamp,
      imageCode,
      ...newImage,
      imageUrl: `https://${bucketName}.s3.amazonaws.com/${imageCode}`
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


async function itemExists(imageId: string){
    const result = await docClient
        .get({
            TableName: picturesTable,
            Key: {id:imageId}
        }).promise()
    return !!result.Item
}

