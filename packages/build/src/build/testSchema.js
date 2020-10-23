/*
  Copyright 2020 Lowdefy, Inc

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

import formatErrorMessage from '../utils/formatErrorMessage';
import testAppSchema from '../utils/testAppSchema';

async function testSchema({ components, context }) {
  const { valid, errors } = testAppSchema(components);
  if (!valid) {
    await context.logger.warn('Schema not valid.');
    const promises = errors.map((err) => context.logger.warn(formatErrorMessage(err, components)));
    await promises;
  } else {
    await context.logger.success('Schema valid.');
  }
}

export default testSchema;
