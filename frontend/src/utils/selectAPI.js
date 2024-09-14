export const selectAPI = () => {
  const mode = import.meta.env.VITE_MODE;
  const apiURL =
    mode === "dev"
      ? import.meta.env.VITE_BASE_API_URL_DEV
      : mode === "prod"
      ? import.meta.env.VITE_BASE_API_URL_PROD
      : null;
  return apiURL;
};
