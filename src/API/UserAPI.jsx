import axios from "axios";

export const addUser = async user => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/users/add",
      user
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/user/all"
    );
    return response.data; // Return the actual user data from the response
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async id => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/users/${id}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/user/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async id => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/user/all?id=${id}`
    );
    return response.data; // Return the actual user object from the response data
  } catch (error) {
    console.log(error);
  }
};




