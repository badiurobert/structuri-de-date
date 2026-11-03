function sortArray(nums) {
  const buffer = new Array(nums.length);
  mergeSort(nums, 0, nums.length - 1, buffer);
  return nums;
}

function mergeSort(nums, left, right, buffer) {
  if (left >= right) {
    return;
  }

  const mid = Math.floor((left + right) / 2);
  mergeSort(nums, left, mid, buffer);
  mergeSort(nums, mid + 1, right, buffer);
  mergeHalves(nums, left, mid, right, buffer);
}

function mergeHalves(nums, left, mid, right, buffer) {
  let i = left;
  let j = mid + 1;
  let k = left;

  while (i <= mid && j <= right) {
    if (nums[i] <= nums[j]) {
      buffer[k++] = nums[i++];
    } else {
      buffer[k++] = nums[j++];
    }
  }

  while (i <= mid) {
    buffer[k++] = nums[i++];
  }

  while (j <= right) {
    buffer[k++] = nums[j++];
  }

  for (let t = left; t <= right; t++) {
    nums[t] = buffer[t];
  }
}

function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      return false;
    }
  }
  return true;
}

function countValues(arr) {
  const counts = new Map();
  for (const value of arr) {
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  return counts;
}

function sameCounts(a, b) {
  const countsA = countValues(a);
  const countsB = countValues(b);
  if (countsA.size !== countsB.size) {
    return false;
  }
  for (const [value, count] of countsA) {
    if (countsB.get(value) !== count) {
      return false;
    }
  }
  return true;
}

const tests = [
  { name: "exemplul din curs", input: [6, 2, 5, 2, 1] },
  { name: "o valoare", input: [42] },
  { name: "valori negative", input: [3, -1, -7, 0, 5, -2] },
  { name: "duplicate", input: [5, 1, 5, 1, 5, 1, 3] },
  { name: "deja sortat", input: [1, 2, 3, 4, 5, 6] },
  { name: "sortat invers", input: [9, 7, 5, 3, 1, -1] },
  { name: "lungime impara", input: [8, 3, 9, 1, 4, 7, 2] },
  { name: "LeetCode exemplul 1", input: [5, 2, 3, 1] },
  { name: "LeetCode exemplul 2", input: [5, 1, 1, 2, 0, 0] },
];

tests.forEach(({ name, input }, i) => {
  const original = [...input];
  const output = sortArray(input);
  const passed = isSorted(output) && output.length === original.length && sameCounts(original, output);
  console.log(`Test ${i + 1} (${name}): [${original}] -> [${output}] ${passed ? "PASS" : "FAIL"}`);
});

module.exports = sortArray;
