const { TreeNode, buildBST, snapshotLinks, linksUnchanged, check, same } = require("./ex1-lab6.js");
const { buildLectureTree } = require("./ex2-lab6.js");

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(value) {
    const node = { value, next: null };
    if (this.tail === null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.size++;
  }

  dequeue() {
    const node = this.head;
    this.head = node.next;
    if (this.head === null) {
      this.tail = null;
    }
    this.size--;
    return node.value;
  }
}

function levelOrder(root) {
  const result = [];
  if (root === null) {
    return result;
  }

  const queue = new Queue();
  queue.enqueue(root);

  while (queue.size > 0) {
    const levelSize = queue.size;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.dequeue();
      level.push(node.val);
      if (node.left !== null) {
        queue.enqueue(node.left);
      }
      if (node.right !== null) {
        queue.enqueue(node.right);
      }
    }

    result.push(level);
  }

  return result;
}

if (require.main === module) {
  const bst = buildBST([4, 2, 7, 1, 3, 6, 9]);
  const bstLinks = snapshotLinks(bst);
  check(same(levelOrder(bst), [[4], [2, 7], [1, 3, 6, 9]]), "arborele din problema 1 -> [[4],[2,7],[1,3,6,9]]");
  check(linksUnchanged(bstLinks, bst), "arborele din problema 1 ramane neschimbat");

  check(same(levelOrder(null), []), "arbore gol -> []");
  check(same(levelOrder(new TreeNode(5)), [[5]]), "un nod -> [[5]]");

  const chain = buildBST([1, 2, 3, 4]);
  const chainLinks = snapshotLinks(chain);
  check(same(levelOrder(chain), [[1], [2], [3], [4]]), "lant -> [[1],[2],[3],[4]]");
  check(linksUnchanged(chainLinks, chain), "lantul ramane neschimbat");

  const lecture = buildLectureTree();
  const lectureLinks = snapshotLinks(lecture);
  check(same(levelOrder(lecture), [[2], [1, 3], [4]]), "arborele din problema 2 -> [[2],[1,3],[4]]");
  check(linksUnchanged(lectureLinks, lecture), "arborele din problema 2 ramane neschimbat");
}

module.exports = { levelOrder, Queue };
