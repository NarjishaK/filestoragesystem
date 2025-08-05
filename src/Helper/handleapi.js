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
//fetch logo
export const fetchLogo = async () => {
    const response = await axios.get(`${BASE_URL}/logo`);
    return response.data;
}

