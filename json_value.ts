import { JSONObject } from './json_object.ts'
import { JSONArray } from './json_array.ts'

/**
 * JSONValue is a value parsed from the JSON text.
 */
export type JSONValue = string | number | JSONObject | JSONArray | boolean | null
