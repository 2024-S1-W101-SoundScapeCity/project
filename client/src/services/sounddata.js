import { collection, db, setDoc, doc, getDoc } from '@/firebase'

// this function is used to get the contents of a firestore document
// using the collection name and document id. if the document can be 
// found, the contents is returned as an object
async function getDocumentFromId(id, collectionName) {
  // get reference to document in firestore
  const documentReference = collection(db, collectionName).doc(id)
  const documentSnap = await getDoc(documentReference)
  if(documentSnap.exists()) {
    // return document contents if exists
    return documentSnap.data()
  } else {
    console.error(`Query Firebase Error - cannot find docuement in collection ${collectionName} with id: ${id}`)
    return null
  }
}

export { getDocumentFromId }