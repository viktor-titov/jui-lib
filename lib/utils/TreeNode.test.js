// Copyright (c) 2017 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import TreeNode from './TreeNode';
it('TreeNode constructor should return a tree node', function () {
  var node = new TreeNode(4);
  expect(node.value).toBe(4);
  expect(node.children).toEqual([]);
});
it('TreeNode constructor should return a tree node', function () {
  var node = new TreeNode(4, [new TreeNode(3)]);
  expect(node.value).toBe(4);
  expect(node.children).toEqual([new TreeNode(3)]);
});
it('depth should work for a single node', function () {
  expect(new TreeNode().depth).toBe(1);
});
it('depth should caluclate the depth', function () {
  var treeRoot = new TreeNode(1);
  var firstChildNode = new TreeNode(2);
  firstChildNode = firstChildNode.addChild(3);
  firstChildNode = firstChildNode.addChild(4);
  firstChildNode = firstChildNode.addChild(5);
  var secondChildNode = new TreeNode(6);
  var thirdDeepestChildNode = new TreeNode(7);
  thirdDeepestChildNode = thirdDeepestChildNode.addChild(8);
  thirdDeepestChildNode = thirdDeepestChildNode.addChild(9);
  thirdDeepestChildNode = thirdDeepestChildNode.addChild(10);
  secondChildNode = secondChildNode.addChild(thirdDeepestChildNode);
  firstChildNode = firstChildNode.addChild(secondChildNode);
  treeRoot = treeRoot.addChild(firstChildNode);
  treeRoot = treeRoot.addChild(11);
  treeRoot = treeRoot.addChild(12);
  expect(treeRoot.depth).toBe(5);
  expect(secondChildNode.depth).toBe(3);
});
it('size should walk to get total number of nodes', function () {
  var treeRoot = new TreeNode(1);
  var firstChildNode = new TreeNode(2);
  firstChildNode.addChild(3);
  firstChildNode.addChild(4);
  firstChildNode.addChild(5);
  var secondChildNode = new TreeNode(6);
  var thirdDeepestChildNode = new TreeNode(7);
  thirdDeepestChildNode.addChild(8);
  thirdDeepestChildNode.addChild(9);
  thirdDeepestChildNode.addChild(10);
  secondChildNode.addChild(thirdDeepestChildNode);
  firstChildNode.addChild(secondChildNode);
  treeRoot.addChild(firstChildNode);
  treeRoot.addChild(11);
  treeRoot.addChild(12);
  expect(treeRoot.size).toBe(12);
});
it('addChild() should add a child to the set', function () {
  var treeRoot = new TreeNode(4);
  treeRoot.addChild(3);
  treeRoot.addChild(1);
  treeRoot.addChild(2);
  expect(treeRoot).toEqual(new TreeNode(4, [new TreeNode(3), new TreeNode(1), new TreeNode(2)]));
});
it('addChild() should support taking a treenode', function () {
  var treeRoot = new TreeNode(4);
  var otherNode = new TreeNode(2);
  treeRoot.addChild(otherNode);
  treeRoot.addChild(1);
  treeRoot.addChild(2);
  expect(treeRoot).toEqual(new TreeNode(4, [otherNode, new TreeNode(1), new TreeNode(2)]));
});
it('addChild() should support the parent argument for nested insertion', function () {
  var treeRoot = new TreeNode(1);
  var secondTier = new TreeNode(2);
  var thirdTier = new TreeNode(3);
  treeRoot.addChild(secondTier);
  secondTier.addChild(thirdTier);
  expect(treeRoot).toEqual(new TreeNode(1, [new TreeNode(2, [new TreeNode(3)])]));
});
it('find() should return the found item for a function', function () {
  var treeRoot = new TreeNode(1);
  var firstChildNode = new TreeNode(2);
  firstChildNode.addChild(3);
  firstChildNode.addChild(4);
  firstChildNode.addChild(5);
  var secondChildNode = new TreeNode(6);
  var thirdDeepestChildNode = new TreeNode(7);
  thirdDeepestChildNode.addChild(8);
  thirdDeepestChildNode.addChild(9);
  thirdDeepestChildNode.addChild(10);
  secondChildNode.addChild(thirdDeepestChildNode);
  firstChildNode.addChild(secondChildNode);
  treeRoot.addChild(firstChildNode);
  treeRoot.addChild(11);
  treeRoot.addChild(12);
  expect(treeRoot.find(function (value) {
    return value === 6;
  })).toEqual(secondChildNode);
  expect(treeRoot.find(12)).toEqual(new TreeNode(12));
});
it('find() should return the found item for a value', function () {
  var treeRoot = new TreeNode(1);
  var firstChildNode = new TreeNode(2);
  firstChildNode.addChild(3);
  firstChildNode.addChild(4);
  firstChildNode.addChild(5);
  var secondChildNode = new TreeNode(6);
  var thirdDeepestChildNode = new TreeNode(7);
  thirdDeepestChildNode.addChild(8);
  thirdDeepestChildNode.addChild(9);
  thirdDeepestChildNode.addChild(10);
  secondChildNode.addChild(thirdDeepestChildNode);
  firstChildNode.addChild(secondChildNode);
  treeRoot.addChild(firstChildNode);
  treeRoot.addChild(11);
  treeRoot.addChild(12);
  expect(treeRoot.find(7)).toEqual(thirdDeepestChildNode);
  expect(treeRoot.find(12)).toEqual(new TreeNode(12));
});
it('find() should return the found item for a treenode', function () {
  var treeRoot = new TreeNode(1);
  var firstChildNode = new TreeNode(2);
  firstChildNode.addChild(3);
  firstChildNode.addChild(4);
  firstChildNode.addChild(5);
  var secondChildNode = new TreeNode(6);
  var thirdDeepestChildNode = new TreeNode(7);
  thirdDeepestChildNode.addChild(8);
  thirdDeepestChildNode.addChild(9);
  thirdDeepestChildNode.addChild(10);
  secondChildNode.addChild(thirdDeepestChildNode);
  firstChildNode.addChild(secondChildNode);
  treeRoot.addChild(firstChildNode);
  treeRoot.addChild(11);
  treeRoot.addChild(12);
  expect(treeRoot.find(thirdDeepestChildNode)).toEqual(thirdDeepestChildNode);
  expect(treeRoot.find(treeRoot)).toEqual(treeRoot);
});
it('find() should return null for none found', function () {
  var treeRoot = new TreeNode(1);
  var firstChildNode = new TreeNode(2);
  firstChildNode.addChild(3);
  firstChildNode.addChild(4);
  firstChildNode.addChild(5);
  var secondChildNode = new TreeNode(6);
  var thirdDeepestChildNode = new TreeNode(7);
  thirdDeepestChildNode.addChild(8);
  thirdDeepestChildNode.addChild(9);
  thirdDeepestChildNode.addChild(10);
  secondChildNode.addChild(thirdDeepestChildNode);
  firstChildNode.addChild(secondChildNode);
  treeRoot.addChild(firstChildNode);
  treeRoot.addChild(11);
  treeRoot.addChild(12);
  expect(treeRoot.find(13)).toBe(null);
  expect(treeRoot.find(function (value) {
    return value === 'foo';
  })).toBe(null);
});
it('getPath() should return the path to the node', function () {
  var treeRoot = new TreeNode(1);
  var firstChildNode = new TreeNode(2);
  firstChildNode.addChild(3);
  firstChildNode.addChild(4);
  firstChildNode.addChild(5);
  var secondChildNode = new TreeNode(6);
  var thirdDeepestChildNode = new TreeNode(7);
  thirdDeepestChildNode.addChild(8);
  thirdDeepestChildNode.addChild(9);
  thirdDeepestChildNode.addChild(10);
  secondChildNode.addChild(thirdDeepestChildNode);
  firstChildNode.addChild(secondChildNode);
  treeRoot.addChild(firstChildNode);
  treeRoot.addChild(11);
  treeRoot.addChild(12);
  expect(treeRoot.getPath(secondChildNode)).toEqual([treeRoot, firstChildNode, secondChildNode]);
});
it('getPath() should return null if the node is not in the tree', function () {
  var treeRoot = new TreeNode(1);
  var firstChildNode = new TreeNode(2);
  firstChildNode.addChild(3);
  firstChildNode.addChild(4);
  firstChildNode.addChild(5);
  var secondChildNode = new TreeNode(6);
  var thirdDeepestChildNode = new TreeNode(7);
  thirdDeepestChildNode.addChild(8);
  thirdDeepestChildNode.addChild(9);
  thirdDeepestChildNode.addChild(10);
  secondChildNode.addChild(thirdDeepestChildNode);
  firstChildNode.addChild(secondChildNode);
  treeRoot.addChild(firstChildNode);
  treeRoot.addChild(11);
  treeRoot.addChild(12);
  var exteriorNode = new TreeNode(15);
  expect(treeRoot.getPath(exteriorNode)).toEqual(null);
});
it('walk() should iterate over every item once in the right order', function () {
  /**
   * 1
   * | 2
   * | | 3
   * | | 4
   * | | 5
   * | | 6
   * | | | 7
   * | | | | 8
   * | | | | 9
   * | | | | 10
   * | 11
   * | 12
   */

  var treeRoot = new TreeNode(1);
  var firstChildNode = new TreeNode(2);
  firstChildNode.addChild(3);
  firstChildNode.addChild(4);
  firstChildNode.addChild(5);
  var secondChildNode = new TreeNode(6);
  var thirdDeepestChildNode = new TreeNode(7);
  thirdDeepestChildNode.addChild(8);
  thirdDeepestChildNode.addChild(9);
  thirdDeepestChildNode.addChild(10);
  secondChildNode.addChild(thirdDeepestChildNode);
  firstChildNode.addChild(secondChildNode);
  treeRoot.addChild(firstChildNode);
  treeRoot.addChild(11);
  treeRoot.addChild(12);
  var i = 0;
  treeRoot.walk(function (value) {
    return expect(value).toBe(++i);
  });
});
it('walk() should iterate over every item and compute the right deep on each node', function () {
  /**
   *     C0
   *    /
   *   B0 – C1
   *  /
   * A – B1 – C2
   *      \
   *      C3 – D
   */

  var nodeA = new TreeNode('A');
  var nodeB0 = new TreeNode('B0');
  var nodeB1 = new TreeNode('B1');
  var nodeC3 = new TreeNode('C3');
  var depthMap = {
    A: 0,
    B0: 1,
    B1: 1,
    C0: 2,
    C1: 2,
    C2: 2,
    C3: 2,
    D: 3
  };
  nodeA.addChild(nodeB0);
  nodeA.addChild(nodeB0);
  nodeA.addChild(nodeB1);
  nodeB0.addChild('C0');
  nodeB0.addChild('C1');
  nodeB1.addChild('C2');
  nodeB1.addChild(nodeC3);
  nodeC3.addChild('D');
  nodeA.walk(function (value, _, depth) {
    if (typeof value === 'string') {
      expect(depth).toBe(depthMap[value]);
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUcmVlTm9kZSIsIml0Iiwibm9kZSIsImV4cGVjdCIsInZhbHVlIiwidG9CZSIsImNoaWxkcmVuIiwidG9FcXVhbCIsImRlcHRoIiwidHJlZVJvb3QiLCJmaXJzdENoaWxkTm9kZSIsImFkZENoaWxkIiwic2Vjb25kQ2hpbGROb2RlIiwidGhpcmREZWVwZXN0Q2hpbGROb2RlIiwic2l6ZSIsIm90aGVyTm9kZSIsInNlY29uZFRpZXIiLCJ0aGlyZFRpZXIiLCJmaW5kIiwiZ2V0UGF0aCIsImV4dGVyaW9yTm9kZSIsImkiLCJ3YWxrIiwibm9kZUEiLCJub2RlQjAiLCJub2RlQjEiLCJub2RlQzMiLCJkZXB0aE1hcCIsIkEiLCJCMCIsIkIxIiwiQzAiLCJDMSIsIkMyIiwiQzMiLCJEIiwiXyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9UcmVlTm9kZS50ZXN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgVHJlZU5vZGUgZnJvbSAnLi9UcmVlTm9kZSc7XG5cbml0KCdUcmVlTm9kZSBjb25zdHJ1Y3RvciBzaG91bGQgcmV0dXJuIGEgdHJlZSBub2RlJywgKCkgPT4ge1xuICBjb25zdCBub2RlID0gbmV3IFRyZWVOb2RlKDQpO1xuXG4gIGV4cGVjdChub2RlLnZhbHVlKS50b0JlKDQpO1xuICBleHBlY3Qobm9kZS5jaGlsZHJlbikudG9FcXVhbChbXSk7XG59KTtcblxuaXQoJ1RyZWVOb2RlIGNvbnN0cnVjdG9yIHNob3VsZCByZXR1cm4gYSB0cmVlIG5vZGUnLCAoKSA9PiB7XG4gIGNvbnN0IG5vZGUgPSBuZXcgVHJlZU5vZGUoNCwgW25ldyBUcmVlTm9kZSgzKV0pO1xuXG4gIGV4cGVjdChub2RlLnZhbHVlKS50b0JlKDQpO1xuICBleHBlY3Qobm9kZS5jaGlsZHJlbikudG9FcXVhbChbbmV3IFRyZWVOb2RlKDMpXSk7XG59KTtcblxuaXQoJ2RlcHRoIHNob3VsZCB3b3JrIGZvciBhIHNpbmdsZSBub2RlJywgKCkgPT4ge1xuICBleHBlY3QobmV3IFRyZWVOb2RlKCkuZGVwdGgpLnRvQmUoMSk7XG59KTtcblxuaXQoJ2RlcHRoIHNob3VsZCBjYWx1Y2xhdGUgdGhlIGRlcHRoJywgKCkgPT4ge1xuICBsZXQgdHJlZVJvb3QgPSBuZXcgVHJlZU5vZGUoMSk7XG4gIGxldCBmaXJzdENoaWxkTm9kZSA9IG5ldyBUcmVlTm9kZSgyKTtcbiAgZmlyc3RDaGlsZE5vZGUgPSBmaXJzdENoaWxkTm9kZS5hZGRDaGlsZCgzKTtcbiAgZmlyc3RDaGlsZE5vZGUgPSBmaXJzdENoaWxkTm9kZS5hZGRDaGlsZCg0KTtcbiAgZmlyc3RDaGlsZE5vZGUgPSBmaXJzdENoaWxkTm9kZS5hZGRDaGlsZCg1KTtcbiAgbGV0IHNlY29uZENoaWxkTm9kZSA9IG5ldyBUcmVlTm9kZSg2KTtcbiAgbGV0IHRoaXJkRGVlcGVzdENoaWxkTm9kZSA9IG5ldyBUcmVlTm9kZSg3KTtcbiAgdGhpcmREZWVwZXN0Q2hpbGROb2RlID0gdGhpcmREZWVwZXN0Q2hpbGROb2RlLmFkZENoaWxkKDgpO1xuICB0aGlyZERlZXBlc3RDaGlsZE5vZGUgPSB0aGlyZERlZXBlc3RDaGlsZE5vZGUuYWRkQ2hpbGQoOSk7XG4gIHRoaXJkRGVlcGVzdENoaWxkTm9kZSA9IHRoaXJkRGVlcGVzdENoaWxkTm9kZS5hZGRDaGlsZCgxMCk7XG4gIHNlY29uZENoaWxkTm9kZSA9IHNlY29uZENoaWxkTm9kZS5hZGRDaGlsZCh0aGlyZERlZXBlc3RDaGlsZE5vZGUpO1xuICBmaXJzdENoaWxkTm9kZSA9IGZpcnN0Q2hpbGROb2RlLmFkZENoaWxkKHNlY29uZENoaWxkTm9kZSk7XG4gIHRyZWVSb290ID0gdHJlZVJvb3QuYWRkQ2hpbGQoZmlyc3RDaGlsZE5vZGUpO1xuICB0cmVlUm9vdCA9IHRyZWVSb290LmFkZENoaWxkKDExKTtcbiAgdHJlZVJvb3QgPSB0cmVlUm9vdC5hZGRDaGlsZCgxMik7XG5cbiAgZXhwZWN0KHRyZWVSb290LmRlcHRoKS50b0JlKDUpO1xuICBleHBlY3Qoc2Vjb25kQ2hpbGROb2RlLmRlcHRoKS50b0JlKDMpO1xufSk7XG5cbml0KCdzaXplIHNob3VsZCB3YWxrIHRvIGdldCB0b3RhbCBudW1iZXIgb2Ygbm9kZXMnLCAoKSA9PiB7XG4gIGNvbnN0IHRyZWVSb290ID0gbmV3IFRyZWVOb2RlKDEpO1xuICBjb25zdCBmaXJzdENoaWxkTm9kZSA9IG5ldyBUcmVlTm9kZSgyKTtcbiAgZmlyc3RDaGlsZE5vZGUuYWRkQ2hpbGQoMyk7XG4gIGZpcnN0Q2hpbGROb2RlLmFkZENoaWxkKDQpO1xuICBmaXJzdENoaWxkTm9kZS5hZGRDaGlsZCg1KTtcbiAgY29uc3Qgc2Vjb25kQ2hpbGROb2RlID0gbmV3IFRyZWVOb2RlKDYpO1xuICBjb25zdCB0aGlyZERlZXBlc3RDaGlsZE5vZGUgPSBuZXcgVHJlZU5vZGUoNyk7XG4gIHRoaXJkRGVlcGVzdENoaWxkTm9kZS5hZGRDaGlsZCg4KTtcbiAgdGhpcmREZWVwZXN0Q2hpbGROb2RlLmFkZENoaWxkKDkpO1xuICB0aGlyZERlZXBlc3RDaGlsZE5vZGUuYWRkQ2hpbGQoMTApO1xuICBzZWNvbmRDaGlsZE5vZGUuYWRkQ2hpbGQodGhpcmREZWVwZXN0Q2hpbGROb2RlKTtcbiAgZmlyc3RDaGlsZE5vZGUuYWRkQ2hpbGQoc2Vjb25kQ2hpbGROb2RlKTtcbiAgdHJlZVJvb3QuYWRkQ2hpbGQoZmlyc3RDaGlsZE5vZGUpO1xuICB0cmVlUm9vdC5hZGRDaGlsZCgxMSk7XG4gIHRyZWVSb290LmFkZENoaWxkKDEyKTtcblxuICBleHBlY3QodHJlZVJvb3Quc2l6ZSkudG9CZSgxMik7XG59KTtcblxuaXQoJ2FkZENoaWxkKCkgc2hvdWxkIGFkZCBhIGNoaWxkIHRvIHRoZSBzZXQnLCAoKSA9PiB7XG4gIGNvbnN0IHRyZWVSb290ID0gbmV3IFRyZWVOb2RlKDQpO1xuICB0cmVlUm9vdC5hZGRDaGlsZCgzKTtcbiAgdHJlZVJvb3QuYWRkQ2hpbGQoMSk7XG4gIHRyZWVSb290LmFkZENoaWxkKDIpO1xuXG4gIGV4cGVjdCh0cmVlUm9vdCkudG9FcXVhbChuZXcgVHJlZU5vZGUoNCwgW25ldyBUcmVlTm9kZSgzKSwgbmV3IFRyZWVOb2RlKDEpLCBuZXcgVHJlZU5vZGUoMildKSk7XG59KTtcblxuaXQoJ2FkZENoaWxkKCkgc2hvdWxkIHN1cHBvcnQgdGFraW5nIGEgdHJlZW5vZGUnLCAoKSA9PiB7XG4gIGNvbnN0IHRyZWVSb290ID0gbmV3IFRyZWVOb2RlKDQpO1xuICBjb25zdCBvdGhlck5vZGUgPSBuZXcgVHJlZU5vZGUoMik7XG4gIHRyZWVSb290LmFkZENoaWxkKG90aGVyTm9kZSk7XG4gIHRyZWVSb290LmFkZENoaWxkKDEpO1xuICB0cmVlUm9vdC5hZGRDaGlsZCgyKTtcblxuICBleHBlY3QodHJlZVJvb3QpLnRvRXF1YWwobmV3IFRyZWVOb2RlKDQsIFtvdGhlck5vZGUsIG5ldyBUcmVlTm9kZSgxKSwgbmV3IFRyZWVOb2RlKDIpXSkpO1xufSk7XG5cbml0KCdhZGRDaGlsZCgpIHNob3VsZCBzdXBwb3J0IHRoZSBwYXJlbnQgYXJndW1lbnQgZm9yIG5lc3RlZCBpbnNlcnRpb24nLCAoKSA9PiB7XG4gIGNvbnN0IHRyZWVSb290ID0gbmV3IFRyZWVOb2RlKDEpO1xuICBjb25zdCBzZWNvbmRUaWVyID0gbmV3IFRyZWVOb2RlKDIpO1xuICBjb25zdCB0aGlyZFRpZXIgPSBuZXcgVHJlZU5vZGUoMyk7XG4gIHRyZWVSb290LmFkZENoaWxkKHNlY29uZFRpZXIpO1xuICBzZWNvbmRUaWVyLmFkZENoaWxkKHRoaXJkVGllcik7XG5cbiAgZXhwZWN0KHRyZWVSb290KS50b0VxdWFsKG5ldyBUcmVlTm9kZSgxLCBbbmV3IFRyZWVOb2RlKDIsIFtuZXcgVHJlZU5vZGUoMyldKV0pKTtcbn0pO1xuXG5pdCgnZmluZCgpIHNob3VsZCByZXR1cm4gdGhlIGZvdW5kIGl0ZW0gZm9yIGEgZnVuY3Rpb24nLCAoKSA9PiB7XG4gIGNvbnN0IHRyZWVSb290ID0gbmV3IFRyZWVOb2RlKDEpO1xuICBjb25zdCBmaXJzdENoaWxkTm9kZSA9IG5ldyBUcmVlTm9kZSgyKTtcbiAgZmlyc3RDaGlsZE5vZGUuYWRkQ2hpbGQoMyk7XG4gIGZpcnN0Q2hpbGROb2RlLmFkZENoaWxkKDQpO1xuICBmaXJzdENoaWxkTm9kZS5hZGRDaGlsZCg1KTtcbiAgY29uc3Qgc2Vjb25kQ2hpbGROb2RlID0gbmV3IFRyZWVOb2RlKDYpO1xuICBjb25zdCB0aGlyZERlZXBlc3RDaGlsZE5vZGUgPSBuZXcgVHJlZU5vZGUoNyk7XG4gIHRoaXJkRGVlcGVzdENoaWxkTm9kZS5hZGRDaGlsZCg4KTtcbiAgdGhpcmREZWVwZXN0Q2hpbGROb2RlLmFkZENoaWxkKDkpO1xuICB0aGlyZERlZXBlc3RDaGlsZE5vZGUuYWRkQ2hpbGQoMTApO1xuICBzZWNvbmRDaGlsZE5vZGUuYWRkQ2hpbGQodGhpcmREZWVwZXN0Q2hpbGROb2RlKTtcbiAgZmlyc3RDaGlsZE5vZGUuYWRkQ2hpbGQoc2Vjb25kQ2hpbGROb2RlKTtcbiAgdHJlZVJvb3QuYWRkQ2hpbGQoZmlyc3RDaGlsZE5vZGUpO1xuICB0cmVlUm9vdC5hZGRDaGlsZCgxMSk7XG4gIHRyZWVSb290LmFkZENoaWxkKDEyKTtcblxuICBleHBlY3QodHJlZVJvb3QuZmluZCgodmFsdWUpID0+IHZhbHVlID09PSA2KSkudG9FcXVhbChzZWNvbmRDaGlsZE5vZGUpO1xuICBleHBlY3QodHJlZVJvb3QuZmluZCgxMikpLnRvRXF1YWwobmV3IFRyZWVOb2RlKDEyKSk7XG59KTtcblxuaXQoJ2ZpbmQoKSBzaG91bGQgcmV0dXJuIHRoZSBmb3VuZCBpdGVtIGZvciBhIHZhbHVlJywgKCkgPT4ge1xuICBjb25zdCB0cmVlUm9vdCA9IG5ldyBUcmVlTm9kZSgxKTtcbiAgY29uc3QgZmlyc3RDaGlsZE5vZGUgPSBuZXcgVHJlZU5vZGUoMik7XG4gIGZpcnN0Q2hpbGROb2RlLmFkZENoaWxkKDMpO1xuICBmaXJzdENoaWxkTm9kZS5hZGRDaGlsZCg0KTtcbiAgZmlyc3RDaGlsZE5vZGUuYWRkQ2hpbGQoNSk7XG4gIGNvbnN0IHNlY29uZENoaWxkTm9kZSA9IG5ldyBUcmVlTm9kZSg2KTtcbiAgY29uc3QgdGhpcmREZWVwZXN0Q2hpbGROb2RlID0gbmV3IFRyZWVOb2RlKDcpO1xuICB0aGlyZERlZXBlc3RDaGlsZE5vZGUuYWRkQ2hpbGQoOCk7XG4gIHRoaXJkRGVlcGVzdENoaWxkTm9kZS5hZGRDaGlsZCg5KTtcbiAgdGhpcmREZWVwZXN0Q2hpbGROb2RlLmFkZENoaWxkKDEwKTtcbiAgc2Vjb25kQ2hpbGROb2RlLmFkZENoaWxkKHRoaXJkRGVlcGVzdENoaWxkTm9kZSk7XG4gIGZpcnN0Q2hpbGROb2RlLmFkZENoaWxkKHNlY29uZENoaWxkTm9kZSk7XG4gIHRyZWVSb290LmFkZENoaWxkKGZpcnN0Q2hpbGROb2RlKTtcbiAgdHJlZVJvb3QuYWRkQ2hpbGQoMTEpO1xuICB0cmVlUm9vdC5hZGRDaGlsZCgxMik7XG5cbiAgZXhwZWN0KHRyZWVSb290LmZpbmQoNykpLnRvRXF1YWwodGhpcmREZWVwZXN0Q2hpbGROb2RlKTtcbiAgZXhwZWN0KHRyZWVSb290LmZpbmQoMTIpKS50b0VxdWFsKG5ldyBUcmVlTm9kZSgxMikpO1xufSk7XG5cbml0KCdmaW5kKCkgc2hvdWxkIHJldHVybiB0aGUgZm91bmQgaXRlbSBmb3IgYSB0cmVlbm9kZScsICgpID0+IHtcbiAgY29uc3QgdHJlZVJvb3QgPSBuZXcgVHJlZU5vZGUoMSk7XG4gIGNvbnN0IGZpcnN0Q2hpbGROb2RlID0gbmV3IFRyZWVOb2RlKDIpO1xuICBmaXJzdENoaWxkTm9kZS5hZGRDaGlsZCgzKTtcbiAgZmlyc3RDaGlsZE5vZGUuYWRkQ2hpbGQoNCk7XG4gIGZpcnN0Q2hpbGROb2RlLmFkZENoaWxkKDUpO1xuICBjb25zdCBzZWNvbmRDaGlsZE5vZGUgPSBuZXcgVHJlZU5vZGUoNik7XG4gIGNvbnN0IHRoaXJkRGVlcGVzdENoaWxkTm9kZSA9IG5ldyBUcmVlTm9kZSg3KTtcbiAgdGhpcmREZWVwZXN0Q2hpbGROb2RlLmFkZENoaWxkKDgpO1xuICB0aGlyZERlZXBlc3RDaGlsZE5vZGUuYWRkQ2hpbGQoOSk7XG4gIHRoaXJkRGVlcGVzdENoaWxkTm9kZS5hZGRDaGlsZCgxMCk7XG4gIHNlY29uZENoaWxkTm9kZS5hZGRDaGlsZCh0aGlyZERlZXBlc3RDaGlsZE5vZGUpO1xuICBmaXJzdENoaWxkTm9kZS5hZGRDaGlsZChzZWNvbmRDaGlsZE5vZGUpO1xuICB0cmVlUm9vdC5hZGRDaGlsZChmaXJzdENoaWxkTm9kZSk7XG4gIHRyZWVSb290LmFkZENoaWxkKDExKTtcbiAgdHJlZVJvb3QuYWRkQ2hpbGQoMTIpO1xuXG4gIGV4cGVjdCh0cmVlUm9vdC5maW5kKHRoaXJkRGVlcGVzdENoaWxkTm9kZSkpLnRvRXF1YWwodGhpcmREZWVwZXN0Q2hpbGROb2RlKTtcbiAgZXhwZWN0KHRyZWVSb290LmZpbmQodHJlZVJvb3QpKS50b0VxdWFsKHRyZWVSb290KTtcbn0pO1xuXG5pdCgnZmluZCgpIHNob3VsZCByZXR1cm4gbnVsbCBmb3Igbm9uZSBmb3VuZCcsICgpID0+IHtcbiAgY29uc3QgdHJlZVJvb3QgPSBuZXcgVHJlZU5vZGUoMSk7XG4gIGNvbnN0IGZpcnN0Q2hpbGROb2RlID0gbmV3IFRyZWVOb2RlKDIpO1xuICBmaXJzdENoaWxkTm9kZS5hZGRDaGlsZCgzKTtcbiAgZmlyc3RDaGlsZE5vZGUuYWRkQ2hpbGQoNCk7XG4gIGZpcnN0Q2hpbGROb2RlLmFkZENoaWxkKDUpO1xuICBjb25zdCBzZWNvbmRDaGlsZE5vZGUgPSBuZXcgVHJlZU5vZGUoNik7XG4gIGNvbnN0IHRoaXJkRGVlcGVzdENoaWxkTm9kZSA9IG5ldyBUcmVlTm9kZSg3KTtcbiAgdGhpcmREZWVwZXN0Q2hpbGROb2RlLmFkZENoaWxkKDgpO1xuICB0aGlyZERlZXBlc3RDaGlsZE5vZGUuYWRkQ2hpbGQoOSk7XG4gIHRoaXJkRGVlcGVzdENoaWxkTm9kZS5hZGRDaGlsZCgxMCk7XG4gIHNlY29uZENoaWxkTm9kZS5hZGRDaGlsZCh0aGlyZERlZXBlc3RDaGlsZE5vZGUpO1xuICBmaXJzdENoaWxkTm9kZS5hZGRDaGlsZChzZWNvbmRDaGlsZE5vZGUpO1xuICB0cmVlUm9vdC5hZGRDaGlsZChmaXJzdENoaWxkTm9kZSk7XG4gIHRyZWVSb290LmFkZENoaWxkKDExKTtcbiAgdHJlZVJvb3QuYWRkQ2hpbGQoMTIpO1xuXG4gIGV4cGVjdCh0cmVlUm9vdC5maW5kKDEzKSkudG9CZShudWxsKTtcbiAgZXhwZWN0KHRyZWVSb290LmZpbmQoKHZhbHVlKSA9PiB2YWx1ZSA9PT0gJ2ZvbycpKS50b0JlKG51bGwpO1xufSk7XG5cbml0KCdnZXRQYXRoKCkgc2hvdWxkIHJldHVybiB0aGUgcGF0aCB0byB0aGUgbm9kZScsICgpID0+IHtcbiAgY29uc3QgdHJlZVJvb3QgPSBuZXcgVHJlZU5vZGUoMSk7XG4gIGNvbnN0IGZpcnN0Q2hpbGROb2RlID0gbmV3IFRyZWVOb2RlKDIpO1xuICBmaXJzdENoaWxkTm9kZS5hZGRDaGlsZCgzKTtcbiAgZmlyc3RDaGlsZE5vZGUuYWRkQ2hpbGQoNCk7XG4gIGZpcnN0Q2hpbGROb2RlLmFkZENoaWxkKDUpO1xuICBjb25zdCBzZWNvbmRDaGlsZE5vZGUgPSBuZXcgVHJlZU5vZGUoNik7XG4gIGNvbnN0IHRoaXJkRGVlcGVzdENoaWxkTm9kZSA9IG5ldyBUcmVlTm9kZSg3KTtcbiAgdGhpcmREZWVwZXN0Q2hpbGROb2RlLmFkZENoaWxkKDgpO1xuICB0aGlyZERlZXBlc3RDaGlsZE5vZGUuYWRkQ2hpbGQoOSk7XG4gIHRoaXJkRGVlcGVzdENoaWxkTm9kZS5hZGRDaGlsZCgxMCk7XG4gIHNlY29uZENoaWxkTm9kZS5hZGRDaGlsZCh0aGlyZERlZXBlc3RDaGlsZE5vZGUpO1xuICBmaXJzdENoaWxkTm9kZS5hZGRDaGlsZChzZWNvbmRDaGlsZE5vZGUpO1xuICB0cmVlUm9vdC5hZGRDaGlsZChmaXJzdENoaWxkTm9kZSk7XG4gIHRyZWVSb290LmFkZENoaWxkKDExKTtcbiAgdHJlZVJvb3QuYWRkQ2hpbGQoMTIpO1xuXG4gIGV4cGVjdCh0cmVlUm9vdC5nZXRQYXRoKHNlY29uZENoaWxkTm9kZSkpLnRvRXF1YWwoW3RyZWVSb290LCBmaXJzdENoaWxkTm9kZSwgc2Vjb25kQ2hpbGROb2RlXSk7XG59KTtcblxuaXQoJ2dldFBhdGgoKSBzaG91bGQgcmV0dXJuIG51bGwgaWYgdGhlIG5vZGUgaXMgbm90IGluIHRoZSB0cmVlJywgKCkgPT4ge1xuICBjb25zdCB0cmVlUm9vdCA9IG5ldyBUcmVlTm9kZSgxKTtcbiAgY29uc3QgZmlyc3RDaGlsZE5vZGUgPSBuZXcgVHJlZU5vZGUoMik7XG4gIGZpcnN0Q2hpbGROb2RlLmFkZENoaWxkKDMpO1xuICBmaXJzdENoaWxkTm9kZS5hZGRDaGlsZCg0KTtcbiAgZmlyc3RDaGlsZE5vZGUuYWRkQ2hpbGQoNSk7XG4gIGNvbnN0IHNlY29uZENoaWxkTm9kZSA9IG5ldyBUcmVlTm9kZSg2KTtcbiAgY29uc3QgdGhpcmREZWVwZXN0Q2hpbGROb2RlID0gbmV3IFRyZWVOb2RlKDcpO1xuICB0aGlyZERlZXBlc3RDaGlsZE5vZGUuYWRkQ2hpbGQoOCk7XG4gIHRoaXJkRGVlcGVzdENoaWxkTm9kZS5hZGRDaGlsZCg5KTtcbiAgdGhpcmREZWVwZXN0Q2hpbGROb2RlLmFkZENoaWxkKDEwKTtcbiAgc2Vjb25kQ2hpbGROb2RlLmFkZENoaWxkKHRoaXJkRGVlcGVzdENoaWxkTm9kZSk7XG4gIGZpcnN0Q2hpbGROb2RlLmFkZENoaWxkKHNlY29uZENoaWxkTm9kZSk7XG4gIHRyZWVSb290LmFkZENoaWxkKGZpcnN0Q2hpbGROb2RlKTtcbiAgdHJlZVJvb3QuYWRkQ2hpbGQoMTEpO1xuICB0cmVlUm9vdC5hZGRDaGlsZCgxMik7XG5cbiAgY29uc3QgZXh0ZXJpb3JOb2RlID0gbmV3IFRyZWVOb2RlKDE1KTtcblxuICBleHBlY3QodHJlZVJvb3QuZ2V0UGF0aChleHRlcmlvck5vZGUpKS50b0VxdWFsKG51bGwpO1xufSk7XG5cbml0KCd3YWxrKCkgc2hvdWxkIGl0ZXJhdGUgb3ZlciBldmVyeSBpdGVtIG9uY2UgaW4gdGhlIHJpZ2h0IG9yZGVyJywgKCkgPT4ge1xuICAvKipcbiAgICogMVxuICAgKiB8IDJcbiAgICogfCB8IDNcbiAgICogfCB8IDRcbiAgICogfCB8IDVcbiAgICogfCB8IDZcbiAgICogfCB8IHwgN1xuICAgKiB8IHwgfCB8IDhcbiAgICogfCB8IHwgfCA5XG4gICAqIHwgfCB8IHwgMTBcbiAgICogfCAxMVxuICAgKiB8IDEyXG4gICAqL1xuXG4gIGNvbnN0IHRyZWVSb290ID0gbmV3IFRyZWVOb2RlKDEpO1xuICBjb25zdCBmaXJzdENoaWxkTm9kZSA9IG5ldyBUcmVlTm9kZSgyKTtcbiAgZmlyc3RDaGlsZE5vZGUuYWRkQ2hpbGQoMyk7XG4gIGZpcnN0Q2hpbGROb2RlLmFkZENoaWxkKDQpO1xuICBmaXJzdENoaWxkTm9kZS5hZGRDaGlsZCg1KTtcbiAgY29uc3Qgc2Vjb25kQ2hpbGROb2RlID0gbmV3IFRyZWVOb2RlKDYpO1xuICBjb25zdCB0aGlyZERlZXBlc3RDaGlsZE5vZGUgPSBuZXcgVHJlZU5vZGUoNyk7XG4gIHRoaXJkRGVlcGVzdENoaWxkTm9kZS5hZGRDaGlsZCg4KTtcbiAgdGhpcmREZWVwZXN0Q2hpbGROb2RlLmFkZENoaWxkKDkpO1xuICB0aGlyZERlZXBlc3RDaGlsZE5vZGUuYWRkQ2hpbGQoMTApO1xuICBzZWNvbmRDaGlsZE5vZGUuYWRkQ2hpbGQodGhpcmREZWVwZXN0Q2hpbGROb2RlKTtcbiAgZmlyc3RDaGlsZE5vZGUuYWRkQ2hpbGQoc2Vjb25kQ2hpbGROb2RlKTtcbiAgdHJlZVJvb3QuYWRkQ2hpbGQoZmlyc3RDaGlsZE5vZGUpO1xuICB0cmVlUm9vdC5hZGRDaGlsZCgxMSk7XG4gIHRyZWVSb290LmFkZENoaWxkKDEyKTtcblxuICBsZXQgaSA9IDA7XG5cbiAgdHJlZVJvb3Qud2FsaygodmFsdWUpID0+IGV4cGVjdCh2YWx1ZSkudG9CZSgrK2kpKTtcbn0pO1xuXG5pdCgnd2FsaygpIHNob3VsZCBpdGVyYXRlIG92ZXIgZXZlcnkgaXRlbSBhbmQgY29tcHV0ZSB0aGUgcmlnaHQgZGVlcCBvbiBlYWNoIG5vZGUnLCAoKSA9PiB7XG4gIC8qKlxuICAgKiAgICAgQzBcbiAgICogICAgL1xuICAgKiAgIEIwIOKAkyBDMVxuICAgKiAgL1xuICAgKiBBIOKAkyBCMSDigJMgQzJcbiAgICogICAgICBcXFxuICAgKiAgICAgIEMzIOKAkyBEXG4gICAqL1xuXG4gIGNvbnN0IG5vZGVBID0gbmV3IFRyZWVOb2RlKCdBJyk7XG4gIGNvbnN0IG5vZGVCMCA9IG5ldyBUcmVlTm9kZSgnQjAnKTtcbiAgY29uc3Qgbm9kZUIxID0gbmV3IFRyZWVOb2RlKCdCMScpO1xuICBjb25zdCBub2RlQzMgPSBuZXcgVHJlZU5vZGUoJ0MzJyk7XG4gIGNvbnN0IGRlcHRoTWFwOiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9ID0geyBBOiAwLCBCMDogMSwgQjE6IDEsIEMwOiAyLCBDMTogMiwgQzI6IDIsIEMzOiAyLCBEOiAzIH07XG4gIG5vZGVBLmFkZENoaWxkKG5vZGVCMCk7XG4gIG5vZGVBLmFkZENoaWxkKG5vZGVCMCk7XG4gIG5vZGVBLmFkZENoaWxkKG5vZGVCMSk7XG4gIG5vZGVCMC5hZGRDaGlsZCgnQzAnKTtcbiAgbm9kZUIwLmFkZENoaWxkKCdDMScpO1xuICBub2RlQjEuYWRkQ2hpbGQoJ0MyJyk7XG4gIG5vZGVCMS5hZGRDaGlsZChub2RlQzMpO1xuICBub2RlQzMuYWRkQ2hpbGQoJ0QnKTtcbiAgbm9kZUEud2FsaygodmFsdWUsIF8sIGRlcHRoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGV4cGVjdChkZXB0aCkudG9CZShkZXB0aE1hcFt2YWx1ZV0pO1xuICAgIH1cbiAgfSk7XG59KTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsUUFBUSxNQUFNLFlBQVk7QUFFakNDLEVBQUUsQ0FBQyxnREFBZ0QsRUFBRSxZQUFNO0VBQ3pELElBQU1DLElBQUksR0FBRyxJQUFJRixRQUFRLENBQUMsQ0FBQyxDQUFDO0VBRTVCRyxNQUFNLENBQUNELElBQUksQ0FBQ0UsS0FBSyxDQUFDLENBQUNDLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDMUJGLE1BQU0sQ0FBQ0QsSUFBSSxDQUFDSSxRQUFRLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLEVBQUUsQ0FBQztBQUNuQyxDQUFDLENBQUM7QUFFRk4sRUFBRSxDQUFDLGdEQUFnRCxFQUFFLFlBQU07RUFDekQsSUFBTUMsSUFBSSxHQUFHLElBQUlGLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJQSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUUvQ0csTUFBTSxDQUFDRCxJQUFJLENBQUNFLEtBQUssQ0FBQyxDQUFDQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzFCRixNQUFNLENBQUNELElBQUksQ0FBQ0ksUUFBUSxDQUFDLENBQUNDLE9BQU8sQ0FBQyxDQUFDLElBQUlQLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xELENBQUMsQ0FBQztBQUVGQyxFQUFFLENBQUMscUNBQXFDLEVBQUUsWUFBTTtFQUM5Q0UsTUFBTSxDQUFDLElBQUlILFFBQVEsQ0FBQyxDQUFDLENBQUNRLEtBQUssQ0FBQyxDQUFDSCxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQztBQUVGSixFQUFFLENBQUMsa0NBQWtDLEVBQUUsWUFBTTtFQUMzQyxJQUFJUSxRQUFRLEdBQUcsSUFBSVQsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUM5QixJQUFJVSxjQUFjLEdBQUcsSUFBSVYsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUNwQ1UsY0FBYyxHQUFHQSxjQUFjLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDM0NELGNBQWMsR0FBR0EsY0FBYyxDQUFDQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQzNDRCxjQUFjLEdBQUdBLGNBQWMsQ0FBQ0MsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUMzQyxJQUFJQyxlQUFlLEdBQUcsSUFBSVosUUFBUSxDQUFDLENBQUMsQ0FBQztFQUNyQyxJQUFJYSxxQkFBcUIsR0FBRyxJQUFJYixRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQzNDYSxxQkFBcUIsR0FBR0EscUJBQXFCLENBQUNGLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDekRFLHFCQUFxQixHQUFHQSxxQkFBcUIsQ0FBQ0YsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUN6REUscUJBQXFCLEdBQUdBLHFCQUFxQixDQUFDRixRQUFRLENBQUMsRUFBRSxDQUFDO0VBQzFEQyxlQUFlLEdBQUdBLGVBQWUsQ0FBQ0QsUUFBUSxDQUFDRSxxQkFBcUIsQ0FBQztFQUNqRUgsY0FBYyxHQUFHQSxjQUFjLENBQUNDLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDO0VBQ3pESCxRQUFRLEdBQUdBLFFBQVEsQ0FBQ0UsUUFBUSxDQUFDRCxjQUFjLENBQUM7RUFDNUNELFFBQVEsR0FBR0EsUUFBUSxDQUFDRSxRQUFRLENBQUMsRUFBRSxDQUFDO0VBQ2hDRixRQUFRLEdBQUdBLFFBQVEsQ0FBQ0UsUUFBUSxDQUFDLEVBQUUsQ0FBQztFQUVoQ1IsTUFBTSxDQUFDTSxRQUFRLENBQUNELEtBQUssQ0FBQyxDQUFDSCxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzlCRixNQUFNLENBQUNTLGVBQWUsQ0FBQ0osS0FBSyxDQUFDLENBQUNILElBQUksQ0FBQyxDQUFDLENBQUM7QUFDdkMsQ0FBQyxDQUFDO0FBRUZKLEVBQUUsQ0FBQywrQ0FBK0MsRUFBRSxZQUFNO0VBQ3hELElBQU1RLFFBQVEsR0FBRyxJQUFJVCxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLElBQU1VLGNBQWMsR0FBRyxJQUFJVixRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ3RDVSxjQUFjLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDMUJELGNBQWMsQ0FBQ0MsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUMxQkQsY0FBYyxDQUFDQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQzFCLElBQU1DLGVBQWUsR0FBRyxJQUFJWixRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ3ZDLElBQU1hLHFCQUFxQixHQUFHLElBQUliLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDN0NhLHFCQUFxQixDQUFDRixRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ2pDRSxxQkFBcUIsQ0FBQ0YsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUNqQ0UscUJBQXFCLENBQUNGLFFBQVEsQ0FBQyxFQUFFLENBQUM7RUFDbENDLGVBQWUsQ0FBQ0QsUUFBUSxDQUFDRSxxQkFBcUIsQ0FBQztFQUMvQ0gsY0FBYyxDQUFDQyxRQUFRLENBQUNDLGVBQWUsQ0FBQztFQUN4Q0gsUUFBUSxDQUFDRSxRQUFRLENBQUNELGNBQWMsQ0FBQztFQUNqQ0QsUUFBUSxDQUFDRSxRQUFRLENBQUMsRUFBRSxDQUFDO0VBQ3JCRixRQUFRLENBQUNFLFFBQVEsQ0FBQyxFQUFFLENBQUM7RUFFckJSLE1BQU0sQ0FBQ00sUUFBUSxDQUFDSyxJQUFJLENBQUMsQ0FBQ1QsSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUNoQyxDQUFDLENBQUM7QUFFRkosRUFBRSxDQUFDLDBDQUEwQyxFQUFFLFlBQU07RUFDbkQsSUFBTVEsUUFBUSxHQUFHLElBQUlULFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDaENTLFFBQVEsQ0FBQ0UsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUNwQkYsUUFBUSxDQUFDRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ3BCRixRQUFRLENBQUNFLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFFcEJSLE1BQU0sQ0FBQ00sUUFBUSxDQUFDLENBQUNGLE9BQU8sQ0FBQyxJQUFJUCxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSUEsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUlBLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJQSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hHLENBQUMsQ0FBQztBQUVGQyxFQUFFLENBQUMsNkNBQTZDLEVBQUUsWUFBTTtFQUN0RCxJQUFNUSxRQUFRLEdBQUcsSUFBSVQsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUNoQyxJQUFNZSxTQUFTLEdBQUcsSUFBSWYsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUNqQ1MsUUFBUSxDQUFDRSxRQUFRLENBQUNJLFNBQVMsQ0FBQztFQUM1Qk4sUUFBUSxDQUFDRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ3BCRixRQUFRLENBQUNFLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFFcEJSLE1BQU0sQ0FBQ00sUUFBUSxDQUFDLENBQUNGLE9BQU8sQ0FBQyxJQUFJUCxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUNlLFNBQVMsRUFBRSxJQUFJZixRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSUEsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxRixDQUFDLENBQUM7QUFFRkMsRUFBRSxDQUFDLG9FQUFvRSxFQUFFLFlBQU07RUFDN0UsSUFBTVEsUUFBUSxHQUFHLElBQUlULFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDaEMsSUFBTWdCLFVBQVUsR0FBRyxJQUFJaEIsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUNsQyxJQUFNaUIsU0FBUyxHQUFHLElBQUlqQixRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ2pDUyxRQUFRLENBQUNFLFFBQVEsQ0FBQ0ssVUFBVSxDQUFDO0VBQzdCQSxVQUFVLENBQUNMLFFBQVEsQ0FBQ00sU0FBUyxDQUFDO0VBRTlCZCxNQUFNLENBQUNNLFFBQVEsQ0FBQyxDQUFDRixPQUFPLENBQUMsSUFBSVAsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUlBLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJQSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqRixDQUFDLENBQUM7QUFFRkMsRUFBRSxDQUFDLG9EQUFvRCxFQUFFLFlBQU07RUFDN0QsSUFBTVEsUUFBUSxHQUFHLElBQUlULFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDaEMsSUFBTVUsY0FBYyxHQUFHLElBQUlWLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDdENVLGNBQWMsQ0FBQ0MsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUMxQkQsY0FBYyxDQUFDQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQzFCRCxjQUFjLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDMUIsSUFBTUMsZUFBZSxHQUFHLElBQUlaLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDdkMsSUFBTWEscUJBQXFCLEdBQUcsSUFBSWIsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUM3Q2EscUJBQXFCLENBQUNGLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDakNFLHFCQUFxQixDQUFDRixRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ2pDRSxxQkFBcUIsQ0FBQ0YsUUFBUSxDQUFDLEVBQUUsQ0FBQztFQUNsQ0MsZUFBZSxDQUFDRCxRQUFRLENBQUNFLHFCQUFxQixDQUFDO0VBQy9DSCxjQUFjLENBQUNDLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDO0VBQ3hDSCxRQUFRLENBQUNFLFFBQVEsQ0FBQ0QsY0FBYyxDQUFDO0VBQ2pDRCxRQUFRLENBQUNFLFFBQVEsQ0FBQyxFQUFFLENBQUM7RUFDckJGLFFBQVEsQ0FBQ0UsUUFBUSxDQUFDLEVBQUUsQ0FBQztFQUVyQlIsTUFBTSxDQUFDTSxRQUFRLENBQUNTLElBQUksQ0FBQyxVQUFDZCxLQUFLO0lBQUEsT0FBS0EsS0FBSyxLQUFLLENBQUM7RUFBQSxFQUFDLENBQUMsQ0FBQ0csT0FBTyxDQUFDSyxlQUFlLENBQUM7RUFDdEVULE1BQU0sQ0FBQ00sUUFBUSxDQUFDUyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQ1gsT0FBTyxDQUFDLElBQUlQLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNyRCxDQUFDLENBQUM7QUFFRkMsRUFBRSxDQUFDLGlEQUFpRCxFQUFFLFlBQU07RUFDMUQsSUFBTVEsUUFBUSxHQUFHLElBQUlULFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDaEMsSUFBTVUsY0FBYyxHQUFHLElBQUlWLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDdENVLGNBQWMsQ0FBQ0MsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUMxQkQsY0FBYyxDQUFDQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQzFCRCxjQUFjLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDMUIsSUFBTUMsZUFBZSxHQUFHLElBQUlaLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDdkMsSUFBTWEscUJBQXFCLEdBQUcsSUFBSWIsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUM3Q2EscUJBQXFCLENBQUNGLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDakNFLHFCQUFxQixDQUFDRixRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ2pDRSxxQkFBcUIsQ0FBQ0YsUUFBUSxDQUFDLEVBQUUsQ0FBQztFQUNsQ0MsZUFBZSxDQUFDRCxRQUFRLENBQUNFLHFCQUFxQixDQUFDO0VBQy9DSCxjQUFjLENBQUNDLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDO0VBQ3hDSCxRQUFRLENBQUNFLFFBQVEsQ0FBQ0QsY0FBYyxDQUFDO0VBQ2pDRCxRQUFRLENBQUNFLFFBQVEsQ0FBQyxFQUFFLENBQUM7RUFDckJGLFFBQVEsQ0FBQ0UsUUFBUSxDQUFDLEVBQUUsQ0FBQztFQUVyQlIsTUFBTSxDQUFDTSxRQUFRLENBQUNTLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDWCxPQUFPLENBQUNNLHFCQUFxQixDQUFDO0VBQ3ZEVixNQUFNLENBQUNNLFFBQVEsQ0FBQ1MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUNYLE9BQU8sQ0FBQyxJQUFJUCxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckQsQ0FBQyxDQUFDO0FBRUZDLEVBQUUsQ0FBQyxvREFBb0QsRUFBRSxZQUFNO0VBQzdELElBQU1RLFFBQVEsR0FBRyxJQUFJVCxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLElBQU1VLGNBQWMsR0FBRyxJQUFJVixRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ3RDVSxjQUFjLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDMUJELGNBQWMsQ0FBQ0MsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUMxQkQsY0FBYyxDQUFDQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQzFCLElBQU1DLGVBQWUsR0FBRyxJQUFJWixRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ3ZDLElBQU1hLHFCQUFxQixHQUFHLElBQUliLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDN0NhLHFCQUFxQixDQUFDRixRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ2pDRSxxQkFBcUIsQ0FBQ0YsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUNqQ0UscUJBQXFCLENBQUNGLFFBQVEsQ0FBQyxFQUFFLENBQUM7RUFDbENDLGVBQWUsQ0FBQ0QsUUFBUSxDQUFDRSxxQkFBcUIsQ0FBQztFQUMvQ0gsY0FBYyxDQUFDQyxRQUFRLENBQUNDLGVBQWUsQ0FBQztFQUN4Q0gsUUFBUSxDQUFDRSxRQUFRLENBQUNELGNBQWMsQ0FBQztFQUNqQ0QsUUFBUSxDQUFDRSxRQUFRLENBQUMsRUFBRSxDQUFDO0VBQ3JCRixRQUFRLENBQUNFLFFBQVEsQ0FBQyxFQUFFLENBQUM7RUFFckJSLE1BQU0sQ0FBQ00sUUFBUSxDQUFDUyxJQUFJLENBQUNMLHFCQUFxQixDQUFDLENBQUMsQ0FBQ04sT0FBTyxDQUFDTSxxQkFBcUIsQ0FBQztFQUMzRVYsTUFBTSxDQUFDTSxRQUFRLENBQUNTLElBQUksQ0FBQ1QsUUFBUSxDQUFDLENBQUMsQ0FBQ0YsT0FBTyxDQUFDRSxRQUFRLENBQUM7QUFDbkQsQ0FBQyxDQUFDO0FBRUZSLEVBQUUsQ0FBQywwQ0FBMEMsRUFBRSxZQUFNO0VBQ25ELElBQU1RLFFBQVEsR0FBRyxJQUFJVCxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLElBQU1VLGNBQWMsR0FBRyxJQUFJVixRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ3RDVSxjQUFjLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDMUJELGNBQWMsQ0FBQ0MsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUMxQkQsY0FBYyxDQUFDQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQzFCLElBQU1DLGVBQWUsR0FBRyxJQUFJWixRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ3ZDLElBQU1hLHFCQUFxQixHQUFHLElBQUliLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDN0NhLHFCQUFxQixDQUFDRixRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ2pDRSxxQkFBcUIsQ0FBQ0YsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUNqQ0UscUJBQXFCLENBQUNGLFFBQVEsQ0FBQyxFQUFFLENBQUM7RUFDbENDLGVBQWUsQ0FBQ0QsUUFBUSxDQUFDRSxxQkFBcUIsQ0FBQztFQUMvQ0gsY0FBYyxDQUFDQyxRQUFRLENBQUNDLGVBQWUsQ0FBQztFQUN4Q0gsUUFBUSxDQUFDRSxRQUFRLENBQUNELGNBQWMsQ0FBQztFQUNqQ0QsUUFBUSxDQUFDRSxRQUFRLENBQUMsRUFBRSxDQUFDO0VBQ3JCRixRQUFRLENBQUNFLFFBQVEsQ0FBQyxFQUFFLENBQUM7RUFFckJSLE1BQU0sQ0FBQ00sUUFBUSxDQUFDUyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQztFQUNwQ0YsTUFBTSxDQUFDTSxRQUFRLENBQUNTLElBQUksQ0FBQyxVQUFDZCxLQUFLO0lBQUEsT0FBS0EsS0FBSyxLQUFLLEtBQUs7RUFBQSxFQUFDLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQztBQUM5RCxDQUFDLENBQUM7QUFFRkosRUFBRSxDQUFDLDhDQUE4QyxFQUFFLFlBQU07RUFDdkQsSUFBTVEsUUFBUSxHQUFHLElBQUlULFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDaEMsSUFBTVUsY0FBYyxHQUFHLElBQUlWLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDdENVLGNBQWMsQ0FBQ0MsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUMxQkQsY0FBYyxDQUFDQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQzFCRCxjQUFjLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDMUIsSUFBTUMsZUFBZSxHQUFHLElBQUlaLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDdkMsSUFBTWEscUJBQXFCLEdBQUcsSUFBSWIsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUM3Q2EscUJBQXFCLENBQUNGLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDakNFLHFCQUFxQixDQUFDRixRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ2pDRSxxQkFBcUIsQ0FBQ0YsUUFBUSxDQUFDLEVBQUUsQ0FBQztFQUNsQ0MsZUFBZSxDQUFDRCxRQUFRLENBQUNFLHFCQUFxQixDQUFDO0VBQy9DSCxjQUFjLENBQUNDLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDO0VBQ3hDSCxRQUFRLENBQUNFLFFBQVEsQ0FBQ0QsY0FBYyxDQUFDO0VBQ2pDRCxRQUFRLENBQUNFLFFBQVEsQ0FBQyxFQUFFLENBQUM7RUFDckJGLFFBQVEsQ0FBQ0UsUUFBUSxDQUFDLEVBQUUsQ0FBQztFQUVyQlIsTUFBTSxDQUFDTSxRQUFRLENBQUNVLE9BQU8sQ0FBQ1AsZUFBZSxDQUFDLENBQUMsQ0FBQ0wsT0FBTyxDQUFDLENBQUNFLFFBQVEsRUFBRUMsY0FBYyxFQUFFRSxlQUFlLENBQUMsQ0FBQztBQUNoRyxDQUFDLENBQUM7QUFFRlgsRUFBRSxDQUFDLDZEQUE2RCxFQUFFLFlBQU07RUFDdEUsSUFBTVEsUUFBUSxHQUFHLElBQUlULFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDaEMsSUFBTVUsY0FBYyxHQUFHLElBQUlWLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDdENVLGNBQWMsQ0FBQ0MsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUMxQkQsY0FBYyxDQUFDQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQzFCRCxjQUFjLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDMUIsSUFBTUMsZUFBZSxHQUFHLElBQUlaLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDdkMsSUFBTWEscUJBQXFCLEdBQUcsSUFBSWIsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUM3Q2EscUJBQXFCLENBQUNGLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDakNFLHFCQUFxQixDQUFDRixRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ2pDRSxxQkFBcUIsQ0FBQ0YsUUFBUSxDQUFDLEVBQUUsQ0FBQztFQUNsQ0MsZUFBZSxDQUFDRCxRQUFRLENBQUNFLHFCQUFxQixDQUFDO0VBQy9DSCxjQUFjLENBQUNDLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDO0VBQ3hDSCxRQUFRLENBQUNFLFFBQVEsQ0FBQ0QsY0FBYyxDQUFDO0VBQ2pDRCxRQUFRLENBQUNFLFFBQVEsQ0FBQyxFQUFFLENBQUM7RUFDckJGLFFBQVEsQ0FBQ0UsUUFBUSxDQUFDLEVBQUUsQ0FBQztFQUVyQixJQUFNUyxZQUFZLEdBQUcsSUFBSXBCLFFBQVEsQ0FBQyxFQUFFLENBQUM7RUFFckNHLE1BQU0sQ0FBQ00sUUFBUSxDQUFDVSxPQUFPLENBQUNDLFlBQVksQ0FBQyxDQUFDLENBQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDdEQsQ0FBQyxDQUFDO0FBRUZOLEVBQUUsQ0FBQywrREFBK0QsRUFBRSxZQUFNO0VBQ3hFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0VBRUUsSUFBTVEsUUFBUSxHQUFHLElBQUlULFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDaEMsSUFBTVUsY0FBYyxHQUFHLElBQUlWLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDdENVLGNBQWMsQ0FBQ0MsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUMxQkQsY0FBYyxDQUFDQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQzFCRCxjQUFjLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDMUIsSUFBTUMsZUFBZSxHQUFHLElBQUlaLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDdkMsSUFBTWEscUJBQXFCLEdBQUcsSUFBSWIsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUM3Q2EscUJBQXFCLENBQUNGLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDakNFLHFCQUFxQixDQUFDRixRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ2pDRSxxQkFBcUIsQ0FBQ0YsUUFBUSxDQUFDLEVBQUUsQ0FBQztFQUNsQ0MsZUFBZSxDQUFDRCxRQUFRLENBQUNFLHFCQUFxQixDQUFDO0VBQy9DSCxjQUFjLENBQUNDLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDO0VBQ3hDSCxRQUFRLENBQUNFLFFBQVEsQ0FBQ0QsY0FBYyxDQUFDO0VBQ2pDRCxRQUFRLENBQUNFLFFBQVEsQ0FBQyxFQUFFLENBQUM7RUFDckJGLFFBQVEsQ0FBQ0UsUUFBUSxDQUFDLEVBQUUsQ0FBQztFQUVyQixJQUFJVSxDQUFDLEdBQUcsQ0FBQztFQUVUWixRQUFRLENBQUNhLElBQUksQ0FBQyxVQUFDbEIsS0FBSztJQUFBLE9BQUtELE1BQU0sQ0FBQ0MsS0FBSyxDQUFDLENBQUNDLElBQUksQ0FBQyxFQUFFZ0IsQ0FBQyxDQUFDO0VBQUEsRUFBQztBQUNuRCxDQUFDLENBQUM7QUFFRnBCLEVBQUUsQ0FBQywrRUFBK0UsRUFBRSxZQUFNO0VBQ3hGO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7RUFFRSxJQUFNc0IsS0FBSyxHQUFHLElBQUl2QixRQUFRLENBQUMsR0FBRyxDQUFDO0VBQy9CLElBQU13QixNQUFNLEdBQUcsSUFBSXhCLFFBQVEsQ0FBQyxJQUFJLENBQUM7RUFDakMsSUFBTXlCLE1BQU0sR0FBRyxJQUFJekIsUUFBUSxDQUFDLElBQUksQ0FBQztFQUNqQyxJQUFNMEIsTUFBTSxHQUFHLElBQUkxQixRQUFRLENBQUMsSUFBSSxDQUFDO0VBQ2pDLElBQU0yQixRQUFtQyxHQUFHO0lBQUVDLENBQUMsRUFBRSxDQUFDO0lBQUVDLEVBQUUsRUFBRSxDQUFDO0lBQUVDLEVBQUUsRUFBRSxDQUFDO0lBQUVDLEVBQUUsRUFBRSxDQUFDO0lBQUVDLEVBQUUsRUFBRSxDQUFDO0lBQUVDLEVBQUUsRUFBRSxDQUFDO0lBQUVDLEVBQUUsRUFBRSxDQUFDO0lBQUVDLENBQUMsRUFBRTtFQUFFLENBQUM7RUFDcEdaLEtBQUssQ0FBQ1osUUFBUSxDQUFDYSxNQUFNLENBQUM7RUFDdEJELEtBQUssQ0FBQ1osUUFBUSxDQUFDYSxNQUFNLENBQUM7RUFDdEJELEtBQUssQ0FBQ1osUUFBUSxDQUFDYyxNQUFNLENBQUM7RUFDdEJELE1BQU0sQ0FBQ2IsUUFBUSxDQUFDLElBQUksQ0FBQztFQUNyQmEsTUFBTSxDQUFDYixRQUFRLENBQUMsSUFBSSxDQUFDO0VBQ3JCYyxNQUFNLENBQUNkLFFBQVEsQ0FBQyxJQUFJLENBQUM7RUFDckJjLE1BQU0sQ0FBQ2QsUUFBUSxDQUFDZSxNQUFNLENBQUM7RUFDdkJBLE1BQU0sQ0FBQ2YsUUFBUSxDQUFDLEdBQUcsQ0FBQztFQUNwQlksS0FBSyxDQUFDRCxJQUFJLENBQUMsVUFBQ2xCLEtBQUssRUFBRWdDLENBQUMsRUFBRTVCLEtBQUssRUFBSztJQUM5QixJQUFJLE9BQU9KLEtBQUssS0FBSyxRQUFRLEVBQUU7TUFDN0JELE1BQU0sQ0FBQ0ssS0FBSyxDQUFDLENBQUNILElBQUksQ0FBQ3NCLFFBQVEsQ0FBQ3ZCLEtBQUssQ0FBQyxDQUFDO0lBQ3JDO0VBQ0YsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDIiwiaWdub3JlTGlzdCI6W119