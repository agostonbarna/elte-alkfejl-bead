'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  currency () {
    return this.belongsTo('App/Model/Currency')
  }

  transactions () {
    return this.hasMany('App/Model/Transaction')
  }

  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'User.encryptPassword')
    this.addHook('beforeUpdate', 'User.encryptPassword')
  }

  static rules () {
    return {
      username: 'required|unique:users',
      password: 'required',
      currency_id: 'required',
    }
  }

  static rules (id) {
    return {
      username: `required|unique:users,username,id,${id}`,
      password: 'required',
      currency: 'required',
    }
  }

}

module.exports = User
