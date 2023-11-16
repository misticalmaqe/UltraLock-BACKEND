const express = require('express');
const router = express.Router();

class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes = () => {
    //for users
    router.get('/', this.controller.getAll);
    router.get('/:usersId', this.controller.getOne);
    router.post('/', this.controller.add);
    router.put('/:id', this.controller.edit);
    router.delete('/:id', this.controller.delete);

    //for shared accounts
    router.get('/shared/:id', this.controller.getShared);
    router.post('/shared/', this.controller.sharedAdd);
    router.put('/shared/:id', this.controller.sharedEdit);

    return router;
  };
}

module.exports = UsersRouter;
