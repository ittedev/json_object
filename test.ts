import { JSONObject } from './mod.ts'

const json = '{"text":"I understand","len":12}'

const data = JSON.parse(json) as JSONObject

console.log(data)