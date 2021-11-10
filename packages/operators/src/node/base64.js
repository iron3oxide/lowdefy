/*
  Copyright 2020-2021 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import runClass from '../runClass.js';

function decode(input) {
  const buff = Buffer.from(input, 'base64');
  return buff.toString('utf8');
}

function encode(input) {
  const buff = Buffer.from(input, 'utf8');
  return buff.toString('base64');
}

const functions = { encode, decode };
const meta = {
  encode: { singleArg: true, validTypes: ['string'] },
  decode: { singleArg: true, validTypes: ['string'] },
};
function _base64({ params, location, methodName }) {
  return runClass({
    functions,
    location,
    meta,
    methodName,
    operator: '_base64',
    params,
  });
}

export default _base64;
