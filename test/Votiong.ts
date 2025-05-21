import { expect } from 'chai';
import { ethers } from 'hardhat';
import type { Voting } from '../typechain-types'; // 型生成済み前提
import type { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';

// テストに必要なデプロイとアカウントの取得を事前に行う
let voting: Voting;
let owner: SignerWithAddress;
let addr1: SignerWithAddress;
let addr2: SignerWithAddress;

beforeEach(async () => {
  // コントラクトのデプロイ
  voting = await ethers.deployContract('Voting');

  // アカウントの取得
  [owner, addr1, addr2] = await ethers.getSigners();
});

/**
1. 各選択肢（A/B）の票数が0であること

2. 正常系：投票処理
任意のアカウントがAまたはBに1票だけ投票できる

投票後、該当選択肢の票数が+1されていること

イベント Voted(address, string) が発行されること

3. 異常系：重複投票の防止
同じアドレスが2回投票しようとするとrevertする

4. 異常系：存在しない選択肢に投票
"C" など定義されていないオプションに投票しようとするとrevertする

5. getAllVotes() が正しく集計される

*/

describe('Votionコントラクトのテスト', async () => {
  it('1. AとBの票数が0であること', async () => {
    const [voteA, voteB] = await voting.getAllVotes();
    expect(voteA).to.equal(0);
    expect(voteB).to.equal(0);
  });

  it('2. 正常系: 任意のアカウントがAまたはBに1票だけ投票できる', async () => {
    // addr1がAに投票（イベントの発火も同時に確認）
    await expect(voting.connect(addr1).vote('A'))
      .to.emit(voting, 'Voted')
      .withArgs(addr1.address, 'A');

    // 投票後の票数を取得
    const [voteA, voteB] = await voting.getAllVotes();
    // Aの票数が1であることを確認
    expect(voteA).to.equal(1);
    expect(voteB).to.equal(0);

    // addr2がBに投票（イベントの発火も同時に確認）
    await expect(voting.connect(addr2).vote('B'))
      .to.emit(voting, 'Voted')
      .withArgs(addr2.address, 'B');
    // 投票後の票数を取得
    const [voteA2, voteB2] = await voting.getAllVotes();
    // Bの票数が1であることを確認
    expect(voteA2).to.equal(1);
    expect(voteB2).to.equal(1);
  });
});
