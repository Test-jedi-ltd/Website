const getApiEndpoint = (endpoint) => {
  const hostname = window.location.hostname;
  if (hostname === "test-jedi.com" || hostname === "www.test-jedi.com") {
    return `https://test-jedi-nine.vercel.app/api/${endpoint}`;
  }
  return `/api/${endpoint}`;
};

export default getApiEndpoint;
