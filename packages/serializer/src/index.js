/* eslint-disable no-param-reassign */
import type from '@lowdefy/type';

import stableStringify from './stableStringify';

const makeReplacer = (customReplacer, isoStringDates) => (key, value) => {
  let dateReplacer = (date) => ({ _date: date.valueOf() });
  if (isoStringDates) {
    dateReplacer = (date) => ({ _date: date.toISOString() });
  }
  let newValue = value;
  if (customReplacer) {
    newValue = customReplacer(key, value);
  }
  if (type.isObject(newValue)) {
    Object.keys(newValue).forEach((k) => {
      if (type.isDate(newValue[k])) {
        // shallow copy original value before reassigning a value in order not to mutate original value
        newValue = { ...newValue };
        newValue[k] = dateReplacer(newValue[k]);
      }
    });
    return newValue;
  }
  if (type.isArray(newValue)) {
    return newValue.map((item) => {
      if (type.isDate(item)) {
        return dateReplacer(item);
      }
      return item;
    });
  }
  return newValue;
};

const makeReviver = (customReviver) => (key, value) => {
  let newValue = value;
  if (customReviver) {
    newValue = customReviver(key, value);
  }
  if (type.isObject(newValue) && !type.isUndefined(newValue._date)) {
    if (type.isInt(newValue._date)) {
      return new Date(newValue._date);
    }
    if (newValue._date === 'now') {
      return newValue;
    }
    const result = new Date(newValue._date);
    if (!type.isDate(result)) {
      return newValue;
    }
    return result;
  }
  return newValue;
};

const serialize = (json, options = {}) => {
  if (type.isUndefined(json)) return json;
  if (type.isDate(json)) {
    if (options.isoStringDates) {
      return { _date: json.toISOString() };
    }
    return { _date: json.valueOf() };
  }
  return JSON.parse(JSON.stringify(json, makeReplacer(options.replacer, options.isoStringDates)));
};

const serializeToString = (json, options = {}) => {
  if (type.isUndefined(json)) return json;

  if (type.isDate(json)) {
    if (options.isoStringDates) {
      return `{ "_date": "${json.toISOString()}" }`;
    }
    return `{ "_date": ${json.valueOf()} }`;
  }
  if (options.stable) {
    return stableStringify(json, {
      replacer: makeReplacer(options.replacer),
      space: options.space,
    });
  }
  return JSON.stringify(
    json,
    makeReplacer(options.replacer, options.isoStringDates),
    options.space
  );
};

const deserialize = (json, options = {}) => {
  if (type.isUndefined(json)) return json;
  return JSON.parse(JSON.stringify(json), makeReviver(options.reviver));
};

const deserializeFromString = (str, options = {}) => {
  if (type.isUndefined(str)) return str;
  return JSON.parse(str, makeReviver(options.reviver));
};

const copy = (json, options = {}) => {
  if (type.isUndefined(json)) return undefined;
  if (type.isDate(json)) return new Date(json.valueOf());

  return JSON.parse(
    JSON.stringify(json, makeReplacer(options.replacer)),
    makeReviver(options.reviver)
  );
};

const serializer = { copy, serialize, serializeToString, deserialize, deserializeFromString };
export default serializer;
