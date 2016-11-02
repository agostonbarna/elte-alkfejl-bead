'use strict'

const Schema = use('Schema')

class TransactionsTableSchema extends Schema {

  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.integer('amount').notNullable()
      table.string('description', 60)
      table.string('type', 30).notNullable()
      table.date('date')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('transactions')
  }

}

module.exports = TransactionsTableSchema
