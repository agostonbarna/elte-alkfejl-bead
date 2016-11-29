'use strict'

const Tag = use('App/Model/Tag')
const Validator = use('Validator')

class TagController {
  * list(req, res) {
    const tags = yield Tag.query().orderBy('name').fetch()
    const pageName = 'tags'

    yield res.sendView(pageName, {
      pageName,
      tags: tags.toJSON()
    })
  }

  * create(req, res) {
    const pageName = 'createTag'

    yield res.sendView(pageName, {
      pageName
    })
  }

  * doCreate(req, res) {
    const data = req.all()
    const validation = yield Validator.validateAll(data, Tag.rules())

    if (validation.fails()) {
      yield req
      .withAll()
      .andWith({ errors: validation.messages() })
      .flash()

      res.redirect('back')
      return
    }

    const tag = new Tag()
    tag.name = data.name

    yield tag.save()

    res.redirect('/tags')
  }

  * edit(req, res) {
    const tag = yield Tag.find(req.param('id'))
    const pageName = 'editTag'

    if (tag === null) {
      res.notFound('Sorry, tag not found.')
      return
    }

    yield res.sendView(pageName, {
      pageName,
      tag: tag.toJSON()
    })
  }

  * doEdit(req, res) {
    const tag = yield Tag.find(req.param('id'))

    if (tag === null) {
      res.notFound('Sorry, tag not found.')
      return
    }

    const data = req.all()

    const validation = yield Validator.validateAll(data, Tag.rules())
    if (validation.fails()) {
      yield req
      .withAll()
      .andWith({ errors: validation.messages() })
      .flash()

      res.redirect('back')
      return
    }

    tag.name = data.name

    yield tag.save()

    res.redirect('/tags')
  }

  * doDelete(req, res) {
    const tag = yield Tag.find(req.param('id'))

    yield tag.delete()

    res.redirect('/tags')
  }

  * ajaxDelete(req, res) {
    if (req.ajax()) {
      const tag = yield Tag.find(req.param('id'))

      yield tag.delete()

      res.ok({ success: true })
    }
  }
}

module.exports = TagController
