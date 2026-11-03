const { TreeNode, buildBST, snapshotLinks, linksUnchanged, check, same } = require("./ex1-lab6.js");

function inorderTraversal(root) {
  const result = [];
  visit(root, result);
  return result;
}

function visit(node, result) {
  if (node === null) {
    return;
  }
  visit(node.left, result);
  result.push(node.val);
  visit(node.right, result);
}

function buildLectureTree() {
  return new TreeNode(2, new TreeNode(1, new TreeNode(4)), new TreeNode(3));
}

if (require.main === module) {
  const bst = buildBST([4, 2, 7, 1, 3, 6, 9]);
  const bstLinks = snapshotLinks(bst);
  check(same(inorderTraversal(bst), [1, 2, 3, 4, 6, 7, 9]), "arborele din problema 1 -> [1,2,3,4,6,7,9]");
  check(linksUnchanged(bstLinks, bst), "arborele din problema 1 ramane neschimbat");

  const lecture = buildLectureTree();
  const lectureLinks = snapshotLinks(lecture);
  check(same(inorderTraversal(lecture), [4, 1, 2, 3]), "arbore binar care nu e BST -> [4,1,2,3]");
  check(linksUnchanged(lectureLinks, lecture), "arborele din curs ramane neschimbat");

  check(same(inorderTraversal(null), []), "arbore gol -> []");
  check(same(inorderTraversal(new TreeNode(5)), [5]), "un nod -> [5]");

  const leftChain = buildBST([4, 3, 2, 1]);
  const leftLinks = snapshotLinks(leftChain);
  check(same(inorderTraversal(leftChain), [1, 2, 3, 4]), "lant doar spre stanga -> [1,2,3,4]");
  check(linksUnchanged(leftLinks, leftChain), "lantul spre stanga ramane neschimbat");

  const rightChain = buildBST([1, 2, 3, 4]);
  const rightLinks = snapshotLinks(rightChain);
  check(same(inorderTraversal(rightChain), [1, 2, 3, 4]), "lant doar spre dreapta -> [1,2,3,4]");
  check(linksUnchanged(rightLinks, rightChain), "lantul spre dreapta ramane neschimbat");
}

module.exports = { inorderTraversal, buildLectureTree };
