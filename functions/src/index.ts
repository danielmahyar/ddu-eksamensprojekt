import * as firebaseAdmin from 'firebase-admin'
firebaseAdmin.initializeApp()
import * as api from './stripeapi'
import * as auth from './auth'


/**
 * MAIN FUNCTIONS EXPORTED TO GOOGLE CLOUD FUNCTIONS / FIREBAE FUNCTIONS
 * Has to be exported Pre-ES6 way
 */

exports.checkouts = api.checkouts
exports.getCards = api.getCards
exports.getSubscriptions = api.getSubscriptions
exports.makePaymentIntent = api.makePaymentIntent
exports.newSubscription = api.newSubscription
exports.saveCard = api.saveCard
exports.unsubscribe = api.unsubscribe
exports.stripewebhooks = api.stripewebhooks
exports.cleanupUserDelete = auth.cleanupUserDelete
exports.createUser = auth.createUser