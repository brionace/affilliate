import { Account, Client } from 'appwrite';

const { VITE_APPWRITE_ENDPOINT, VITE_APPWRITE_PROJECT_ID } = import.meta.env;

const client = new Client();
const account = new Account(client);

client.setEndpoint(VITE_APPWRITE_ENDPOINT).setProject(VITE_APPWRITE_PROJECT_ID);

export const appwrite = {
	client,
	account
};
