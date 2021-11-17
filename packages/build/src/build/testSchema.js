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

import { validate } from '@lowdefy/ajv';
import lowdefySchema from '../lowdefySchema.js';
import formatErrorMessage from '../utils/formatErrorMessage.js';

async function testSchema({ components, context }) {
  const { valid, errors } = validate({
    schema: lowdefySchema,
    data: components,
    returnErrors: true,
  });
  if (!valid) {
    await context.logger.warn('Schema not valid.');
    const promises = errors.map((error) =>
      context.logger.warn(formatErrorMessage({ error, components }))
    );
    await promises;
  }
}

export default testSchema;
