import * as functions from "firebase-functions";

// Sendgrid Config
import * as sgMail from '@sendgrid/mail';

const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;
sgMail.setApiKey(API_KEY);

export const welcomeEmail = functions.auth.user().onCreate(user => {

	const msg = {
	    to: user.email,
	    from: 'thediamonds764@gmail.com',
	    templateId: TEMPLATE_ID,
	    dynamic_template_data: {
		   subject: 'Welcome to my awesome app!',
		   first_name: user.displayName,
	    },
	};
 
	return sgMail.send(msg);
 
 });