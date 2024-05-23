import _extends from "@babel/runtime/helpers/extends";
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

import { render, screen } from '@testing-library/react';
import React from 'react';
import AccordianKeyValues, { KeyValuesSummary } from './AccordianKeyValues';
import { jsx as _jsx } from "react/jsx-runtime";
var tags = [{
  key: 'span.kind',
  value: 'client'
}, {
  key: 'omg',
  value: 'mos-def'
}];
var setupAccordian = function setupAccordian(propOverrides) {
  var props = _extends({
    compact: false,
    data: tags,
    isOpen: true,
    label: 'test accordian',
    onToggle: jest.fn()
  }, propOverrides);
  return render( /*#__PURE__*/_jsx(AccordianKeyValues, _extends({}, props)));
};
var setupKeyValues = function setupKeyValues(propOverrides) {
  var props = _extends({
    data: tags
  }, propOverrides);
  return render( /*#__PURE__*/_jsx(KeyValuesSummary, _extends({}, props)));
};
describe('KeyValuesSummary tests', function () {
  it('renders without exploding', function () {
    expect(function () {
      return setupKeyValues();
    }).not.toThrow();
  });
  it('returns `null` when props.data is empty', function () {
    setupKeyValues({
      data: null
    });
    expect(screen.queryAllByRole('table')).toHaveLength(0);
    expect(screen.queryAllByRole('row')).toHaveLength(0);
    expect(screen.queryAllByRole('cell')).toHaveLength(0);
  });
  it('generates a list from `data` with the correct content', function () {
    setupKeyValues();
    expect(screen.queryAllByRole('listitem')).toHaveLength(2);
  });
  it('renders the data as text', function () {
    setupKeyValues();
    expect(screen.getByText(/^span.kind$/)).toBeInTheDocument();
    expect(screen.getByText(/^client$/)).toBeInTheDocument();
    expect(screen.getByText(/^omg$/)).toBeInTheDocument();
    expect(screen.getByText(/^mos-def$/)).toBeInTheDocument();
  });
});
describe('AccordianKeyValues test', function () {
  it('renders without exploding', function () {
    expect(function () {
      return setupAccordian();
    }).not.toThrow();
  });
  it('renders the label', function () {
    setupAccordian();
    expect(screen.getByTestId('AccordianKeyValues--header')).toBeInTheDocument();
  });
  it('renders table correctly when passed data & is open ', function () {
    setupAccordian();
    expect(screen.getByRole('switch', {
      name: 'test accordian'
    })).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('row', {
      name: 'span.kind "client"'
    })).toBeInTheDocument();
    expect(screen.getByRole('cell', {
      name: 'span.kind'
    })).toBeInTheDocument();
    expect(screen.getByRole('cell', {
      name: '"client"'
    })).toBeInTheDocument();
    expect(screen.getByRole('cell', {
      name: 'omg'
    })).toBeInTheDocument();
    expect(screen.getByRole('cell', {
      name: '"mos-def"'
    })).toBeInTheDocument();
  });
  it('renders the summary instead of the table when it is not expanded', function () {
    setupAccordian({
      isOpen: false
    });
    expect(screen.getByRole('switch', {
      name: 'test accordian: span.kind = client omg = mos-def'
    })).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryAllByRole('cell')).toHaveLength(0);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJSZWFjdCIsIkFjY29yZGlhbktleVZhbHVlcyIsIktleVZhbHVlc1N1bW1hcnkiLCJqc3giLCJfanN4IiwidGFncyIsImtleSIsInZhbHVlIiwic2V0dXBBY2NvcmRpYW4iLCJwcm9wT3ZlcnJpZGVzIiwicHJvcHMiLCJfZXh0ZW5kcyIsImNvbXBhY3QiLCJkYXRhIiwiaXNPcGVuIiwibGFiZWwiLCJvblRvZ2dsZSIsImplc3QiLCJmbiIsInNldHVwS2V5VmFsdWVzIiwiZGVzY3JpYmUiLCJpdCIsImV4cGVjdCIsIm5vdCIsInRvVGhyb3ciLCJxdWVyeUFsbEJ5Um9sZSIsInRvSGF2ZUxlbmd0aCIsImdldEJ5VGV4dCIsInRvQmVJblRoZURvY3VtZW50IiwiZ2V0QnlUZXN0SWQiLCJnZXRCeVJvbGUiLCJuYW1lIiwicXVlcnlCeVJvbGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL1RyYWNlVGltZWxpbmVWaWV3ZXIvU3BhbkRldGFpbC9BY2NvcmRpYW5LZXlWYWx1ZXMudGVzdC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IHJlbmRlciwgc2NyZWVuIH0gZnJvbSAnQHRlc3RpbmctbGlicmFyeS9yZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgQWNjb3JkaWFuS2V5VmFsdWVzLCB7IEtleVZhbHVlc1N1bW1hcnksIEFjY29yZGlhbktleVZhbHVlc1Byb3BzIH0gZnJvbSAnLi9BY2NvcmRpYW5LZXlWYWx1ZXMnO1xuXG5jb25zdCB0YWdzID0gW1xuICB7IGtleTogJ3NwYW4ua2luZCcsIHZhbHVlOiAnY2xpZW50JyB9LFxuICB7IGtleTogJ29tZycsIHZhbHVlOiAnbW9zLWRlZicgfSxcbl07XG5cbmNvbnN0IHNldHVwQWNjb3JkaWFuID0gKHByb3BPdmVycmlkZXM/OiBBY2NvcmRpYW5LZXlWYWx1ZXNQcm9wcykgPT4ge1xuICBjb25zdCBwcm9wcyA9IHtcbiAgICBjb21wYWN0OiBmYWxzZSxcbiAgICBkYXRhOiB0YWdzLFxuICAgIGlzT3BlbjogdHJ1ZSxcbiAgICBsYWJlbDogJ3Rlc3QgYWNjb3JkaWFuJyxcbiAgICBvblRvZ2dsZTogamVzdC5mbigpLFxuICAgIC4uLnByb3BPdmVycmlkZXMsXG4gIH07XG4gIHJldHVybiByZW5kZXIoPEFjY29yZGlhbktleVZhbHVlcyB7Li4uKHByb3BzIGFzIEFjY29yZGlhbktleVZhbHVlc1Byb3BzKX0gLz4pO1xufTtcblxuY29uc3Qgc2V0dXBLZXlWYWx1ZXMgPSAocHJvcE92ZXJyaWRlcz86IEFjY29yZGlhbktleVZhbHVlc1Byb3BzKSA9PiB7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGRhdGE6IHRhZ3MsXG4gICAgLi4ucHJvcE92ZXJyaWRlcyxcbiAgfTtcbiAgcmV0dXJuIHJlbmRlcig8S2V5VmFsdWVzU3VtbWFyeSB7Li4ucHJvcHN9IC8+KTtcbn07XG5cbmRlc2NyaWJlKCdLZXlWYWx1ZXNTdW1tYXJ5IHRlc3RzJywgKCkgPT4ge1xuICBpdCgncmVuZGVycyB3aXRob3V0IGV4cGxvZGluZycsICgpID0+IHtcbiAgICBleHBlY3QoKCkgPT4gc2V0dXBLZXlWYWx1ZXMoKSkubm90LnRvVGhyb3coKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgYG51bGxgIHdoZW4gcHJvcHMuZGF0YSBpcyBlbXB0eScsICgpID0+IHtcbiAgICBzZXR1cEtleVZhbHVlcyh7IGRhdGE6IG51bGwgfSBhcyB1bmtub3duIGFzIEFjY29yZGlhbktleVZhbHVlc1Byb3BzKTtcblxuICAgIGV4cGVjdChzY3JlZW4ucXVlcnlBbGxCeVJvbGUoJ3RhYmxlJykpLnRvSGF2ZUxlbmd0aCgwKTtcbiAgICBleHBlY3Qoc2NyZWVuLnF1ZXJ5QWxsQnlSb2xlKCdyb3cnKSkudG9IYXZlTGVuZ3RoKDApO1xuICAgIGV4cGVjdChzY3JlZW4ucXVlcnlBbGxCeVJvbGUoJ2NlbGwnKSkudG9IYXZlTGVuZ3RoKDApO1xuICB9KTtcblxuICBpdCgnZ2VuZXJhdGVzIGEgbGlzdCBmcm9tIGBkYXRhYCB3aXRoIHRoZSBjb3JyZWN0IGNvbnRlbnQnLCAoKSA9PiB7XG4gICAgc2V0dXBLZXlWYWx1ZXMoKTtcblxuICAgIGV4cGVjdChzY3JlZW4ucXVlcnlBbGxCeVJvbGUoJ2xpc3RpdGVtJykpLnRvSGF2ZUxlbmd0aCgyKTtcbiAgfSk7XG5cbiAgaXQoJ3JlbmRlcnMgdGhlIGRhdGEgYXMgdGV4dCcsICgpID0+IHtcbiAgICBzZXR1cEtleVZhbHVlcygpO1xuXG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRleHQoL15zcGFuLmtpbmQkLykpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRleHQoL15jbGllbnQkLykpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRleHQoL15vbWckLykpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRleHQoL15tb3MtZGVmJC8pKS50b0JlSW5UaGVEb2N1bWVudCgpO1xuICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnQWNjb3JkaWFuS2V5VmFsdWVzIHRlc3QnLCAoKSA9PiB7XG4gIGl0KCdyZW5kZXJzIHdpdGhvdXQgZXhwbG9kaW5nJywgKCkgPT4ge1xuICAgIGV4cGVjdCgoKSA9PiBzZXR1cEFjY29yZGlhbigpKS5ub3QudG9UaHJvdygpO1xuICB9KTtcblxuICBpdCgncmVuZGVycyB0aGUgbGFiZWwnLCAoKSA9PiB7XG4gICAgc2V0dXBBY2NvcmRpYW4oKTtcblxuICAgIGV4cGVjdChzY3JlZW4uZ2V0QnlUZXN0SWQoJ0FjY29yZGlhbktleVZhbHVlcy0taGVhZGVyJykpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gIH0pO1xuXG4gIGl0KCdyZW5kZXJzIHRhYmxlIGNvcnJlY3RseSB3aGVuIHBhc3NlZCBkYXRhICYgaXMgb3BlbiAnLCAoKSA9PiB7XG4gICAgc2V0dXBBY2NvcmRpYW4oKTtcblxuICAgIGV4cGVjdChzY3JlZW4uZ2V0QnlSb2xlKCdzd2l0Y2gnLCB7IG5hbWU6ICd0ZXN0IGFjY29yZGlhbicgfSkpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVJvbGUoJ3RhYmxlJykpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVJvbGUoJ3JvdycsIHsgbmFtZTogJ3NwYW4ua2luZCBcImNsaWVudFwiJyB9KSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgICBleHBlY3Qoc2NyZWVuLmdldEJ5Um9sZSgnY2VsbCcsIHsgbmFtZTogJ3NwYW4ua2luZCcgfSkpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVJvbGUoJ2NlbGwnLCB7IG5hbWU6ICdcImNsaWVudFwiJyB9KSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgICBleHBlY3Qoc2NyZWVuLmdldEJ5Um9sZSgnY2VsbCcsIHsgbmFtZTogJ29tZycgfSkpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVJvbGUoJ2NlbGwnLCB7IG5hbWU6ICdcIm1vcy1kZWZcIicgfSkpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gIH0pO1xuXG4gIGl0KCdyZW5kZXJzIHRoZSBzdW1tYXJ5IGluc3RlYWQgb2YgdGhlIHRhYmxlIHdoZW4gaXQgaXMgbm90IGV4cGFuZGVkJywgKCkgPT4ge1xuICAgIHNldHVwQWNjb3JkaWFuKHsgaXNPcGVuOiBmYWxzZSB9IGFzIEFjY29yZGlhbktleVZhbHVlc1Byb3BzKTtcblxuICAgIGV4cGVjdChcbiAgICAgIHNjcmVlbi5nZXRCeVJvbGUoJ3N3aXRjaCcsIHsgbmFtZTogJ3Rlc3QgYWNjb3JkaWFuOiBzcGFuLmtpbmQgPSBjbGllbnQgb21nID0gbW9zLWRlZicgfSlcbiAgICApLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KHNjcmVlbi5xdWVyeUJ5Um9sZSgndGFibGUnKSkubm90LnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KHNjcmVlbi5xdWVyeUFsbEJ5Um9sZSgnY2VsbCcpKS50b0hhdmVMZW5ndGgoMCk7XG4gIH0pO1xufSk7XG4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxNQUFNLEVBQUVDLE1BQU0sUUFBUSx3QkFBd0I7QUFDdkQsT0FBT0MsS0FBSyxNQUFNLE9BQU87QUFFekIsT0FBT0Msa0JBQWtCLElBQUlDLGdCQUFnQixRQUFpQyxzQkFBc0I7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