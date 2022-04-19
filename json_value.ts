import { JSONObject } from './json_object.ts'
import { JSONArray } from './json_array.ts'

export type JSONValue = string | number | boolean | null | JSONObject | JSONArray
