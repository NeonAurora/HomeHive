import axios from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

export const api = axios.create({
  baseURL: "http://localhost:8200/api"
});

export const getAllProperties = async() =>{
  try {
    const response = await api.get("/residency/allresd", {
      timeout: 10 * 1000,
    });

    if(response.status === 400 || response.status === 500)
    {
      throw response.data;
    }
    return response.data;
  }
  catch (error){
    toast.error("Something Went Wrong");
    throw error;
  }
};

export const getProperty = async(id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });

    if(response.status === 400 || response.status === 500)
    {
      throw response.data;
    }
    return response.data;
  }
  catch (error){
    toast.error("Something Went Wrong");
    throw error;
  }
};

export const makeOffer = async (offerData) => {
  try {
    const response = await api.post("/buyer/makeOffer", offerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create user (register)
export const registerUser = async (registerData) => {
  try {
    const response = await api.post('/user/register', registerData, { timeout: 10000 });
    return response.data;
  } catch (error) {
    toast.error('Registration failed');
    throw error;
  }
};

// Login user
export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/user/login', loginData, { timeout: 10000 });
    return response.data;
  } catch (error) {
    toast.error('Login failed');
    throw error;
  }
};

// NEW: Update property
export const updateProperty = async (id, updatedData) => {
  try {
    // PUT request to /residency/:id
    const response = await api.put(`/residency/${id}`, updatedData, {
      timeout: 10000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }

    return response.data;
  } catch (error) {
    toast.error('Failed to update property');
    throw error;
  }
};
