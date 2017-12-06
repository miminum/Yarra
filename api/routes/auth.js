const express = require('express')
const User = require('../models/User')
const authMiddleware = require('../middleware/auth')

const router = new express.Router()

// Register
router.post('/auth/register',
/* middleware that handles the registration process */
  authMiddleware.register,
  /* json handler */
  authMiddleware.signJWTForUser
)

router.post('/auth',
/* middleware that handles the sign in */
  authMiddleware.signIn,
  /* json handler */
  authMiddleware.signJWTForUser
)

module.exports = router