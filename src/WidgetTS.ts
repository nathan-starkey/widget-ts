import { WString as String } from "./json/String.js";
import { WEnumString as EnumString } from "./json/EnumString.js";
import { WMultiLineString as MultiLineString } from "./json/MultiLineString.js";
import { WNumber as Number } from "./json/Number.js";
import { WBoolean as Boolean } from "./json/Boolean.js";
import { WButton as Button } from "./json/Button.js";
import { WOutput as Output } from "./json/Output.js";
import { WObserver as Observer } from "./json/Observer.js";
import { WArray as Array } from "./json/Array.js";
import { WObject as Object } from "./json/Object.js";

export default {
  json: {
    String,
    EnumString,
    MultiLineString,
    Number,
    Boolean,
    Button,
    Output,
    Observer,
    Array,
    Object
  }
};