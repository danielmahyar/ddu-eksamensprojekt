import * as functions from "firebase-functions";
import * as sgMail from '@sendgrid/mail';

enum MailType {
	welcomeEmail = "d-a35835a6f82d4cdebb9155dc431b7147",
	subscriptionCreated = "d-62d68bda0b154e24bd8d77969a83145e"
}

const senderEmail = "thediamonds764@gmail.com"

const API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(API_KEY);

export const sendWelcomeEmail = (email: string, displayName: string): Promise<[sgMail.ClientResponse, {}]> => {
	const msg = {
		to: email,
		from: senderEmail,
		templateId: MailType.welcomeEmail,
		dynamic_template_data: {
		    subject: 'Welcome to my awesome app!',
		    first_name: displayName,
		},
	 };
	 return sgMail.send(msg);
}

export const sendSubscriptionMail = (email: string, displayName: string): Promise<[sgMail.ClientResponse, {}]> => {
	const msg = {
		to: email,
		from: senderEmail,
		templateId: MailType.subscriptionCreated,
		dynamic_template_data: {
			subject: 'Subscription started',
			first_name: displayName,
		},
	}
	return sgMail.send(msg)
}