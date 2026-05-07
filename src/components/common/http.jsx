export const apiURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";


export const adminToken = () => {
  const data = JSON.parse(localStorage.getItem("adminInfo"));
  return data.token;
};

export const userToken = () => {
  const data = JSON.parse(localStorage.getItem("userInfo"));
  return data.token;
};
