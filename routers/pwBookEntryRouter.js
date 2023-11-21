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
    router.post('/allpwbgid/:groupAccountId', this.controller.getByGroupId);
    router.post('/', this.controller.add);
    router.put('/:id', this.controller.edit);
    router.delete('/:id', this.controller.delete);
    return router;
  };
}

module.exports = PwBookEntryRouter;
