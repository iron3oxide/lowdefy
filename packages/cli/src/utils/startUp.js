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
import { type } from '@lowdefy/helpers';

import checkForUpdatedVersions from './checkForUpdatedVersions.js';
import getCliJson from './getCliJson.js';
import getDirectories from './getDirectories.js';
import getLowdefyYaml from './getLowdefyYaml.js';
import getOptions from './getOptions.js';
import getPackageManager from './getPackageManager.js';
import getSendTelemetry from './getSendTelemetry.js';
import createPrint from './createPrint.js';

async function startUp({ context, options = {}, command }) {
  context.command = command.name();
  context.commandLineOptions = options;
  context.print = createPrint();
  context.configDirectory = path.resolve(
    options.configDirectory || process.env.LOWDEFY_DIRECTORY_CONFIG || process.cwd()
  );
  const { cliConfig, lowdefyVersion, plugins } = await getLowdefyYaml(context);
  context.cliConfig = cliConfig;
  context.lowdefyVersion = lowdefyVersion;
  context.plugins = plugins;

  const { appId } = await getCliJson(context);
  context.appId = appId;

  context.options = getOptions(context);
  context.directories = getDirectories(context);
  context.packageManager = getPackageManager(context);
  context.packageManagerCmd =
    process.platform === 'win32' ? `${context.packageManager}.cmd` : context.packageManager;
  await checkForUpdatedVersions(context);

  context.sendTelemetry = getSendTelemetry(context);

  if (type.isNone(lowdefyVersion)) {
    context.print.log(`Running 'lowdefy ${context.command}'.`);
  } else {
    context.print.log(
      `Running 'lowdefy ${context.command}'. Lowdefy app version ${lowdefyVersion}.`
    );
  }
  return context;
}

export default startUp;
