function numberOfSteps(num) {
  if (num === 0) {
    return 0;
  }

  if (num % 2 === 0) {
    return 1 + numberOfSteps(num / 2);
  }

  return 1 + numberOfSteps(num - 1);
}

const tests = [
  { num: 0, expected: 0 },
  { num: 1, expected: 1 },
  { num: 14, expected: 6 },
  { num: 8, expected: 4 },
  { num: 123, expected: 12 },
];

tests.forEach(({ num, expected }, i) => {
  const output = numberOfSteps(num);
  console.log(
    `Test ${i + 1}: num=${num} output=${output} expected=${expected} ${output === expected ? "PASS" : "FAIL"}`
  );
});

module.exports = numberOfSteps;
