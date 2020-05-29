const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// const serviceAccount = require("/Users/harikrish/Downloads/EduCast-8a1fc04ab889.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://educast-4e2e3.firebaseio.com'
// });

admin.initializeApp({});

const db = admin.firestore();

// exports.getStudents = functions.https.onRequest((request, response) => {
//     let response_data = [];
//     db.collection('student').get()
//     .then((snapshot) => {
//         response.send(snapshot.docs.map(doc => doc.data()));
//     })
// })



exports.aggregateSeatsFilled = functions.firestore.document('enrollment/{enrollmentId}').onCreate((change, context) => {
    enrollmentId = context.params.enrollmentId;
    schedule = db.collection('schedules').doc('hffbbRqk8v7ixtaTOH10').get()
    .then(doc => {
        if (!doc.exists){
            return null;
        } else {
              return doc.ref.update({
                seatsAvailable : 3
            });    
        }
    })
    .catch(err => {
        console.log('Error', err);
    });
    // })
});