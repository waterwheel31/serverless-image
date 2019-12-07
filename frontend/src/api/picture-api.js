import { apiEndpoint } from '../config'

export async function getPictures() {
    console.log('apiEndpoint:', apiEndpoint)
    const response = await fetch(`${apiEndpoint}/myPicture`)
    
    const result = await response.json()
    return result.items
}

export async function postPicture(newItem){
    const response = await fetch(`${apiEndpoint}/myPicture`,{
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({
            id: newItem.id,
            description: newItem.description
        })
    })
    const result = await response.json()
    return result.newItem
}

export async function getURL(newItem){
    console.log('getURL')
    console.log('newItem:',newItem)
    console.log('JSON:', JSON.stringify(newItem))
    const response = await fetch(`${apiEndpoint}/image`,{
        method: "POST",
        headers: { "Content-Type": 'application/json'},
        body: JSON.stringify(newItem)
    })
    console.log('fetched', response)
    const result = await response.json()
    return result
}

export async function updatePicture(newItem){
    const response = await fetch(`${apiEndpoint}/myPicture`,{
        method: "PUT",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({
            id: newItem.id,
            description: newItem.description,
            imageURL: newItem.imageURL
        })
    })
    const result = await response.json()
    return result.newItem
}

export async function postToURL(newItem){
    console.log(newItem.postURL)
    const response = await fetch(newItem.postURL,{
        method: "PUT",
        headers: {"Content-Type": 'image/png'},
        body: newItem.file
    })
    console.log('updated')
    
}

export async function deleteItem(newItem){
    console.log(newItem.id)
    const response = await fetch(`${apiEndpoint}/myPicture`,{
        method: "DELETE",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({
            id: newItem.id,

        })
    })
    
}