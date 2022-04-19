export type JSONValue = string | number | boolean | null | Item | ValueArray
export type JSONArray = Array<JSONValue>
export type JSONObject = {
  [key: string]: JSONValue
}

export type Item = JSONObject

export type Collection = Array<Item>

export type Range = Collection
