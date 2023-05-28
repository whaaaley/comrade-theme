
import { assertEquals, assertRejects } from 'asserts'
import * as comrade from '../index.js'

Deno.test('loadTheme should parse the JSON file', async () => {
  const expected = {
    message: 'Hello, World!'
  }
  const actual = await comrade.loadTheme('./test/test.json')
  assertEquals(actual, expected)
})

Deno.test('loadTheme should throw an error if the file is not found', async () => {
  const testFunction = async () => {
    await comrade.loadTheme('./test/non-existent.json')
  }
  await assertRejects(testFunction, Deno.errors.NotFound, 'No such file or directory')
})
