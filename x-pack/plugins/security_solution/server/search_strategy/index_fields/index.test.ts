/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { sortBy } from 'lodash/fp';

import { formatIndexFields, formatFirstFields, formatSecondFields, createFieldItem } from './index';
import { mockAuditbeatIndexField, mockFilebeatIndexField, mockPacketbeatIndexField } from './mock';
import { fieldsBeat as beatFields } from '../../utils/beat_schema/fields';

describe('Index Fields', () => {
  describe('formatIndexFields', () => {
    test('Basic functionality', async () => {
      expect(
        sortBy(
          'name',
          await formatIndexFields(
            beatFields,
            [mockAuditbeatIndexField, mockFilebeatIndexField, mockPacketbeatIndexField],
            ['auditbeat', 'filebeat', 'packetbeat']
          )
        )
      ).toEqual(
        sortBy('name', [
          {
            description:
              'Date/time when the event originated. This is the date/time extracted from the event, typically representing when the event was generated by the source. If the event source has no original timestamp, this value is typically populated by the first time the event was received by the pipeline. Required field for all events.',
            example: '2016-05-23T08:05:34.853Z',
            name: '@timestamp',
            type: 'date',
            searchable: true,
            aggregatable: true,
            category: 'base',
            indexes: ['auditbeat', 'filebeat', 'packetbeat'],
            readFromDocValues: true,
            esTypes: [],
          },
          {
            description: 'Each document has an _id that uniquely identifies it',
            example: 'Y-6TfmcB0WOhS6qyMv3s',
            name: '_id',
            type: 'string',
            searchable: true,
            aggregatable: false,
            readFromDocValues: false,
            category: 'base',
            indexes: ['auditbeat', 'filebeat', 'packetbeat'],
            esTypes: [],
          },
          {
            description:
              'An index is like a ‘database’ in a relational database. It has a mapping which defines multiple types. An index is a logical namespace which maps to one or more primary shards and can have zero or more replica shards.',
            example: 'auditbeat-8.0.0-2019.02.19-000001',
            name: '_index',
            type: 'string',
            searchable: true,
            aggregatable: true,
            readFromDocValues: false,
            category: 'base',
            indexes: ['auditbeat', 'filebeat', 'packetbeat'],
            esTypes: [],
          },
          {
            description:
              'Ephemeral identifier of this agent (if one exists). This id normally changes across restarts, but `agent.id` does not.',
            example: '8a4f500f',
            name: 'agent.ephemeral_id',
            type: 'string',
            searchable: true,
            aggregatable: true,
            category: 'agent',
            indexes: ['auditbeat'],
            readFromDocValues: false,
            esTypes: [],
          },
          {
            description:
              'Deprecated - use agent.name or agent.id to identify an agent. Hostname of the agent. ',
            name: 'agent.hostname',
            searchable: true,
            type: 'string',
            aggregatable: true,
            category: 'agent',
            indexes: ['filebeat'],
            readFromDocValues: false,
            esTypes: [],
          },
          {
            description:
              'Unique identifier of this agent (if one exists). Example: For Beats this would be beat.id.',
            example: '8a4f500d',
            name: 'agent.id',
            type: 'string',
            searchable: true,
            aggregatable: true,
            category: 'agent',
            indexes: ['packetbeat'],
            readFromDocValues: false,
            esTypes: [],
          },
          {
            description:
              'Custom name of the agent. This is a name that can be given to an agent. This can be helpful if for example two Filebeat instances are running on the same host but a human readable separation is needed on which Filebeat instance data is coming from. If no name is given, the name is often left empty.',
            example: 'foo',
            name: 'agent.name',
            type: 'string',
            searchable: true,
            aggregatable: true,
            category: 'agent',
            indexes: ['auditbeat', 'filebeat'],
            readFromDocValues: false,
            esTypes: [],
          },
          {
            description:
              'Type of the agent. The agent type stays always the same and should be given by the agent used. In case of Filebeat the agent would always be Filebeat also if two Filebeat instances are run on the same machine.',
            example: 'filebeat',
            name: 'agent.type',
            type: 'string',
            searchable: true,
            aggregatable: true,
            category: 'agent',
            indexes: ['auditbeat', 'packetbeat'],
            readFromDocValues: false,
            esTypes: [],
          },
          {
            description: 'Version of the agent.',
            example: '6.0.0-rc2',
            name: 'agent.version',
            type: 'string',
            searchable: true,
            aggregatable: true,
            category: 'agent',
            indexes: ['auditbeat', 'filebeat'],
            readFromDocValues: false,
            esTypes: [],
          },
          {
            aggregatable: true,
            category: 'agent',
            esTypes: [],
            indexes: ['auditbeat'],
            name: 'agent.user.name',
            readFromDocValues: false,
            searchable: true,
            type: 'string',
          },
          {
            aggregatable: true,
            category: 'client',
            description:
              'Unique number allocated to the autonomous system. The autonomous system number (ASN) uniquely identifies each network on the Internet.',
            esTypes: [],
            example: 15169,
            indexes: ['auditbeat'],
            name: 'client.as.number.text',
            readFromDocValues: false,
            searchable: true,
            type: 'string',
          },
        ])
      );
    });
  });

  describe('formatFirstFields', () => {
    test('Basic functionality', async () => {
      const fields = await formatFirstFields(
        beatFields,
        [mockAuditbeatIndexField, mockFilebeatIndexField, mockPacketbeatIndexField],
        ['auditbeat', 'filebeat', 'packetbeat']
      );
      expect(fields).toEqual([
        {
          category: 'base',
          description: 'Each document has an _id that uniquely identifies it',
          example: 'Y-6TfmcB0WOhS6qyMv3s',
          name: '_id',
          type: 'string',
          searchable: true,
          aggregatable: false,
          readFromDocValues: false,
          esTypes: [],
          indexes: ['auditbeat'],
        },
        {
          category: 'base',
          description:
            'An index is like a ‘database’ in a relational database. It has a mapping which defines multiple types. An index is a logical namespace which maps to one or more primary shards and can have zero or more replica shards.',
          example: 'auditbeat-8.0.0-2019.02.19-000001',
          name: '_index',
          type: 'string',
          searchable: true,
          aggregatable: true,
          readFromDocValues: false,
          esTypes: [],
          indexes: ['auditbeat'],
        },
        {
          category: 'base',
          description:
            'Date/time when the event originated. This is the date/time extracted from the event, typically representing when the event was generated by the source. If the event source has no original timestamp, this value is typically populated by the first time the event was received by the pipeline. Required field for all events.',
          example: '2016-05-23T08:05:34.853Z',
          name: '@timestamp',
          type: 'date',
          searchable: true,
          aggregatable: true,
          readFromDocValues: true,
          esTypes: [],
          indexes: ['auditbeat'],
        },
        {
          category: 'agent',
          description:
            'Ephemeral identifier of this agent (if one exists). This id normally changes across restarts, but `agent.id` does not.',
          example: '8a4f500f',
          name: 'agent.ephemeral_id',
          type: 'string',
          searchable: true,
          aggregatable: true,
          readFromDocValues: false,
          esTypes: [],
          indexes: ['auditbeat'],
        },
        {
          category: 'agent',
          description:
            'Custom name of the agent. This is a name that can be given to an agent. This can be helpful if for example two Filebeat instances are running on the same host but a human readable separation is needed on which Filebeat instance data is coming from. If no name is given, the name is often left empty.',
          example: 'foo',
          name: 'agent.name',
          type: 'string',
          searchable: true,
          aggregatable: true,
          readFromDocValues: false,
          esTypes: [],
          indexes: ['auditbeat'],
        },
        {
          category: 'agent',
          description:
            'Type of the agent. The agent type stays always the same and should be given by the agent used. In case of Filebeat the agent would always be Filebeat also if two Filebeat instances are run on the same machine.',
          example: 'filebeat',
          name: 'agent.type',
          type: 'string',
          searchable: true,
          aggregatable: true,
          readFromDocValues: false,
          esTypes: [],
          indexes: ['auditbeat'],
        },
        {
          category: 'agent',
          description: 'Version of the agent.',
          example: '6.0.0-rc2',
          name: 'agent.version',
          type: 'string',
          searchable: true,
          aggregatable: true,
          readFromDocValues: false,
          esTypes: [],
          indexes: ['auditbeat'],
        },
        {
          category: 'agent',
          name: 'agent.user.name',
          searchable: true,
          type: 'string',
          aggregatable: true,
          readFromDocValues: false,
          esTypes: [],
          indexes: ['auditbeat'],
        },
        {
          category: 'client',
          description:
            'Unique number allocated to the autonomous system. The autonomous system number (ASN) uniquely identifies each network on the Internet.',
          example: 15169,
          name: 'client.as.number.text',
          type: 'string',
          searchable: true,
          aggregatable: true,
          readFromDocValues: false,
          esTypes: [],
          indexes: ['auditbeat'],
        },
        {
          category: 'base',
          description: 'Each document has an _id that uniquely identifies it',
          example: 'Y-6TfmcB0WOhS6qyMv3s',
          name: '_id',
          type: 'string',
          searchable: true,
          aggregatable: false,
          readFromDocValues: false,
          esTypes: [],
          indexes: ['filebeat'],
        },
        {
          category: 'base',
          description:
            'An index is like a ‘database’ in a relational database. It has a mapping which defines multiple types. An index is a logical namespace which maps to one or more primary shards and can have zero or more replica shards.',
          example: 'auditbeat-8.0.0-2019.02.19-000001',
          name: '_index',
          type: 'string',
          searchable: true,
          aggregatable: true,
          readFromDocValues: false,
          esTypes: [],
          indexes: ['filebeat'],
        },
        {
          category: 'base',
          description:
            'Date/time when the event originated. This is the date/time extracted from the event, typically representing when the event was generated by the source. If the event source has no original timestamp, this value is typically populated by the first time the event was received by the pipeline. Required field for all events.',
          example: '2016-05-23T08:05:34.853Z',
          name: '@timestamp',
          type: 'date',
          searchable: true,
          aggregatable: true,
          readFromDocValues: true,
          esTypes: [],
          indexes: ['filebeat'],
        },
        {
          category: 'agent',
          description:
            'Deprecated - use agent.name or agent.id to identify an agent. Hostname of the agent. ',
          name: 'agent.hostname',
          type: 'string',
          searchable: true,
          aggregatable: true,
          readFromDocValues: false,
          esTypes: [],
          indexes: ['filebeat'],
        },
        {
          category: 'agent',
          description:
            'Custom name of the agent. This is a name that can be given to an agent. This can be helpful if for example two Filebeat instances are running on the same host but a human readable separation is needed on which Filebeat instance data is coming from. If no name is given, the name is often left empty.',
          example: 'foo',
          name: 'agent.name',
          type: 'string',
          searchable: true,
          aggregatable: true,
          readFromDocValues: false,
          esTypes: [],
          indexes: ['filebeat'],
        },
        {
          category: 'agent',
          description: 'Version of the agent.',
          example: '6.0.0-rc2',
          name: 'agent.version',
          type: 'string',
          searchable: true,
          aggregatable: true,
          readFromDocValues: false,
          esTypes: [],
          indexes: ['filebeat'],
        },
        {
          category: 'base',
          description: 'Each document has an _id that uniquely identifies it',
          example: 'Y-6TfmcB0WOhS6qyMv3s',
          name: '_id',
          type: 'string',
          searchable: true,
          aggregatable: false,
          readFromDocValues: false,
          esTypes: [],
          indexes: ['packetbeat'],
        },
        {
          category: 'base',
          description:
            'An index is like a ‘database’ in a relational database. It has a mapping which defines multiple types. An index is a logical namespace which maps to one or more primary shards and can have zero or more replica shards.',
          example: 'auditbeat-8.0.0-2019.02.19-000001',
          name: '_index',
          type: 'string',
          searchable: true,
          aggregatable: true,
          readFromDocValues: false,
          esTypes: [],
          indexes: ['packetbeat'],
        },
        {
          category: 'base',
          description:
            'Date/time when the event originated. This is the date/time extracted from the event, typically representing when the event was generated by the source. If the event source has no original timestamp, this value is typically populated by the first time the event was received by the pipeline. Required field for all events.',
          example: '2016-05-23T08:05:34.853Z',
          name: '@timestamp',
          type: 'date',
          searchable: true,
          aggregatable: true,
          readFromDocValues: true,
          esTypes: [],
          indexes: ['packetbeat'],
        },
        {
          category: 'agent',
          description:
            'Unique identifier of this agent (if one exists). Example: For Beats this would be beat.id.',
          example: '8a4f500d',
          name: 'agent.id',
          type: 'string',
          searchable: true,
          aggregatable: true,
          readFromDocValues: false,
          esTypes: [],
          indexes: ['packetbeat'],
        },
        {
          category: 'agent',
          description:
            'Type of the agent. The agent type stays always the same and should be given by the agent used. In case of Filebeat the agent would always be Filebeat also if two Filebeat instances are run on the same machine.',
          example: 'filebeat',
          name: 'agent.type',
          type: 'string',
          searchable: true,
          aggregatable: true,
          readFromDocValues: false,
          esTypes: [],
          indexes: ['packetbeat'],
        },
      ]);
    });
  });

  describe('formatSecondFields', () => {
    test('Basic functionality', async () => {
      const fields = await formatSecondFields([
        {
          description: 'Each document has an _id that uniquely identifies it',
          example: 'Y-6TfmcB0WOhS6qyMv3s',
          name: '_id',
          type: 'string',
          searchable: true,
          aggregatable: false,
          category: 'base',
          indexes: ['auditbeat'],
          readFromDocValues: false,
        },
        {
          description:
            'An index is like a ‘database’ in a relational database. It has a mapping which defines multiple types. An index is a logical namespace which maps to one or more primary shards and can have zero or more replica shards.',
          example: 'auditbeat-8.0.0-2019.02.19-000001',
          name: '_index',
          type: 'string',
          searchable: true,
          aggregatable: true,
          category: 'base',
          indexes: ['auditbeat'],
          readFromDocValues: false,
        },
        {
          description:
            'Date/time when the event originated. This is the date/time extracted from the event, typically representing when the event was generated by the source. If the event source has no original timestamp, this value is typically populated by the first time the event was received by the pipeline. Required field for all events.',
          example: '2016-05-23T08:05:34.853Z',
          name: '@timestamp',
          type: 'date',
          searchable: true,
          aggregatable: true,
          category: 'base',
          indexes: ['auditbeat'],
          readFromDocValues: true,
        },
        {
          description:
            'Ephemeral identifier of this agent (if one exists). This id normally changes across restarts, but `agent.id` does not.',
          example: '8a4f500f',
          name: 'agent.ephemeral_id',
          type: 'string',
          searchable: true,
          aggregatable: true,
          category: 'agent',
          indexes: ['auditbeat'],
          readFromDocValues: false,
        },
        {
          description:
            'Custom name of the agent. This is a name that can be given to an agent. This can be helpful if for example two Filebeat instances are running on the same host but a human readable separation is needed on which Filebeat instance data is coming from. If no name is given, the name is often left empty.',
          example: 'foo',
          name: 'agent.name',
          type: 'string',
          searchable: true,
          aggregatable: true,
          category: 'agent',
          indexes: ['auditbeat'],
          readFromDocValues: false,
        },
        {
          description:
            'Type of the agent. The agent type stays always the same and should be given by the agent used. In case of Filebeat the agent would always be Filebeat also if two Filebeat instances are run on the same machine.',
          example: 'filebeat',
          name: 'agent.type',
          type: 'string',
          searchable: true,
          aggregatable: true,
          category: 'agent',
          indexes: ['auditbeat'],
          readFromDocValues: false,
        },
        {
          description: 'Version of the agent.',
          example: '6.0.0-rc2',
          name: 'agent.version',
          type: 'string',
          searchable: true,
          aggregatable: true,
          category: 'agent',
          indexes: ['auditbeat'],
          readFromDocValues: false,
        },
        {
          description: 'Each document has an _id that uniquely identifies it',
          example: 'Y-6TfmcB0WOhS6qyMv3s',
          name: '_id',
          type: 'string',
          searchable: true,
          aggregatable: false,
          category: 'base',
          indexes: ['filebeat'],
          readFromDocValues: false,
        },
        {
          description:
            'An index is like a ‘database’ in a relational database. It has a mapping which defines multiple types. An index is a logical namespace which maps to one or more primary shards and can have zero or more replica shards.',
          example: 'auditbeat-8.0.0-2019.02.19-000001',
          name: '_index',
          type: 'string',
          searchable: true,
          aggregatable: true,
          category: 'base',
          indexes: ['filebeat'],
          readFromDocValues: false,
        },
        {
          description:
            'Date/time when the event originated. This is the date/time extracted from the event, typically representing when the event was generated by the source. If the event source has no original timestamp, this value is typically populated by the first time the event was received by the pipeline. Required field for all events.',
          example: '2016-05-23T08:05:34.853Z',
          name: '@timestamp',
          type: 'date',
          searchable: true,
          aggregatable: true,
          category: 'base',
          indexes: ['filebeat'],
          readFromDocValues: true,
        },
        {
          name: 'agent.hostname',
          searchable: true,
          type: 'string',
          aggregatable: true,
          category: 'agent',
          indexes: ['filebeat'],
          readFromDocValues: false,
        },
        {
          description:
            'Custom name of the agent. This is a name that can be given to an agent. This can be helpful if for example two Filebeat instances are running on the same host but a human readable separation is needed on which Filebeat instance data is coming from. If no name is given, the name is often left empty.',
          example: 'foo',
          name: 'agent.name',
          type: 'string',
          searchable: true,
          aggregatable: true,
          category: 'agent',
          indexes: ['filebeat'],
          readFromDocValues: false,
        },
        {
          description: 'Version of the agent.',
          example: '6.0.0-rc2',
          name: 'agent.version',
          type: 'string',
          searchable: true,
          aggregatable: true,
          category: 'agent',
          indexes: ['filebeat'],
          readFromDocValues: false,
        },
        {
          description: 'Each document has an _id that uniquely identifies it',
          example: 'Y-6TfmcB0WOhS6qyMv3s',
          name: '_id',
          type: 'string',
          searchable: true,
          aggregatable: false,
          category: 'base',
          indexes: ['packetbeat'],
          readFromDocValues: false,
        },
        {
          description:
            'An index is like a ‘database’ in a relational database. It has a mapping which defines multiple types. An index is a logical namespace which maps to one or more primary shards and can have zero or more replica shards.',
          example: 'auditbeat-8.0.0-2019.02.19-000001',
          name: '_index',
          type: 'string',
          searchable: true,
          aggregatable: true,
          category: 'base',
          indexes: ['packetbeat'],
          readFromDocValues: false,
        },
        {
          description:
            'Date/time when the event originated. This is the date/time extracted from the event, typically representing when the event was generated by the source. If the event source has no original timestamp, this value is typically populated by the first time the event was received by the pipeline. Required field for all events.',
          example: '2016-05-23T08:05:34.853Z',
          name: '@timestamp',
          type: 'date',
          searchable: true,
          aggregatable: true,
          category: 'base',
          indexes: ['packetbeat'],
          readFromDocValues: true,
        },
        {
          description:
            'Unique identifier of this agent (if one exists). Example: For Beats this would be beat.id.',
          example: '8a4f500d',
          name: 'agent.id',
          type: 'string',
          searchable: true,
          aggregatable: true,
          category: 'agent',
          indexes: ['packetbeat'],
          readFromDocValues: false,
        },
        {
          description:
            'Type of the agent. The agent type stays always the same and should be given by the agent used. In case of Filebeat the agent would always be Filebeat also if two Filebeat instances are run on the same machine.',
          example: 'filebeat',
          name: 'agent.type',
          type: 'string',
          searchable: true,
          aggregatable: true,
          category: 'agent',
          indexes: ['packetbeat'],
          readFromDocValues: false,
        },
      ]);
      expect(fields).toEqual([
        {
          description: 'Each document has an _id that uniquely identifies it',
          example: 'Y-6TfmcB0WOhS6qyMv3s',
          name: '_id',
          type: 'string',
          searchable: true,
          aggregatable: false,
          category: 'base',
          indexes: ['auditbeat', 'filebeat', 'packetbeat'],
          readFromDocValues: false,
        },
        {
          description:
            'An index is like a ‘database’ in a relational database. It has a mapping which defines multiple types. An index is a logical namespace which maps to one or more primary shards and can have zero or more replica shards.',
          example: 'auditbeat-8.0.0-2019.02.19-000001',
          name: '_index',
          type: 'string',
          searchable: true,
          aggregatable: true,
          category: 'base',
          indexes: ['auditbeat', 'filebeat', 'packetbeat'],
          readFromDocValues: false,
        },
        {
          description:
            'Date/time when the event originated. This is the date/time extracted from the event, typically representing when the event was generated by the source. If the event source has no original timestamp, this value is typically populated by the first time the event was received by the pipeline. Required field for all events.',
          example: '2016-05-23T08:05:34.853Z',
          name: '@timestamp',
          type: 'date',
          searchable: true,
          aggregatable: true,
          category: 'base',
          indexes: ['auditbeat', 'filebeat', 'packetbeat'],
          readFromDocValues: true,
        },
        {
          description:
            'Ephemeral identifier of this agent (if one exists). This id normally changes across restarts, but `agent.id` does not.',
          example: '8a4f500f',
          name: 'agent.ephemeral_id',
          type: 'string',
          searchable: true,
          aggregatable: true,
          category: 'agent',
          indexes: ['auditbeat'],
          readFromDocValues: false,
        },
        {
          description:
            'Custom name of the agent. This is a name that can be given to an agent. This can be helpful if for example two Filebeat instances are running on the same host but a human readable separation is needed on which Filebeat instance data is coming from. If no name is given, the name is often left empty.',
          example: 'foo',
          name: 'agent.name',
          type: 'string',
          searchable: true,
          aggregatable: true,
          category: 'agent',
          indexes: ['auditbeat', 'filebeat'],
          readFromDocValues: false,
        },
        {
          description:
            'Type of the agent. The agent type stays always the same and should be given by the agent used. In case of Filebeat the agent would always be Filebeat also if two Filebeat instances are run on the same machine.',
          example: 'filebeat',
          name: 'agent.type',
          type: 'string',
          searchable: true,
          aggregatable: true,
          category: 'agent',
          indexes: ['auditbeat', 'packetbeat'],
          readFromDocValues: false,
        },
        {
          description: 'Version of the agent.',
          example: '6.0.0-rc2',
          name: 'agent.version',
          type: 'string',
          searchable: true,
          aggregatable: true,
          category: 'agent',
          indexes: ['auditbeat', 'filebeat'],
          readFromDocValues: false,
        },
        {
          name: 'agent.hostname',
          searchable: true,
          type: 'string',
          aggregatable: true,
          category: 'agent',
          indexes: ['filebeat'],
          readFromDocValues: false,
        },
        {
          description:
            'Unique identifier of this agent (if one exists). Example: For Beats this would be beat.id.',
          example: '8a4f500d',
          name: 'agent.id',
          type: 'string',
          searchable: true,
          aggregatable: true,
          category: 'agent',
          indexes: ['packetbeat'],
          readFromDocValues: false,
        },
      ]);
    });
  });

  describe('createFieldItem', () => {
    test('Basic functionality', () => {
      const item = createFieldItem(
        beatFields,
        ['auditbeat'],
        {
          name: '_id',
          type: 'string',
          searchable: true,
          aggregatable: false,
          readFromDocValues: false,
          esTypes: [],
        },
        0
      );
      expect(item).toEqual({
        description: 'Each document has an _id that uniquely identifies it',
        example: 'Y-6TfmcB0WOhS6qyMv3s',
        name: '_id',
        type: 'string',
        searchable: true,
        aggregatable: false,
        category: 'base',
        indexes: ['auditbeat'],
        readFromDocValues: false,
        esTypes: [],
      });
    });
  });
});
