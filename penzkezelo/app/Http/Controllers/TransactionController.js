'use strict'

const Transaction = use('App/Model/Transaction')
const Tag = use('App/Model/Tag')
const User = use('App/Model/User')
const Validator = use('Validator')

class TransactionController {

  * main(req, res) {
    const pageName = 'index'
    const user = req.currentUser
    const chartData = yield this.getUserChartData(user)

    yield res.sendView(pageName, {
      pageName,
      chartData
    })
  }

  * ajaxGetChartData(req, res) {
    const user = req.currentUser
    const chartData = yield this.getUserChartData(user)

    res.json(chartData)
  }

  * getUserChartData(user) {
    const transactions = yield user.transactions().fetch()
    const currency = yield user.currency().fetch()
    const incomes = transactions.filter(t => t.type == 'Bevétel')
    const expenses = transactions.filter(t => t.type == 'Kiadás')
    const balance = incomes.reduce((sum, t) => sum + t.amount, 0) - expenses.reduce((sum, t) => sum + t.amount, 0)

    let date = transactions.toJSON().reduce((max, x) => (new Date(x.date) > max) ? new Date(x.date) : max, null) || new Date()

    let data = {
      balance,
      currency: currency.name,
      labels: [],
      incomeData: [],
      expenseData: []
    }

    for(let i = 0; i < 7; i++) {
      const dateStr = date.toJSON().slice(0,10)
      data.labels.unshift(dateStr)
      const income = incomes.filter(t => t.date == dateStr).reduce((sum, t) => sum + t.amount, 0)
      data.incomeData.unshift(income)
      const expense = expenses.filter(t => t.date == dateStr).reduce((sum, t) => sum + t.amount, 0)
      data.expenseData.unshift(expense)
      date.setDate(date.getDate() - 1)
    }

    return data;
  }

  * list(req, res) {
    const user = req.currentUser
    const transactions = yield Transaction.query().where('user_id', user.id).orderBy('date').with('tags').fetch()
    const pageName = 'transactions'

    yield res.sendView(pageName, {
      pageName,
      transactions: transactions.toJSON()
    })
  }

  * create(req, res) {
    const pageName = 'createTransaction'
    const tags = yield Tag.query().orderBy('name').fetch()
    const date = new Date().toJSON().slice(0, 10);

    yield res.sendView(pageName, {
      pageName,
      tags: tags.toJSON(),
      date
    })
  }

  * doCreate(req, res) {
    const user = req.currentUser
    const data = req.all()

    const sanitizedData = yield Validator.sanitize(data, Transaction.sanitizationRules())

    const validation = yield Validator.validateAll(sanitizedData, Transaction.rules())
    if (validation.fails()) {
      yield req
      .withAll()
      .andWith({ errors: validation.messages() })
      .flash()

      res.redirect('back')
      return
    }

    const transaction = new Transaction()

    transaction.amount = sanitizedData.amount
    transaction.description = sanitizedData.description
    transaction.date = sanitizedData.date
    transaction.type = sanitizedData.type
    transaction.user_id = user.id

    yield transaction.save()

    if (sanitizedData.tags) {
      yield transaction.tags().attach(sanitizedData.tags)
    }

    res.redirect('/transactions')
  }

  * edit(req, res) {
    const transaction = yield Transaction.find(req.param('id'))
    const tags = yield Tag.all()
    const pageName = 'editTransaction'

    yield transaction.related('tags').load()
    yield res.sendView(pageName, {
      pageName,
      transaction: transaction.toJSON(),
      tags: tags.toJSON()
    })
  }

  * doEdit(req, res) {
    const transaction = yield Transaction.find(req.param('id'))

    if (transaction === null) {
      res.notFound('Sorry, transaction not found.')
      return
    }

    const data = req.all()

    const sanitizedData = yield Validator.sanitize(data, Transaction.sanitizationRules())

    const validation = yield Validator.validateAll(sanitizedData, Transaction.rules())
    if (validation.fails()) {
      yield req
      .withAll()
      .andWith({ errors: validation.messages() })
      .flash()

      res.redirect('back')
      return
    }

    transaction.amount = sanitizedData.amount
    transaction.description = sanitizedData.description
    transaction.date = sanitizedData.date
    transaction.type = sanitizedData.type

    if (sanitizedData.tags) {
      yield transaction.tags().sync(sanitizedData.tags)
    } else {
      yield transaction.related('tags').load()
      yield transaction.tags().detach(transaction.toJSON().tags.map(t => t.id))
    }

    yield transaction.save()

    res.redirect('/transactions')
  }

  * doDelete(req, res) {
    const transaction = yield Transaction.find(req.param('id'))

    yield transaction.delete()

    res.redirect('/transactions')
  }

}

module.exports = TransactionController
