/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { getSignalsTemplate } from './get_signals_template';

describe('get_signals_template', () => {
  test('it should set the lifecycle "name" and "rollover_alias" to be the name of the index passed in', () => {
    const template = getSignalsTemplate('test-index');
    expect(template.settings).toEqual({
      index: {
        lifecycle: {
          name: 'test-index',
          rollover_alias: 'test-index',
        },
      },
      mapping: {
        total_fields: { limit: 10000 },
      },
    });
  });

  test('it should set have the index patterns with an ending glob in it', () => {
    const template = getSignalsTemplate('test-index');
    expect(template.index_patterns).toEqual(['test-index-*']);
  });

  test('it should have a mappings section which is an object type', () => {
    const template = getSignalsTemplate('test-index');
    expect(typeof template.mappings).toEqual('object');
  });

  test('it should have a signals section which is an object type', () => {
    const template = getSignalsTemplate('test-index');
    expect(typeof template.mappings.properties.signal).toEqual('object');
  });

  test('it should have a "total_fields" section that is at least 10k in size', () => {
    const template = getSignalsTemplate('test-index');
    expect(template.settings.mapping.total_fields.limit).toBeGreaterThanOrEqual(10000);
  });
});
