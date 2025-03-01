class BaseController {
  constructor(model) {
    this.model = model;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  getAll = async (req, res) => {
    try {
      console.log(req.body);
      const output = await this.model.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  jwtTest = async (req, res) => {
    return res.json({ success: true, msg: 'you got me' });
  };
}

module.exports = BaseController;
