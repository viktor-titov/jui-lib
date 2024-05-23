import _extends from "@babel/runtime/helpers/extends";
// Copyright (c) 2018 Uber Technologies, Inc.
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

import spanAncestorIdsSpy from './span-ancestor-ids';
describe('spanAncestorIdsSpy', function () {
  var ownSpanID = 'ownSpanID';
  var firstParentSpanID = 'firstParentSpanID';
  var firstParentFirstGrandparentSpanID = 'firstParentFirstGrandparentSpanID';
  var firstParentSecondGrandparentSpanID = 'firstParentSecondGrandparentSpanID';
  var secondParentSpanID = 'secondParentSpanID';
  var rootSpanID = 'rootSpanID';
  var span = {
    references: [{
      span: {
        spanID: firstParentSpanID,
        references: [{
          span: {
            spanID: firstParentFirstGrandparentSpanID,
            references: [{
              span: {
                spanID: rootSpanID
              }
            }]
          },
          refType: 'not an ancestor ref type'
        }, {
          span: {
            spanID: firstParentSecondGrandparentSpanID,
            references: [{
              span: {
                spanID: rootSpanID
              },
              refType: 'FOLLOWS_FROM'
            }]
          },
          refType: 'CHILD_OF'
        }]
      },
      refType: 'CHILD_OF'
    }, {
      span: {
        spanID: secondParentSpanID
      },
      refType: 'CHILD_OF'
    }],
    spanID: ownSpanID
  };
  var expectedAncestorIds = [firstParentSpanID, firstParentSecondGrandparentSpanID, rootSpanID];
  it('returns an empty array if given falsy span', function () {
    expect(spanAncestorIdsSpy(null)).toEqual([]);
  });
  it('returns an empty array if span has no references', function () {
    var spanWithoutReferences = {
      spanID: 'parentlessSpanID',
      references: []
    };
    expect(spanAncestorIdsSpy(spanWithoutReferences)).toEqual([]);
  });
  it('returns all unique spanIDs from first valid CHILD_OF or FOLLOWS_FROM reference up to the root span', function () {
    expect(spanAncestorIdsSpy(span)).toEqual(expectedAncestorIds);
  });
  it('ignores references without a span', function () {
    var spanWithSomeEmptyReferences = _extends({}, span, {
      references: [{
        refType: 'CHILD_OF'
      }, {
        refType: 'FOLLOWS_FROM',
        span: {}
      }].concat(span.references)
    });
    expect(spanAncestorIdsSpy(spanWithSomeEmptyReferences)).toEqual(expectedAncestorIds);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzcGFuQW5jZXN0b3JJZHNTcHkiLCJkZXNjcmliZSIsIm93blNwYW5JRCIsImZpcnN0UGFyZW50U3BhbklEIiwiZmlyc3RQYXJlbnRGaXJzdEdyYW5kcGFyZW50U3BhbklEIiwiZmlyc3RQYXJlbnRTZWNvbmRHcmFuZHBhcmVudFNwYW5JRCIsInNlY29uZFBhcmVudFNwYW5JRCIsInJvb3RTcGFuSUQiLCJzcGFuIiwicmVmZXJlbmNlcyIsInNwYW5JRCIsInJlZlR5cGUiLCJleHBlY3RlZEFuY2VzdG9ySWRzIiwiaXQiLCJleHBlY3QiLCJ0b0VxdWFsIiwic3BhbldpdGhvdXRSZWZlcmVuY2VzIiwic3BhbldpdGhTb21lRW1wdHlSZWZlcmVuY2VzIiwiX2V4dGVuZHMiLCJjb25jYXQiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvc3Bhbi1hbmNlc3Rvci1pZHMudGVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgVHJhY2VTcGFuIH0gZnJvbSAnLi4vdHlwZXMvdHJhY2UnO1xuXG5pbXBvcnQgc3BhbkFuY2VzdG9ySWRzU3B5IGZyb20gJy4vc3Bhbi1hbmNlc3Rvci1pZHMnO1xuXG5kZXNjcmliZSgnc3BhbkFuY2VzdG9ySWRzU3B5JywgKCkgPT4ge1xuICBjb25zdCBvd25TcGFuSUQgPSAnb3duU3BhbklEJztcbiAgY29uc3QgZmlyc3RQYXJlbnRTcGFuSUQgPSAnZmlyc3RQYXJlbnRTcGFuSUQnO1xuICBjb25zdCBmaXJzdFBhcmVudEZpcnN0R3JhbmRwYXJlbnRTcGFuSUQgPSAnZmlyc3RQYXJlbnRGaXJzdEdyYW5kcGFyZW50U3BhbklEJztcbiAgY29uc3QgZmlyc3RQYXJlbnRTZWNvbmRHcmFuZHBhcmVudFNwYW5JRCA9ICdmaXJzdFBhcmVudFNlY29uZEdyYW5kcGFyZW50U3BhbklEJztcbiAgY29uc3Qgc2Vjb25kUGFyZW50U3BhbklEID0gJ3NlY29uZFBhcmVudFNwYW5JRCc7XG4gIGNvbnN0IHJvb3RTcGFuSUQgPSAncm9vdFNwYW5JRCc7XG4gIGNvbnN0IHNwYW4gPSB7XG4gICAgcmVmZXJlbmNlczogW1xuICAgICAge1xuICAgICAgICBzcGFuOiB7XG4gICAgICAgICAgc3BhbklEOiBmaXJzdFBhcmVudFNwYW5JRCxcbiAgICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNwYW46IHtcbiAgICAgICAgICAgICAgICBzcGFuSUQ6IGZpcnN0UGFyZW50Rmlyc3RHcmFuZHBhcmVudFNwYW5JRCxcbiAgICAgICAgICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNwYW46IHtcbiAgICAgICAgICAgICAgICAgICAgICBzcGFuSUQ6IHJvb3RTcGFuSUQsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHJlZlR5cGU6ICdub3QgYW4gYW5jZXN0b3IgcmVmIHR5cGUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3Bhbjoge1xuICAgICAgICAgICAgICAgIHNwYW5JRDogZmlyc3RQYXJlbnRTZWNvbmRHcmFuZHBhcmVudFNwYW5JRCxcbiAgICAgICAgICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNwYW46IHtcbiAgICAgICAgICAgICAgICAgICAgICBzcGFuSUQ6IHJvb3RTcGFuSUQsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlZlR5cGU6ICdGT0xMT1dTX0ZST00nLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICByZWZUeXBlOiAnQ0hJTERfT0YnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICByZWZUeXBlOiAnQ0hJTERfT0YnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3Bhbjoge1xuICAgICAgICAgIHNwYW5JRDogc2Vjb25kUGFyZW50U3BhbklELFxuICAgICAgICB9LFxuICAgICAgICByZWZUeXBlOiAnQ0hJTERfT0YnLFxuICAgICAgfSxcbiAgICBdLFxuICAgIHNwYW5JRDogb3duU3BhbklELFxuICB9O1xuICBjb25zdCBleHBlY3RlZEFuY2VzdG9ySWRzID0gW2ZpcnN0UGFyZW50U3BhbklELCBmaXJzdFBhcmVudFNlY29uZEdyYW5kcGFyZW50U3BhbklELCByb290U3BhbklEXTtcblxuICBpdCgncmV0dXJucyBhbiBlbXB0eSBhcnJheSBpZiBnaXZlbiBmYWxzeSBzcGFuJywgKCkgPT4ge1xuICAgIGV4cGVjdChzcGFuQW5jZXN0b3JJZHNTcHkobnVsbCkpLnRvRXF1YWwoW10pO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBhbiBlbXB0eSBhcnJheSBpZiBzcGFuIGhhcyBubyByZWZlcmVuY2VzJywgKCkgPT4ge1xuICAgIGNvbnN0IHNwYW5XaXRob3V0UmVmZXJlbmNlcyA9IHtcbiAgICAgIHNwYW5JRDogJ3BhcmVudGxlc3NTcGFuSUQnLFxuICAgICAgcmVmZXJlbmNlczogW10sXG4gICAgfTtcblxuICAgIGV4cGVjdChzcGFuQW5jZXN0b3JJZHNTcHkoc3BhbldpdGhvdXRSZWZlcmVuY2VzIGFzIHVua25vd24gYXMgVHJhY2VTcGFuKSkudG9FcXVhbChbXSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGFsbCB1bmlxdWUgc3BhbklEcyBmcm9tIGZpcnN0IHZhbGlkIENISUxEX09GIG9yIEZPTExPV1NfRlJPTSByZWZlcmVuY2UgdXAgdG8gdGhlIHJvb3Qgc3BhbicsICgpID0+IHtcbiAgICBleHBlY3Qoc3BhbkFuY2VzdG9ySWRzU3B5KHNwYW4gYXMgVHJhY2VTcGFuKSkudG9FcXVhbChleHBlY3RlZEFuY2VzdG9ySWRzKTtcbiAgfSk7XG5cbiAgaXQoJ2lnbm9yZXMgcmVmZXJlbmNlcyB3aXRob3V0IGEgc3BhbicsICgpID0+IHtcbiAgICBjb25zdCBzcGFuV2l0aFNvbWVFbXB0eVJlZmVyZW5jZXMgPSB7XG4gICAgICAuLi5zcGFuLFxuICAgICAgcmVmZXJlbmNlczogW3sgcmVmVHlwZTogJ0NISUxEX09GJyB9LCB7IHJlZlR5cGU6ICdGT0xMT1dTX0ZST00nLCBzcGFuOiB7fSB9LCAuLi5zcGFuLnJlZmVyZW5jZXNdLFxuICAgIH07XG4gICAgZXhwZWN0KHNwYW5BbmNlc3Rvcklkc1NweShzcGFuV2l0aFNvbWVFbXB0eVJlZmVyZW5jZXMgYXMgVHJhY2VTcGFuKSkudG9FcXVhbChleHBlY3RlZEFuY2VzdG9ySWRzKTtcbiAgfSk7XG59KTtcbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUlBLE9BQU9BLGtCQUFrQixNQUFNLHFCQUFxQjtBQUVwREMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLFlBQU07RUFDbkMsSUFBTUMsU0FBUyxHQUFHLFdBQVc7RUFDN0IsSUFBTUMsaUJBQWlCLEdBQUcsbUJBQW1CO0VBQzdDLElBQU1DLGlDQUFpQyxHQUFHLG1DQUFtQztFQUM3RSxJQUFNQyxrQ0FBa0MsR0FBRyxvQ0FBb0M7RUFDL0UsSUFBTUMsa0JBQWtCLEdBQUcsb0JBQW9CO0VBQy9DLElBQU1DLFVBQVUsR0FBRyxZQUFZO0VBQy9CLElBQU1DLElBQUksR0FBRztJQUNYQyxVQUFVLEVBQUUsQ0FDVjtNQUNFRCxJQUFJLEVBQUU7UUFDSkUsTUFBTSxFQUFFUCxpQkFBaUI7UUFDekJNLFVBQVUsRUFBRSxDQUNWO1VBQ0VELElBQUksRUFBRTtZQUNKRSxNQUFNLEVBQUVOLGlDQUFpQztZQUN6Q0ssVUFBVSxFQUFFLENBQ1Y7Y0FDRUQsSUFBSSxFQUFFO2dCQUNKRSxNQUFNLEVBQUVIO2NBQ1Y7WUFDRixDQUFDO1VBRUwsQ0FBQztVQUNESSxPQUFPLEVBQUU7UUFDWCxDQUFDLEVBQ0Q7VUFDRUgsSUFBSSxFQUFFO1lBQ0pFLE1BQU0sRUFBRUwsa0NBQWtDO1lBQzFDSSxVQUFVLEVBQUUsQ0FDVjtjQUNFRCxJQUFJLEVBQUU7Z0JBQ0pFLE1BQU0sRUFBRUg7Y0FDVixDQUFDO2NBQ0RJLE9BQU8sRUFBRTtZQUNYLENBQUM7VUFFTCxDQUFDO1VBQ0RBLE9BQU8sRUFBRTtRQUNYLENBQUM7TUFFTCxDQUFDO01BQ0RBLE9BQU8sRUFBRTtJQUNYLENBQUMsRUFDRDtNQUNFSCxJQUFJLEVBQUU7UUFDSkUsTUFBTSxFQUFFSjtNQUNWLENBQUM7TUFDREssT0FBTyxFQUFFO0lBQ1gsQ0FBQyxDQUNGO0lBQ0RELE1BQU0sRUFBRVI7RUFDVixDQUFDO0VBQ0QsSUFBTVUsbUJBQW1CLEdBQUcsQ0FBQ1QsaUJBQWlCLEVBQUVFLGtDQUFrQyxFQUFFRSxVQUFVLENBQUM7RUFFL0ZNLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxZQUFNO0lBQ3JEQyxNQUFNLENBQUNkLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUNlLE9BQU8sQ0FBQyxFQUFFLENBQUM7RUFDOUMsQ0FBQyxDQUFDO0VBRUZGLEVBQUUsQ0FBQyxrREFBa0QsRUFBRSxZQUFNO0lBQzNELElBQU1HLHFCQUFxQixHQUFHO01BQzVCTixNQUFNLEVBQUUsa0JBQWtCO01BQzFCRCxVQUFVLEVBQUU7SUFDZCxDQUFDO0lBRURLLE1BQU0sQ0FBQ2Qsa0JBQWtCLENBQUNnQixxQkFBNkMsQ0FBQyxDQUFDLENBQUNELE9BQU8sQ0FBQyxFQUFFLENBQUM7RUFDdkYsQ0FBQyxDQUFDO0VBRUZGLEVBQUUsQ0FBQyxvR0FBb0csRUFBRSxZQUFNO0lBQzdHQyxNQUFNLENBQUNkLGtCQUFrQixDQUFDUSxJQUFpQixDQUFDLENBQUMsQ0FBQ08sT0FBTyxDQUFDSCxtQkFBbUIsQ0FBQztFQUM1RSxDQUFDLENBQUM7RUFFRkMsRUFBRSxDQUFDLG1DQUFtQyxFQUFFLFlBQU07SUFDNUMsSUFBTUksMkJBQTJCLEdBQUFDLFFBQUEsS0FDNUJWLElBQUk7TUFDUEMsVUFBVSxHQUFHO1FBQUVFLE9BQU8sRUFBRTtNQUFXLENBQUMsRUFBRTtRQUFFQSxPQUFPLEVBQUUsY0FBYztRQUFFSCxJQUFJLEVBQUUsQ0FBQztNQUFFLENBQUMsRUFBQVcsTUFBQSxDQUFLWCxJQUFJLENBQUNDLFVBQVU7SUFBQyxFQUNqRztJQUNESyxNQUFNLENBQUNkLGtCQUFrQixDQUFDaUIsMkJBQXdDLENBQUMsQ0FBQyxDQUFDRixPQUFPLENBQUNILG1CQUFtQixDQUFDO0VBQ25HLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyIsImlnbm9yZUxpc3QiOltdfQ==