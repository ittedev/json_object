import { JSONPrimitive } from './json_primitive.ts'
import { JSONObject } from './json_object.ts'
import { JSONArray } from './json_array.ts'

/**
 * JSONValue is a value parsed from the JSON text.
 */
export type JSONValue = JSONPrimitive | JSONObject | JSONArray
