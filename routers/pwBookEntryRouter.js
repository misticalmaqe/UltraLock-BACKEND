const express = require('express');
const router = express.Router();

class PwBookEntryRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes = () => {
    //to get all
    router.get('/', this.controller.getAll);
    router.get('/:passwordbookEntryId', this.controller.getOne);
    router.get('/allpw/:userId', this.controller.getByUserId);
    router.get('/allpwbgid/:groupAccountId', this.controller.getByGroupId);
    router.post(
      '/allpwbgidSA/:groupAccountId',
      this.controller.getByGroupIdForSA
    );
    router.post('/', this.controller.add);
    router.put('/:id', this.controller.edit);
    router.delete('/:id', this.controller.delete);
    router.delete('/pwBookD/:groupAccountId', this.controller.deleteByGroupAId);
    return router;
  };
}

module.exports = PwBookEntryRouter;
