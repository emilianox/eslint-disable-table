#!/usr/bin/env node

'use strict'

const program = require('commander')
const getTable = require('../src')
const generateTable = require('../src/generateTable')

function commaSeparatedList (value, dummyPrevious) {
  if (!value) {
    return []
  }
  return value.split(',')
}

program
  .option('-d, --directory <dir>', 'directory to inspect', process.cwd())
  .option('-j, --json', 'output json', false)
  .option('-e, --exclude <exclude>', 'exclude patterns, comma separated list', commaSeparatedList)

program.on('--help', () => {
  console.log('')
  console.log('Examples:')
  console.log('')
  console.log('  $ eslint-disable-table -j > table.json')
  console.log('  $ eslint-disable-table -e .nycoutput, coverage')
  console.log('  $ eslint-disable-table -d ~/all-my-projects')
})

program.parse(process.argv)

getTable(program.directory, program.exclude)
  .then(res => {
    let output = JSON.stringify(res, null, 4)
    if (!program.json) {
      output = generateTable(res, program.directory)
    }
    console.log(output)
  })
  .catch(e => {
    console.log(e)
    process.exit(1)
  })