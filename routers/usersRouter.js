const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller, jwtAuth) {
    this.controller = controller;
    this.jwtAuth = jwtAuth;
  }
  routes = () => {
    //jwt routes
    router.get("/jwtTest", this.jwtAuth, this.controller.jwtTest);
    router.post("/jwtsignup", this.controller.jwtSignUp);
    router.post("/jwtsignin", this.controller.jwtSignIn);

    //for users
    router.get("/", this.controller.getAll);
    router.get("/:usersId", this.controller.getOne);
    router.post("/", this.controller.add);
    router.put("/:id", this.controller.edit);
    router.delete("/:id", this.controller.delete);
    //-----------Change Password Route-----------//
    router.post("/changePassword", this.controller.changePassword);
    //for shared accounts
    router.get("/shared/:id", this.controller.getShared);
    router.post("/shared/", this.controller.sharedAdd);
    router.put("/shared/:id", this.controller.sharedEdit);
    router.delete("/shared/:id", this.controller.sharedDelete);

    return router;
  };
}

module.exports = UsersRouter;
