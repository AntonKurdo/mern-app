const {Router} = require('express');
const shortid = require('shortid');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');
const router = Router();
const config = require('config');
router 
  .post('/generate', auth, async(req, res) => {
    try {
      const baseUrl = config.get('baseUrl');
      const {from} = req.body;
      const code = shortid.generate();
      const existing =  await Link.findOne({from});     
      if(existing) {
        return res.json({
          message: 'This link is existing...',
          link: existing});
      };
      const to = baseUrl + '/t/' + code;     
      const link = new Link({code, to, from, owner: req.user.userId});     
      await link.save();
      res
        .status(201)
        .json({
          message: 'Link has been added!...', 
          link
        });

    } catch(err) {
      res
        .status(500)
        .json({message: 'Something went wrong, try again!'})
    }
  })
  .get('/', auth, async(req, res) => {
    try {
      const links = await Link.find({owner: req.user.userId}); 
      res.json(links);
    } catch(err) {
      res
        .status(500)
        .json({message: 'Something went wrong, try again!'})
    }
  })
  .get('/:id', auth, async(req, res) => {
    try {
      const link = await Link.findById(req.params.id);
      res.json(link);
    } catch(err) {
      res
        .status(500)
        .json({message: 'Something went wrong, try again!'})
    }
  })
  

module.exports = router;