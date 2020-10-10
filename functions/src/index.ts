'use strict';
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import express = require('express');

const app = express()

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://menback-13370.firebaseio.com/'
})

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/jobs', async (req, res) => {

    const query = await admin.database().ref(`/jobs`).once('value')

    res.json(query.toJSON())
})

app.get('/jobs/:id', async (req, res) => {

    const query = await admin.database().ref(`/jobs/${req.params.id}`).once('value')


    res.json(query)
})

exports.api = functions.https.onRequest(app);

