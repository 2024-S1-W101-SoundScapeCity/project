import { auth, db } from '@/firebase'
import { getDoc, doc, updateDoc } from 'firebase/firestore';

// this function is used to get the contents of a firestore document
// using the collection name and document id. if the document can be 
// found, the contents is returned as an object
async function getDocumentFromId(id, collectionName) {
  try {
    if(!id) { throw Error('id is undefined') }
    // get reference to document in firestore
    const documentReference = doc(db, collectionName, id)
    const documentSnap = await getDoc(documentReference)
    if(documentSnap.exists()) {
      // return document contents if exists
      return documentSnap.data()
    } else {
      console.error(`Query Firebase Error - cannot find docuement in collection ${collectionName} with id: ${id}`)
      return null
    }
  } catch (error) {
    console.error('Error: getDocumentFromId - ', error)
    return null
  }
}

// this function is used to get the previous sound a user was listening to
async function getLastUserSound() {
  const id = auth.currentUser.uid
  try {
    if(!id) { throw Error('id is undefined') }

    // get user data
    const userReference = doc(db,'users',id)
    const userSnap = await getDoc(userReference)
    if(userSnap.exists()) {
      const userData = userSnap.data()
      return userData?.lastSound
    } else {
      console.error(`Query Firebase Error - cannot find docuement in collection users with id: ${id}`)
      return null
    }
  } catch(error) {
    console.error('Error: getLastUserSound -', error)
    return null
  }
}

// this function is used to update the last sound element
async function setLastUserSound(soundId) {
  const id = auth.currentUser.uid
  try {
    if(!id || !soundId) { throw Error('id is undefined') }
    // get user data
    const userReference = doc(db,'users',id)
    await updateDoc(userReference, {lastSound: soundId})

    console.log('successfully updated lastSound')
    return true
  } catch(error) {
    console.error('Error: setLastUserSound - ', error)
    return null
  }
}

export { getDocumentFromId, getLastUserSound, setLastUserSound }