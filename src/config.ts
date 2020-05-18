const apiId = 'jh1yx4w8z9'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: 'reactauth0-test.auth0.com',    // Name of the Auth0 domain
  clientId: 'rTDVBgu27BIhIBGLzubVyqg2wHC22Cos',  // Client id of a new application
  callbackUrl: process.env.REACT_APP_CALLBACK_URL
}