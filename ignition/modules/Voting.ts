// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

/**
 * VotingModuleは投票コントラクトをデプロイするためのモジュールです。
 * このモジュールでは、シンプルな二者択一の投票システムをデプロイします。
 */
export default buildModule('VotingModule', (m) => {
  // 投票コントラクトをデプロイ（コンストラクタに引数はないので空の配列）
  const voting = m.contract('Voting');

  return { voting };
});
