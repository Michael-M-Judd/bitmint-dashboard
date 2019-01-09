const getApiUrl = () => {
  let apiUrl = "http://144.202.56.250:5000/api";

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:5000/api";
  }

  return apiUrl;
};

export const apiUrl = getApiUrl();
