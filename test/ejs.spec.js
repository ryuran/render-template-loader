import compiler from './compiler.js'
import helpers from './helpers'
import path from 'path'

test('Renders an Ejs template', async () => {
  const options = {
    engine: 'ejs',
    locals: {
      title: 'Ejs Template',
      desc: 'A template rendered by Ejs'
    },
    engineOptions: {}
  }

  const stats = await compiler('data/source.ejs', options)
  const output = stats.toJson().modules[0].source
  const source = helpers.value(output)

  expect(source).toContain('<h1>Ejs Template</h1>')
  expect(source).toContain('<h2>A template rendered by Ejs</h2>')
})

test('Renders an Ejs template with partial (views)', async () => {
  const options = {
    engine: 'ejs',
    locals: {
      title: 'Ejs Template',
      desc: 'A template rendered by Ejs'
    },
    engineOptions: {
      views: [ path.resolve(__dirname, 'data') ]
    }
  }

  const stats = await compiler('data/source-with-partial.ejs', options)
  const output = stats.toJson().modules[0].source
  const source = helpers.value(output)

  expect(source).toContain('<h1>Ejs Template</h1>')
  expect(source).toContain('<h2>A template rendered by Ejs</h2>')
})

test('Renders an Ejs template with partial (filename)', async () => {
  const options = {
    engine: 'ejs',
    locals: {
      title: 'Ejs Template',
      desc: 'A template rendered by Ejs'
    },
    engineOptions: function (info) {
      return { filename: info.filename }
    }
  }

  const stats = await compiler('data/source-with-partial.ejs', options)
  const output = stats.toJson().modules[0].source
  const source = helpers.value(output)

  expect(source).toContain('<h1>Ejs Template</h1>')
  expect(source).toContain('<h2>A template rendered by Ejs</h2>')
})
