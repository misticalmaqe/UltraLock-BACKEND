const BaseController = require('./baseController');

class UsersController extends BaseController {
  constructor(model, groupAccount) {
    super(model);
    this.groupAccount = groupAccount;
  }

  getOne = async (req, res) => {
    const { usersId } = req.params;
    try {
      const user = await this.model.findByPk(usersId);
      return res.json({ user });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  add = async (req, res) => {
    const newUser = req.body;
    try {
      await this.model.create(newUser);
      const data = await this.model.findAll();
      res.json({ user: data, message: 'success' });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  edit = async (req, res) => {
    const userToAdd = req.body;
    const userToReplace = req.params.id;
    try {
      const userToEdit = await this.model.findByPk(userToReplace);
      await userToEdit.update(userToAdd);
      const data = await this.model.findAll();
      res.json({ user: data, message: 'success' });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  delete = async (req, res) => {
    let userIdToDelete = req.params.id;
    try {
      const userToDelete = await this.model.findByPk(userIdToDelete);

      if (!userToDelete) {
        return res.status(404).json({ message: 'User not found' });
      }

      await userToDelete.destroy();
      const data = await this.model.findAll();
      res.json({ users: data, message: 'success' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting user' });
    }
  };

  getShared = async (req, res) => {
    const { id } = req.params;
    try {
      const sharedAccount = await this.model.findAll({
        where: { id },
        include: this.groupAccount,
      });
      return res.json(sharedAccount);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  sharedAdd = async (req, res) => {
    const { userId, groupAccountId } = req.body;
    try {
      const user = await this.model.findByPk(userId);
      const groupAccount = await this.groupAccount.findByPk(groupAccountId);

      await user.addGroupAccount(groupAccount);

      res.json({ user, groupAccount, message: 'success' });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  sharedEdit = async (req, res) => {
    const { userId, groupAccountId } = req.body;
    try {
      const user = await this.model.findByPk(userId);
      const groupAccount = await this.groupAccount.findByPk(groupAccountId);

      await user.setGroupAccounts(groupAccount);

      res.json({ user, groupAccount, message: 'success' });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  sharedDelete = async (req, res) => {
    const { userId, groupAccountId } = req.body;
    try {
      const user = await this.model.findByPk(userId);
      const groupAccount = await this.groupAccount.findByPk(groupAccountId);

      await user.removeGroupAccounts(groupAccount);

      res.json({ user, groupAccount, message: 'success' });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = UsersController;
