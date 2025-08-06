import axios from "axios";
import Swal from "sweetalert2";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


//upload file
export const uploadFile = async (data) => {
   try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}/filestorage`, data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire("Success", "File uploaded successfully", "success");
    return response.data;
  } catch (error) {
    Swal.fire("Error", "Failed to upload file", "error");
    console.error(error);
  }
};

//signin
export const loginCustomer = async (admin) => {
  const response = await axios.post(`${BASE_URL}/customer/login`, admin);
  return response.data;
};

//signup
export const Customersignup = async (data) => {
  const response = await axios.post(`${BASE_URL}/customer`, data);
  return response.data;
};

//fetch all files
export const fetchFiles = async () => {
  const customerDetails = JSON.parse(localStorage.getItem("customerDetails"));
  const customerId = customerDetails?._id;
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/filestorage`, {
    params: { customerId },
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};

//delete file by id
export const deleteFile = async (id, onSuccess) => {
  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "This file will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (confirm.isConfirmed) {
    try {
        const token = localStorage.getItem("token");
      const response = await axios.delete(`${BASE_URL}/filestorage/${id}`,{
         headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire("Deleted!", "The file has been deleted.", "success");
      if (onSuccess) {
        onSuccess(); 
      }

      return response.data;
    } catch (error) {
      Swal.fire("Error!", "Something went wrong while deleting.", "error");
      console.error(error);
    }
  }
};


//get file by id
export const getFileById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/filestorage/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};