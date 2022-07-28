import { JSONValue } from './json_value.ts'

/**
 * JSONObject is an object with JSONValue as a property value.
 */
export type JSONObject = {
  [key: string]: JSONValue | undefined
}
