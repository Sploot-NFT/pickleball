import config from '../../../../../config.json';

/** @type {import('./[code]').RequestHandler} */
export async function get({ params }) {   
    if (params.code && params.verifier) { // Make sure parameters are present
      const response = await fetch("https://api.twitter.com/2/oauth2/token", {
        method: "POST",
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: params.code,
          redirect_uri: config.hosted_url,
          client_id: config.twitter_client_id,
          code_verifier: params.verifier,
        })
      });

      const json = await response.json();
      return {status: 201, body: json};
    }
   
    return {
      status: 404,
    };
  }