import 'dotenv/config';

export default {
	expo: {
		name: "or-logbook",
		slug: "or-logbook",
		extra: {
			FIREBASE_API_KEY: process.env.EXPO_FIREBASE_API_KEY,
			FIREBASE_AUTH_DOMAIN: process.env.EXPO_FIREBASE_AUTH_DOMAIN,
			FIREBASE_PROJECT_ID: process.env.EXPO_FIREBASE_PROJECT_ID,
			FIREBASE_STORAGE_BUCKET: process.env.EXPO_FIREBASE_STORAGE_BUCKET,
			FIREBASE_MESSAGING_SENDER_ID: process.env.EXPO_FIREBASE_MESSAGING_SENDER_ID,
			FIREBASE_APP_ID: process.env.EXPO_FIREBASE_APP_ID,
			FIREBASE_MEASUREMENT_ID: process.env.EXPO_FIREBASE_MEASUREMENT_ID,
		},
	},
};
