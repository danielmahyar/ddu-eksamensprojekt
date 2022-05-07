import * as functions from "firebase-functions";
import * as sgMail from '@sendgrid/mail';
import { 
	ByeEmail, 
	MailType, 
	SENDER_MAIL, 
	SENDER_NAME, 
	SubscriptionEventMail, 
	WelcomeEmail 
} from "../types/emails";



const API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(API_KEY);

/**
 * Sends Welcome Email via. SendGrid to user email.
 * @example
 * await sendWelcomeEmail(USER_EMAIL, USERNAME);
 * 
 * @throws 
 */
export const sendWelcomeEmail = (
	email: string,
	displayName: string,
	photoURL = "https://www.everblazing.org/wp-content/uploads/2017/06/avatar-372-456324-300x300.png"
): Promise<[sgMail.ClientResponse, {}]> => {
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
/**
 * Send Grid
 */
export const sendDeleteEmail = (email: string): Promise<[sgMail.ClientResponse, {}]> => {
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
/**
 * Send Grid
 */
export const sendSubscriptionMail = (
	email: string, 
	displayName: string, 
	productName = "AmfoLabs abonnement"
): Promise<[sgMail.ClientResponse, {}]> => {
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