// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title 投票コントラクト
 * @dev シンプルな二者択一の投票システムを実装したスマートコントラクト
 */
contract Voting {
  // 各オプションの得票数を記録
  mapping(string => uint256) private votes;
  // 投票済みのアドレスを記録
  mapping(address => bool) public hasVoted;

  // 投票オプション：A または B
  string[2] public options = ["A", "B"];

  // 投票イベントを定義
  event Voted(address indexed voter, string option);

  /**
   * @dev 指定されたオプションに投票する
   * @param option 投票するオプション（"A" または "B"）
   * @notice 各アドレスは1回のみ投票可能
   */
  function vote(string memory option) public {
    require(!hasVoted[msg.sender], "Already voted");
    require(isValidOption(option), "Invalid option");

    votes[option]++;
    hasVoted[msg.sender] = true;

    emit Voted(msg.sender, option);
  }

  /**
   * @dev 指定されたオプションの得票数を取得
   * @param option 得票数を確認するオプション（"A" または "B"）
   * @return 指定されたオプションの得票数
   */
  function getVotes(string memory option) public view returns (uint256) {
    require(isValidOption(option), "Invalid option");
    return votes[option];
  }

  //
  /**
   * @dev 投票の結果を1回で全て取得する
   * @return votesA オプションAの得票数
   * @return votesB オプションBの得票数
   */
  function getAllVotes() public view returns (uint256 votesA, uint256 votesB) {
    votesA = votes["A"];
    votesB = votes["B"];
  }

  /**
   * @dev 指定されたオプションが有効かどうかを確認
   * @param option 確認するオプション
   * @return オプションが有効な場合はtrue、それ以外はfalse
   */
  function isValidOption(string memory option) internal pure returns (bool) {
    return (keccak256(abi.encodePacked(option)) == keccak256(abi.encodePacked("A")) ||
              keccak256(abi.encodePacked(option)) == keccak256(abi.encodePacked("B")));
  }
}
