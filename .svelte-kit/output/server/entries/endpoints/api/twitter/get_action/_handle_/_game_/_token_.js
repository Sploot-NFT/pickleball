async function get({ params }) {
  if (params.token) {
    return { status: 200, body: { action: "test" } };
  }
  return {
    status: 404
  };
}
export { get };
