import auth0 from "auth0-js";
import { authConfig } from "../config";

export default class Auth {
  accessToken;
  idToken;
  expiresAt;

  auth0 = new auth0.WebAuth({
    domain: authConfig.domain,
    clientID: authConfig.clientId,
    redirectUri: authConfig.callbackUrl,
    responseType: "token id_token",
    scope: "openid",
  });

  constructor(history) {
    this.history = history;
  }

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log("id token: ", authResult.idToken);
        this.setSession(authResult);
      } else if (err) {
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
        this.history.replace("/");
      }
    });
  };

  getAccessToken = () => {
    return this.accessToken;
  };

  getIdToken = () => {
    return this.idToken;
  };

  setSession = (authResult) => {

    localStorage.removeItem("current_user");
    localStorage.removeItem("selected_channel");

    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    localStorage.setItem("token", this.idToken);

    this.history.replace("/");
  };

  renewSession = () => {
    console.log('Called renewSession')
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout({
          returnTo: process.env.REACT_APP_URI,
          clientID: authConfig.clientId
        });
        console.log(err);
      }
    });
  };

  logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    localStorage.removeItem("token");

    this.auth0.logout({
      return_to: window.location.origin,
    });
    localStorage.removeItem("current_user");
    localStorage.removeItem("selected_channel");
    this.history.replace("/");
  };

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  };
}
