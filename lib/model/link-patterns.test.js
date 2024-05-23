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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwcm9jZXNzVGVtcGxhdGUiLCJjcmVhdGVUZXN0RnVuY3Rpb24iLCJnZXRQYXJhbWV0ZXJJbkFycmF5IiwiZ2V0UGFyYW1ldGVySW5BbmNlc3RvciIsInByb2Nlc3NMaW5rUGF0dGVybiIsImNvbXB1dGVMaW5rcyIsImNyZWF0ZUdldExpbmtzIiwiY29tcHV0ZVRyYWNlTGluayIsImRlc2NyaWJlIiwiaXQiLCJwcm9jZXNzZWRUZW1wbGF0ZSIsImEiLCJleHBlY3QiLCJwYXJhbWV0ZXJzIiwidG9FcXVhbCIsInRlbXBsYXRlIiwib25lVmFyaWFibGUiLCJhbm90aGVyVmFyaWFibGUiLCJ0b0JlIiwiZSIsImRhdGEiLCJiIiwidG9UaHJvdyIsInRlc3RGbiIsImtleSIsInZhbHVlIiwidG9CZVVuZGVmaW5lZCIsInNwYW5zIiwiZGVwdGgiLCJwcm9jZXNzIiwidGFncyIsInJlZmVyZW5jZXMiLCJzcGFuSUQiLCJ0cmFjZUlEIiwicmVmVHlwZSIsInNwYW4iLCJzcGFuc1dpdGhVbmRlZmluZWRUYWdzIiwibGlua1BhdHRlcm5zIiwidHlwZSIsInVybCIsInRleHQiLCJtYXAiLCJ0cmFjZSIsInByb2Nlc3NlcyIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJkdXJhdGlvbiIsInNlcnZpY2VzIiwibG9ncyIsImZpZWxkcyIsImplc3QiLCJzcHlPbiIsImNhY2hlIiwiYmVmb3JlRWFjaCIsIldlYWtNYXAiLCJtb2NrQ2xlYXIiLCJnZXQiLCJmbiIsImdldExpbmtzIiwibm90IiwidG9IYXZlQmVlbkNhbGxlZCIsInJlc3VsdCIsInNldCIsInRvSGF2ZUJlZW5DYWxsZWRUaW1lcyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9saW5rLXBhdHRlcm5zLnRlc3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBKYWVnZXIgQXV0aG9ycy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgVHJhY2UsIFRyYWNlTGluaywgVHJhY2VTcGFuIH0gZnJvbSAnLi4vdHlwZXMvdHJhY2UnO1xuXG5pbXBvcnQge1xuICBwcm9jZXNzVGVtcGxhdGUsXG4gIGNyZWF0ZVRlc3RGdW5jdGlvbixcbiAgZ2V0UGFyYW1ldGVySW5BcnJheSxcbiAgZ2V0UGFyYW1ldGVySW5BbmNlc3RvcixcbiAgcHJvY2Vzc0xpbmtQYXR0ZXJuLFxuICBQcm9jZXNzZWRMaW5rUGF0dGVybixcbiAgY29tcHV0ZUxpbmtzLFxuICBjcmVhdGVHZXRMaW5rcyxcbiAgY29tcHV0ZVRyYWNlTGluayxcbn0gZnJvbSAnLi9saW5rLXBhdHRlcm5zJztcblxuZGVzY3JpYmUoJ3Byb2Nlc3NUZW1wbGF0ZSgpJywgKCkgPT4ge1xuICBpdCgnY29ycmVjdGx5IHJlcGxhY2VzIHZhcmlhYmxlcycsICgpID0+IHtcbiAgICBjb25zdCBwcm9jZXNzZWRUZW1wbGF0ZSA9IHByb2Nlc3NUZW1wbGF0ZShcbiAgICAgICd0aGlzIGlzIGEgdGVzdCB3aXRoICN7b25lVmFyaWFibGV9I3thbm90aGVyVmFyaWFibGV9IGFuZCB0aGUgc2FtZSAje29uZVZhcmlhYmxlfScsXG4gICAgICAoYSkgPT4gYVxuICAgICk7XG4gICAgZXhwZWN0KHByb2Nlc3NlZFRlbXBsYXRlLnBhcmFtZXRlcnMpLnRvRXF1YWwoWydvbmVWYXJpYWJsZScsICdhbm90aGVyVmFyaWFibGUnXSk7XG4gICAgZXhwZWN0KHByb2Nlc3NlZFRlbXBsYXRlLnRlbXBsYXRlKHsgb25lVmFyaWFibGU6ICdNWUZJUlNUVkFSJywgYW5vdGhlclZhcmlhYmxlOiAnU0VDT05EJyB9KSkudG9CZShcbiAgICAgICd0aGlzIGlzIGEgdGVzdCB3aXRoIE1ZRklSU1RWQVJTRUNPTkQgYW5kIHRoZSBzYW1lIE1ZRklSU1RWQVInXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ2NvcnJlY3RseSB1c2VzIHRoZSBlbmNvZGluZyBmdW5jdGlvbicsICgpID0+IHtcbiAgICBjb25zdCBwcm9jZXNzZWRUZW1wbGF0ZSA9IHByb2Nlc3NUZW1wbGF0ZShcbiAgICAgICd0aGlzIGlzIGEgdGVzdCB3aXRoICN7b25lVmFyaWFibGV9I3thbm90aGVyVmFyaWFibGV9IGFuZCB0aGUgc2FtZSAje29uZVZhcmlhYmxlfScsXG4gICAgICAoZSkgPT4gYC8ke2V9XFxcXGBcbiAgICApO1xuICAgIGV4cGVjdChwcm9jZXNzZWRUZW1wbGF0ZS5wYXJhbWV0ZXJzKS50b0VxdWFsKFsnb25lVmFyaWFibGUnLCAnYW5vdGhlclZhcmlhYmxlJ10pO1xuICAgIGV4cGVjdChwcm9jZXNzZWRUZW1wbGF0ZS50ZW1wbGF0ZSh7IG9uZVZhcmlhYmxlOiAnTVlGSVJTVFZBUicsIGFub3RoZXJWYXJpYWJsZTogJ1NFQ09ORCcgfSkpLnRvQmUoXG4gICAgICAndGhpcyBpcyBhIHRlc3Qgd2l0aCAvTVlGSVJTVFZBUlxcXFwvU0VDT05EXFxcXCBhbmQgdGhlIHNhbWUgL01ZRklSU1RWQVJcXFxcJ1xuICAgICk7XG4gIH0pO1xuXG4gIC8qXG4gIC8vIGtlcHQgb24gaWNlIHVudGlsICMxMjMgaXMgaW1wbGVtZW50ZWQ6XG5cbiAgaXQoJ2NvcnJlY3RseSByZXR1cm5zIHRoZSBzYW1lIG9iamVjdCB3aGVuIHBhc3NpbmcgYW4gYWxyZWFkeSBwcm9jZXNzZWQgdGVtcGxhdGUnLCAoKSA9PiB7XG4gICAgY29uc3QgYWxyZWFkeVByb2Nlc3NlZCA9IHtcbiAgICAgIHBhcmFtZXRlcnM6IFsnYiddLFxuICAgICAgdGVtcGxhdGU6IGRhdGEgPT4gYGEke2RhdGEuYn1jYCxcbiAgICB9O1xuICAgIGNvbnN0IHByb2Nlc3NlZFRlbXBsYXRlID0gcHJvY2Vzc1RlbXBsYXRlKGFscmVhZHlQcm9jZXNzZWQsIGEgPT4gYSk7XG4gICAgZXhwZWN0KHByb2Nlc3NlZFRlbXBsYXRlKS50b0JlKGFscmVhZHlQcm9jZXNzZWQpO1xuICB9KTtcblxuICAqL1xuXG4gIGl0KCdyZXBvcnRzIGFuIGVycm9yIHdoZW4gcGFzc2luZyBhbiBvYmplY3QgdGhhdCBkb2VzIG5vdCBsb29rIGxpa2UgYW4gYWxyZWFkeSBwcm9jZXNzZWQgdGVtcGxhdGUnLCAoKSA9PiB7XG4gICAgZXhwZWN0KCgpID0+XG4gICAgICBwcm9jZXNzVGVtcGxhdGUoXG4gICAgICAgIHtcbiAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4gICAgICAgICAgdGVtcGxhdGU6IChkYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSA9PiBgYSR7ZGF0YS5ifWNgLFxuICAgICAgICB9LFxuICAgICAgICAoYSkgPT4gYVxuICAgICAgKVxuICAgICkudG9UaHJvdygpO1xuICAgIGV4cGVjdCgoKSA9PlxuICAgICAgcHJvY2Vzc1RlbXBsYXRlKFxuICAgICAgICB7XG4gICAgICAgICAgcGFyYW1ldGVyczogWydiJ10sXG4gICAgICAgIH0sXG4gICAgICAgIChhKSA9PiBhXG4gICAgICApXG4gICAgKS50b1Rocm93KCk7XG4gICAgZXhwZWN0KCgpID0+IHByb2Nlc3NUZW1wbGF0ZSh7fSwgKGEpID0+IGEpKS50b1Rocm93KCk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdjcmVhdGVUZXN0RnVuY3Rpb24oKScsICgpID0+IHtcbiAgaXQoJ2FjY2VwdHMgYSBzdHJpbmcnLCAoKSA9PiB7XG4gICAgY29uc3QgdGVzdEZuID0gY3JlYXRlVGVzdEZ1bmN0aW9uKCdteVZhbHVlJyk7XG4gICAgZXhwZWN0KHRlc3RGbignbXlWYWx1ZScpKS50b0JlKHRydWUpO1xuICAgIGV4cGVjdCh0ZXN0Rm4oJ215Rmlyc3RWYWx1ZScpKS50b0JlKGZhbHNlKTtcbiAgICBleHBlY3QodGVzdEZuKCdteVNlY29uZFZhbHVlJykpLnRvQmUoZmFsc2UpO1xuICAgIGV4cGVjdCh0ZXN0Rm4oJ290aGVyVmFsdWUnKSkudG9CZShmYWxzZSk7XG4gIH0pO1xuXG4gIGl0KCdhY2NlcHRzIGFuIGFycmF5JywgKCkgPT4ge1xuICAgIGNvbnN0IHRlc3RGbiA9IGNyZWF0ZVRlc3RGdW5jdGlvbihbJ215Rmlyc3RWYWx1ZScsICdteVNlY29uZFZhbHVlJ10pO1xuICAgIGV4cGVjdCh0ZXN0Rm4oJ215VmFsdWUnKSkudG9CZShmYWxzZSk7XG4gICAgZXhwZWN0KHRlc3RGbignbXlGaXJzdFZhbHVlJykpLnRvQmUodHJ1ZSk7XG4gICAgZXhwZWN0KHRlc3RGbignbXlTZWNvbmRWYWx1ZScpKS50b0JlKHRydWUpO1xuICAgIGV4cGVjdCh0ZXN0Rm4oJ290aGVyVmFsdWUnKSkudG9CZShmYWxzZSk7XG4gIH0pO1xuXG4gIC8qXG4gIC8vIGtlcHQgb24gaWNlIHVudGlsICMxMjMgaXMgaW1wbGVtZW50ZWQ6XG5cbiAgaXQoJ2FjY2VwdHMgYSByZWd1bGFyIGV4cHJlc3Npb24nLCAoKSA9PiB7XG4gICAgY29uc3QgdGVzdEZuID0gY3JlYXRlVGVzdEZ1bmN0aW9uKC9ebXkuKlZhbHVlJC8pO1xuICAgIGV4cGVjdCh0ZXN0Rm4oJ215VmFsdWUnKSkudG9CZSh0cnVlKTtcbiAgICBleHBlY3QodGVzdEZuKCdteUZpcnN0VmFsdWUnKSkudG9CZSh0cnVlKTtcbiAgICBleHBlY3QodGVzdEZuKCdteVNlY29uZFZhbHVlJykpLnRvQmUodHJ1ZSk7XG4gICAgZXhwZWN0KHRlc3RGbignb3RoZXJWYWx1ZScpKS50b0JlKGZhbHNlKTtcbiAgfSk7XG5cbiAgaXQoJ2FjY2VwdHMgYSBmdW5jdGlvbicsICgpID0+IHtcbiAgICBjb25zdCBtb2NrQ2FsbGJhY2sgPSBqZXN0LmZuKCk7XG4gICAgbW9ja0NhbGxiYWNrXG4gICAgICAubW9ja1JldHVyblZhbHVlT25jZSh0cnVlKVxuICAgICAgLm1vY2tSZXR1cm5WYWx1ZU9uY2UoZmFsc2UpXG4gICAgICAubW9ja1JldHVyblZhbHVlT25jZSh0cnVlKVxuICAgICAgLm1vY2tSZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgY29uc3QgdGVzdEZuID0gY3JlYXRlVGVzdEZ1bmN0aW9uKG1vY2tDYWxsYmFjayk7XG4gICAgZXhwZWN0KHRlc3RGbignbXlWYWx1ZScpKS50b0JlKHRydWUpO1xuICAgIGV4cGVjdChtb2NrQ2FsbGJhY2spLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICBleHBlY3QobW9ja0NhbGxiYWNrKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnbXlWYWx1ZScpO1xuICAgIGV4cGVjdCh0ZXN0Rm4oJ215Rmlyc3RWYWx1ZScpKS50b0JlKGZhbHNlKTtcbiAgICBleHBlY3QobW9ja0NhbGxiYWNrKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMik7XG4gICAgZXhwZWN0KG1vY2tDYWxsYmFjaykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ215Rmlyc3RWYWx1ZScpO1xuICAgIGV4cGVjdCh0ZXN0Rm4oJ215U2Vjb25kVmFsdWUnKSkudG9CZSh0cnVlKTtcbiAgICBleHBlY3QobW9ja0NhbGxiYWNrKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMyk7XG4gICAgZXhwZWN0KG1vY2tDYWxsYmFjaykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ215U2Vjb25kVmFsdWUnKTtcbiAgICBleHBlY3QodGVzdEZuKCdvdGhlclZhbHVlJykpLnRvQmUoZmFsc2UpO1xuICAgIGV4cGVjdChtb2NrQ2FsbGJhY2spLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcyg0KTtcbiAgICBleHBlY3QobW9ja0NhbGxiYWNrKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnb3RoZXJWYWx1ZScpO1xuICB9KTtcblxuICAqL1xuXG4gIGl0KCdhY2NlcHRzIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICBjb25zdCB0ZXN0Rm4gPSBjcmVhdGVUZXN0RnVuY3Rpb24oKTtcbiAgICBleHBlY3QodGVzdEZuKCdteVZhbHVlJykpLnRvQmUodHJ1ZSk7XG4gICAgZXhwZWN0KHRlc3RGbignbXlGaXJzdFZhbHVlJykpLnRvQmUodHJ1ZSk7XG4gICAgZXhwZWN0KHRlc3RGbignbXlTZWNvbmRWYWx1ZScpKS50b0JlKHRydWUpO1xuICAgIGV4cGVjdCh0ZXN0Rm4oJ290aGVyVmFsdWUnKSkudG9CZSh0cnVlKTtcbiAgfSk7XG5cbiAgaXQoJ3JlamVjdHMgdW5rbm93biB2YWx1ZXMnLCAoKSA9PiB7XG4gICAgZXhwZWN0KCgpID0+IGNyZWF0ZVRlc3RGdW5jdGlvbih7fSkpLnRvVGhyb3coKTtcbiAgICBleHBlY3QoKCkgPT4gY3JlYXRlVGVzdEZ1bmN0aW9uKHRydWUpKS50b1Rocm93KCk7XG4gICAgZXhwZWN0KCgpID0+IGNyZWF0ZVRlc3RGdW5jdGlvbihmYWxzZSkpLnRvVGhyb3coKTtcbiAgICBleHBlY3QoKCkgPT4gY3JlYXRlVGVzdEZ1bmN0aW9uKDApKS50b1Rocm93KCk7XG4gICAgZXhwZWN0KCgpID0+IGNyZWF0ZVRlc3RGdW5jdGlvbig1KSkudG9UaHJvdygpO1xuICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnZ2V0UGFyYW1ldGVySW5BcnJheSgpJywgKCkgPT4ge1xuICBjb25zdCBkYXRhID0gW1xuICAgIHsga2V5OiAnbXlrZXknLCB2YWx1ZTogJ29rJyB9LFxuICAgIHsga2V5OiAnb3RoZXJrZXknLCB2YWx1ZTogJ3YnIH0sXG4gIF07XG5cbiAgaXQoJ3JldHVybnMgYW4gZW50cnkgdGhhdCBpcyBwcmVzZW50JywgKCkgPT4ge1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFycmF5KCdteWtleScsIGRhdGEpKS50b0JlKGRhdGFbMF0pO1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFycmF5KCdvdGhlcmtleScsIGRhdGEpKS50b0JlKGRhdGFbMV0pO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB1bmRlZmluZWQgd2hlbiB0aGUgZW50cnkgY2Fubm90IGJlIGZvdW5kJywgKCkgPT4ge1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFycmF5KCdteW90aGVya2V5JywgZGF0YSkpLnRvQmVVbmRlZmluZWQoKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgdW5kZWZpbmVkIHdoZW4gdGhlcmUgaXMgbm8gYXJyYXknLCAoKSA9PiB7XG4gICAgZXhwZWN0KGdldFBhcmFtZXRlckluQXJyYXkoJ290aGVya2V5JykpLnRvQmVVbmRlZmluZWQoKTtcbiAgICBleHBlY3QoZ2V0UGFyYW1ldGVySW5BcnJheSgnb3RoZXJrZXknLCBudWxsKSkudG9CZVVuZGVmaW5lZCgpO1xuICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnZ2V0UGFyYW1ldGVySW5BbmNlc3RvcigpJywgKCkgPT4ge1xuICBjb25zdCBzcGFucyA9IFtcbiAgICB7XG4gICAgICBkZXB0aDogMCxcbiAgICAgIHByb2Nlc3M6IHtcbiAgICAgICAgdGFnczogW1xuICAgICAgICAgIHsga2V5OiAnYScsIHZhbHVlOiAnYTcnIH0sXG4gICAgICAgICAgeyBrZXk6ICdiJywgdmFsdWU6ICdiNycgfSxcbiAgICAgICAgICB7IGtleTogJ2MnLCB2YWx1ZTogJ2M3JyB9LFxuICAgICAgICAgIHsga2V5OiAnZCcsIHZhbHVlOiAnZDcnIH0sXG4gICAgICAgICAgeyBrZXk6ICdlJywgdmFsdWU6ICdlNycgfSxcbiAgICAgICAgICB7IGtleTogJ2YnLCB2YWx1ZTogJ2Y3JyB9LFxuICAgICAgICAgIHsga2V5OiAnZycsIHZhbHVlOiAnZzcnIH0sXG4gICAgICAgICAgeyBrZXk6ICdoJywgdmFsdWU6ICdoNycgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB0YWdzOiBbXG4gICAgICAgIHsga2V5OiAnYScsIHZhbHVlOiAnYTYnIH0sXG4gICAgICAgIHsga2V5OiAnYicsIHZhbHVlOiAnYjYnIH0sXG4gICAgICAgIHsga2V5OiAnYycsIHZhbHVlOiAnYzYnIH0sXG4gICAgICAgIHsga2V5OiAnZCcsIHZhbHVlOiAnZDYnIH0sXG4gICAgICAgIHsga2V5OiAnZScsIHZhbHVlOiAnZTYnIH0sXG4gICAgICAgIHsga2V5OiAnZicsIHZhbHVlOiAnZjYnIH0sXG4gICAgICAgIHsga2V5OiAnZycsIHZhbHVlOiAnZzYnIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgZGVwdGg6IDEsXG4gICAgICBwcm9jZXNzOiB7XG4gICAgICAgIHRhZ3M6IFtcbiAgICAgICAgICB7IGtleTogJ2EnLCB2YWx1ZTogJ2E1JyB9LFxuICAgICAgICAgIHsga2V5OiAnYicsIHZhbHVlOiAnYjUnIH0sXG4gICAgICAgICAgeyBrZXk6ICdjJywgdmFsdWU6ICdjNScgfSxcbiAgICAgICAgICB7IGtleTogJ2QnLCB2YWx1ZTogJ2Q1JyB9LFxuICAgICAgICAgIHsga2V5OiAnZScsIHZhbHVlOiAnZTUnIH0sXG4gICAgICAgICAgeyBrZXk6ICdmJywgdmFsdWU6ICdmNScgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB0YWdzOiBbXG4gICAgICAgIHsga2V5OiAnYScsIHZhbHVlOiAnYTQnIH0sXG4gICAgICAgIHsga2V5OiAnYicsIHZhbHVlOiAnYjQnIH0sXG4gICAgICAgIHsga2V5OiAnYycsIHZhbHVlOiAnYzQnIH0sXG4gICAgICAgIHsga2V5OiAnZCcsIHZhbHVlOiAnZDQnIH0sXG4gICAgICAgIHsga2V5OiAnZScsIHZhbHVlOiAnZTQnIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgZGVwdGg6IDEsXG4gICAgICBwcm9jZXNzOiB7XG4gICAgICAgIHRhZ3M6IFtcbiAgICAgICAgICB7IGtleTogJ2EnLCB2YWx1ZTogJ2EzJyB9LFxuICAgICAgICAgIHsga2V5OiAnYicsIHZhbHVlOiAnYjMnIH0sXG4gICAgICAgICAgeyBrZXk6ICdjJywgdmFsdWU6ICdjMycgfSxcbiAgICAgICAgICB7IGtleTogJ2QnLCB2YWx1ZTogJ2QzJyB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHRhZ3M6IFtcbiAgICAgICAgeyBrZXk6ICdhJywgdmFsdWU6ICdhMicgfSxcbiAgICAgICAgeyBrZXk6ICdiJywgdmFsdWU6ICdiMicgfSxcbiAgICAgICAgeyBrZXk6ICdjJywgdmFsdWU6ICdjMicgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICBkZXB0aDogMixcbiAgICAgIHByb2Nlc3M6IHtcbiAgICAgICAgdGFnczogW1xuICAgICAgICAgIHsga2V5OiAnYScsIHZhbHVlOiAnYTEnIH0sXG4gICAgICAgICAgeyBrZXk6ICdiJywgdmFsdWU6ICdiMScgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB0YWdzOiBbeyBrZXk6ICdhJywgdmFsdWU6ICdhMCcgfV0sXG4gICAgfSxcbiAgXSBhcyBUcmFjZVNwYW5bXTtcblxuICBzcGFuc1sxXS5yZWZlcmVuY2VzID0gW1xuICAgIHtcbiAgICAgIHNwYW5JRDogJ3MxJyxcbiAgICAgIHRyYWNlSUQ6ICd0MicsXG4gICAgICByZWZUeXBlOiAnQ0hJTERfT0YnLFxuICAgICAgc3Bhbjogc3BhbnNbMF0sXG4gICAgfSxcbiAgXTtcbiAgc3BhbnNbMl0ucmVmZXJlbmNlcyA9IFtcbiAgICB7XG4gICAgICBzcGFuSUQ6ICdzMScsXG4gICAgICB0cmFjZUlEOiAndDInLFxuICAgICAgcmVmVHlwZTogJ0NISUxEX09GJyxcbiAgICAgIHNwYW46IHNwYW5zWzBdLFxuICAgIH0sXG4gIF07XG4gIHNwYW5zWzNdLnJlZmVyZW5jZXMgPSBbXG4gICAge1xuICAgICAgc3BhbklEOiAnczEnLFxuICAgICAgdHJhY2VJRDogJ3QyJyxcbiAgICAgIHJlZlR5cGU6ICdDSElMRF9PRicsXG4gICAgICBzcGFuOiBzcGFuc1syXSxcbiAgICB9LFxuICBdO1xuXG4gIGl0KCd1c2VzIGN1cnJlbnQgc3BhbiB0YWdzJywgKCkgPT4ge1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdhJywgc3BhbnNbM10pKS50b0VxdWFsKHsga2V5OiAnYScsIHZhbHVlOiAnYTAnIH0pO1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdhJywgc3BhbnNbMl0pKS50b0VxdWFsKHsga2V5OiAnYScsIHZhbHVlOiAnYTInIH0pO1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdhJywgc3BhbnNbMV0pKS50b0VxdWFsKHsga2V5OiAnYScsIHZhbHVlOiAnYTQnIH0pO1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdhJywgc3BhbnNbMF0pKS50b0VxdWFsKHsga2V5OiAnYScsIHZhbHVlOiAnYTYnIH0pO1xuICB9KTtcblxuICBpdCgndXNlcyBjdXJyZW50IHNwYW4gcHJvY2VzcyB0YWdzJywgKCkgPT4ge1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdiJywgc3BhbnNbM10pKS50b0VxdWFsKHsga2V5OiAnYicsIHZhbHVlOiAnYjEnIH0pO1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdkJywgc3BhbnNbMl0pKS50b0VxdWFsKHsga2V5OiAnZCcsIHZhbHVlOiAnZDMnIH0pO1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdmJywgc3BhbnNbMV0pKS50b0VxdWFsKHsga2V5OiAnZicsIHZhbHVlOiAnZjUnIH0pO1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdoJywgc3BhbnNbMF0pKS50b0VxdWFsKHsga2V5OiAnaCcsIHZhbHVlOiAnaDcnIH0pO1xuICB9KTtcblxuICBpdCgndXNlcyBwYXJlbnQgc3BhbiB0YWdzJywgKCkgPT4ge1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdjJywgc3BhbnNbM10pKS50b0VxdWFsKHsga2V5OiAnYycsIHZhbHVlOiAnYzInIH0pO1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdlJywgc3BhbnNbMl0pKS50b0VxdWFsKHsga2V5OiAnZScsIHZhbHVlOiAnZTYnIH0pO1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdmJywgc3BhbnNbMl0pKS50b0VxdWFsKHsga2V5OiAnZicsIHZhbHVlOiAnZjYnIH0pO1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdnJywgc3BhbnNbMl0pKS50b0VxdWFsKHsga2V5OiAnZycsIHZhbHVlOiAnZzYnIH0pO1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdnJywgc3BhbnNbMV0pKS50b0VxdWFsKHsga2V5OiAnZycsIHZhbHVlOiAnZzYnIH0pO1xuICB9KTtcblxuICBpdCgndXNlcyBwYXJlbnQgc3BhbiBwcm9jZXNzIHRhZ3MnLCAoKSA9PiB7XG4gICAgZXhwZWN0KGdldFBhcmFtZXRlckluQW5jZXN0b3IoJ2QnLCBzcGFuc1szXSkpLnRvRXF1YWwoeyBrZXk6ICdkJywgdmFsdWU6ICdkMycgfSk7XG4gICAgZXhwZWN0KGdldFBhcmFtZXRlckluQW5jZXN0b3IoJ2gnLCBzcGFuc1syXSkpLnRvRXF1YWwoeyBrZXk6ICdoJywgdmFsdWU6ICdoNycgfSk7XG4gICAgZXhwZWN0KGdldFBhcmFtZXRlckluQW5jZXN0b3IoJ2gnLCBzcGFuc1sxXSkpLnRvRXF1YWwoeyBrZXk6ICdoJywgdmFsdWU6ICdoNycgfSk7XG4gIH0pO1xuXG4gIGl0KCd1c2VzIGdyYW5kLXBhcmVudCBzcGFuIHRhZ3MnLCAoKSA9PiB7XG4gICAgZXhwZWN0KGdldFBhcmFtZXRlckluQW5jZXN0b3IoJ2UnLCBzcGFuc1szXSkpLnRvRXF1YWwoeyBrZXk6ICdlJywgdmFsdWU6ICdlNicgfSk7XG4gICAgZXhwZWN0KGdldFBhcmFtZXRlckluQW5jZXN0b3IoJ2YnLCBzcGFuc1szXSkpLnRvRXF1YWwoeyBrZXk6ICdmJywgdmFsdWU6ICdmNicgfSk7XG4gICAgZXhwZWN0KGdldFBhcmFtZXRlckluQW5jZXN0b3IoJ2cnLCBzcGFuc1szXSkpLnRvRXF1YWwoeyBrZXk6ICdnJywgdmFsdWU6ICdnNicgfSk7XG4gIH0pO1xuXG4gIGl0KCd1c2VzIGdyYW5kLXBhcmVudCBwcm9jZXNzIHRhZ3MnLCAoKSA9PiB7XG4gICAgZXhwZWN0KGdldFBhcmFtZXRlckluQW5jZXN0b3IoJ2gnLCBzcGFuc1szXSkpLnRvRXF1YWwoeyBrZXk6ICdoJywgdmFsdWU6ICdoNycgfSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCB3aGVuIHRoZSBlbnRyeSBjYW5ub3QgYmUgZm91bmQnLCAoKSA9PiB7XG4gICAgZXhwZWN0KGdldFBhcmFtZXRlckluQW5jZXN0b3IoJ2knLCBzcGFuc1szXSkpLnRvQmVVbmRlZmluZWQoKTtcbiAgfSk7XG5cbiAgaXQoJ2RvZXMgbm90IGJyZWFrIGlmIHNvbWUgdGFncyBhcmUgbm90IGRlZmluZWQnLCAoKSA9PiB7XG4gICAgY29uc3Qgc3BhbnNXaXRoVW5kZWZpbmVkVGFncyA9IFtcbiAgICAgIHtcbiAgICAgICAgZGVwdGg6IDAsXG4gICAgICAgIHByb2Nlc3M6IHt9LFxuICAgICAgfSxcbiAgICBdIGFzIFRyYWNlU3BhbltdO1xuICAgIGV4cGVjdChnZXRQYXJhbWV0ZXJJbkFuY2VzdG9yKCdhJywgc3BhbnNXaXRoVW5kZWZpbmVkVGFnc1swXSkpLnRvQmVVbmRlZmluZWQoKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ2NvbXB1dGVUcmFjZUxpbmsoKScsICgpID0+IHtcbiAgY29uc3QgbGlua1BhdHRlcm5zID0gW1xuICAgIHtcbiAgICAgIHR5cGU6ICd0cmFjZXMnLFxuICAgICAgdXJsOiAnaHR0cDovL2V4YW1wbGUuY29tLz9teUtleT0je3RyYWNlSUR9JyxcbiAgICAgIHRleHQ6ICdmaXJzdCBsaW5rICgje3RyYWNlSUR9KScsXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAndHJhY2VzJyxcbiAgICAgIHVybDogJ2h0dHA6Ly9leGFtcGxlLmNvbS8/bXlLZXk9I3t0cmFjZUlEfSZteUtleT0je215S2V5fScsXG4gICAgICB0ZXh0OiAnc2Vjb25kIGxpbmsgKCN7bXlLZXl9KScsXG4gICAgfSxcbiAgXS5tYXAocHJvY2Vzc0xpbmtQYXR0ZXJuKSBhcyBQcm9jZXNzZWRMaW5rUGF0dGVybltdO1xuXG4gIGNvbnN0IHRyYWNlID0ge1xuICAgIHByb2Nlc3NlczogW10sXG4gICAgdHJhY2VJRDogJ3RyYzEnLFxuICAgIHNwYW5zOiBbXSxcbiAgICBzdGFydFRpbWU6IDEwMDAsXG4gICAgZW5kVGltZTogMjAwMCxcbiAgICBkdXJhdGlvbjogMTAwMCxcbiAgICBzZXJ2aWNlczogW10sXG4gIH0gYXMgdW5rbm93biBhcyBUcmFjZTtcblxuICBpdCgnY29ycmVjdGx5IGNvbXB1dGVzIGxpbmtzJywgKCkgPT4ge1xuICAgIGV4cGVjdChjb21wdXRlVHJhY2VMaW5rKGxpbmtQYXR0ZXJucywgdHJhY2UpKS50b0VxdWFsKFtcbiAgICAgIHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2V4YW1wbGUuY29tLz9teUtleT10cmMxJyxcbiAgICAgICAgdGV4dDogJ2ZpcnN0IGxpbmsgKHRyYzEpJyxcbiAgICAgIH0sXG4gICAgXSk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdjb21wdXRlTGlua3MoKScsICgpID0+IHtcbiAgY29uc3QgbGlua1BhdHRlcm5zID0gW1xuICAgIHtcbiAgICAgIHR5cGU6ICd0YWdzJyxcbiAgICAgIGtleTogJ215S2V5JyxcbiAgICAgIHVybDogJ2h0dHA6Ly9leGFtcGxlLmNvbS8/bXlLZXk9I3tteUtleX0nLFxuICAgICAgdGV4dDogJ2ZpcnN0IGxpbmsgKCN7bXlLZXl9KScsXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICdteU90aGVyS2V5JyxcbiAgICAgIHVybDogJ2h0dHA6Ly9leGFtcGxlLmNvbS8/bXlLZXk9I3tteU90aGVyS2V5fSZteUtleT0je215S2V5fScsXG4gICAgICB0ZXh0OiAnc2Vjb25kIGxpbmsgKCN7bXlPdGhlcktleX0pJyxcbiAgICB9LFxuICBdLm1hcChwcm9jZXNzTGlua1BhdHRlcm4pIGFzIFByb2Nlc3NlZExpbmtQYXR0ZXJuW107XG5cbiAgY29uc3Qgc3BhbnMgPSBbXG4gICAgeyBkZXB0aDogMCwgcHJvY2Vzczoge30sIHRhZ3M6IFt7IGtleTogJ215S2V5JywgdmFsdWU6ICd2YWx1ZU9mTXlLZXknIH1dIH0sXG4gICAgeyBkZXB0aDogMSwgcHJvY2Vzczoge30sIGxvZ3M6IFt7IGZpZWxkczogW3sga2V5OiAnbXlPdGhlcktleScsIHZhbHVlOiAndmFsdWVPZk15K090aGVyK0tleScgfV0gfV0gfSxcbiAgXSBhcyB1bmtub3duIGFzIFRyYWNlU3BhbltdO1xuICBzcGFuc1sxXS5yZWZlcmVuY2VzID0gW1xuICAgIHtcbiAgICAgIHNwYW5JRDogJ3MxJyxcbiAgICAgIHRyYWNlSUQ6ICd0MicsXG4gICAgICByZWZUeXBlOiAnQ0hJTERfT0YnLFxuICAgICAgc3Bhbjogc3BhbnNbMF0sXG4gICAgfSxcbiAgXTtcblxuICBpdCgnY29ycmVjdGx5IGNvbXB1dGVzIGxpbmtzJywgKCkgPT4ge1xuICAgIGV4cGVjdChjb21wdXRlTGlua3MobGlua1BhdHRlcm5zLCBzcGFuc1swXSwgc3BhbnNbMF0udGFncywgMCkpLnRvRXF1YWwoW1xuICAgICAge1xuICAgICAgICB1cmw6ICdodHRwOi8vZXhhbXBsZS5jb20vP215S2V5PXZhbHVlT2ZNeUtleScsXG4gICAgICAgIHRleHQ6ICdmaXJzdCBsaW5rICh2YWx1ZU9mTXlLZXkpJyxcbiAgICAgIH0sXG4gICAgXSk7XG4gICAgZXhwZWN0KGNvbXB1dGVMaW5rcyhsaW5rUGF0dGVybnMsIHNwYW5zWzFdLCBzcGFuc1sxXS5sb2dzWzBdLmZpZWxkcywgMCkpLnRvRXF1YWwoW1xuICAgICAge1xuICAgICAgICB1cmw6ICdodHRwOi8vZXhhbXBsZS5jb20vP215S2V5PXZhbHVlT2ZNeSUyQk90aGVyJTJCS2V5Jm15S2V5PXZhbHVlT2ZNeUtleScsXG4gICAgICAgIHRleHQ6ICdzZWNvbmQgbGluayAodmFsdWVPZk15K090aGVyK0tleSknLFxuICAgICAgfSxcbiAgICBdKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ2dldExpbmtzKCknLCAoKSA9PiB7XG4gIGNvbnN0IGxpbmtQYXR0ZXJucyA9IFtcbiAgICB7XG4gICAgICBrZXk6ICdteVNwZWNpYWxLZXknLFxuICAgICAgdXJsOiAnaHR0cDovL2V4YW1wbGUuY29tLz9teVNwZWNpYWxLZXk9I3tteVNwZWNpYWxLZXl9JyxcbiAgICAgIHRleHQ6ICdzcGVjaWFsIGtleSBsaW5rICgje215U3BlY2lhbEtleX0pJyxcbiAgICB9LFxuICBdLm1hcChwcm9jZXNzTGlua1BhdHRlcm4pIGFzIFByb2Nlc3NlZExpbmtQYXR0ZXJuW107XG4gIGNvbnN0IHRlbXBsYXRlID0gamVzdC5zcHlPbihsaW5rUGF0dGVybnNbMF0hLnVybCwgJ3RlbXBsYXRlJyk7XG5cbiAgY29uc3Qgc3BhbiA9IHsgZGVwdGg6IDAsIHByb2Nlc3M6IHt9LCB0YWdzOiBbeyBrZXk6ICdteVNwZWNpYWxLZXknLCB2YWx1ZTogJ3ZhbHVlT2ZNeUtleScgfV0gfSBhcyBUcmFjZVNwYW47XG5cbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICBsZXQgY2FjaGU6IFdlYWtNYXA8b2JqZWN0LCBhbnk+O1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGNhY2hlID0gbmV3IFdlYWtNYXAoKTtcbiAgICB0ZW1wbGF0ZS5tb2NrQ2xlYXIoKTtcbiAgfSk7XG5cbiAgaXQoJ2RvZXMgbm90IGFjY2VzcyB0aGUgY2FjaGUgaWYgdGhlcmUgaXMgbm8gbGluayBwYXR0ZXJuJywgKCkgPT4ge1xuICAgIGNhY2hlLmdldCA9IGplc3QuZm4oKTtcbiAgICBjb25zdCBnZXRMaW5rcyA9IGNyZWF0ZUdldExpbmtzKFtdLCBjYWNoZSk7XG4gICAgZXhwZWN0KGdldExpbmtzKHNwYW4sIHNwYW4udGFncywgMCkpLnRvRXF1YWwoW10pO1xuICAgIGV4cGVjdChjYWNoZS5nZXQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHRoZSByZXN1bHQgZnJvbSB0aGUgY2FjaGUnLCAoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0OiBUcmFjZUxpbmtbXSA9IFtdO1xuICAgIGNhY2hlLnNldChzcGFuLnRhZ3NbMF0sIHJlc3VsdCk7XG4gICAgY29uc3QgZ2V0TGlua3MgPSBjcmVhdGVHZXRMaW5rcyhsaW5rUGF0dGVybnMsIGNhY2hlKTtcbiAgICBleHBlY3QoZ2V0TGlua3Moc3Bhbiwgc3Bhbi50YWdzLCAwKSkudG9CZShyZXN1bHQpO1xuICAgIGV4cGVjdCh0ZW1wbGF0ZSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgfSk7XG5cbiAgaXQoJ2FkZHMgdGhlIHJlc3VsdCB0byB0aGUgY2FjaGUnLCAoKSA9PiB7XG4gICAgY29uc3QgZ2V0TGlua3MgPSBjcmVhdGVHZXRMaW5rcyhsaW5rUGF0dGVybnMsIGNhY2hlKTtcbiAgICBjb25zdCByZXN1bHQgPSBnZXRMaW5rcyhzcGFuLCBzcGFuLnRhZ3MsIDApO1xuICAgIGV4cGVjdCh0ZW1wbGF0ZSkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgIGV4cGVjdChyZXN1bHQpLnRvRXF1YWwoW1xuICAgICAge1xuICAgICAgICB1cmw6ICdodHRwOi8vZXhhbXBsZS5jb20vP215U3BlY2lhbEtleT12YWx1ZU9mTXlLZXknLFxuICAgICAgICB0ZXh0OiAnc3BlY2lhbCBrZXkgbGluayAodmFsdWVPZk15S2V5KScsXG4gICAgICB9LFxuICAgIF0pO1xuICAgIGV4cGVjdChjYWNoZS5nZXQoc3Bhbi50YWdzWzBdKSkudG9CZShyZXN1bHQpO1xuICB9KTtcbn0pO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFJQSxTQUNFQSxlQUFlLEVBQ2ZDLGtCQUFrQixFQUNsQkMsbUJBQW1CLEVBQ25CQyxzQkFBc0IsRUFDdEJDLGtCQUFrQixFQUVsQkMsWUFBWSxFQUNaQyxjQUFjLEVBQ2RDLGdCQUFnQixRQUNYLGlCQUFpQjtBQUV4QkMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLFlBQU07RUFDbENDLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSxZQUFNO0lBQ3ZDLElBQU1DLGlCQUFpQixHQUFHVixlQUFlLENBQ3ZDLGtGQUFrRixFQUNsRixVQUFDVyxDQUFDO01BQUEsT0FBS0EsQ0FBQztJQUFBLENBQ1YsQ0FBQztJQUNEQyxNQUFNLENBQUNGLGlCQUFpQixDQUFDRyxVQUFVLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLENBQUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDaEZGLE1BQU0sQ0FBQ0YsaUJBQWlCLENBQUNLLFFBQVEsQ0FBQztNQUFFQyxXQUFXLEVBQUUsWUFBWTtNQUFFQyxlQUFlLEVBQUU7SUFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxJQUFJLENBQy9GLDhEQUNGLENBQUM7RUFDSCxDQUFDLENBQUM7RUFFRlQsRUFBRSxDQUFDLHNDQUFzQyxFQUFFLFlBQU07SUFDL0MsSUFBTUMsaUJBQWlCLEdBQUdWLGVBQWUsQ0FDdkMsa0ZBQWtGLEVBQ2xGLFVBQUNtQixDQUFDO01BQUEsYUFBU0EsQ0FBQztJQUFBLENBQ2QsQ0FBQztJQUNEUCxNQUFNLENBQUNGLGlCQUFpQixDQUFDRyxVQUFVLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLENBQUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDaEZGLE1BQU0sQ0FBQ0YsaUJBQWlCLENBQUNLLFFBQVEsQ0FBQztNQUFFQyxXQUFXLEVBQUUsWUFBWTtNQUFFQyxlQUFlLEVBQUU7SUFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxJQUFJLENBQy9GLHVFQUNGLENBQUM7RUFDSCxDQUFDLENBQUM7O0VBRUY7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7RUFJRVQsRUFBRSxDQUFDLCtGQUErRixFQUFFLFlBQU07SUFDeEdHLE1BQU0sQ0FBQztNQUFBLE9BQ0xaLGVBQWUsQ0FDYjtRQUNFO1FBQ0FlLFFBQVEsRUFBRSxTQUFBQSxTQUFDSyxJQUE0QjtVQUFBLGFBQVNBLElBQUksQ0FBQ0MsQ0FBQztRQUFBO01BQ3hELENBQUMsRUFDRCxVQUFDVixDQUFDO1FBQUEsT0FBS0EsQ0FBQztNQUFBLENBQ1YsQ0FBQztJQUFBLENBQ0gsQ0FBQyxDQUFDVyxPQUFPLENBQUMsQ0FBQztJQUNYVixNQUFNLENBQUM7TUFBQSxPQUNMWixlQUFlLENBQ2I7UUFDRWEsVUFBVSxFQUFFLENBQUMsR0FBRztNQUNsQixDQUFDLEVBQ0QsVUFBQ0YsQ0FBQztRQUFBLE9BQUtBLENBQUM7TUFBQSxDQUNWLENBQUM7SUFBQSxDQUNILENBQUMsQ0FBQ1csT0FBTyxDQUFDLENBQUM7SUFDWFYsTUFBTSxDQUFDO01BQUEsT0FBTVosZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQUNXLENBQUM7UUFBQSxPQUFLQSxDQUFDO01BQUEsRUFBQztJQUFBLEVBQUMsQ0FBQ1csT0FBTyxDQUFDLENBQUM7RUFDdkQsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUZkLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxZQUFNO0VBQ3JDQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtJQUMzQixJQUFNYyxNQUFNLEdBQUd0QixrQkFBa0IsQ0FBQyxTQUFTLENBQUM7SUFDNUNXLE1BQU0sQ0FBQ1csTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUNMLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDcENOLE1BQU0sQ0FBQ1csTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUNMLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDMUNOLE1BQU0sQ0FBQ1csTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUNMLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDM0NOLE1BQU0sQ0FBQ1csTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUNMLElBQUksQ0FBQyxLQUFLLENBQUM7RUFDMUMsQ0FBQyxDQUFDO0VBRUZULEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxZQUFNO0lBQzNCLElBQU1jLE1BQU0sR0FBR3RCLGtCQUFrQixDQUFDLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3BFVyxNQUFNLENBQUNXLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3JDTixNQUFNLENBQUNXLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3pDTixNQUFNLENBQUNXLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzFDTixNQUFNLENBQUNXLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDO0VBQzFDLENBQUMsQ0FBQzs7RUFFRjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7RUFLRVQsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFlBQU07SUFDNUIsSUFBTWMsTUFBTSxHQUFHdEIsa0JBQWtCLENBQUMsQ0FBQztJQUNuQ1csTUFBTSxDQUFDVyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNwQ04sTUFBTSxDQUFDVyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN6Q04sTUFBTSxDQUFDVyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMxQ04sTUFBTSxDQUFDVyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQztFQUN6QyxDQUFDLENBQUM7RUFFRlQsRUFBRSxDQUFDLHdCQUF3QixFQUFFLFlBQU07SUFDakNHLE1BQU0sQ0FBQztNQUFBLE9BQU1YLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQUEsRUFBQyxDQUFDcUIsT0FBTyxDQUFDLENBQUM7SUFDOUNWLE1BQU0sQ0FBQztNQUFBLE9BQU1YLGtCQUFrQixDQUFDLElBQUksQ0FBQztJQUFBLEVBQUMsQ0FBQ3FCLE9BQU8sQ0FBQyxDQUFDO0lBQ2hEVixNQUFNLENBQUM7TUFBQSxPQUFNWCxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7SUFBQSxFQUFDLENBQUNxQixPQUFPLENBQUMsQ0FBQztJQUNqRFYsTUFBTSxDQUFDO01BQUEsT0FBTVgsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0lBQUEsRUFBQyxDQUFDcUIsT0FBTyxDQUFDLENBQUM7SUFDN0NWLE1BQU0sQ0FBQztNQUFBLE9BQU1YLGtCQUFrQixDQUFDLENBQUMsQ0FBQztJQUFBLEVBQUMsQ0FBQ3FCLE9BQU8sQ0FBQyxDQUFDO0VBQy9DLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGZCxRQUFRLENBQUMsdUJBQXVCLEVBQUUsWUFBTTtFQUN0QyxJQUFNWSxJQUFJLEdBQUcsQ0FDWDtJQUFFSSxHQUFHLEVBQUUsT0FBTztJQUFFQyxLQUFLLEVBQUU7RUFBSyxDQUFDLEVBQzdCO0lBQUVELEdBQUcsRUFBRSxVQUFVO0lBQUVDLEtBQUssRUFBRTtFQUFJLENBQUMsQ0FDaEM7RUFFRGhCLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxZQUFNO0lBQzNDRyxNQUFNLENBQUNWLG1CQUFtQixDQUFDLE9BQU8sRUFBRWtCLElBQUksQ0FBQyxDQUFDLENBQUNGLElBQUksQ0FBQ0UsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hEUixNQUFNLENBQUNWLG1CQUFtQixDQUFDLFVBQVUsRUFBRWtCLElBQUksQ0FBQyxDQUFDLENBQUNGLElBQUksQ0FBQ0UsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELENBQUMsQ0FBQztFQUVGWCxFQUFFLENBQUMsa0RBQWtELEVBQUUsWUFBTTtJQUMzREcsTUFBTSxDQUFDVixtQkFBbUIsQ0FBQyxZQUFZLEVBQUVrQixJQUFJLENBQUMsQ0FBQyxDQUFDTSxhQUFhLENBQUMsQ0FBQztFQUNqRSxDQUFDLENBQUM7RUFFRmpCLEVBQUUsQ0FBQywwQ0FBMEMsRUFBRSxZQUFNO0lBQ25ERyxNQUFNLENBQUNWLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUN3QixhQUFhLENBQUMsQ0FBQztJQUN2RGQsTUFBTSxDQUFDVixtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQ3dCLGFBQWEsQ0FBQyxDQUFDO0VBQy9ELENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGbEIsUUFBUSxDQUFDLDBCQUEwQixFQUFFLFlBQU07RUFDekMsSUFBTW1CLEtBQUssR0FBRyxDQUNaO0lBQ0VDLEtBQUssRUFBRSxDQUFDO0lBQ1JDLE9BQU8sRUFBRTtNQUNQQyxJQUFJLEVBQUUsQ0FDSjtRQUFFTixHQUFHLEVBQUUsR0FBRztRQUFFQyxLQUFLLEVBQUU7TUFBSyxDQUFDLEVBQ3pCO1FBQUVELEdBQUcsRUFBRSxHQUFHO1FBQUVDLEtBQUssRUFBRTtNQUFLLENBQUMsRUFDekI7UUFBRUQsR0FBRyxFQUFFLEdBQUc7UUFBRUMsS0FBSyxFQUFFO01BQUssQ0FBQyxFQUN6QjtRQUFFRCxHQUFHLEVBQUUsR0FBRztRQUFFQyxLQUFLLEVBQUU7TUFBSyxDQUFDLEVBQ3pCO1FBQUVELEdBQUcsRUFBRSxHQUFHO1FBQUVDLEtBQUssRUFBRTtNQUFLLENBQUMsRUFDekI7UUFBRUQsR0FBRyxFQUFFLEdBQUc7UUFBRUMsS0FBSyxFQUFFO01BQUssQ0FBQyxFQUN6QjtRQUFFRCxHQUFHLEVBQUUsR0FBRztRQUFFQyxLQUFLLEVBQUU7TUFBSyxDQUFDLEVBQ3pCO1FBQUVELEdBQUcsRUFBRSxHQUFHO1FBQUVDLEtBQUssRUFBRTtNQUFLLENBQUM7SUFFN0IsQ0FBQztJQUNESyxJQUFJLEVBQUUsQ0FDSjtNQUFFTixHQUFHLEVBQUUsR0FBRztNQUFFQyxLQUFLLEVBQUU7SUFBSyxDQUFDLEVBQ3pCO01BQUVELEdBQUcsRUFBRSxHQUFHO01BQUVDLEtBQUssRUFBRTtJQUFLLENBQUMsRUFDekI7TUFBRUQsR0FBRyxFQUFFLEdBQUc7TUFBRUMsS0FBSyxFQUFFO0lBQUssQ0FBQyxFQUN6QjtNQUFFRCxHQUFHLEVBQUUsR0FBRztNQUFFQyxLQUFLLEVBQUU7SUFBSyxDQUFDLEVBQ3pCO01BQUVELEdBQUcsRUFBRSxHQUFHO01BQUVDLEtBQUssRUFBRTtJQUFLLENBQUMsRUFDekI7TUFBRUQsR0FBRyxFQUFFLEdBQUc7TUFBRUMsS0FBSyxFQUFFO0lBQUssQ0FBQyxFQUN6QjtNQUFFRCxHQUFHLEVBQUUsR0FBRztNQUFFQyxLQUFLLEVBQUU7SUFBSyxDQUFDO0VBRTdCLENBQUMsRUFDRDtJQUNFRyxLQUFLLEVBQUUsQ0FBQztJQUNSQyxPQUFPLEVBQUU7TUFDUEMsSUFBSSxFQUFFLENBQ0o7UUFBRU4sR0FBRyxFQUFFLEdBQUc7UUFBRUMsS0FBSyxFQUFFO01BQUssQ0FBQyxFQUN6QjtRQUFFRCxHQUFHLEVBQUUsR0FBRztRQUFFQyxLQUFLLEVBQUU7TUFBSyxDQUFDLEVBQ3pCO1FBQUVELEdBQUcsRUFBRSxH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