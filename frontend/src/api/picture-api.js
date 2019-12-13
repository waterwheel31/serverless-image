import { apiEndpoint } from '../config'
import { decode } from 'jsonwebtoken'

export async function getPictures(jwtToken) {
    //console.log('userID:', newItem.userId)
    console.log('apiEndpoint:', apiEndpoint)
    //const decodedJwt = decode(jwtToken)
    //const userId = decodedJwt.sub.replace("|","-")

    //const address = `${apiEndpoint}/myPicture/${userId}/pictures`
    //console.log('address:', address)

    // const response = await fetch(`${apiEndpoint}/myPicture/${userId}/pictures`,{
    const response = await fetch(`${apiEndpoint}/myPicture/pictures`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    })
    // console.log('response:', response)

    const result = await response.json()
    return result.items
}

export async function postPicture(jwtToken, newItem){

    const response = await fetch(`${apiEndpoint}/myPicture`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
            imageId: newItem.id,
            description: newItem.description,
            userId: newItem.userId
        })
    })
    const result = await response.json()
    return result.newItem
}

export async function getURL(newItem){
    //console.log('getURL')
    //console.log('newItem:',newItem)
    //console.log('JSON:', JSON.stringify(newItem))
    const idToken = newItem.idToken

    const response = await fetch(`${apiEndpoint}/image`,{
        method: "POST",
        headers: { 
            "Content-Type": 'application/json',
    },
        body: JSON.stringify(newItem)
    })
    //console.log('fetched', response)
    const result = await response.json()
    return result
}

export async function updatePicture(jwtToken, newItem){

    const response = await fetch(`${apiEndpoint}/myPicture`,{
        method: "PUT",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
            imageId: newItem.imageId,
            description: newItem.description,
            imageURL: newItem.imageURL,
        })
    })
    const result = await response.json()
    return result.newItem
}

export async function postToURL(newItem){
    //console.log(newItem.postURL)
    const response = await fetch(newItem.postURL,{
        method: "PUT",
        headers: {
            "Content-Type": 'image/png',
        },
        body: newItem.file
    })
    //console.log('response:', response)
    console.log('updated')
    
}

export async function deleteItem(jwtToken, newItem){
    
    const response = await fetch(`${apiEndpoint}/myPicture`,{
        method: "DELETE",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
            imageId: newItem.imageId,
        
        })
    })
    
}