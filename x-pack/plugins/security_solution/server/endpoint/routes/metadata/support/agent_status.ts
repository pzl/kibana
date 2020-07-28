/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { SavedObjectsClientContract } from 'kibana/server';
import { AgentService } from '../../../../../../ingest_manager/server';
import { AgentStatusKueryHelper } from '../../../../../../ingest_manager/common/services';
import { Agent } from '../../../../../../ingest_manager/common/types/models';

export async function findAgentIDsByStatus(
  agentService: AgentService,
  soClient: SavedObjectsClientContract,
  status: string[],
  pageSize: number = 1000
): Promise<string[] | undefined> {
  const helpers = status.map((s) => {
    switch (s) {
      case 'online':
        return AgentStatusKueryHelper.buildKueryForOnlineAgents();
      case 'enrolling':
        return AgentStatusKueryHelper.buildKueryForEnrollingAgents();
      case 'offline':
        return AgentStatusKueryHelper.buildKueryForOfflineAgents();
      case 'error':
        return AgentStatusKueryHelper.buildKueryForErrorAgents();
      case 'unenrolling':
        return AgentStatusKueryHelper.buildKueryForUnenrollingAgents();
    }
    return 'INVALID';
  });

  if (helpers.indexOf('INVALID') !== -1) {
    return undefined;
  }

  const searchOptions = (pageNum: number) => {
    return {
      page: pageNum,
      perPage: pageSize,
      showInactive: true,
      kuery: `(fleet-agents.packages : "endpoint" AND (${helpers.join(' OR ')}))`,
    };
  };

  let page = 1;

  const result: string[] = [];
  let hasMore = true;

  while (hasMore) {
    const agents = await agentService.listAgents(soClient, searchOptions(page++));
    result.push(...agents.agents.map((agent: Agent) => agent.id));
    hasMore = agents.agents.length > 0;
  }
  return result;
}
