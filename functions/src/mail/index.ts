import * as functions from "firebase-functions";
import * as sgMail from '@sendgrid/mail';
import { MailType, SubscriptionEventMail, WelcomeEmail } from "../types/emails";



const senderEmail = "thediamonds764@gmail.com"

const API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(API_KEY);

export const sendWelcomeEmail = (email: string, displayName: string, photoURL: string = "https://www.everblazing.org/wp-content/uploads/2017/06/avatar-372-456324-300x300.png"): Promise<[sgMail.ClientResponse, {}]> => {
	const msg: WelcomeEmail = {
		to: email,
		from: senderEmail,
		templateId: MailType.welcomeEmail,
		dynamic_template_data: {
			username: displayName,
			photoURL
		},
	 };
	 return sgMail.send(msg);
}

export const sendDeleteEmail = (email: string, displayName: string): Promise<[sgMail.ClientResponse, {}]> => {
	const msg = {
		to: email,
		from: senderEmail,
		templateId: MailType.welcomeEmail,
	 };
	 return sgMail.send(msg);
}

export const sendSubscriptionMail = (email: string, displayName: string): Promise<[sgMail.ClientResponse, {}]> => {
	const msg: SubscriptionEventMail = {
		to: email,
		from: senderEmail,
		templateId: MailType.subscriptionCreated,
		dynamic_template_data: {
			username: displayName,
			subscription_name: "AmfoLabs Premium"
		},
	}
	return sgMail.send(msg)
}