import * as functions from "firebase-functions";
import * as sgMail from '@sendgrid/mail';
import { ByeEmail, MailType, SubscriptionEventMail, WelcomeEmail } from "../types/emails";



const SENDER_MAIL = "no-reply@helpify.shop"
const SENDER_NAME = "Helpify"

const API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(API_KEY);

export const sendWelcomeEmail = (email: string, displayName: string, photoURL: string = "https://www.everblazing.org/wp-content/uploads/2017/06/avatar-372-456324-300x300.png"): Promise<[sgMail.ClientResponse, {}]> => {
	const msg: WelcomeEmail = {
		to: email,
		from: {
			email: SENDER_MAIL,
			name: SENDER_NAME
		},
		templateId: MailType.welcomeEmail,
		dynamic_template_data: {
			username: displayName,
			photoURL
		},
	 };
	 return sgMail.send(msg);
}

export const sendDeleteEmail = (email: string, displayName: string): Promise<[sgMail.ClientResponse, {}]> => {
	const msg: ByeEmail = {
		to: email,
		from: {
			email: SENDER_MAIL,
			name: SENDER_NAME
		},
		templateId: MailType.byeEmail,
		dynamic_template_data: {}
	 };
	 return sgMail.send(msg);
}

export const sendSubscriptionMail = (email: string, displayName: string, productName: string = "AmfoLabs abonnement"): Promise<[sgMail.ClientResponse, {}]> => {
	const msg: SubscriptionEventMail = {
		to: email,
		from: {
			email: SENDER_MAIL,
			name: SENDER_NAME
		},
		templateId: MailType.subscriptionCreated,
		dynamic_template_data: {
			username: displayName,
			subscription_name: productName
		},
	}
	return sgMail.send(msg)
}