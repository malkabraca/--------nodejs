const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

// Replace with the client ID and secret you downloaded from the Google Cloud Console
const CLIENT_ID = '694319760152-j01euqq1d5dbd16cu8185bacan4ka7mv.apps.googleusercontent.com';
const CLIENT_SECRET = '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';

// Replace with the redirect URI you set in the Google Cloud Console
const REDIRECT_URI = 'http://localhost::8181/oauth2callback';

// Replace with the scopes you need for your application
const SCOPES = ['https://www.googleapis.com/auth/userinfo.profile'];

// Create a new OAuth2 client using the client ID and secret
const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Generate the URL to authorize the user and redirect to it
const authorizeUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});
console.log(`Authorize this app by visiting this URL: ${authorizeUrl}`);

// Exchange the authorization code for an access token and refresh token
const code = 'AUTHORIZATION_CODE'; // Replace with the authorization code returned by Google
const { tokens } = await oAuth2Client.getToken(code);
oAuth2Client.setCredentials(tokens);

// Retrieve the user's profile information
const people = google.people({ version: 'v1', auth: oAuth2Client });
const profile = await people.people.get({
  resourceName: 'people/me',
  personFields: 'names,emailAddresses',
});
console.log(`Name: ${profile.data.names[0].displayName}`);
console.log(`Email: ${profile.data.emailAddresses[0].value}`);