class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function insertIntoBST(root, val) {
  if (root === null) {
    return new TreeNode(val);
  }

  let curr = root;

  while (true) {
    if (val < curr.val) {
      if (curr.left === null) {
        curr.left = new TreeNode(val);
        return root;
      }
      curr = curr.left;
    } else if (val > curr.val) {
      if (curr.right === null) {
        curr.right = new TreeNode(val);
        return root;
      }
      curr = curr.right;
    } else {
      return root;
    }
  }
}

function buildBST(values) {
  let root = null;
  for (const value of values) {
    root = insertIntoBST(root, value);
  }
  return root;
}

function toLevelArray(root) {
  if (root === null) {
    return [];
  }
  const result = [];
  const nodes = [root];
  let index = 0;
  while (index < nodes.length) {
    const node = nodes[index++];
    if (node === null) {
      result.push(null);
      continue;
    }
    result.push(node.val);
    nodes.push(node.left, node.right);
  }
  while (result[result.length - 1] === null) {
    result.pop();
  }
  return result;
}

function countNodes(root) {
  if (root === null) {
    return 0;
  }
  return 1 + countNodes(root.left) + countNodes(root.right);
}

function height(root) {
  if (root === null) {
    return -1;
  }
  return 1 + Math.max(height(root.left), height(root.right));
}

function isValidBST(root, low = -Infinity, high = Infinity) {
  if (root === null) {
    return true;
  }
  if (root.val <= low || root.val >= high) {
    return false;
  }
  return isValidBST(root.left, low, root.val) && isValidBST(root.right, root.val, high);
}

function snapshotLinks(root) {
  const links = [];
  const stack = root === null ? [] : [root];
  while (stack.length > 0) {
    const node = stack.pop();
    links.push({ node, val: node.val, left: node.left, right: node.right });
    if (node.right !== null) {
      stack.push(node.right);
    }
    if (node.left !== null) {
      stack.push(node.left);
    }
  }
  return links;
}

function linksUnchanged(before, root) {
  const after = snapshotLinks(root);
  if (before.length !== after.length) {
    return false;
  }
  return before.every(
    (entry, i) =>
      entry.node === after[i].node &&
      entry.val === after[i].val &&
      entry.left === after[i].left &&
      entry.right === after[i].right
  );
}

function check(condition, description) {
  console.log(`${condition ? "PASS" : "FAIL"}: ${description}`);
}

function same(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

if (require.main === module) {
  const tree = buildBST([4, 2, 7, 1, 3, 6, 9]);
  check(same(toLevelArray(tree), [4, 2, 7, 1, 3, 6, 9]), "build [4,2,7,1,3,6,9] -> arborele asteptat");
  check(isValidBST(tree), "arborele construit respecta regula BST");
  check(height(tree) === 2, "inaltimea arborelui este 2");

  const fresh = buildBST([4, 2, 7, 1, 3, 6, 9]);
  const sixNode = fresh.right.left;
  const rootBefore = fresh;
  const rootAfter = insertIntoBST(fresh, 5);
  check(rootAfter === rootBefore, "inserarea lui 5 pastreaza aceeasi radacina");
  check(sixNode.left !== null && sixNode.left.val === 5, "5 devine copilul stang al lui 6");
  check(same(toLevelArray(rootAfter), [4, 2, 7, 1, 3, 6, 9, null, null, null, null, 5]), "arborele dupa inserarea lui 5");

  check(buildBST([]) === null, "input gol -> arbore gol (null)");

  const single = buildBST([8]);
  check(same(toLevelArray(single), [8]) && single.left === null && single.right === null, "o valoare -> doar radacina");

  const negatives = buildBST([0, -5, 5, -10, -3]);
  check(same(toLevelArray(negatives), [0, -5, 5, -10, -3]), "valori negative");
  check(isValidBST(negatives), "valorile negative respecta regula BST");

  const duplicates = buildBST([5, 3, 5, 8, 3, 8]);
  check(countNodes(duplicates) === 3, "duplicatele nu adauga noduri noi");
  check(same(toLevelArray(duplicates), [5, 3, 8]), "duplicate -> arbore neschimbat");

  const chain = buildBST([1, 2, 3, 4]);
  let onlyRight = true;
  for (let node = chain; node !== null; node = node.right) {
    if (node.left !== null) {
      onlyRight = false;
    }
  }
  check(onlyRight && countNodes(chain) === 4, "input sortat [1,2,3,4] -> lant doar spre dreapta");
  check(height(chain) === 3, "inaltimea lantului este 3");
}

module.exports = {
  TreeNode,
  insertIntoBST,
  buildBST,
  toLevelArray,
  snapshotLinks,
  linksUnchanged,
  check,
  same,
};
