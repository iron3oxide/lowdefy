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

import ElasticsearchDelete from './ElasticsearchDelete/ElasticsearchDelete.js';
import ElasticsearchDeleteByQuery from './ElasticsearchDeleteByQuery/ElasticsearchDeleteByQuery.js';
import ElasticsearchIndex from './ElasticsearchIndex/ElasticsearchIndex.js';
import ElasticsearchSearch from './ElasticsearchSearch/ElasticsearchSearch.js';
import ElasticsearchUpdate from './ElasticsearchUpdate/ElasticsearchUpdate.js';
import ElasticsearchUpdateByQuery from './ElasticsearchUpdateByQuery/ElasticsearchUpdateByQuery.js';

export default {
  import: {
    schema: 'connections/Elasticsearch/ElasticsearchSchema.json',
  },
  requests: {
    ElasticsearchDelete,
    ElasticsearchDeleteByQuery,
    ElasticsearchIndex,
    ElasticsearchSearch,
    ElasticsearchUpdate,
    ElasticsearchUpdateByQuery,
  },
};