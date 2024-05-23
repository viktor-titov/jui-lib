// Copyright (c) 2017 The Jaeger Authors.
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

import { processTemplate, createTestFunction, getParameterInArray, getParameterInAncestor, processLinkPattern, computeLinks, createGetLinks, computeTraceLink } from './link-patterns';
describe('processTemplate()', function () {
  it('correctly replaces variables', function () {
    var processedTemplate = processTemplate('this is a test with #{oneVariable}#{anotherVariable} and the same #{oneVariable}', function (a) {
      return a;
    });
    expect(processedTemplate.parameters).toEqual(['oneVariable', 'anotherVariable']);
    expect(processedTemplate.template({
      oneVariable: 'MYFIRSTVAR',
      anotherVariable: 'SECOND'
    })).toBe('this is a test with MYFIRSTVARSECOND and the same MYFIRSTVAR');
  });
  it('correctly uses the encoding function', function () {
    var processedTemplate = processTemplate('this is a test with #{oneVariable}#{anotherVariable} and the same #{oneVariable}', function (e) {
      return "/" + e + "\\";
    });
    expect(processedTemplate.parameters).toEqual(['oneVariable', 'anotherVariable']);
    expect(processedTemplate.template({
      oneVariable: 'MYFIRSTVAR',
      anotherVariable: 'SECOND'
    })).toBe('this is a test with /MYFIRSTVAR\\/SECOND\\ and the same /MYFIRSTVAR\\');
  });

  /*
  // kept on ice until #123 is implemented:
   it('correctly returns the same object when passing an already processed template', () => {
    const alreadyProcessed = {
      parameters: ['b'],
      template: data => `a${data.b}c`,
    };
    const processedTemplate = processTemplate(alreadyProcessed, a => a);
    expect(processedTemplate).toBe(alreadyProcessed);
  });
   */

  it('reports an error when passing an object that does not look like an already processed template', function () {
    expect(function () {
      return processTemplate({
        /* eslint-disable @typescript-eslint/no-explicit-any */
        template: function template(data) {
          return "a" + data.b + "c";
        }
      }, function (a) {
        return a;
      });
    }).toThrow();
    expect(function () {
      return processTemplate({
        parameters: ['b']
      }, function (a) {
        return a;
      });
    }).toThrow();
    expect(function () {
      return processTemplate({}, function (a) {
        return a;
      });
    }).toThrow();
  });
});
describe('createTestFunction()', function () {
  it('accepts a string', function () {
    var testFn = createTestFunction('myValue');
    expect(testFn('myValue')).toBe(true);
    expect(testFn('myFirstValue')).toBe(false);
    expect(testFn('mySecondValue')).toBe(false);
    expect(testFn('otherValue')).toBe(false);
  });
  it('accepts an array', function () {
    var testFn = createTestFunction(['myFirstValue', 'mySecondValue']);
    expect(testFn('myValue')).toBe(false);
    expect(testFn('myFirstValue')).toBe(true);
    expect(testFn('mySecondValue')).toBe(true);
    expect(testFn('otherValue')).toBe(false);
  });

  /*
  // kept on ice until #123 is implemented:
   it('accepts a regular expression', () => {
    const testFn = createTestFunction(/^my.*Value$/);
    expect(testFn('myValue')).toBe(true);
    expect(testFn('myFirstValue')).toBe(true);
    expect(testFn('mySecondValue')).toBe(true);
    expect(testFn('otherValue')).toBe(false);
  });
   it('accepts a function', () => {
    const mockCallback = jest.fn();
    mockCallback
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValue(false);
    const testFn = createTestFunction(mockCallback);
    expect(testFn('myValue')).toBe(true);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith('myValue');
    expect(testFn('myFirstValue')).toBe(false);
    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenCalledWith('myFirstValue');
    expect(testFn('mySecondValue')).toBe(true);
    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenCalledWith('mySecondValue');
    expect(testFn('otherValue')).toBe(false);
    expect(mockCallback).toHaveBeenCalledTimes(4);
    expect(mockCallback).toHaveBeenCalledWith('otherValue');
  });
   */

  it('accepts undefined', function () {
    var testFn = createTestFunction();
    expect(testFn('myValue')).toBe(true);
    expect(testFn('myFirstValue')).toBe(true);
    expect(testFn('mySecondValue')).toBe(true);
    expect(testFn('otherValue')).toBe(true);
  });
  it('rejects unknown values', function () {
    expect(function () {
      return createTestFunction({});
    }).toThrow();
    expect(function () {
      return createTestFunction(true);
    }).toThrow();
    expect(function () {
      return createTestFunction(false);
    }).toThrow();
    expect(function () {
      return createTestFunction(0);
    }).toThrow();
    expect(function () {
      return createTestFunction(5);
    }).toThrow();
  });
});
describe('getParameterInArray()', function () {
  var data = [{
    key: 'mykey',
    value: 'ok'
  }, {
    key: 'otherkey',
    value: 'v'
  }];
  it('returns an entry that is present', function () {
    expect(getParameterInArray('mykey', data)).toBe(data[0]);
    expect(getParameterInArray('otherkey', data)).toBe(data[1]);
  });
  it('returns undefined when the entry cannot be found', function () {
    expect(getParameterInArray('myotherkey', data)).toBeUndefined();
  });
  it('returns undefined when there is no array', function () {
    expect(getParameterInArray('otherkey')).toBeUndefined();
    expect(getParameterInArray('otherkey', null)).toBeUndefined();
  });
});
describe('getParameterInAncestor()', function () {
  var spans = [{
    depth: 0,
    process: {
      tags: [{
        key: 'a',
        value: 'a7'
      }, {
        key: 'b',
        value: 'b7'
      }, {
        key: 'c',
        value: 'c7'
      }, {
        key: 'd',
        value: 'd7'
      }, {
        key: 'e',
        value: 'e7'
      }, {
        key: 'f',
        value: 'f7'
      }, {
        key: 'g',
        value: 'g7'
      }, {
        key: 'h',
        value: 'h7'
      }]
    },
    tags: [{
      key: 'a',
      value: 'a6'
    }, {
      key: 'b',
      value: 'b6'
    }, {
      key: 'c',
      value: 'c6'
    }, {
      key: 'd',
      value: 'd6'
    }, {
      key: 'e',
      value: 'e6'
    }, {
      key: 'f',
      value: 'f6'
    }, {
      key: 'g',
      value: 'g6'
    }]
  }, {
    depth: 1,
    process: {
      tags: [{
        key: 'a',
        value: 'a5'
      }, {
        key: 'b',
        value: 'b5'
      }, {
        key: 'c',
        value: 'c5'
      }, {
        key: 'd',
        value: 'd5'
      }, {
        key: 'e',
        value: 'e5'
      }, {
        key: 'f',
        value: 'f5'
      }]
    },
    tags: [{
      key: 'a',
      value: 'a4'
    }, {
      key: 'b',
      value: 'b4'
    }, {
      key: 'c',
      value: 'c4'
    }, {
      key: 'd',
      value: 'd4'
    }, {
      key: 'e',
      value: 'e4'
    }]
  }, {
    depth: 1,
    process: {
      tags: [{
        key: 'a',
        value: 'a3'
      }, {
        key: 'b',
        value: 'b3'
      }, {
        key: 'c',
        value: 'c3'
      }, {
        key: 'd',
        value: 'd3'
      }]
    },
    tags: [{
      key: 'a',
      value: 'a2'
    }, {
      key: 'b',
      value: 'b2'
    }, {
      key: 'c',
      value: 'c2'
    }]
  }, {
    depth: 2,
    process: {
      tags: [{
        key: 'a',
        value: 'a1'
      }, {
        key: 'b',
        value: 'b1'
      }]
    },
    tags: [{
      key: 'a',
      value: 'a0'
    }]
  }];
  spans[1].references = [{
    spanID: 's1',
    traceID: 't2',
    refType: 'CHILD_OF',
    span: spans[0]
  }];
  spans[2].references = [{
    spanID: 's1',
    traceID: 't2',
    refType: 'CHILD_OF',
    span: spans[0]
  }];
  spans[3].references = [{
    spanID: 's1',
    traceID: 't2',
    refType: 'CHILD_OF',
    span: spans[2]
  }];
  it('uses current span tags', function () {
    expect(getParameterInAncestor('a', spans[3])).toEqual({
      key: 'a',
      value: 'a0'
    });
    expect(getParameterInAncestor('a', spans[2])).toEqual({
      key: 'a',
      value: 'a2'
    });
    expect(getParameterInAncestor('a', spans[1])).toEqual({
      key: 'a',
      value: 'a4'
    });
    expect(getParameterInAncestor('a', spans[0])).toEqual({
      key: 'a',
      value: 'a6'
    });
  });
  it('uses current span process tags', function () {
    expect(getParameterInAncestor('b', spans[3])).toEqual({
      key: 'b',
      value: 'b1'
    });
    expect(getParameterInAncestor('d', spans[2])).toEqual({
      key: 'd',
      value: 'd3'
    });
    expect(getParameterInAncestor('f', spans[1])).toEqual({
      key: 'f',
      value: 'f5'
    });
    expect(getParameterInAncestor('h', spans[0])).toEqual({
      key: 'h',
      value: 'h7'
    });
  });
  it('uses parent span tags', function () {
    expect(getParameterInAncestor('c', spans[3])).toEqual({
      key: 'c',
      value: 'c2'
    });
    expect(getParameterInAncestor('e', spans[2])).toEqual({
      key: 'e',
      value: 'e6'
    });
    expect(getParameterInAncestor('f', spans[2])).toEqual({
      key: 'f',
      value: 'f6'
    });
    expect(getParameterInAncestor('g', spans[2])).toEqual({
      key: 'g',
      value: 'g6'
    });
    expect(getParameterInAncestor('g', spans[1])).toEqual({
      key: 'g',
      value: 'g6'
    });
  });
  it('uses parent span process tags', function () {
    expect(getParameterInAncestor('d', spans[3])).toEqual({
      key: 'd',
      value: 'd3'
    });
    expect(getParameterInAncestor('h', spans[2])).toEqual({
      key: 'h',
      value: 'h7'
    });
    expect(getParameterInAncestor('h', spans[1])).toEqual({
      key: 'h',
      value: 'h7'
    });
  });
  it('uses grand-parent span tags', function () {
    expect(getParameterInAncestor('e', spans[3])).toEqual({
      key: 'e',
      value: 'e6'
    });
    expect(getParameterInAncestor('f', spans[3])).toEqual({
      key: 'f',
      value: 'f6'
    });
    expect(getParameterInAncestor('g', spans[3])).toEqual({
      key: 'g',
      value: 'g6'
    });
  });
  it('uses grand-parent process tags', function () {
    expect(getParameterInAncestor('h', spans[3])).toEqual({
      key: 'h',
      value: 'h7'
    });
  });
  it('returns undefined when the entry cannot be found', function () {
    expect(getParameterInAncestor('i', spans[3])).toBeUndefined();
  });
  it('does not break if some tags are not defined', function () {
    var spansWithUndefinedTags = [{
      depth: 0,
      process: {}
    }];
    expect(getParameterInAncestor('a', spansWithUndefinedTags[0])).toBeUndefined();
  });
});
describe('computeTraceLink()', function () {
  var linkPatterns = [{
    type: 'traces',
    url: 'http://example.com/?myKey=#{traceID}',
    text: 'first link (#{traceID})'
  }, {
    type: 'traces',
    url: 'http://example.com/?myKey=#{traceID}&myKey=#{myKey}',
    text: 'second link (#{myKey})'
  }].map(processLinkPattern);
  var trace = {
    processes: [],
    traceID: 'trc1',
    spans: [],
    startTime: 1000,
    endTime: 2000,
    duration: 1000,
    services: []
  };
  it('correctly computes links', function () {
    expect(computeTraceLink(linkPatterns, trace)).toEqual([{
      url: 'http://example.com/?myKey=trc1',
      text: 'first link (trc1)'
    }]);
  });
});
describe('computeLinks()', function () {
  var linkPatterns = [{
    type: 'tags',
    key: 'myKey',
    url: 'http://example.com/?myKey=#{myKey}',
    text: 'first link (#{myKey})'
  }, {
    key: 'myOtherKey',
    url: 'http://example.com/?myKey=#{myOtherKey}&myKey=#{myKey}',
    text: 'second link (#{myOtherKey})'
  }].map(processLinkPattern);
  var spans = [{
    depth: 0,
    process: {},
    tags: [{
      key: 'myKey',
      value: 'valueOfMyKey'
    }]
  }, {
    depth: 1,
    process: {},
    logs: [{
      fields: [{
        key: 'myOtherKey',
        value: 'valueOfMy+Other+Key'
      }]
    }]
  }];
  spans[1].references = [{
    spanID: 's1',
    traceID: 't2',
    refType: 'CHILD_OF',
    span: spans[0]
  }];
  it('correctly computes links', function () {
    expect(computeLinks(linkPatterns, spans[0], spans[0].tags, 0)).toEqual([{
      url: 'http://example.com/?myKey=valueOfMyKey',
      text: 'first link (valueOfMyKey)'
    }]);
    expect(computeLinks(linkPatterns, spans[1], spans[1].logs[0].fields, 0)).toEqual([{
      url: 'http://example.com/?myKey=valueOfMy%2BOther%2BKey&myKey=valueOfMyKey',
      text: 'second link (valueOfMy+Other+Key)'
    }]);
  });
});
describe('getLinks()', function () {
  var linkPatterns = [{
    key: 'mySpecialKey',
    url: 'http://example.com/?mySpecialKey=#{mySpecialKey}',
    text: 'special key link (#{mySpecialKey})'
  }].map(processLinkPattern);
  var template = jest.spyOn(linkPatterns[0].url, 'template');
  var span = {
    depth: 0,
    process: {},
    tags: [{
      key: 'mySpecialKey',
      value: 'valueOfMyKey'
    }]
  };

  /* eslint-disable @typescript-eslint/no-explicit-any */
  var cache;
  beforeEach(function () {
    cache = new WeakMap();
    template.mockClear();
  });
  it('does not access the cache if there is no link pattern', function () {
    cache.get = jest.fn();
    var getLinks = createGetLinks([], cache);
    expect(getLinks(span, span.tags, 0)).toEqual([]);
    expect(cache.get).not.toHaveBeenCalled();
  });
  it('returns the result from the cache', function () {
    var result = [];
    cache.set(span.tags[0], result);
    var getLinks = createGetLinks(linkPatterns, cache);
    expect(getLinks(span, span.tags, 0)).toBe(result);
    expect(template).not.toHaveBeenCalled();
  });
  it('adds the result to the cache', function () {
    var getLinks = createGetLinks(linkPatterns, cache);
    var result = getLinks(span, span.tags, 0);
    expect(template).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{
      url: 'http://example.com/?mySpecialKey=valueOfMyKey',
      text: 'special key link (valueOfMyKey)'
    }]);
    expect(cache.get(span.tags[0])).toBe(result);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwcm9jZXNzVGVtcGxhdGUiLCJjcmVhdGVUZXN0RnVuY3Rpb24iLCJnZXRQYXJhbWV0ZXJJbkFycmF5IiwiZ2V0UGFyYW1ldGVySW5BbmNlc3RvciIsInByb2Nlc3NMaW5rUGF0dGVybiIsImNvbXB1dGVMaW5rcyIsImNyZWF0ZUdldExpbmtzIiwiY29tcHV0ZVRyYWNlTGluayIsImRlc2NyaWJlIiwiaXQiLCJwcm9jZXNzZWRUZW1wbGF0ZSIsImEiLCJleHBlY3QiLCJwYXJhbWV0ZXJzIiwidG9FcXVhbCIsInRlbXBsYXRlIiwib25lVmFyaWFibGUiLCJhbm90aGVyVmFyaWFibGUiLCJ0b0JlIiwiZSIsImRhdGEiLCJiIiwidG9UaHJvdyIsInRlc3RGbiIsImtleSIsInZhbHVlIiwidG9CZVVuZGVmaW5lZCIsInNwYW5zIiwiZGVwdGgiLCJwcm9jZXNzIiwidGFncyIsInJlZmVyZW5jZXMiLCJzcGFuSUQiLCJ0cmFjZUlEIiwicmVmVHlwZSIsInNwYW4iLCJzcGFuc1dpdGhVbmRlZmluZWRUYWdzIiwibGlua1BhdHRlcm5zIiwidHlwZSIsInVybCIsInRleHQiLCJtYXAiLCJ0cmFjZSIsInByb2Nlc3NlcyIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJkdXJhdGlvbiIsInNlcnZpY2VzIiwibG9ncyIsImZpZWxkcyIsImplc3QiLCJzcHlPbiIsImNhY2hlIiwiYmVmb3JlRWFjaCIsIldlYWtNYXAiLCJtb2NrQ2xlYXIiLCJnZXQiLCJmbiIsImdldExpbmtzIiwibm90IiwidG9IYXZlQmVlbkNhbGxlZCIsInJlc3VsdCIsInNldCIsInRvSGF2ZUJlZW5DYWxsZWRUaW1lcyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbW9kZWwvbGluay1wYXR0ZXJucy50ZXN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBUaGUgSmFlZ2VyIEF1dGhvcnMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IFRyYWNlLCBUcmFjZUxpbmssIFRyYWNlU3BhbiB9IGZyb20gJy4uL3R5cGVzL3RyYWNlJztcblxuaW1wb3J0IHtcbiAgcHJvY2Vzc1RlbXBsYXRlLFxuICBjcmVhdGVUZXN0RnVuY3Rpb24sXG4gIGdldFBhcmFtZXRlckluQXJyYXksXG4gIGdldFBhcmFtZXRlckluQW5jZXN0b3IsXG4gIHByb2Nlc3NMaW5rUGF0dGVybixcbiAgUHJvY2Vzc2VkTGlua1BhdHRlcm4sXG4gIGNvbXB1dGVMaW5rcyxcbiAgY3JlYXRlR2V0TGlua3MsXG4gIGNvbXB1dGVUcmFjZUxpbmssXG59IGZyb20gJy4vbGluay1wYXR0ZXJucyc7XG5cbmRlc2NyaWJlKCdwcm9jZXNzVGVtcGxhdGUoKScsICgpID0+IHtcbiAgaXQoJ2NvcnJlY3RseSByZXBsYWNlcyB2YXJpYWJsZXMnLCAoKSA9PiB7XG4gICAgY29uc3QgcHJvY2Vzc2VkVGVtcGxhdGUgPSBwcm9jZXNzVGVtcGxhdGUoXG4gICAgICAndGhpcyBpcyBhIHRlc3Qgd2l0aCAje29uZVZhcmlhYmxlfSN7YW5vdGhlclZhcmlhYmxlfSBhbmQgdGhlIHNhbWUgI3tvbmVWYXJpYWJsZX0nLFxuICAgICAgKGEpID0+IGFcbiAgICApO1xuICAgIGV4cGVjdChwcm9jZXNzZWRUZW1wbGF0ZS5wYXJhbWV0ZXJzKS50b0VxdWFsKFsnb25lVmFyaWFibGUnLCAnYW5vdGhlclZhcmlhYmxlJ10pO1xuICAgIGV4cGVjdChwcm9jZXNzZWRUZW1wbGF0ZS50ZW1wbGF0ZSh7IG9uZVZhcmlhYmxlOiAnTVlGSVJTVFZBUicsIGFub3RoZXJWYXJpYWJsZTogJ1NFQ09ORCcgfSkpLnRvQmUoXG4gICAgICAndGhpcyBpcyBhIHRlc3Qgd2l0aCBNWUZJUlNUVkFSU0VDT05EIGFuZCB0aGUgc2FtZSBNWUZJUlNUVkFSJ1xuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdjb3JyZWN0bHkgdXNlcyB0aGUgZW5jb2RpbmcgZnVuY3Rpb24nLCAoKSA9PiB7XG4gICAgY29uc3QgcHJvY2Vzc2VkVGVtcGxhdGUgPSBwcm9jZXNzVGVtcGxhdGUoXG4gICAgICAndGhpcyBpcyBhIHRlc3Qgd2l0aCAje29uZVZhcmlhYmxlfSN7YW5vdGhlclZhcmlhYmxlfSBhbmQgdGhlIHNhbWUgI3tvbmVWYXJpYWJsZX0nLFxuICAgICAgKGUpID0+IGAvJHtlfVxcXFxgXG4gICAgKTtcbiAgICBleHBlY3QocHJvY2Vzc2VkVGVtcGxhdGUucGFyYW1ldGVycykudG9FcXVhbChbJ29uZVZhcmlhYmxlJywgJ2Fub3RoZXJWYXJpYWJsZSddKTtcbiAgICBleHBlY3QocHJvY2Vzc2VkVGVtcGxhdGUudGVtcGxhdGUoeyBvbmVWYXJpYWJsZTogJ01ZRklSU1RWQVInLCBhbm90aGVyVmFyaWFibGU6ICdTRUNPTkQnIH0pKS50b0JlKFxuICAgICAgJ3RoaXMgaXMgYSB0ZXN0IHdpdGggL01ZRklSU1RWQVJcXFxcL1NFQ09ORFxcXFwgYW5kIHRoZSBzYW1lIC9NWUZJUlNUVkFSXFxcXCdcbiAgICApO1xuICB9KTtcblxuICAvKlxuICAvLyBrZXB0IG9uIGljZSB1bnRpbCAjMTIzIGlzIGltcGxlbWVudGVkOlxuXG4gIGl0KCdjb3JyZWN0bHkgcmV0dXJucyB0aGUgc2FtZSBvYmplY3Qgd2hlbiBwYXNzaW5nIGFuIGFscmVhZHkgcHJvY2Vzc2VkIHRlbXBsYXRlJywgKCkgPT4ge1xuICAgIGNvbnN0IGFscmVhZHlQcm9jZXNzZWQgPSB7XG4gICAgICBwYXJhbWV0ZXJzOiBbJ2InXSxcbiAgICAgIHRlbXBsYXRlOiBkYXRhID0+IGBhJHtkYXRhLmJ9Y2AsXG4gICAgfTtcbiAgICBjb25zdCBwcm9jZXNzZWRUZW1wbGF0ZSA9IHByb2Nlc3NUZW1wbGF0ZShhbHJlYWR5UHJvY2Vzc2VkLCBhID0+IGEpO1xuICAgIGV4cGVjdChwcm9jZXNzZWRUZW1wbGF0ZSkudG9CZShhbHJlYWR5UHJvY2Vzc2VkKTtcbiAgfSk7XG5cbiAgKi9cblxuICBpdCgncmVwb3J0cyBhbiBlcnJvciB3aGVuIHBhc3NpbmcgYW4gb2JqZWN0IHRoYXQgZG9lcyBub3QgbG9vayBsaWtlIGFuIGFscmVhZHkgcHJvY2Vzc2VkIHRlbXBsYXRlJywgKCkgPT4ge1xuICAgIGV4cGVjdCgoKSA9PlxuICAgICAgcHJvY2Vzc1RlbXBsYXRlKFxuICAgICAgICB7XG4gICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICAgICAgICAgIHRlbXBsYXRlOiAoZGF0YTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkgPT4gYGEke2RhdGEuYn1jYCxcbiAgICAgICAgfSxcbiAgICAgICAgKGEpID0+IGFcbiAgICAgIClcbiAgICApLnRvVGhyb3coKTtcbiAgICBleHBlY3QoKCkgPT5cbiAgICAgIHByb2Nlc3NUZW1wbGF0ZShcbiAgICAgICAge1xuICAgICAgICAgIHBhcmFtZXRlcnM6IFsnYiddLFxuICAgICAgICB9LFxuICAgICAgICAoYSkgPT4gYVxuICAgICAgKVxuICAgICkudG9UaHJvdygpO1xuICAgIGV4cGVjdCgoKSA9PiBwcm9jZXNzVGVtcGxhdGUoe30sIChhKSA9PiBhKSkudG9UaHJvdygpO1xuICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnY3JlYXRlVGVzdEZ1bmN0aW9uKCknLCAoKSA9PiB7XG4gIGl0KCdhY2NlcHRzIGEgc3RyaW5nJywgKCkgPT4ge1xuICAgIGNvbnN0IHRlc3RGbiA9IGNyZWF0ZVRlc3RGdW5jdGlvbignbXlWYWx1ZScpO1xuICAgIGV4cGVjdCh0ZXN0Rm4oJ215VmFsdWUnKSkudG9CZSh0cnVlKTtcbiAgICBleHBlY3QodGVzdEZuKCdteUZpcnN0VmFsdWUnKSkudG9CZShmYWxzZSk7XG4gICAgZXhwZWN0KHRlc3RGbignbXlTZWNvbmRWYWx1ZScpKS50b0JlKGZhbHNlKTtcbiAgICBleHBlY3QodGVzdEZuKCdvdGhlclZhbHVlJykpLnRvQmUoZmFsc2UpO1xuICB9KTtcblxuICBpdCgnYWNjZXB0cyBhbiBhcnJheScsICgpID0+IHtcbiAgICBjb25zdCB0ZXN0Rm4gPSBjcmVhdGVUZXN0RnVuY3Rpb24oWydteUZpcnN0VmFsdWUnLCAnbXlTZWNvbmRWYWx1ZSddKTtcbiAgICBleHBlY3QodGVzdEZuKCdteVZhbHVlJykpLnRvQmUoZmFsc2UpO1xuICAgIGV4cGVjdCh0ZXN0Rm4oJ215Rmlyc3RWYWx1ZScpKS50b0JlKHRydWUpO1xuICAgIGV4cGVjdCh0ZXN0Rm4oJ215U2Vjb25kVmFsdWUnKSkudG9CZSh0cnVlKTtcbiAgICBleHBlY3QodGVzdEZuKCdvdGhlclZhbHVlJykpLnRvQmUoZmFsc2UpO1xuICB9KTtcblxuICAvKlxuICAvLyBrZXB0IG9uIGljZSB1bnRpbCAjMTIzIGlzIGltcGxlbWVudGVkOlxuXG4gIGl0KCdhY2NlcHRzIGEgcmVndWxhciBleHByZXNzaW9uJywgKCkgPT4ge1xuICAgIGNvbnN0IHRlc3RGbiA9IGNyZWF0ZVRlc3RGdW5jdGlvbigvXm15LipWYWx1ZSQvKTtcbiAgICBleHBlY3QodGVzdEZuKCdteVZhbHVlJykpLnRvQmUodHJ1ZSk7XG4gICAgZXhwZWN0KHRlc3RGbignbXlGaXJzdFZhbHVlJykpLnRvQmUodHJ1ZSk7XG4gICAgZXhwZWN0KHRlc3RGbignbXlTZWNvbmRWYWx1ZScpKS50b0JlKHRydWUpO1xuICAgIGV4cGVjdCh0ZXN0Rm4oJ290aGVyVmFsdWUnKSkudG9CZShmYWxzZSk7XG4gIH0pO1xuXG4gIGl0KCdhY2NlcHRzIGEgZnVuY3Rpb24nLCAoKSA9PiB7XG4gICAgY29uc3QgbW9ja0NhbGxiYWNrID0gamVzdC5mbigpO1xuICAgIG1vY2tDYWxsYmFja1xuICAgICAgLm1vY2tSZXR1cm5WYWx1ZU9uY2UodHJ1ZSlcbiAgICAgIC5tb2NrUmV0dXJuVmFsdWVPbmNlKGZhbHNlKVxuICAgICAgLm1vY2tSZXR1cm5WYWx1ZU9uY2UodHJ1ZSlcbiAgICAgIC5tb2NrUmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgIGNvbnN0IHRlc3RGbiA9IGNyZWF0ZVRlc3RGdW5jdGlvbihtb2NrQ2FsbGJhY2spO1xuICAgIGV4cGVjdCh0ZXN0Rm4oJ215VmFsdWUnKSkudG9CZSh0cnVlKTtcbiAgICBleHBlY3QobW9ja0NhbGxiYWNrKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgZXhwZWN0KG1vY2tDYWxsYmFjaykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ215VmFsdWUnKTtcbiAgICBleHBlY3QodGVzdEZuKCdteUZpcnN0VmFsdWUnKSkudG9CZShmYWxzZSk7XG4gICAgZXhwZWN0KG1vY2tDYWxsYmFjaykudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDIpO1xuICAgIGV4cGVjdChtb2NrQ2FsbGJhY2spLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdteUZpcnN0VmFsdWUnKTtcbiAgICBleHBlY3QodGVzdEZuKCdteVNlY29uZFZhbHVlJykpLnRvQmUodHJ1ZSk7XG4gICAgZXhwZWN0KG1vY2tDYWxsYmFjaykudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDMpO1xuICAgIGV4cGVjdChtb2NrQ2FsbGJhY2spLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdteVNlY29uZFZhbHVlJyk7XG4gICAgZXhwZWN0KHRlc3RGbignb3RoZXJWYWx1ZScpKS50b0JlKGZhbHNlKTtcbiAgICBleHBlY3QobW9ja0NhbGxiYWNrKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoNCk7XG4gICAgZXhwZWN0KG1vY2tDYWxsYmFjaykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ290aGVyVmFsdWUnKTtcbiAgfSk7XG5cbiAgKi9cblxuICBpdCgnYWNjZXB0cyB1bmRlZmluZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgdGVzdEZuID0gY3JlYXRlVGVzdEZ1bmN0aW9uKCk7XG4gICAgZXhwZWN0KHRlc3RGbignbXlWYWx1ZScpKS50b0JlKHRydWUpO1xuICAgIGV4cGVjdCh0ZXN0Rm4oJ215Rmlyc3RWYWx1ZScpKS50b0JlKHRydWUpO1xuICAgIGV4cGVjdCh0ZXN0Rm4oJ215U2Vjb25kVmFsdWUnKSkudG9CZSh0cnVlKTtcbiAgICBleHBlY3QodGVzdEZuKCdvdGhlclZhbHVlJykpLnRvQmUodHJ1ZSk7XG4gIH0pO1xuXG4gIGl0KCdyZWplY3RzIHVua25vd24gdmFsdWVzJywgKCkgPT4ge1xuICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVUZXN0RnVuY3Rpb24oe30pKS50b1Rocm93KCk7XG4gICAgZXhwZWN0KCgpID0+IGNyZWF0ZVRlc3RGdW5jdGlvbih0cnVlKSkudG9UaHJvdygpO1xuICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVUZXN0RnVuY3Rpb24oZmFsc2UpKS50b1Rocm93KCk7XG4gICAgZXhwZWN0KCgpID0+IGNyZWF0ZVRlc3RGdW5jdGlvbigwKSkudG9UaHJvdygpO1xuICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVUZXN0RnVuY3Rpb24oNSkpLnRvVGhyb3coKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ2dldFBhcmFtZXRlckluQXJyYXkoKScsICgpID0+IHtcbiAgY29uc3QgZGF0YSA9IFtcbiAgICB7IGtleTogJ215a2V5JywgdmFsdWU6ICdvaycgfSxcbiAgICB7IGtleTogJ290aGVya2V5JywgdmFsdWU6ICd2JyB9LFxuICBdO1xuXG4gIGl0KCdyZXR1cm5zIGFuIGVudHJ5IHRoYXQgaXMgcHJlc2VudCcsICgpID0+IHtcbiAgICBleHBlY3QoZ2V0UGFyYW1ldGVySW5BcnJheSgnbXlrZXknLCBkYXRhKSkudG9CZShkYXRhWzBdKTtcbiAgICBleHBlY3QoZ2V0UGFyYW1ldGVySW5BcnJheSgnb3RoZXJrZXknLCBkYXRhKSkudG9CZShkYXRhWzFdKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgdW5kZWZpbmVkIHdoZW4gdGhlIGVudHJ5IGNhbm5vdCBiZSBmb3VuZCcsICgpID0+IHtcbiAgICBleHBlY3QoZ2V0UGFyYW1ldGVySW5BcnJheSgnbXlvdGhlcmtleScsIGRhdGEpKS50b0JlVW5kZWZpbmVkKCk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCB3aGVuIHRoZXJlIGlzIG5vIGFycmF5JywgKCkgPT4ge1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFycmF5KCdvdGhlcmtleScpKS50b0JlVW5kZWZpbmVkKCk7XG4gICAgZXhwZWN0KGdldFBhcmFtZXRlckluQXJyYXkoJ290aGVya2V5JywgbnVsbCkpLnRvQmVVbmRlZmluZWQoKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ2dldFBhcmFtZXRlckluQW5jZXN0b3IoKScsICgpID0+IHtcbiAgY29uc3Qgc3BhbnMgPSBbXG4gICAge1xuICAgICAgZGVwdGg6IDAsXG4gICAgICBwcm9jZXNzOiB7XG4gICAgICAgIHRhZ3M6IFtcbiAgICAgICAgICB7IGtleTogJ2EnLCB2YWx1ZTogJ2E3JyB9LFxuICAgICAgICAgIHsga2V5OiAnYicsIHZhbHVlOiAnYjcnIH0sXG4gICAgICAgICAgeyBrZXk6ICdjJywgdmFsdWU6ICdjNycgfSxcbiAgICAgICAgICB7IGtleTogJ2QnLCB2YWx1ZTogJ2Q3JyB9LFxuICAgICAgICAgIHsga2V5OiAnZScsIHZhbHVlOiAnZTcnIH0sXG4gICAgICAgICAgeyBrZXk6ICdmJywgdmFsdWU6ICdmNycgfSxcbiAgICAgICAgICB7IGtleTogJ2cnLCB2YWx1ZTogJ2c3JyB9LFxuICAgICAgICAgIHsga2V5OiAnaCcsIHZhbHVlOiAnaDcnIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgdGFnczogW1xuICAgICAgICB7IGtleTogJ2EnLCB2YWx1ZTogJ2E2JyB9LFxuICAgICAgICB7IGtleTogJ2InLCB2YWx1ZTogJ2I2JyB9LFxuICAgICAgICB7IGtleTogJ2MnLCB2YWx1ZTogJ2M2JyB9LFxuICAgICAgICB7IGtleTogJ2QnLCB2YWx1ZTogJ2Q2JyB9LFxuICAgICAgICB7IGtleTogJ2UnLCB2YWx1ZTogJ2U2JyB9LFxuICAgICAgICB7IGtleTogJ2YnLCB2YWx1ZTogJ2Y2JyB9LFxuICAgICAgICB7IGtleTogJ2cnLCB2YWx1ZTogJ2c2JyB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGRlcHRoOiAxLFxuICAgICAgcHJvY2Vzczoge1xuICAgICAgICB0YWdzOiBbXG4gICAgICAgICAgeyBrZXk6ICdhJywgdmFsdWU6ICdhNScgfSxcbiAgICAgICAgICB7IGtleTogJ2InLCB2YWx1ZTogJ2I1JyB9LFxuICAgICAgICAgIHsga2V5OiAnYycsIHZhbHVlOiAnYzUnIH0sXG4gICAgICAgICAgeyBrZXk6ICdkJywgdmFsdWU6ICdkNScgfSxcbiAgICAgICAgICB7IGtleTogJ2UnLCB2YWx1ZTogJ2U1JyB9LFxuICAgICAgICAgIHsga2V5OiAnZicsIHZhbHVlOiAnZjUnIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgdGFnczogW1xuICAgICAgICB7IGtleTogJ2EnLCB2YWx1ZTogJ2E0JyB9LFxuICAgICAgICB7IGtleTogJ2InLCB2YWx1ZTogJ2I0JyB9LFxuICAgICAgICB7IGtleTogJ2MnLCB2YWx1ZTogJ2M0JyB9LFxuICAgICAgICB7IGtleTogJ2QnLCB2YWx1ZTogJ2Q0JyB9LFxuICAgICAgICB7IGtleTogJ2UnLCB2YWx1ZTogJ2U0JyB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGRlcHRoOiAxLFxuICAgICAgcHJvY2Vzczoge1xuICAgICAgICB0YWdzOiBbXG4gICAgICAgICAgeyBrZXk6ICdhJywgdmFsdWU6ICdhMycgfSxcbiAgICAgICAgICB7IGtleTogJ2InLCB2YWx1ZTogJ2IzJyB9LFxuICAgICAgICAgIHsga2V5OiAnYycsIHZhbHVlOiAnYzMnIH0sXG4gICAgICAgICAgeyBrZXk6ICdkJywgdmFsdWU6ICdkMycgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB0YWdzOiBbXG4gICAgICAgIHsga2V5OiAnYScsIHZhbHVlOiAnYTInIH0sXG4gICAgICAgIHsga2V5OiAnYicsIHZhbHVlOiAnYjInIH0sXG4gICAgICAgIHsga2V5OiAnYycsIHZhbHVlOiAnYzInIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgZGVwdGg6IDIsXG4gICAgICBwcm9jZXNzOiB7XG4gICAgICAgIHRhZ3M6IFtcbiAgICAgICAgICB7IGtleTogJ2EnLCB2YWx1ZTogJ2ExJyB9LFxuICAgICAgICAgIHsga2V5OiAnYicsIHZhbHVlOiAnYjEnIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgdGFnczogW3sga2V5OiAnYScsIHZhbHVlOiAnYTAnIH1dLFxuICAgIH0sXG4gIF0gYXMgVHJhY2VTcGFuW107XG5cbiAgc3BhbnNbMV0ucmVmZXJlbmNlcyA9IFtcbiAgICB7XG4gICAgICBzcGFuSUQ6ICdzMScsXG4gICAgICB0cmFjZUlEOiAndDInLFxuICAgICAgcmVmVHlwZTogJ0NISUxEX09GJyxcbiAgICAgIHNwYW46IHNwYW5zWzBdLFxuICAgIH0sXG4gIF07XG4gIHNwYW5zWzJdLnJlZmVyZW5jZXMgPSBbXG4gICAge1xuICAgICAgc3BhbklEOiAnczEnLFxuICAgICAgdHJhY2VJRDogJ3QyJyxcbiAgICAgIHJlZlR5cGU6ICdDSElMRF9PRicsXG4gICAgICBzcGFuOiBzcGFuc1swXSxcbiAgICB9LFxuICBdO1xuICBzcGFuc1szXS5yZWZlcmVuY2VzID0gW1xuICAgIHtcbiAgICAgIHNwYW5JRDogJ3MxJyxcbiAgICAgIHRyYWNlSUQ6ICd0MicsXG4gICAgICByZWZUeXBlOiAnQ0hJTERfT0YnLFxuICAgICAgc3Bhbjogc3BhbnNbMl0sXG4gICAgfSxcbiAgXTtcblxuICBpdCgndXNlcyBjdXJyZW50IHNwYW4gdGFncycsICgpID0+IHtcbiAgICBleHBlY3QoZ2V0UGFyYW1ldGVySW5BbmNlc3RvcignYScsIHNwYW5zWzNdKSkudG9FcXVhbCh7IGtleTogJ2EnLCB2YWx1ZTogJ2EwJyB9KTtcbiAgICBleHBlY3QoZ2V0UGFyYW1ldGVySW5BbmNlc3RvcignYScsIHNwYW5zWzJdKSkudG9FcXVhbCh7IGtleTogJ2EnLCB2YWx1ZTogJ2EyJyB9KTtcbiAgICBleHBlY3QoZ2V0UGFyYW1ldGVySW5BbmNlc3RvcignYScsIHNwYW5zWzFdKSkudG9FcXVhbCh7IGtleTogJ2EnLCB2YWx1ZTogJ2E0JyB9KTtcbiAgICBleHBlY3QoZ2V0UGFyYW1ldGVySW5BbmNlc3RvcignYScsIHNwYW5zWzBdKSkudG9FcXVhbCh7IGtleTogJ2EnLCB2YWx1ZTogJ2E2JyB9KTtcbiAgfSk7XG5cbiAgaXQoJ3VzZXMgY3VycmVudCBzcGFuIHByb2Nlc3MgdGFncycsICgpID0+IHtcbiAgICBleHBlY3QoZ2V0UGFyYW1ldGVySW5BbmNlc3RvcignYicsIHNwYW5zWzNdKSkudG9FcXVhbCh7IGtleTogJ2InLCB2YWx1ZTogJ2IxJyB9KTtcbiAgICBleHBlY3QoZ2V0UGFyYW1ldGVySW5BbmNlc3RvcignZCcsIHNwYW5zWzJdKSkudG9FcXVhbCh7IGtleTogJ2QnLCB2YWx1ZTogJ2QzJyB9KTtcbiAgICBleHBlY3QoZ2V0UGFyYW1ldGVySW5BbmNlc3RvcignZicsIHNwYW5zWzFdKSkudG9FcXVhbCh7IGtleTogJ2YnLCB2YWx1ZTogJ2Y1JyB9KTtcbiAgICBleHBlY3QoZ2V0UGFyYW1ldGVySW5BbmNlc3RvcignaCcsIHNwYW5zWzBdKSkudG9FcXVhbCh7IGtleTogJ2gnLCB2YWx1ZTogJ2g3JyB9KTtcbiAgfSk7XG5cbiAgaXQoJ3VzZXMgcGFyZW50IHNwYW4gdGFncycsICgpID0+IHtcbiAgICBleHBlY3QoZ2V0UGFyYW1ldGVySW5BbmNlc3RvcignYycsIHNwYW5zWzNdKSkudG9FcXVhbCh7IGtleTogJ2MnLCB2YWx1ZTogJ2MyJyB9KTtcbiAgICBleHBlY3QoZ2V0UGFyYW1ldGVySW5BbmNlc3RvcignZScsIHNwYW5zWzJdKSkudG9FcXVhbCh7IGtleTogJ2UnLCB2YWx1ZTogJ2U2JyB9KTtcbiAgICBleHBlY3QoZ2V0UGFyYW1ldGVySW5BbmNlc3RvcignZicsIHNwYW5zWzJdKSkudG9FcXVhbCh7IGtleTogJ2YnLCB2YWx1ZTogJ2Y2JyB9KTtcbiAgICBleHBlY3QoZ2V0UGFyYW1ldGVySW5BbmNlc3RvcignZycsIHNwYW5zWzJdKSkudG9FcXVhbCh7IGtleTogJ2cnLCB2YWx1ZTogJ2c2JyB9KTtcbiAgICBleHBlY3QoZ2V0UGFyYW1ldGVySW5BbmNlc3RvcignZycsIHNwYW5zWzFdKSkudG9FcXVhbCh7IGtleTogJ2cnLCB2YWx1ZTogJ2c2JyB9KTtcbiAgfSk7XG5cbiAgaXQoJ3VzZXMgcGFyZW50IHNwYW4gcHJvY2VzcyB0YWdzJywgKCkgPT4ge1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdkJywgc3BhbnNbM10pKS50b0VxdWFsKHsga2V5OiAnZCcsIHZhbHVlOiAnZDMnIH0pO1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdoJywgc3BhbnNbMl0pKS50b0VxdWFsKHsga2V5OiAnaCcsIHZhbHVlOiAnaDcnIH0pO1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdoJywgc3BhbnNbMV0pKS50b0VxdWFsKHsga2V5OiAnaCcsIHZhbHVlOiAnaDcnIH0pO1xuICB9KTtcblxuICBpdCgndXNlcyBncmFuZC1wYXJlbnQgc3BhbiB0YWdzJywgKCkgPT4ge1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdlJywgc3BhbnNbM10pKS50b0VxdWFsKHsga2V5OiAnZScsIHZhbHVlOiAnZTYnIH0pO1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdmJywgc3BhbnNbM10pKS50b0VxdWFsKHsga2V5OiAnZicsIHZhbHVlOiAnZjYnIH0pO1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdnJywgc3BhbnNbM10pKS50b0VxdWFsKHsga2V5OiAnZycsIHZhbHVlOiAnZzYnIH0pO1xuICB9KTtcblxuICBpdCgndXNlcyBncmFuZC1wYXJlbnQgcHJvY2VzcyB0YWdzJywgKCkgPT4ge1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdoJywgc3BhbnNbM10pKS50b0VxdWFsKHsga2V5OiAnaCcsIHZhbHVlOiAnaDcnIH0pO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB1bmRlZmluZWQgd2hlbiB0aGUgZW50cnkgY2Fubm90IGJlIGZvdW5kJywgKCkgPT4ge1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdpJywgc3BhbnNbM10pKS50b0JlVW5kZWZpbmVkKCk7XG4gIH0pO1xuXG4gIGl0KCdkb2VzIG5vdCBicmVhayBpZiBzb21lIHRhZ3MgYXJlIG5vdCBkZWZpbmVkJywgKCkgPT4ge1xuICAgIGNvbnN0IHNwYW5zV2l0aFVuZGVmaW5lZFRhZ3MgPSBbXG4gICAgICB7XG4gICAgICAgIGRlcHRoOiAwLFxuICAgICAgICBwcm9jZXNzOiB7fSxcbiAgICAgIH0sXG4gICAgXSBhcyBUcmFjZVNwYW5bXTtcbiAgICBleHBlY3QoZ2V0UGFyYW1ldGVySW5BbmNlc3RvcignYScsIHNwYW5zV2l0aFVuZGVmaW5lZFRhZ3NbMF0pKS50b0JlVW5kZWZpbmVkKCk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdjb21wdXRlVHJhY2VMaW5rKCknLCAoKSA9PiB7XG4gIGNvbnN0IGxpbmtQYXR0ZXJucyA9IFtcbiAgICB7XG4gICAgICB0eXBlOiAndHJhY2VzJyxcbiAgICAgIHVybDogJ2h0dHA6Ly9leGFtcGxlLmNvbS8/bXlLZXk9I3t0cmFjZUlEfScsXG4gICAgICB0ZXh0OiAnZmlyc3QgbGluayAoI3t0cmFjZUlEfSknLFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ3RyYWNlcycsXG4gICAgICB1cmw6ICdodHRwOi8vZXhhbXBsZS5jb20vP215S2V5PSN7dHJhY2VJRH0mbXlLZXk9I3tteUtleX0nLFxuICAgICAgdGV4dDogJ3NlY29uZCBsaW5rICgje215S2V5fSknLFxuICAgIH0sXG4gIF0ubWFwKHByb2Nlc3NMaW5rUGF0dGVybikgYXMgUHJvY2Vzc2VkTGlua1BhdHRlcm5bXTtcblxuICBjb25zdCB0cmFjZSA9IHtcbiAgICBwcm9jZXNzZXM6IFtdLFxuICAgIHRyYWNlSUQ6ICd0cmMxJyxcbiAgICBzcGFuczogW10sXG4gICAgc3RhcnRUaW1lOiAxMDAwLFxuICAgIGVuZFRpbWU6IDIwMDAsXG4gICAgZHVyYXRpb246IDEwMDAsXG4gICAgc2VydmljZXM6IFtdLFxuICB9IGFzIHVua25vd24gYXMgVHJhY2U7XG5cbiAgaXQoJ2NvcnJlY3RseSBjb21wdXRlcyBsaW5rcycsICgpID0+IHtcbiAgICBleHBlY3QoY29tcHV0ZVRyYWNlTGluayhsaW5rUGF0dGVybnMsIHRyYWNlKSkudG9FcXVhbChbXG4gICAgICB7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9leGFtcGxlLmNvbS8/bXlLZXk9dHJjMScsXG4gICAgICAgIHRleHQ6ICdmaXJzdCBsaW5rICh0cmMxKScsXG4gICAgICB9LFxuICAgIF0pO1xuICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnY29tcHV0ZUxpbmtzKCknLCAoKSA9PiB7XG4gIGNvbnN0IGxpbmtQYXR0ZXJucyA9IFtcbiAgICB7XG4gICAgICB0eXBlOiAndGFncycsXG4gICAgICBrZXk6ICdteUtleScsXG4gICAgICB1cmw6ICdodHRwOi8vZXhhbXBsZS5jb20vP215S2V5PSN7bXlLZXl9JyxcbiAgICAgIHRleHQ6ICdmaXJzdCBsaW5rICgje215S2V5fSknLFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAnbXlPdGhlcktleScsXG4gICAgICB1cmw6ICdodHRwOi8vZXhhbXBsZS5jb20vP215S2V5PSN7bXlPdGhlcktleX0mbXlLZXk9I3tteUtleX0nLFxuICAgICAgdGV4dDogJ3NlY29uZCBsaW5rICgje215T3RoZXJLZXl9KScsXG4gICAgfSxcbiAgXS5tYXAocHJvY2Vzc0xpbmtQYXR0ZXJuKSBhcyBQcm9jZXNzZWRMaW5rUGF0dGVybltdO1xuXG4gIGNvbnN0IHNwYW5zID0gW1xuICAgIHsgZGVwdGg6IDAsIHByb2Nlc3M6IHt9LCB0YWdzOiBbeyBrZXk6ICdteUtleScsIHZhbHVlOiAndmFsdWVPZk15S2V5JyB9XSB9LFxuICAgIHsgZGVwdGg6IDEsIHByb2Nlc3M6IHt9LCBsb2dzOiBbeyBmaWVsZHM6IFt7IGtleTogJ215T3RoZXJLZXknLCB2YWx1ZTogJ3ZhbHVlT2ZNeStPdGhlcitLZXknIH1dIH1dIH0sXG4gIF0gYXMgdW5rbm93biBhcyBUcmFjZVNwYW5bXTtcbiAgc3BhbnNbMV0ucmVmZXJlbmNlcyA9IFtcbiAgICB7XG4gICAgICBzcGFuSUQ6ICdzMScsXG4gICAgICB0cmFjZUlEOiAndDInLFxuICAgICAgcmVmVHlwZTogJ0NISUxEX09GJyxcbiAgICAgIHNwYW46IHNwYW5zWzBdLFxuICAgIH0sXG4gIF07XG5cbiAgaXQoJ2NvcnJlY3RseSBjb21wdXRlcyBsaW5rcycsICgpID0+IHtcbiAgICBleHBlY3QoY29tcHV0ZUxpbmtzKGxpbmtQYXR0ZXJucywgc3BhbnNbMF0sIHNwYW5zWzBdLnRhZ3MsIDApKS50b0VxdWFsKFtcbiAgICAgIHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2V4YW1wbGUuY29tLz9teUtleT12YWx1ZU9mTXlLZXknLFxuICAgICAgICB0ZXh0OiAnZmlyc3QgbGluayAodmFsdWVPZk15S2V5KScsXG4gICAgICB9LFxuICAgIF0pO1xuICAgIGV4cGVjdChjb21wdXRlTGlua3MobGlua1BhdHRlcm5zLCBzcGFuc1sxXSwgc3BhbnNbMV0ubG9nc1swXS5maWVsZHMsIDApKS50b0VxdWFsKFtcbiAgICAgIHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2V4YW1wbGUuY29tLz9teUtleT12YWx1ZU9mTXklMkJPdGhlciUyQktleSZteUtleT12YWx1ZU9mTXlLZXknLFxuICAgICAgICB0ZXh0OiAnc2Vjb25kIGxpbmsgKHZhbHVlT2ZNeStPdGhlcitLZXkpJyxcbiAgICAgIH0sXG4gICAgXSk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdnZXRMaW5rcygpJywgKCkgPT4ge1xuICBjb25zdCBsaW5rUGF0dGVybnMgPSBbXG4gICAge1xuICAgICAga2V5OiAnbXlTcGVjaWFsS2V5JyxcbiAgICAgIHVybDogJ2h0dHA6Ly9leGFtcGxlLmNvbS8/bXlTcGVjaWFsS2V5PSN7bXlTcGVjaWFsS2V5fScsXG4gICAgICB0ZXh0OiAnc3BlY2lhbCBrZXkgbGluayAoI3tteVNwZWNpYWxLZXl9KScsXG4gICAgfSxcbiAgXS5tYXAocHJvY2Vzc0xpbmtQYXR0ZXJuKSBhcyBQcm9jZXNzZWRMaW5rUGF0dGVybltdO1xuICBjb25zdCB0ZW1wbGF0ZSA9IGplc3Quc3B5T24obGlua1BhdHRlcm5zWzBdIS51cmwsICd0ZW1wbGF0ZScpO1xuXG4gIGNvbnN0IHNwYW4gPSB7IGRlcHRoOiAwLCBwcm9jZXNzOiB7fSwgdGFnczogW3sga2V5OiAnbXlTcGVjaWFsS2V5JywgdmFsdWU6ICd2YWx1ZU9mTXlLZXknIH1dIH0gYXMgVHJhY2VTcGFuO1xuXG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgbGV0IGNhY2hlOiBXZWFrTWFwPG9iamVjdCwgYW55PjtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBjYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG4gICAgdGVtcGxhdGUubW9ja0NsZWFyKCk7XG4gIH0pO1xuXG4gIGl0KCdkb2VzIG5vdCBhY2Nlc3MgdGhlIGNhY2hlIGlmIHRoZXJlIGlzIG5vIGxpbmsgcGF0dGVybicsICgpID0+IHtcbiAgICBjYWNoZS5nZXQgPSBqZXN0LmZuKCk7XG4gICAgY29uc3QgZ2V0TGlua3MgPSBjcmVhdGVHZXRMaW5rcyhbXSwgY2FjaGUpO1xuICAgIGV4cGVjdChnZXRMaW5rcyhzcGFuLCBzcGFuLnRhZ3MsIDApKS50b0VxdWFsKFtdKTtcbiAgICBleHBlY3QoY2FjaGUuZ2V0KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB0aGUgcmVzdWx0IGZyb20gdGhlIGNhY2hlJywgKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdDogVHJhY2VMaW5rW10gPSBbXTtcbiAgICBjYWNoZS5zZXQoc3Bhbi50YWdzWzBdLCByZXN1bHQpO1xuICAgIGNvbnN0IGdldExpbmtzID0gY3JlYXRlR2V0TGlua3MobGlua1BhdHRlcm5zLCBjYWNoZSk7XG4gICAgZXhwZWN0KGdldExpbmtzKHNwYW4sIHNwYW4udGFncywgMCkpLnRvQmUocmVzdWx0KTtcbiAgICBleHBlY3QodGVtcGxhdGUpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gIH0pO1xuXG4gIGl0KCdhZGRzIHRoZSByZXN1bHQgdG8gdGhlIGNhY2hlJywgKCkgPT4ge1xuICAgIGNvbnN0IGdldExpbmtzID0gY3JlYXRlR2V0TGlua3MobGlua1BhdHRlcm5zLCBjYWNoZSk7XG4gICAgY29uc3QgcmVzdWx0ID0gZ2V0TGlua3Moc3Bhbiwgc3Bhbi50YWdzLCAwKTtcbiAgICBleHBlY3QodGVtcGxhdGUpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICBleHBlY3QocmVzdWx0KS50b0VxdWFsKFtcbiAgICAgIHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2V4YW1wbGUuY29tLz9teVNwZWNpYWxLZXk9dmFsdWVPZk15S2V5JyxcbiAgICAgICAgdGV4dDogJ3NwZWNpYWwga2V5IGxpbmsgKHZhbHVlT2ZNeUtleSknLFxuICAgICAgfSxcbiAgICBdKTtcbiAgICBleHBlY3QoY2FjaGUuZ2V0KHNwYW4udGFnc1swXSkpLnRvQmUocmVzdWx0KTtcbiAgfSk7XG59KTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUEsU0FDRUEsZUFBZSxFQUNmQyxrQkFBa0IsRUFDbEJDLG1CQUFtQixFQUNuQkMsc0JBQXNCLEVBQ3RCQyxrQkFBa0IsRUFFbEJDLFlBQVksRUFDWkMsY0FBYyxFQUNkQyxnQkFBZ0IsUUFDWCxpQkFBaUI7QUFFeEJDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxZQUFNO0VBQ2xDQyxFQUFFLENBQUMsOEJBQThCLEVBQUUsWUFBTTtJQUN2QyxJQUFNQyxpQkFBaUIsR0FBR1YsZUFBZSxDQUN2QyxrRkFBa0YsRUFDbEYsVUFBQ1csQ0FBQztNQUFBLE9BQUtBLENBQUM7SUFBQSxDQUNWLENBQUM7SUFDREMsTUFBTSxDQUFDRixpQkFBaUIsQ0FBQ0csVUFBVSxDQUFDLENBQUNDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2hGRixNQUFNLENBQUNGLGlCQUFpQixDQUFDSyxRQUFRLENBQUM7TUFBRUMsV0FBVyxFQUFFLFlBQVk7TUFBRUMsZUFBZSxFQUFFO0lBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsSUFBSSxDQUMvRiw4REFDRixDQUFDO0VBQ0gsQ0FBQyxDQUFDO0VBRUZULEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRSxZQUFNO0lBQy9DLElBQU1DLGlCQUFpQixHQUFHVixlQUFlLENBQ3ZDLGtGQUFrRixFQUNsRixVQUFDbUIsQ0FBQztNQUFBLGFBQVNBLENBQUM7SUFBQSxDQUNkLENBQUM7SUFD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O1FBQUVELEdBQUcsRUFBRSxHQUFHO1FBQUVDLEtBQUssRUFBRTtNQUFLLENBQUMsRUFDekI7UUFBRUQsR0FBRyxFQUFFLEdBQUc7UUFBRUMsS0FBSyxFQUFFO01BQUssQ0FBQyxFQUN6QjtRQUFFRCxHQUFHLEVBQUUsR0FBRztRQUFFQyxLQUFLLEVBQUU7TUFBSyxDQUFDLEVBQ3pCO1FBQUVELEdBQUcsRUFBRSxHQUFHO1FBQUVDLEtBQUssRUFBRTtNQUFLLENBQUMsRUFDekI7UUFBRUQsR0FBRyxFQUFFLEdBQUc7UUFBRUMsS0FBSyxFQUFFO01BQUssQ0FBQyxFQUN6QjtRQUFFRCxHQUFHLEVBQUUsR0FBRztRQUFFQyxLQUFLLEVBQUU7TUFBSyxDQUFDO0lBRTdCLENBQUM7SUFDREssSUFBSSxFQUFFLENBQ0o7TUFBRU4sR0FBRyxFQUFFLEdBQUc7TUFBRUMsS0FBSyxFQUFFO0lBQUssQ0FBQyxFQUN6QjtNQUFFRCxHQUFHLEVBQUUsR0FBRztNQUFFQyxLQUFLLEVBQUU7SUFBSyxDQUFDLEVBQ3pCO01BQUVELEdBQUcsRUFBRSxHQUFHO01BQUVDLEtBQUssRUFBRTtJQUFLLENBQUMsRUFDekI7TUFBRUQsR0FBRyxFQUFFLEdBQUc7TUFBRUMsS0FBSyxFQUFFO0lBQUssQ0FBQyxFQUN6QjtNQUFFRCxHQUFHLEVBQUUsR0FBRztNQUFFQyxLQUFLLEVBQUU7SUFBSyxDQUFDLEVBQ3pCO01BQUVELEdBQUcsRUFBRSxHQUFHO01BQUVDLEtBQUssRUFBRTtJQUFLLENBQUMsRUFDekI7TUFBRUQsR0FBRyxFQUFFLEdBQUc7TUFBRUMsS0FBSyxFQUFFO0lBQUssQ0FBQztFQUU3QixDQUFDLEVBQ0Q7SUFDRUcsS0FBSyxFQUFFLENBQUM7SUFDUkMsT0FBTyxFQUFFO01BQ1BDLElBQUksRUFBRSxDQUNKO1FBQUVOLEdBQUcsRUFBRSxHQUFHO1FBQUVDLEtBQUssRUFBRTtNQUFLLENBQUMsRUFDekI7UUFBRUQsR0FBRyxFQUFFLEdBQUc7UUFBRUMsS0FBSyxFQUFFO01BQUssQ0FBQyxFQUN6QjtRQUFFRCxHQUFH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