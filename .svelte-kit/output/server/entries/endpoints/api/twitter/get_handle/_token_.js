async function get({ params }) {
  if (params.token) {
    const response = await fetch("https://api.twitter.com/2/users/me?user.fields=username", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${params.token}`
      }
    });
    const json = await response.json();
    return { status: 200, body: json };
  }
  return {
    status: 404
  };
}
export { get };
