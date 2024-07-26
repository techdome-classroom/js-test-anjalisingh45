const decodeTheRing = function (s, p) {
  const memo = new Map();

  function dfs(sIndex, pIndex) {

      if (sIndex === s.length && pIndex === p.length) {
          return true;
      }
      

      const memoKey = `${sIndex}-${pIndex}`;
      if (memo.has(memoKey)) {
          return memo.get(memoKey);
      }


      if (pIndex >= p.length) {
          return false;
      }

      // If message index is out of bounds and pattern is not fully consumed by '*'
      if (sIndex >= s.length) {
          // Check if rest of pattern can be handled by '*'
          for (let i = pIndex; i < p.length; i++) {
              if (p[i] !== '*') {
                  memo.set(memoKey, false);
                  return false;
              }
          }
          return true;
      }

      // Check current characters
      if (s[sIndex] === p[pIndex] || p[pIndex] === '?') {
          const match = dfs(sIndex + 1, pIndex + 1);
          memo.set(memoKey, match);
          return match;
      }

      // If current pattern character is '*'
      if (p[pIndex] === '*') {
          // Either skip '*' or match current character with '*'
          const match = dfs(sIndex, pIndex + 1) || dfs(sIndex + 1, pIndex);
          memo.set(memoKey, match);
          return match;
      }

      // Default case: no match found
      memo.set(memoKey, false);
      return false;
  }

  return dfs(0, 0);
};

module.exports = decodeTheRing;
