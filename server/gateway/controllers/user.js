import axios from "axios";
const userAPI = process.env.USER_URI + "/users";

export const registerUser = async (req, res) => {
  const { firstName, lastName, role, email, password } = req.body;

  axios
    .post(`${userAPI}/register`, {
      firstName,
      lastName,
      role,
      email,
      password,
    })
    .then((response) => {
      res.status(201).json(response.data);
    })
    .catch((error) => {
      res.status(409).json({ message: error.message });
    });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  axios
    .post(`${userAPI}/login`, {
      email,
      password,
    })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

export const getAllUsers = async (req, res) => {
  axios
    .get(`${userAPI}/all`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  axios
    .delete(`${userAPI}/${id}`)
    .then((response) => {
      res.status(200).json({ message: "User deleted successfully" });
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};
