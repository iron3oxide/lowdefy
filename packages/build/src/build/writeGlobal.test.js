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

import writeGlobal from './writeGlobal';
import testContext from '../test/testContext';

const mockLogInfo = jest.fn();
const mockSet = jest.fn();

const logger = {
  info: mockLogInfo,
};

const artifactSetter = {
  set: mockSet,
};

const context = testContext({ logger, artifactSetter });

beforeEach(() => {
  mockLogInfo.mockReset();
  mockSet.mockReset();
});

test('writeGlobal', async () => {
  const components = {
    global: {
      key: 'value',
    },
  };
  await writeGlobal({ components, context });
  expect(mockSet.mock.calls).toEqual([
    [
      {
        filePath: 'global.json',
        content: `{
  "key": "value"
}`,
      },
    ],
  ]);
  expect(mockLogInfo.mock.calls).toEqual([['Updated global']]);
});

test('writeGlobal empty global', async () => {
  const components = {
    global: {},
  };
  await writeGlobal({ components, context });
  expect(mockSet.mock.calls).toEqual([
    [
      {
        filePath: 'global.json',
        content: `{}`,
      },
    ],
  ]);
  expect(mockLogInfo.mock.calls).toEqual([['Updated global']]);
});

test('writeGlobal global undefined', async () => {
  const components = {};
  await writeGlobal({ components, context });
  expect(mockSet.mock.calls).toEqual([
    [
      {
        filePath: 'global.json',
        content: `{}`,
      },
    ],
  ]);
  expect(mockLogInfo.mock.calls).toEqual([['Updated global']]);
});

test('writeGlobal global not an object', async () => {
  const components = {
    global: 'global',
  };
  await expect(writeGlobal({ components, context })).rejects.toThrow('Global is not an object.');
});
