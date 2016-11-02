'use strict'

const User = use('App/Model/User')
const Currency = use('App/Model/Currency')
const Validator = use('Validator')

class UserController {
  * notLoggedIn(req, res) {
    const pageName = 'notLoggedIn'

    yield res.sendView(pageName)
  }

  * login(req, res) {
    const pageName = 'login'

    yield res.sendView(pageName)
  }

  * doLogin(req, res) {
    const username = req.input('username')
    const password = req.input('password')

    try {
      yield req.auth.attempt(username, password)
    } catch (e) {
      yield req.withOut('password').andWith({error: e.message}).flash()
      res.redirect('back')
    }

    res.redirect('/')
  }

  * doLogout(req, res) {
    yield req.auth.logout()

    res.redirect('/')
  }

  * signup(req, res) {
    const currencies = yield Currency.all()
    const pageName = 'signup'

    yield res.sendView(pageName, {
      currencies: currencies.toJSON(),
    })
  }

  * doSignup(req, res) {
    const data = req.all()
    const validation = yield Validator.validateAll(data, User.rules())

    if (validation.fails()) {
      yield req
      .withAll()
      .andWith({ errors: validation.messages() })
      .flash()

      res.redirect('back')
      return
    }

    const user = new User()
    user.username = data.username
    user.password = data.password

    const currency = yield Currency.find(data.currency)
    user.currency().associate(currency)

    yield user.save()
    yield req.auth.login(user)

    res.redirect('/')
  }

  * edit(req, res) {
    const user = req.currentUser
    const pageName = 'editUser'

    const currencies = yield Currency.all()

    yield res.sendView(pageName, {
      pageName,
      user: user.toJSON(),
      currencies: currencies.toJSON(),
    })
  }

  * doEdit(req, res) {
    const user = req.currentUser

    const data = req.all()
    const validation = yield Validator.validateAll(data, User.rules(user.id))

    if (validation.fails()) {
      yield req
      .withAll()
      .andWith({ errors: validation.messages() })
      .flash()

      res.redirect('back')
      return
    }

    user.username = data.username
    user.password = data.password

    const currency = yield Currency.find(data.currency)
    user.currency().associate(currency)

    yield user.save()

    res.redirect('/')
  }

  * doDelete(req, res) {
    const user = req.currentUser

    yield user.delete()

    res.redirect('/')
  }
}

module.exports = UserController
