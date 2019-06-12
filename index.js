const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

const app = express();


// Create a new item in the museum: takes a title and a path to an image.
var db = firebase.firestore();
var itemsRef = db.collection('items');

app.post('/api/items', async (req, res) => {
    try {
        console.log("test");
        let querySnapshot = await itemsRef.get();
        let numRecords = querySnapshot.docs.length;
        console.log("test");
        let item = {
            id: numRecords + 1,
            title: req.body.title,
            path: req.body.path,
            description: req.body.description
        };
        itemsRef.doc(item.id.toString()).set(item);
        res.send(item);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
    try{
        let querySnapshot = await itemsRef.get();
        res.send(querySnapshot.docs.map(doc => doc.data()));
    }catch(err){
        res.sendStatus(500);
    }
});

app.delete('/api/items/', async (req, res) => {
    console.log("/n/n/n/nTEST/n/n/n");
    try{
        let id = req.params.id;
        res.send(itemsRef.doc(id.toString()).delete());

    }
    catch(error){
        console.log(error);
        res.sendStatus(505);
    }
});

app.put('/api/items/:id', async (req, res) => {
    try{
        let id = req.params.id;
        itemsRef.doc(id).update({
            title : req.body.title,
            description : req.body.description
        });
        res.send(true);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
exports.app = functions.https.onRequest(app);