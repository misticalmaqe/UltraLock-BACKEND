// Importing necessary modules and libraries
const BaseController = require("./baseController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load environment variables from the .env file
dotenv.config();

// Retrieve environment variables

const SECRETKEY = process.env.DB_SECRETKEY;

// Define UsersController class extending BaseController
class UsersController extends BaseController {
  // Constructor to initialize the UsersController with a model and groupAccount
  constructor(model, groupAccount) {
    // Call the constructor of the base class (BaseController)
    super(model);
    // Assign the groupAccount property
    this.groupAccount = groupAccount;
  }

  // Method to get details of a specific user by ID
  getOne = async (req, res) => {
    const { usersId } = req.params;
    try {
      // Find a user by ID using Sequelize's findByPk method
      const user = await this.model.findByPk(usersId);
      // Respond with JSON containing the found user
      return res.json({ user });
    } catch (err) {
      // Handle errors and respond with an error JSON
      return res.status(400).json({ error: true, msg: err });
    }
  };

  // Method to add a new user
  add = async (req, res) => {
    const newUser = req.body;
    try {
      // Create a new user using Sequelize's create method
      await this.model.create(newUser);
      // Retrieve all users from the database
      const data = await this.model.findAll();
      // Respond with JSON containing the list of users and a success message
      res.json({ user: data, message: "success" });
    } catch (err) {
      // Handle errors and respond with an error JSON
      return res.status(400).json({ error: true, msg: err });
    }
  };

  // Method to edit an existing user
  edit = async (req, res) => {
    const userToAdd = req.body;
    const userToReplace = req.params.id;
    try {
      // Find the user to edit by ID
      const userToEdit = await this.model.findByPk(userToReplace);
      // Update the user's properties using Sequelize's update method
      await userToEdit.update(userToAdd);
      // Retrieve all users from the database
      const data = await this.model.findAll();
      // Respond with JSON containing the list of users and a success message
      res.json({ user: data, message: "success" });
    } catch (err) {
      // Handle errors and respond with an error JSON
      return res.status(400).json({ error: true, msg: err });
    }
  };

  // Method to delete a user by ID
  delete = async (req, res) => {
    let userIdToDelete = req.params.id;
    try {
      // Find the user to delete by ID
      const userToDelete = await this.model.findByPk(userIdToDelete);

      // Check if the user exists
      if (!userToDelete) {
        return res.status(404).json({ message: "User not found" });
      }

      // Delete the user from the database
      await userToDelete.destroy();
      // Retrieve all users from the database
      const data = await this.model.findAll();
      // Respond with JSON containing the list of users and a success message
      res.json({ users: data, message: "success" });
    } catch (err) {
      // Log the error and respond with an error JSON
      console.error(err);
      res.status(500).json({ message: "Error deleting user" });
    }
  };

  // Method to get shared accounts for a user by ID
  getShared = async (req, res) => {
    const { id } = req.params;
    try {
      // Find shared accounts for a user using Sequelize's findAll method
      const sharedAccount = await this.model.findAll({
        where: { id },
        include: this.groupAccount,
      });
      // Respond with JSON containing the shared accounts
      return res.json(sharedAccount);
    } catch (err) {
      // Handle errors and respond with an error JSON
      return res.status(400).json({ error: true, msg: err });
    }
  };

  // Method to add a shared account for a user
  sharedAdd = async (req, res) => {
    const { userId, groupAccountId } = req.body;
    try {
      // Find the user and group account by their respective IDs
      const user = await this.model.findByPk(userId);
      const groupAccount = await this.groupAccount.findByPk(groupAccountId);

      // Add the group account to the user using Sequelize's addGroupAccount method
      await user.addGroupAccount(groupAccount);

      // Respond with JSON containing the user, group account, and a success message
      res.json({ user, groupAccount, message: "success" });
    } catch (err) {
      // Handle errors and respond with an error JSON
      return res.status(400).json({ error: true, msg: err });
    }
  };

  // Method to edit shared accounts for a user
  sharedEdit = async (req, res) => {
    const { userId, groupAccountId } = req.body;
    try {
      // Find the user and group account by their respective IDs
      const user = await this.model.findByPk(userId);
      const groupAccount = await this.groupAccount.findByPk(groupAccountId);

      // Update the user's group accounts using Sequelize's setGroupAccounts method
      await user.setGroupAccounts(groupAccount);

      // Respond with JSON containing the user, group account, and a success message
      res.json({ user, groupAccount, message: "success" });
    } catch (err) {
      // Handle errors and respond with an error JSON
      return res.status(400).json({ error: true, msg: err });
    }
  };

  // Method to delete a shared account for a user
  sharedDelete = async (req, res) => {
    const { userId, groupAccountId } = req.body;
    try {
      // Find the user and group account by their respective IDs
      const user = await this.model.findByPk(userId);
      const groupAccount = await this.groupAccount.findByPk(groupAccountId);

      // Remove the group account from the user using Sequelize's removeGroupAccounts method
      await user.removeGroupAccounts(groupAccount);

      // Respond with JSON containing the user, group account, and a success message
      res.json({ user, groupAccount, message: "success" });
    } catch (err) {
      // Handle errors and respond with an error JSON
      return res.status(400).json({ error: true, msg: err });
    }
  };

  // Method for user sign up / sign in using JWT
  jwtSignUp = async (req, res) => {
    const { email, password } = req.body;

    // Data validation to confirm
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: true, msg: "Missing basic information" });
    }

    try {
      // Check if the email already exists
      const existingUser = await this.model.findOne({ where: { email } });

      if (existingUser) {
        return res.status(409).json({
          error: true,
          msg: "Email already in use. Please use a different email address.",
        });
      }

      // Hash password
      const saltRounds = parseInt(process.env.DB_SALT);
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user
      const newUser = await this.model.create({
        email,
        password: hashedPassword,
      });

      const payload = {
        id: newUser.id,
        email,
      };

      const token = jwt.sign(payload, SECRETKEY, {
        expiresIn: "10mins",
      });

      return res.json({ success: true, token, payload });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, msg: "Error creating user" });
    }
  };

  // Method for user sign in using JWT
  jwtSignIn = async (req, res) => {
    const { email, password } = req.body;

    // Data validation to confirm
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: true, msg: "Missing basic information" });
    }

    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: true, msg: "User not found" });
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      return res.status(403).json({ error: true, msg: "Invalid password" });
    }

    const payload = {
      id: user.id,
      email,
    };

    const token = jwt.sign(payload, SECRETKEY, {
      expiresIn: "10mins",
    });

    return res.json({ success: true, token, payload });
  };

  // Method to update a user's password
  updatePassword = async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    console.log("Received request to update password:", {
      userId,
      currentPassword,
      newPassword,
    });

    try {
      // Find the user by ID
      const userToUpdate = await this.model.findByPk(userId);

      // Verify the current password
      const compare = await bcrypt.compare(
        currentPassword,
        userToUpdate.password
      );

      if (!compare) {
        console.log("Current password is incorrect");
        return res
          .status(403)
          .json({ error: true, msg: "Current password is incorrect" });
      }

      // Hash the new password
      const saltRounds = parseInt(process.env.DB_SALT);
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update the user's password in the database
      await userToUpdate.update({ password: hashedNewPassword });

      console.log("Password updated successfully");

      return res.json({ success: true, msg: "Password updated successfully" });
    } catch (err) {
      console.error("Error updating password:", err);
      return res
        .status(500)
        .json({ error: true, msg: "Error updating password" });
    }
  };

  changePassword = async (req, res) => {
    const { password } = req.body;
    console.log(password);
    const saltRounds = parseInt(process.env.DB_SALT);

    const user = req.params.userid;
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // Find the user to edit by ID
      const userToEdit = await this.model.findByPk(user);
      // Update the user's properties using Sequelize's update method
      const data = await userToEdit.update({ password: hashedPassword });
      // Respond with JSON containing the list of users and a success message
      res.json({ user: data, message: "success" });
    } catch (err) {
      // Handle errors and respond with an error JSON
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

// Export the UsersController class
module.exports = UsersController;
