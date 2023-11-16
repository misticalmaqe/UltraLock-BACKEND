const BaseController = require('./baseController');

class GroupAccountsController extends BaseController {
  constructor(model, user) {
    super(model);
    this.user = user;
  }

  getOne = async (req, res) => {
    const { groupAccountId } = req.params;
    try {
      const groupAccount = await this.model.findByPk(groupAccountId);
      return res.json(groupAccount);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  add = async (req, res) => {
    const newGroupAccount = req.body;
    try {
      await this.model.create(newGroupAccount);
      const data = await this.model.findAll();
      res.json({ groupAccount: data, message: 'success' });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  edit = async (req, res) => {
    const groupAccountToAdd = req.body;
    const groupAccountToReplace = req.params.id;
    try {
      const groupAccountToEdit = await this.model.findByPk(
        groupAccountToReplace
      );
      await groupAccountToEdit.update(groupAccountToAdd);
      const data = await this.model.findAll();
      res.json({ groupAccount: data, message: 'success' });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  delete = async (req, res) => {
    let groupAccountIdToDelete = req.params.id;
    try {
      const groupAccountToDelete = await this.model.findByPk(
        groupAccountIdToDelete
      );
      await groupAccountToDelete.destroy();
      const data = await this.model.findAll();
      res.json({ groupAccounts: data, message: 'success' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting user' });
    }
  };
}

module.exports = GroupAccountsController;
