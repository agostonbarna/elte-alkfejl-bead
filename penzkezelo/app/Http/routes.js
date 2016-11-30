'use strict'

const Route = use('Route')

Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.doLogin')
Route.get('/signup', 'UserController.signup')
Route.post('/signup', 'UserController.doSignup')

Route.group('authenticated', () => {
  Route.get('/', 'TransactionController.main')

  Route.get('/logout', 'UserController.doLogout')
  Route.get('/user/edit', 'UserController.edit')
  Route.post('/user/edit', 'UserController.doEdit')
  Route.post('/user/delete', 'UserController.doDelete')

  Route.get('/transactions', 'TransactionController.list')
  Route.get('/transactions/create', 'TransactionController.create')
  Route.post('/transactions/create', 'TransactionController.doCreate')
  Route.post('/transactions/:id/delete', 'TransactionController.doDelete')
  Route.delete('/ajax/transactions/:id/delete', 'TransactionController.ajaxDelete')
  Route.get('/transactions/:id/edit', 'TransactionController.edit')
  Route.post('/transactions/:id/edit', 'TransactionController.doEdit')
  Route.post('/ajax/getTransactionRows', 'TransactionController.getTransactionRows')

  Route.get('/ajax/getChartData', 'TransactionController.ajaxGetChartData')

  Route.get('/tags', 'TagController.list')
  Route.get('/tags/create', 'TagController.create')
  Route.post('/tags/create', 'TagController.doCreate')
  Route.post('/tags/:id/delete', 'TagController.doDelete')
  Route.delete('/ajax/tags/:id/delete', 'TagController.ajaxDelete')
  Route.get('/tags/:id/edit', 'TagController.edit')
  Route.post('/tags/:id/edit', 'TagController.doEdit')
}).middleware('auth')
