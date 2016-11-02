'use strict'

const Lucid = use('Lucid')

class Tag extends Lucid {

  static rules () {
    return {
      name: 'required|min:1|max:30'
    }
  }

}

module.exports = Tag
