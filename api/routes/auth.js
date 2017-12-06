const express = require('express')
const User = require('../models/User')
const authMiddleware = require('../middleware/auth')

const router = new express.Router()

// Register
router.post('/auth/register',
/* middleware that handles the registration process */
  authMiddleware.register,
  /* json handler */
  (req, res) => {
    res.json({
        user: req.user
    })
  }
)

router.post('/auth',
/* middleware that handles the sign in */
  authMiddleware.signIn,
  /* json handler */
  (req, res) => {
    res.json({
      user: req.user
    })
  }
)

module.exports = router