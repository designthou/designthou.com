/* eslint-disable @typescript-eslint/no-explicit-any */

import { init, track, identify, flush, Identify } from '@amplitude/analytics-node';

// Initialize once
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const amplitudeServer = init(process.env.AMPLITUDE_API_KEY!);

export async function trackServerEvent(eventName: string, userId?: string, eventProperties?: Record<string, any>) {
	try {
		track(eventName, eventProperties, {
			user_id: userId,
		});

		// Ensure events are sent before function ends
		await flush().promise;
	} catch (error) {
		console.error('Failed to track server event:', error);
	}
}

export async function identifyServerUser(userId: string, userProperties?: Record<string, any>) {
	try {
		const identifyObj = new Identify();

		// Set user properties if provided
		if (userProperties) {
			Object.entries(userProperties).forEach(([key, value]) => {
				identifyObj.set(key, value);
			});
		}

		identify(identifyObj, {
			user_id: userId,
		});

		await flush().promise;
	} catch (error) {
		console.error('Failed to identify user:', error);
	}
}
