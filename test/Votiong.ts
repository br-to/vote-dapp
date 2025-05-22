import { expect } from 'chai';
import { ethers } from 'hardhat';
import type { Voting } from '../typechain-types';
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

  it('3. 異常系: 同じアドレスが2回投票しようとするとrevertする', async () => {
    // addr1がAに投票
    await voting.connect(addr1).vote('A');

    // addr1が再度Aに投票しようとするとrevert
    await expect(voting.connect(addr1).vote('A')).to.be.revertedWith(
      'Already voted'
    );

    // addr2がBに投票
    await voting.connect(addr2).vote('B');

    // addr2が再度Bに投票しようとするとrevert
    await expect(voting.connect(addr2).vote('B')).to.be.revertedWith(
      'Already voted'
    );
  });

  it('4. 異常系: 存在しない選択肢に投票しようとするとrevertする', async () => {
    // addr1が存在しない選択肢に投票しようとするとrevert
    await expect(voting.connect(addr1).vote('C')).to.be.revertedWith(
      'Invalid option'
    );

    // addr2が存在しない選択肢に投票しようとするとrevert
    await expect(voting.connect(addr2).vote('D')).to.be.revertedWith(
      'Invalid option'
    );
  });

  it('5. getAllVotes() が正しく集計される', async () => {
    // addr1がAに投票
    await voting.connect(addr1).vote('A');
    // addr2がBに投票
    await voting.connect(addr2).vote('B');

    // 投票後の票数を取得
    const [voteA, voteB] = await voting.getAllVotes();
    // Aの票数が1であることを確認
    expect(voteA).to.equal(1);
    expect(voteB).to.equal(1);
  });
});
