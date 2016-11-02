'use strict'

const Schema = use('Schema')

class CurrenciesTableSchema extends Schema {

  up () {
    this.create('currencies', (table) => {
      table.increments()
      table.string('name', 3).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('currencies')
  }

}

module.exports = CurrenciesTableSchema
