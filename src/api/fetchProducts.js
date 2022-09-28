import axios from 'axios';

import { API_KEY, API_URL } from '@app/constants';

export const fetchProducts1 = async () => {
  try {
    const response = await axios.post(API_URL, '', {
      headers: {
        Authorization: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Error:', error.message);
    return error.message;
  }
};

export const fetchProducts2 = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Error:', error.message);
    return error.message;
  }
};

export const fetchProductDetail = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Error:', error.message);
    return error.message;
  }
};
