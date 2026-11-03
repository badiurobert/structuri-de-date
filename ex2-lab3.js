function merge(nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;

  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }

  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }
}

const tests = [
  { nums1: [2, 5, 6, 0, 0, 0], m: 3, nums2: [1, 2, 4], n: 3, expected: [1, 2, 2, 4, 5, 6] },
  { nums1: [1, 2, 3, 0, 0, 0], m: 3, nums2: [2, 5, 6], n: 3, expected: [1, 2, 2, 3, 5, 6] },
  { nums1: [0], m: 0, nums2: [1], n: 1, expected: [1] },
  { nums1: [1], m: 1, nums2: [], n: 0, expected: [1] },
  { nums1: [3, 3, 0, 0], m: 2, nums2: [3, 3], n: 2, expected: [3, 3, 3, 3] },
  { nums1: [0, 0, 3, 0, 0, 0], m: 3, nums2: [0, 2, 5], n: 3, expected: [0, 0, 0, 2, 3, 5] },
  { nums1: [-1, 0, 0, 0], m: 2, nums2: [-2, 0], n: 2, expected: [-2, -1, 0, 0] },
];

tests.forEach(({ nums1, m, nums2, n, expected }, i) => {
  const input = `nums1=[${nums1}] m=${m} nums2=[${nums2}] n=${n}`;
  merge(nums1, m, nums2, n);
  const passed = JSON.stringify(nums1) === JSON.stringify(expected);
  console.log(`Test ${i + 1}: ${input} output=[${nums1}] ${passed ? "PASS" : "FAIL"}`);
});

module.exports = merge;
