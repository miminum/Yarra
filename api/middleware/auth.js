const passport = require('passport')
const JWT = require('jsonwebtoken')
const User = require('../models/User')
const PassportJwt = require('passport-jwt')

const jwtSecret = 'as09d[2psdk1'
const jwtAlgorithm = 'HS256'
const jwtExpiresIn = '7days'

passport.use(User.createStrategy())

function register(req, res, next) {
  const user = new User ({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  })
  // Create the user with the specified password
  User.register(user, req.body.password, (error, user) => {
    if (error) {
      // Our register middleware failed
      next(error)
      return
    }

    // Store user so we can access it in our handler
    req.user = user
    // Success
    next()
  })
}

passport.use(new PassportJwt.Strategy({
  // Where will the JWT be passed in the HTTP request?
  // e.g. Authorization: Bearer eyJhbGc...
  jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  // What is the secret? 
  secretOrKey: jwtSecret,
  // What algorithm(s) was used to sign it?
  algorithms: [jwtAlgorithm] 
},
  // When we have a verified token
  (payload, done) => {
    User.findById(payload.sub)
      .then((user) => {
        // If user was found with this id
        if (user) {
          done(null, user)
        }
        // If no user was found
        else {
          done(null, false)
        }
      })
      .catch((error) => {
        // If there was a failure
         done(error, false)
      })
  }
))

function signJWTForUser(req, res) {
  // Get he user either just signed in on signed up
  const user = req.user
  // Create a signed token
  const token = JWT.sign({
    // Payload
    email: user.email,
  },
  // Secret
  jwtSecret,
  {
    algorithm: jwtAlgorithm,
    expiresIn: jwtExpiresIn,
    subject: user._id.toString()
  }
  )
  res.json({
    token
  })
}

module.exports = {
  initialize: passport.initialize(),
  register,
  signIn: passport.authenticate('local', { session: false }),
  requireJWT: passport.authenticate('jwt', { session: false }),
  signJWTForUser
}