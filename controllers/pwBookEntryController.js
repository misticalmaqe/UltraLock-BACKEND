const BaseController = require('./baseController');

class PwBookEntryController extends BaseController {
  constructor(model) {
    super(model);
  }

  //get passwordbook entry by Id
  getOne = async (req, res) => {
    const { passwordbookEntryId } = req.params;
    try {
      const passwordbookEntry = await this.model.findByPk(passwordbookEntryId);
      return res.json(passwordbookEntry);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  //get all passwordbook entries by user Id
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

  //get all passwordbook entries by groupAccount Id
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

  //get multiple passwordbook entries by groupAccount Ids
  getByGroupIdForSA = async (req, res) => {
    const { groupAccountId } = req.params;
    const userId = req.body;
    //extract out the value and put into userIdValue
    const userIdValue = userId.userId;
    try {
      const idsArray = groupAccountId.split(',');

      const passwordbookEntry = await this.model.findAll({
        where: { groupAccountId: idsArray, userId: userIdValue },
      });
      return res.json(passwordbookEntry);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  //create passwordbook entry
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

  //edit passwordbook entry
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

  //delete passwordbook entry
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

  //delete passwordbook entries by group Id
  deleteByGroupAId = async (req, res) => {
    let groupAccountId = req.params;
    console.log(groupAccountId);
    try {
      const pwBooksToDelete = await this.model.findByAll({
        where: groupAccountId,
      });
      await pwBooksToDelete.destroy();
      res.json({ message: 'success' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Error deleting user' });
    }
  };
}

module.exports = PwBookEntryController;
