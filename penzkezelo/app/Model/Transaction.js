'use strict'

const Lucid = use('Lucid')

class Transaction extends Lucid {

  tags () {
    return this.belongsToMany('App/Model/Tag')
  }

  user () {
    return this.belongsTo('App/Model/User')
  }

  static rules () {
    return {
      amount: 'required|integer|above:0',
      description: 'max:60',
      date: 'required|date',
      type: 'required',
      'tags.*': 'required|integer'
    }
  }

  static sanitizationRules () {
    return {
      amount: 'to_int',
      'tags.*': 'to_int'
    }
  }

}

module.exports = Transaction
