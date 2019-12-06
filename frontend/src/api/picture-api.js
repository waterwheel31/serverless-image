import { apiEndpoint } from '../config'

export async function getPictures() {
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
