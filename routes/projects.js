const router = require('express').Router();
const verify = require('./verifyToken')
const projects = [
  {
    username: 'vedo01',
    projects: {
      name: 'vedos project',
      description: 'this is vedats project data '
    }
  },
  {
    username: 'sedo01',
    projects: {
      name: 'my first project',
      description: 'this is sedos project data '
    }
  }
]

router.get('/', verify, (req, res) => {

  res.json({
    projects: {
      name: 'my first project',
      description: 'this is project data you shouldnt access'
    }
  });
});

module.exports = router;