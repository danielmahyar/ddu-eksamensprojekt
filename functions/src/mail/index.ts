import * as functions from "firebase-functions";
import * as sgMail from '@sendgrid/mail';

const API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(API_KEY);

export const sendWelcomeEmail = (email: string, displayName: string): Promise<[sgMail.ClientResponse, {}]> => {
	const msg = {
		to: email,
		from: 'thediamonds764@gmail.com',
		templateId: "d-a35835a6f82d4cdebb9155dc431b7147",
		dynamic_template_data: {
		    subject: 'Welcome to my awesome app!',
		    first_name: displayName,
		},
	 };
 
	 return sgMail.send(msg);
}
