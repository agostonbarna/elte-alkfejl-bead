'use strict'

const Lucid = use('Lucid')

class Currency extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

}

module.exports = Currency
