// OpenAI Service for MoneySprout
// This is a mock implementation. In production, you would use the actual OpenAI API

// services/gemini.js

// For React Native simulator/emulator, use localhost
// For physical device, replace with your computer's IP address
const API_BASE_URL = 'http://localhost:5000';

export const geminiService = {
  /**
   * Generate response from Gemini AI
   * @param {string} message - The user's message
   * @returns {Promise<{text: string}>} The AI response
   */
  async generateResponse(message) {
    try {
      console.log('Sending message to Gemini backend:', message);
      
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Return in the same format your component expects
      return {
        text: data.response || 'No response received'
      };
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  },

  /**
   * Check backend health status
   * @returns {Promise<{status: string}>} Health status
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      console.log('Backend health:', data);
      return data;
    } catch (error) {
      console.error('Backend health check failed:', error);
      throw error;
    }
  }
};