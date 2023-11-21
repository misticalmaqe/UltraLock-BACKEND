const BaseController = require('./baseController');

class PwBookEntryController extends BaseController {
  constructor(model) {
    super(model);
  }

  getOne = async (req, res) => {
    const { passwordbookEntryId } = req.params;
    try {
      const passwordbookEntry = await this.model.findByPk(passwordbookEntryId);
      return res.json(passwordbookEntry);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
      const passwordbookEntry = await this.model.findAll({
        where: { userId: userId },
      });
      return res.json(passwordbookEntry);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getByGroupId = async (req, res) => {
    const { groupAccountId } = req.params;
    try {
      const passwordbookEntry = await this.model.findAll({
        where: { groupAccountId: groupAccountId },
      });
      return res.json(passwordbookEntry);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  add = async (req, res) => {
    const newPwBookEntry = req.body;
    try {
      await this.model.create(newPwBookEntry);
      const data = await this.model.findAll();
      res.json({ pwbookEntry: data, message: 'success' });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  edit = async (req, res) => {
    const pwBookToAdd = req.body;
    const pwBookToReplace = req.params.id;
    try {
      const pwBookToEdit = await this.model.findByPk(pwBookToReplace);
      await pwBookToEdit.update(pwBookToAdd);
      const data = await this.model.findAll();
      res.json({ pwBookEntry: data, message: 'success' });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  delete = async (req, res) => {
    let pwBookIdToDelete = req.params.id;
    try {
      const pwBookToDelete = await this.model.findByPk(pwBookIdToDelete);
      await pwBookToDelete.destroy();
      res.json({ message: 'success' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Error deleting user' });
    }
  };
}

module.exports = PwBookEntryController;
