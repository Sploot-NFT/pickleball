import { c as config } from "../../../../../../chunks/config-1c7ca0cd.js";
async function get({ params }) {
  if (params.code && params.verifier) {
    const response = await fetch("https://api.twitter.com/2/oauth2/token", {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: params.code,
        redirect_uri: config.hosted_url,
        client_id: config.twitter_client_id,
        code_verifier: params.verifier
      })
    });
    const json = await response.json();
    return { status: 201, body: json };
  }
  return {
    status: 404
  };
}
export { get };
