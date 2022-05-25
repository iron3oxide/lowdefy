/*
  Copyright 2020-2022 Lowdefy, Inc

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

import path from 'path';
import { cachedPromises } from '@lowdefy/helpers';
import { getFileExtension, readFile } from '@lowdefy/node-utils';

function createReadConfigFile({ buildDirectory }) {
  async function readConfigFile(filePath) {
    const fileContent = await readFile(path.resolve(buildDirectory, filePath));
    if (getFileExtension(filePath) === 'json') {
      return JSON.parse(fileContent);
    }
    return fileContent;
  }
  return cachedPromises(readConfigFile);
}

export default createReadConfigFile;