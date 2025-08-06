import axios from "axios";
export const BASE_URL ="http://localhost:3001";

//signin
export const loginCustomer = async (admin) => {
    const response = await axios.post(`${BASE_URL}/customer/login`, admin);
    return response.data;
};

//signup
export const Customersignup = async (data) => {
    const response = await axios.post(`${BASE_URL}/customer`, data);
    return response.data;
}
//fetch all files
export const fetchFiles = async () => {
  const response = await axios.get(`${BASE_URL}/filestorage`);
  return response.data;
};

