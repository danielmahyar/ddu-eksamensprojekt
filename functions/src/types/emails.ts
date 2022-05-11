export const SENDER_MAIL = "no-reply@helpify.shop"
export const SENDER_NAME = "Helpify"

/**
 * Mail Types from SendGrid Dynamic Templates
 * https://mc.sendgrid.com/dynamic-templates
 */
export enum MailType {
	welcomeEmail = "d-a35835a6f82d4cdebb9155dc431b7147",
	subscriptionCreated = "d-62d68bda0b154e24bd8d77969a83145e",
	subscriptionEnded = "d-591523e182c04a45ae6120c134572855",
	byeEmail = "d-44e7ace672644979a19d9182a851a9da"
}

export type BaseEmail = {
	to: string,
	from: {
		email: string,
		name: string
	},
	templateId: MailType,
}

export interface SubscriptionEventMail extends BaseEmail {
	dynamic_template_data: {
		subscription_name: string,
		username: string
	}
}

export interface WelcomeEmail extends BaseEmail {
	dynamic_template_data: {
		username: string,
		photoURL: string
	}
}

export interface ByeEmail extends BaseEmail {
	dynamic_template_data: {
		
	}
}
