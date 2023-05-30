import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api'; // Replace with your actual backend URL

const gatePassApi = {
  fetchPendingRequests: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/pending-requests`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pending requests:', error);
      throw error;
    }
  },
  
  updateGatePassStatus: async (requestId, status) => {
    try {
      const response = await axios.put(`${BASE_URL}/requests/${requestId}`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating gate pass status:', error);
      throw error;
    }
  },
  
  submitGatePassApplication: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/gate-passes`, formData);
      return response.data;
    } catch (error) {
      console.error('Error submitting gate pass application:', error);
      throw error;
    }
  },
  
  fetchGatePassDetails: async (gatePassId) => {
    try {
      const response = await axios.get(`${BASE_URL}/gate-passes/${gatePassId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching gate pass details:', error);
      throw error;
    }
  },
  
  // Add more API functions as needed
};

export default gatePassApi;
