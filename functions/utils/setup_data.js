const debug = require('debug')('firestore-snippets-node');

// [START firestore_deps]
const admin = require('firebase-admin');

// initialize test database
// process.env.GCLOUD_PROJECT = projectId;
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
admin.initializeApp();

const db = admin.firestore();

function setDocument(){
  let data = {
    name: 'Los Angeles',
    state: 'CA',
    country: 'USA'
  };
  
  // Add a new document in collection "cities" with ID 'LA'
  let setDoc = db.collection('cities').doc('LA').set(data);  
}

function getDocument(){
  let getDoc = db.collection('enrollment').doc('4eXD43aUbcssefk5kI2E').get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
}

function getAllDocumentInACollection(collection){
  console.log('Collection Name:' + collection);
  db.collection(collection).get()
  .then(documentSet => {
    if (documentSet.empty){
      console.log('No matching documents.');
      return;
    }

    documentSet.forEach( doc => {
      console.log(doc.id, 'Document Data:', doc.data());
    });
  })
  .catch(err => {
    console.log('Error', error)
  });
}

function getSchedule(scheduleDocId){
  db.collection('schedules').doc(scheduleDocId).get()
  .then(doc => {
    if ( !doc.exists ){
      console.log('No such document');
    } else {
      console.log(doc.data());
    }
  })
  .catch(err => {
    console.log('Error',error)
  });
}

describe('Firestore Smoketests', () => {

  it('should get an document', () => {
    return getDocument();
  });

  it('should set an  document', () => {
    return setDocument();
  });

  it('should get all document in an collection', () => {
    return getAllDocumentInACollection('enrollment');
  });

  it('should get all document in an collection', () => {
    return getAllDocumentInACollection('cities');
  });

  it('should get a schedule', () => {
    return getSchedule('hffbbRqk8v7ixtaTOH10');
  });


});