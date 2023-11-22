const express = require('express');
const router = express.Router();

class GroupAccountsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes = () => {
    //to get all
    router.get('/', this.controller.getAll);
    router.get(
      '/personal/:groupAccountIds',
      this.controller.getMultiplePersonal
    );
    router.get('/:groupAccountId', this.controller.getOne);
    router.post('/', this.controller.add);
    router.put('/:id', this.controller.edit);
    router.delete('/:id', this.controller.delete);
    return router;
  };
}

module.exports = GroupAccountsRouter;
