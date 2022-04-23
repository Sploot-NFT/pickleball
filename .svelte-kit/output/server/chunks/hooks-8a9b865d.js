async function handle({ event, resolve }) {
  const response = await resolve(event, {
    ssr: false,
    transformPage: ({ html }) => html.replace("old", "new")
  });
  return response;
}
export { handle };
