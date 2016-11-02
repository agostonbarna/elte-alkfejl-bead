'use strict'

const Schema = use('Schema')

class TransactionTagTableSchema extends Schema {

  up () {
    this.create('transaction_tag', (table) => {
      table.increments()
      table.integer('transaction_id').unsigned().references('id').inTable('transactions')
      table.integer('tag_id').unsigned().references('id').inTable('tags')
      table.timestamps()
    })
  }

  down () {
    this.drop('transaction_tag')
  }

}

module.exports = TransactionTagTableSchema
