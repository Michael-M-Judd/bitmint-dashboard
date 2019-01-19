const getApiUrl = () => {
  let apiUrl = "/api";

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:9001/api";
  }

  return apiUrl;
};

export const apiUrl = getApiUrl();
