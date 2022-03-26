import * as firebaseAdmin from 'firebase-admin'
firebaseAdmin.initializeApp()
import * as functions from "firebase-functions";
import { db, stripe } from "./setup";
import * as api from './api'



export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.checkouts = api.checkouts
exports.getCards = api.getCards
exports.getSubscriptions = api.getSubscriptions
exports.makePaymentIntent = api.makePaymentIntent
exports.newSubscription = api.newSubscription
exports.saveCard = api.saveCard
exports.unsubscribe = api.unsubscribe
exports.stripewebhooks = api.stripewebhooks