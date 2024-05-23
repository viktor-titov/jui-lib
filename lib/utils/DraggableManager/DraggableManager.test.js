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

import DraggableManager from './DraggableManager';
import EUpdateTypes from './EUpdateTypes';
describe('DraggableManager', function () {
  var baseClientX = 100;
  // left button mouse events have `.button === 0`
  var baseMouseEvt = {
    button: 0,
    clientX: baseClientX
  };
  var tag = 'some-tag';
  var bounds;
  var getBounds;
  var ctorOpts;
  var instance;
  function startDragging(dragManager) {
    dragManager.handleMouseDown(_extends({}, baseMouseEvt, {
      type: 'mousedown'
    }));
    expect(dragManager.isDragging()).toBe(true);
  }
  beforeEach(function () {
    bounds = {
      clientXLeft: 50,
      maxValue: 0.9,
      minValue: 0.1,
      width: 100
    };
    getBounds = jest.fn(function () {
      return bounds;
    });
    ctorOpts = {
      getBounds: getBounds,
      tag: tag,
      onMouseEnter: jest.fn(),
      onMouseLeave: jest.fn(),
      onMouseMove: jest.fn(),
      onDragStart: jest.fn(),
      onDragMove: jest.fn(),
      onDragEnd: jest.fn(),
      resetBoundsOnResize: false
    };
    instance = new DraggableManager(ctorOpts);
  });
  describe('_getPosition()', function () {
    it('invokes the getBounds ctor argument', function () {
      instance._getPosition(0);
      expect(jest.mocked(ctorOpts.getBounds).mock.calls).toEqual([[tag]]);
    });
    it('converts clientX to x and [0, 1] value', function () {
      var left = 100;
      var pos = instance._getPosition(left);
      expect(pos).toEqual({
        x: left - bounds.clientXLeft,
        value: (left - bounds.clientXLeft) / bounds.width
      });
    });
    it('clamps x and [0, 1] value based on getBounds().minValue', function () {
      var left = 0;
      var pos = instance._getPosition(left);
      expect(pos).toEqual({
        x: bounds.minValue * bounds.width,
        value: bounds.minValue
      });
    });
    it('clamps x and [0, 1] value based on getBounds().maxValue', function () {
      var left = 10000;
      var pos = instance._getPosition(left);
      expect(pos).toEqual({
        x: bounds.maxValue * bounds.width,
        value: bounds.maxValue
      });
    });
  });
  describe('window resize event listener', function () {
    it('is added in the ctor iff `resetBoundsOnResize` param is truthy', function () {
      var oldFn = window.addEventListener;
      window.addEventListener = jest.fn();
      ctorOpts.resetBoundsOnResize = false;
      instance = new DraggableManager(ctorOpts);
      expect(jest.mocked(window.addEventListener).mock.calls).toEqual([]);
      ctorOpts.resetBoundsOnResize = true;
      instance = new DraggableManager(ctorOpts);
      expect(jest.mocked(window.addEventListener).mock.calls).toEqual([['resize', expect.any(Function)]]);
      window.addEventListener = oldFn;
    });
    it('is removed in `.dispose()` iff `resetBoundsOnResize` param is truthy', function () {
      var oldFn = window.removeEventListener;
      window.removeEventListener = jest.fn();
      ctorOpts.resetBoundsOnResize = false;
      instance = new DraggableManager(ctorOpts);
      instance.dispose();
      expect(jest.mocked(window.removeEventListener).mock.calls).toEqual([]);
      ctorOpts.resetBoundsOnResize = true;
      instance = new DraggableManager(ctorOpts);
      instance.dispose();
      expect(jest.mocked(window.removeEventListener).mock.calls).toEqual([['resize', expect.any(Function)]]);
      window.removeEventListener = oldFn;
    });
  });
  describe('minor mouse events', function () {
    it('throws an error for invalid event types', function () {
      var type = 'invalid-event-type';
      var throwers = [function () {
        return instance.handleMouseEnter(_extends({}, baseMouseEvt, {
          type: type
        }));
      }, function () {
        return instance.handleMouseMove(_extends({}, baseMouseEvt, {
          type: type
        }));
      }, function () {
        return instance.handleMouseLeave(_extends({}, baseMouseEvt, {
          type: type
        }));
      }];
      throwers.forEach(function (thrower) {
        return expect(thrower).toThrow();
      });
    });
    it('does nothing if already dragging', function () {
      startDragging(instance);
      expect(getBounds.mock.calls.length).toBe(1);
      instance.handleMouseEnter(_extends({}, baseMouseEvt, {
        type: 'mouseenter'
      }));
      instance.handleMouseMove(_extends({}, baseMouseEvt, {
        type: 'mousemove'
      }));
      instance.handleMouseLeave(_extends({}, baseMouseEvt, {
        type: 'mouseleave'
      }));
      expect(ctorOpts.onMouseEnter).not.toHaveBeenCalled();
      expect(ctorOpts.onMouseMove).not.toHaveBeenCalled();
      expect(ctorOpts.onMouseLeave).not.toHaveBeenCalled();
      var evt = _extends({}, baseMouseEvt, {
        type: 'invalid-type'
      });
      expect(function () {
        return instance.handleMouseEnter(evt);
      }).not.toThrow();
      expect(getBounds.mock.calls.length).toBe(1);
    });
    it('passes data based on the mouse event type to callbacks', function () {
      var x = baseClientX - bounds.clientXLeft;
      var value = (baseClientX - bounds.clientXLeft) / bounds.width;
      var cases = [{
        type: 'mouseenter',
        handler: instance.handleMouseEnter,
        callback: ctorOpts.onMouseEnter,
        updateType: EUpdateTypes.MouseEnter
      }, {
        type: 'mousemove',
        handler: instance.handleMouseMove,
        callback: ctorOpts.onMouseMove,
        updateType: EUpdateTypes.MouseMove
      }, {
        type: 'mouseleave',
        handler: instance.handleMouseLeave,
        callback: ctorOpts.onMouseLeave,
        updateType: EUpdateTypes.MouseLeave
      }];
      cases.forEach(function (testCase) {
        var _jest$mocked;
        var type = testCase.type,
          handler = testCase.handler,
          callback = testCase.callback,
          updateType = testCase.updateType;
        var event = _extends({}, baseMouseEvt, {
          type: type
        });
        handler(event);
        expect((_jest$mocked = jest.mocked(callback)) == null ? void 0 : _jest$mocked.mock.calls).toEqual([[{
          event: event,
          tag: tag,
          value: value,
          x: x,
          manager: instance,
          type: updateType
        }]]);
      });
    });
  });
  describe('drag events', function () {
    var realWindowAddEvent;
    var realWindowRmEvent;
    beforeEach(function () {
      realWindowAddEvent = window.addEventListener;
      realWindowRmEvent = window.removeEventListener;
      window.addEventListener = jest.fn();
      window.removeEventListener = jest.fn();
    });
    afterEach(function () {
      window.addEventListener = realWindowAddEvent;
      window.removeEventListener = realWindowRmEvent;
    });
    it('throws an error for invalid event types', function () {
      expect(function () {
        return instance.handleMouseDown(_extends({}, baseMouseEvt, {
          type: 'invalid-event-type'
        }));
      }).toThrow();
    });
    describe('mousedown', function () {
      it('is ignored if already dragging', function () {
        var _jest$mocked2;
        startDragging(instance);
        jest.mocked(window.addEventListener).mockReset();
        (_jest$mocked2 = jest.mocked(ctorOpts.onDragStart)) == null || _jest$mocked2.mockReset();
        expect(getBounds.mock.calls.length).toBe(1);
        instance.handleMouseDown(_extends({}, baseMouseEvt, {
          type: 'mousedown'
        }));
        expect(getBounds.mock.calls.length).toBe(1);
        expect(window.addEventListener).not.toHaveBeenCalled();
        expect(ctorOpts.onDragStart).not.toHaveBeenCalled();
      });
      it('sets `isDragging()` to true', function () {
        instance.handleMouseDown(_extends({}, baseMouseEvt, {
          type: 'mousedown'
        }));
        expect(instance.isDragging()).toBe(true);
      });
      it('adds the window mouse listener events', function () {
        instance.handleMouseDown(_extends({}, baseMouseEvt, {
          type: 'mousedown'
        }));
        expect(jest.mocked(window.addEventListener).mock.calls).toEqual([['mousemove', expect.any(Function)], ['mouseup', expect.any(Function)]]);
      });
    });
    describe('mousemove', function () {
      it('is ignored if not already dragging', function () {
        instance._handleDragEvent(_extends({}, baseMouseEvt, {
          type: 'mousemove'
        }));
        expect(ctorOpts.onDragMove).not.toHaveBeenCalled();
        startDragging(instance);
        instance._handleDragEvent(_extends({}, baseMouseEvt, {
          type: 'mousemove'
        }));
        expect(ctorOpts.onDragMove).toHaveBeenCalled();
      });
    });
    describe('mouseup', function () {
      it('is ignored if not already dragging', function () {
        instance._handleDragEvent(_extends({}, baseMouseEvt, {
          type: 'mouseup'
        }));
        expect(ctorOpts.onDragEnd).not.toHaveBeenCalled();
        startDragging(instance);
        instance._handleDragEvent(_extends({}, baseMouseEvt, {
          type: 'mouseup'
        }));
        expect(ctorOpts.onDragEnd).toHaveBeenCalled();
      });
      it('sets `isDragging()` to false', function () {
        startDragging(instance);
        expect(instance.isDragging()).toBe(true);
        instance._handleDragEvent(_extends({}, baseMouseEvt, {
          type: 'mouseup'
        }));
        expect(instance.isDragging()).toBe(false);
      });
      it('removes the window mouse listener events', function () {
        startDragging(instance);
        expect(window.removeEventListener).not.toHaveBeenCalled();
        instance._handleDragEvent(_extends({}, baseMouseEvt, {
          type: 'mouseup'
        }));
        expect(jest.mocked(window.removeEventListener).mock.calls).toEqual([['mousemove', expect.any(Function)], ['mouseup', expect.any(Function)]]);
      });
    });
    it('passes drag event data to the callbacks', function () {
      var x = baseClientX - bounds.clientXLeft;
      var value = (baseClientX - bounds.clientXLeft) / bounds.width;
      var cases = [{
        type: 'mousedown',
        handler: instance.handleMouseDown,
        callback: ctorOpts.onDragStart,
        updateType: EUpdateTypes.DragStart
      }, {
        type: 'mousemove',
        handler: instance._handleDragEvent,
        callback: ctorOpts.onDragMove,
        updateType: EUpdateTypes.DragMove
      }, {
        type: 'mouseup',
        handler: instance._handleDragEvent,
        callback: ctorOpts.onDragEnd,
        updateType: EUpdateTypes.DragEnd
      }];
      cases.forEach(function (testCase) {
        var _jest$mocked3;
        var type = testCase.type,
          handler = testCase.handler,
          callback = testCase.callback,
          updateType = testCase.updateType;
        var event = _extends({}, baseMouseEvt, {
          type: type
        });
        handler(event);
        expect((_jest$mocked3 = jest.mocked(callback)) == null ? void 0 : _jest$mocked3.mock.calls).toEqual([[{
          event: event,
          tag: tag,
          value: value,
          x: x,
          manager: instance,
          type: updateType
        }]]);
      });
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEcmFnZ2FibGVNYW5hZ2VyIiwiRVVwZGF0ZVR5cGVzIiwiZGVzY3JpYmUiLCJiYXNlQ2xpZW50WCIsImJhc2VNb3VzZUV2dCIsImJ1dHRvbiIsImNsaWVudFgiLCJ0YWciLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjdG9yT3B0cyIsImluc3RhbmNlIiwic3RhcnREcmFnZ2luZyIsImRyYWdNYW5hZ2VyIiwiaGFuZGxlTW91c2VEb3duIiwiX2V4dGVuZHMiLCJ0eXBlIiwiZXhwZWN0IiwiaXNEcmFnZ2luZyIsInRvQmUiLCJiZWZvcmVFYWNoIiwiY2xpZW50WExlZnQiLCJtYXhWYWx1ZSIsIm1pblZhbHVlIiwid2lkdGgiLCJqZXN0IiwiZm4iLCJvbk1vdXNlRW50ZXIiLCJvbk1vdXNlTGVhdmUiLCJvbk1vdXNlTW92ZSIsIm9uRHJhZ1N0YXJ0Iiwib25EcmFnTW92ZSIsIm9uRHJhZ0VuZCIsInJlc2V0Qm91bmRzT25SZXNpemUiLCJpdCIsIl9nZXRQb3NpdGlvbiIsIm1vY2tlZCIsIm1vY2siLCJjYWxscyIsInRvRXF1YWwiLCJsZWZ0IiwicG9zIiwieCIsInZhbHVlIiwib2xkRm4iLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiYW55IiwiRnVuY3Rpb24iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGlzcG9zZSIsInRocm93ZXJzIiwiaGFuZGxlTW91c2VFbnRlciIsImhhbmRsZU1vdXNlTW92ZSIsImhhbmRsZU1vdXNlTGVhdmUiLCJmb3JFYWNoIiwidGhyb3dlciIsInRvVGhyb3ciLCJsZW5ndGgiLCJub3QiLCJ0b0hhdmVCZWVuQ2FsbGVkIiwiZXZ0IiwiY2FzZXMiLCJoYW5kbGVyIiwiY2FsbGJhY2siLCJ1cGRhdGVUeXBlIiwiTW91c2VFbnRlciIsIk1vdXNlTW92ZSIsIk1vdXNlTGVhdmUiLCJ0ZXN0Q2FzZSIsIl9qZXN0JG1vY2tlZCIsImV2ZW50IiwibWFuYWdlciIsInJlYWxXaW5kb3dBZGRFdmVudCIsInJlYWxXaW5kb3dSbUV2ZW50IiwiYWZ0ZXJFYWNoIiwiX2plc3QkbW9ja2VkMiIsIm1vY2tSZXNldCIsIl9oYW5kbGVEcmFnRXZlbnQiLCJEcmFnU3RhcnQiLCJEcmFnTW92ZSIsIkRyYWdFbmQiLCJfamVzdCRtb2NrZWQzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL0RyYWdnYWJsZU1hbmFnZXIvRHJhZ2dhYmxlTWFuYWdlci50ZXN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgRHJhZ2dhYmxlTWFuYWdlciwgeyBEcmFnZ2FibGVNYW5hZ2VyT3B0aW9ucyB9IGZyb20gJy4vRHJhZ2dhYmxlTWFuYWdlcic7XG5pbXBvcnQgRVVwZGF0ZVR5cGVzIGZyb20gJy4vRVVwZGF0ZVR5cGVzJztcblxuZGVzY3JpYmUoJ0RyYWdnYWJsZU1hbmFnZXInLCAoKSA9PiB7XG4gIGNvbnN0IGJhc2VDbGllbnRYID0gMTAwO1xuICAvLyBsZWZ0IGJ1dHRvbiBtb3VzZSBldmVudHMgaGF2ZSBgLmJ1dHRvbiA9PT0gMGBcbiAgY29uc3QgYmFzZU1vdXNlRXZ0ID0geyBidXR0b246IDAsIGNsaWVudFg6IGJhc2VDbGllbnRYIH07XG4gIGNvbnN0IHRhZyA9ICdzb21lLXRhZyc7XG4gIGxldCBib3VuZHM6IHsgY2xpZW50WExlZnQ6IG51bWJlcjsgd2lkdGg6IG51bWJlcjsgbWluVmFsdWU6IG51bWJlcjsgbWF4VmFsdWU6IG51bWJlciB9O1xuICBsZXQgZ2V0Qm91bmRzOiBqZXN0Lk1vY2s8dHlwZW9mIGJvdW5kcywgW10+O1xuICBsZXQgY3Rvck9wdHM6IERyYWdnYWJsZU1hbmFnZXJPcHRpb25zO1xuICBsZXQgaW5zdGFuY2U6IERyYWdnYWJsZU1hbmFnZXI7XG5cbiAgZnVuY3Rpb24gc3RhcnREcmFnZ2luZyhkcmFnTWFuYWdlcjogRHJhZ2dhYmxlTWFuYWdlcikge1xuICAgIGRyYWdNYW5hZ2VyLmhhbmRsZU1vdXNlRG93bih7IC4uLmJhc2VNb3VzZUV2dCwgdHlwZTogJ21vdXNlZG93bicgfSBhcyBSZWFjdC5Nb3VzZUV2ZW50KTtcbiAgICBleHBlY3QoZHJhZ01hbmFnZXIuaXNEcmFnZ2luZygpKS50b0JlKHRydWUpO1xuICB9XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgYm91bmRzID0ge1xuICAgICAgY2xpZW50WExlZnQ6IDUwLFxuICAgICAgbWF4VmFsdWU6IDAuOSxcbiAgICAgIG1pblZhbHVlOiAwLjEsXG4gICAgICB3aWR0aDogMTAwLFxuICAgIH07XG4gICAgZ2V0Qm91bmRzID0gamVzdC5mbigoKSA9PiBib3VuZHMpO1xuICAgIGN0b3JPcHRzID0ge1xuICAgICAgZ2V0Qm91bmRzLFxuICAgICAgdGFnLFxuICAgICAgb25Nb3VzZUVudGVyOiBqZXN0LmZuKCksXG4gICAgICBvbk1vdXNlTGVhdmU6IGplc3QuZm4oKSxcbiAgICAgIG9uTW91c2VNb3ZlOiBqZXN0LmZuKCksXG4gICAgICBvbkRyYWdTdGFydDogamVzdC5mbigpLFxuICAgICAgb25EcmFnTW92ZTogamVzdC5mbigpLFxuICAgICAgb25EcmFnRW5kOiBqZXN0LmZuKCksXG4gICAgICByZXNldEJvdW5kc09uUmVzaXplOiBmYWxzZSxcbiAgICB9O1xuICAgIGluc3RhbmNlID0gbmV3IERyYWdnYWJsZU1hbmFnZXIoY3Rvck9wdHMpO1xuICB9KTtcblxuICBkZXNjcmliZSgnX2dldFBvc2l0aW9uKCknLCAoKSA9PiB7XG4gICAgaXQoJ2ludm9rZXMgdGhlIGdldEJvdW5kcyBjdG9yIGFyZ3VtZW50JywgKCkgPT4ge1xuICAgICAgaW5zdGFuY2UuX2dldFBvc2l0aW9uKDApO1xuICAgICAgZXhwZWN0KGplc3QubW9ja2VkKGN0b3JPcHRzLmdldEJvdW5kcykubW9jay5jYWxscykudG9FcXVhbChbW3RhZ11dKTtcbiAgICB9KTtcblxuICAgIGl0KCdjb252ZXJ0cyBjbGllbnRYIHRvIHggYW5kIFswLCAxXSB2YWx1ZScsICgpID0+IHtcbiAgICAgIGNvbnN0IGxlZnQgPSAxMDA7XG4gICAgICBjb25zdCBwb3MgPSBpbnN0YW5jZS5fZ2V0UG9zaXRpb24obGVmdCk7XG4gICAgICBleHBlY3QocG9zKS50b0VxdWFsKHtcbiAgICAgICAgeDogbGVmdCAtIGJvdW5kcy5jbGllbnRYTGVmdCxcbiAgICAgICAgdmFsdWU6IChsZWZ0IC0gYm91bmRzLmNsaWVudFhMZWZ0KSAvIGJvdW5kcy53aWR0aCxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NsYW1wcyB4IGFuZCBbMCwgMV0gdmFsdWUgYmFzZWQgb24gZ2V0Qm91bmRzKCkubWluVmFsdWUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBsZWZ0ID0gMDtcbiAgICAgIGNvbnN0IHBvcyA9IGluc3RhbmNlLl9nZXRQb3NpdGlvbihsZWZ0KTtcbiAgICAgIGV4cGVjdChwb3MpLnRvRXF1YWwoe1xuICAgICAgICB4OiBib3VuZHMubWluVmFsdWUgKiBib3VuZHMud2lkdGgsXG4gICAgICAgIHZhbHVlOiBib3VuZHMubWluVmFsdWUsXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdjbGFtcHMgeCBhbmQgWzAsIDFdIHZhbHVlIGJhc2VkIG9uIGdldEJvdW5kcygpLm1heFZhbHVlJywgKCkgPT4ge1xuICAgICAgY29uc3QgbGVmdCA9IDEwMDAwO1xuICAgICAgY29uc3QgcG9zID0gaW5zdGFuY2UuX2dldFBvc2l0aW9uKGxlZnQpO1xuICAgICAgZXhwZWN0KHBvcykudG9FcXVhbCh7XG4gICAgICAgIHg6IGJvdW5kcy5tYXhWYWx1ZSAqIGJvdW5kcy53aWR0aCxcbiAgICAgICAgdmFsdWU6IGJvdW5kcy5tYXhWYWx1ZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnd2luZG93IHJlc2l6ZSBldmVudCBsaXN0ZW5lcicsICgpID0+IHtcbiAgICBpdCgnaXMgYWRkZWQgaW4gdGhlIGN0b3IgaWZmIGByZXNldEJvdW5kc09uUmVzaXplYCBwYXJhbSBpcyB0cnV0aHknLCAoKSA9PiB7XG4gICAgICBjb25zdCBvbGRGbiA9IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgPSBqZXN0LmZuKCk7XG5cbiAgICAgIGN0b3JPcHRzLnJlc2V0Qm91bmRzT25SZXNpemUgPSBmYWxzZTtcbiAgICAgIGluc3RhbmNlID0gbmV3IERyYWdnYWJsZU1hbmFnZXIoY3Rvck9wdHMpO1xuICAgICAgZXhwZWN0KGplc3QubW9ja2VkKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKS5tb2NrLmNhbGxzKS50b0VxdWFsKFtdKTtcbiAgICAgIGN0b3JPcHRzLnJlc2V0Qm91bmRzT25SZXNpemUgPSB0cnVlO1xuICAgICAgaW5zdGFuY2UgPSBuZXcgRHJhZ2dhYmxlTWFuYWdlcihjdG9yT3B0cyk7XG4gICAgICBleHBlY3QoamVzdC5tb2NrZWQod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpLm1vY2suY2FsbHMpLnRvRXF1YWwoW1sncmVzaXplJywgZXhwZWN0LmFueShGdW5jdGlvbildXSk7XG5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyID0gb2xkRm47XG4gICAgfSk7XG5cbiAgICBpdCgnaXMgcmVtb3ZlZCBpbiBgLmRpc3Bvc2UoKWAgaWZmIGByZXNldEJvdW5kc09uUmVzaXplYCBwYXJhbSBpcyB0cnV0aHknLCAoKSA9PiB7XG4gICAgICBjb25zdCBvbGRGbiA9IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBqZXN0LmZuKCk7XG5cbiAgICAgIGN0b3JPcHRzLnJlc2V0Qm91bmRzT25SZXNpemUgPSBmYWxzZTtcbiAgICAgIGluc3RhbmNlID0gbmV3IERyYWdnYWJsZU1hbmFnZXIoY3Rvck9wdHMpO1xuICAgICAgaW5zdGFuY2UuZGlzcG9zZSgpO1xuICAgICAgZXhwZWN0KGplc3QubW9ja2VkKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKS5tb2NrLmNhbGxzKS50b0VxdWFsKFtdKTtcbiAgICAgIGN0b3JPcHRzLnJlc2V0Qm91bmRzT25SZXNpemUgPSB0cnVlO1xuICAgICAgaW5zdGFuY2UgPSBuZXcgRHJhZ2dhYmxlTWFuYWdlcihjdG9yT3B0cyk7XG4gICAgICBpbnN0YW5jZS5kaXNwb3NlKCk7XG4gICAgICBleHBlY3QoamVzdC5tb2NrZWQod2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIpLm1vY2suY2FsbHMpLnRvRXF1YWwoW1sncmVzaXplJywgZXhwZWN0LmFueShGdW5jdGlvbildXSk7XG5cbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyID0gb2xkRm47XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdtaW5vciBtb3VzZSBldmVudHMnLCAoKSA9PiB7XG4gICAgaXQoJ3Rocm93cyBhbiBlcnJvciBmb3IgaW52YWxpZCBldmVudCB0eXBlcycsICgpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSAnaW52YWxpZC1ldmVudC10eXBlJztcbiAgICAgIGNvbnN0IHRocm93ZXJzID0gW1xuICAgICAgICAoKSA9PiBpbnN0YW5jZS5oYW5kbGVNb3VzZUVudGVyKHsgLi4uYmFzZU1vdXNlRXZ0LCB0eXBlIH0gYXMgUmVhY3QuTW91c2VFdmVudCksXG4gICAgICAgICgpID0+IGluc3RhbmNlLmhhbmRsZU1vdXNlTW92ZSh7IC4uLmJhc2VNb3VzZUV2dCwgdHlwZSB9IGFzIFJlYWN0Lk1vdXNlRXZlbnQpLFxuICAgICAgICAoKSA9PiBpbnN0YW5jZS5oYW5kbGVNb3VzZUxlYXZlKHsgLi4uYmFzZU1vdXNlRXZ0LCB0eXBlIH0gYXMgUmVhY3QuTW91c2VFdmVudCksXG4gICAgICBdO1xuICAgICAgdGhyb3dlcnMuZm9yRWFjaCgodGhyb3dlcikgPT4gZXhwZWN0KHRocm93ZXIpLnRvVGhyb3coKSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG9lcyBub3RoaW5nIGlmIGFscmVhZHkgZHJhZ2dpbmcnLCAoKSA9PiB7XG4gICAgICBzdGFydERyYWdnaW5nKGluc3RhbmNlKTtcbiAgICAgIGV4cGVjdChnZXRCb3VuZHMubW9jay5jYWxscy5sZW5ndGgpLnRvQmUoMSk7XG5cbiAgICAgIGluc3RhbmNlLmhhbmRsZU1vdXNlRW50ZXIoeyAuLi5iYXNlTW91c2VFdnQsIHR5cGU6ICdtb3VzZWVudGVyJyB9IGFzIFJlYWN0Lk1vdXNlRXZlbnQpO1xuICAgICAgaW5zdGFuY2UuaGFuZGxlTW91c2VNb3ZlKHsgLi4uYmFzZU1vdXNlRXZ0LCB0eXBlOiAnbW91c2Vtb3ZlJyB9IGFzIFJlYWN0Lk1vdXNlRXZlbnQpO1xuICAgICAgaW5zdGFuY2UuaGFuZGxlTW91c2VMZWF2ZSh7IC4uLmJhc2VNb3VzZUV2dCwgdHlwZTogJ21vdXNlbGVhdmUnIH0gYXMgUmVhY3QuTW91c2VFdmVudCk7XG4gICAgICBleHBlY3QoY3Rvck9wdHMub25Nb3VzZUVudGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgZXhwZWN0KGN0b3JPcHRzLm9uTW91c2VNb3ZlKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgZXhwZWN0KGN0b3JPcHRzLm9uTW91c2VMZWF2ZSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblxuICAgICAgY29uc3QgZXZ0ID0geyAuLi5iYXNlTW91c2VFdnQsIHR5cGU6ICdpbnZhbGlkLXR5cGUnIH0gYXMgUmVhY3QuTW91c2VFdmVudDtcbiAgICAgIGV4cGVjdCgoKSA9PiBpbnN0YW5jZS5oYW5kbGVNb3VzZUVudGVyKGV2dCkpLm5vdC50b1Rocm93KCk7XG5cbiAgICAgIGV4cGVjdChnZXRCb3VuZHMubW9jay5jYWxscy5sZW5ndGgpLnRvQmUoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgncGFzc2VzIGRhdGEgYmFzZWQgb24gdGhlIG1vdXNlIGV2ZW50IHR5cGUgdG8gY2FsbGJhY2tzJywgKCkgPT4ge1xuICAgICAgY29uc3QgeCA9IGJhc2VDbGllbnRYIC0gYm91bmRzLmNsaWVudFhMZWZ0O1xuICAgICAgY29uc3QgdmFsdWUgPSAoYmFzZUNsaWVudFggLSBib3VuZHMuY2xpZW50WExlZnQpIC8gYm91bmRzLndpZHRoO1xuICAgICAgY29uc3QgY2FzZXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnbW91c2VlbnRlcicsXG4gICAgICAgICAgaGFuZGxlcjogaW5zdGFuY2UuaGFuZGxlTW91c2VFbnRlcixcbiAgICAgICAgICBjYWxsYmFjazogY3Rvck9wdHMub25Nb3VzZUVudGVyLFxuICAgICAgICAgIHVwZGF0ZVR5cGU6IEVVcGRhdGVUeXBlcy5Nb3VzZUVudGVyLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ21vdXNlbW92ZScsXG4gICAgICAgICAgaGFuZGxlcjogaW5zdGFuY2UuaGFuZGxlTW91c2VNb3ZlLFxuICAgICAgICAgIGNhbGxiYWNrOiBjdG9yT3B0cy5vbk1vdXNlTW92ZSxcbiAgICAgICAgICB1cGRhdGVUeXBlOiBFVXBkYXRlVHlwZXMuTW91c2VNb3ZlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ21vdXNlbGVhdmUnLFxuICAgICAgICAgIGhhbmRsZXI6IGluc3RhbmNlLmhhbmRsZU1vdXNlTGVhdmUsXG4gICAgICAgICAgY2FsbGJhY2s6IGN0b3JPcHRzLm9uTW91c2VMZWF2ZSxcbiAgICAgICAgICB1cGRhdGVUeXBlOiBFVXBkYXRlVHlwZXMuTW91c2VMZWF2ZSxcbiAgICAgICAgfSxcbiAgICAgIF07XG5cbiAgICAgIGNhc2VzLmZvckVhY2goKHRlc3RDYXNlKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgdHlwZSwgaGFuZGxlciwgY2FsbGJhY2ssIHVwZGF0ZVR5cGUgfSA9IHRlc3RDYXNlO1xuICAgICAgICBjb25zdCBldmVudCA9IHsgLi4uYmFzZU1vdXNlRXZ0LCB0eXBlIH0gYXMgUmVhY3QuTW91c2VFdmVudDtcbiAgICAgICAgaGFuZGxlcihldmVudCk7XG4gICAgICAgIGV4cGVjdChqZXN0Lm1vY2tlZChjYWxsYmFjayk/Lm1vY2suY2FsbHMpLnRvRXF1YWwoW1xuICAgICAgICAgIFt7IGV2ZW50LCB0YWcsIHZhbHVlLCB4LCBtYW5hZ2VyOiBpbnN0YW5jZSwgdHlwZTogdXBkYXRlVHlwZSB9XSxcbiAgICAgICAgXSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2RyYWcgZXZlbnRzJywgKCkgPT4ge1xuICAgIGxldCByZWFsV2luZG93QWRkRXZlbnQ6IHR5cGVvZiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcjtcbiAgICBsZXQgcmVhbFdpbmRvd1JtRXZlbnQ6IHR5cGVvZiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgcmVhbFdpbmRvd0FkZEV2ZW50ID0gd2luZG93LmFkZEV2ZW50TGlzdGVuZXI7XG4gICAgICByZWFsV2luZG93Um1FdmVudCA9IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgPSBqZXN0LmZuKCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGplc3QuZm4oKTtcbiAgICB9KTtcblxuICAgIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciA9IHJlYWxXaW5kb3dBZGRFdmVudDtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyID0gcmVhbFdpbmRvd1JtRXZlbnQ7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGFuIGVycm9yIGZvciBpbnZhbGlkIGV2ZW50IHR5cGVzJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KCgpID0+XG4gICAgICAgIGluc3RhbmNlLmhhbmRsZU1vdXNlRG93bih7IC4uLmJhc2VNb3VzZUV2dCwgdHlwZTogJ2ludmFsaWQtZXZlbnQtdHlwZScgfSBhcyBSZWFjdC5Nb3VzZUV2ZW50KVxuICAgICAgKS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgaXQoJ2lzIGlnbm9yZWQgaWYgYWxyZWFkeSBkcmFnZ2luZycsICgpID0+IHtcbiAgICAgICAgc3RhcnREcmFnZ2luZyhpbnN0YW5jZSk7XG4gICAgICAgIGplc3QubW9ja2VkKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKS5tb2NrUmVzZXQoKTtcbiAgICAgICAgamVzdC5tb2NrZWQoY3Rvck9wdHMub25EcmFnU3RhcnQpPy5tb2NrUmVzZXQoKTtcblxuICAgICAgICBleHBlY3QoZ2V0Qm91bmRzLm1vY2suY2FsbHMubGVuZ3RoKS50b0JlKDEpO1xuICAgICAgICBpbnN0YW5jZS5oYW5kbGVNb3VzZURvd24oeyAuLi5iYXNlTW91c2VFdnQsIHR5cGU6ICdtb3VzZWRvd24nIH0gYXMgUmVhY3QuTW91c2VFdmVudCk7XG4gICAgICAgIGV4cGVjdChnZXRCb3VuZHMubW9jay5jYWxscy5sZW5ndGgpLnRvQmUoMSk7XG5cbiAgICAgICAgZXhwZWN0KHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QoY3Rvck9wdHMub25EcmFnU3RhcnQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3NldHMgYGlzRHJhZ2dpbmcoKWAgdG8gdHJ1ZScsICgpID0+IHtcbiAgICAgICAgaW5zdGFuY2UuaGFuZGxlTW91c2VEb3duKHsgLi4uYmFzZU1vdXNlRXZ0LCB0eXBlOiAnbW91c2Vkb3duJyB9IGFzIFJlYWN0Lk1vdXNlRXZlbnQpO1xuICAgICAgICBleHBlY3QoaW5zdGFuY2UuaXNEcmFnZ2luZygpKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdhZGRzIHRoZSB3aW5kb3cgbW91c2UgbGlzdGVuZXIgZXZlbnRzJywgKCkgPT4ge1xuICAgICAgICBpbnN0YW5jZS5oYW5kbGVNb3VzZURvd24oeyAuLi5iYXNlTW91c2VFdnQsIHR5cGU6ICdtb3VzZWRvd24nIH0gYXMgUmVhY3QuTW91c2VFdmVudCk7XG4gICAgICAgIGV4cGVjdChqZXN0Lm1vY2tlZCh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikubW9jay5jYWxscykudG9FcXVhbChbXG4gICAgICAgICAgWydtb3VzZW1vdmUnLCBleHBlY3QuYW55KEZ1bmN0aW9uKV0sXG4gICAgICAgICAgWydtb3VzZXVwJywgZXhwZWN0LmFueShGdW5jdGlvbildLFxuICAgICAgICBdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ21vdXNlbW92ZScsICgpID0+IHtcbiAgICAgIGl0KCdpcyBpZ25vcmVkIGlmIG5vdCBhbHJlYWR5IGRyYWdnaW5nJywgKCkgPT4ge1xuICAgICAgICBpbnN0YW5jZS5faGFuZGxlRHJhZ0V2ZW50KHsgLi4uYmFzZU1vdXNlRXZ0LCB0eXBlOiAnbW91c2Vtb3ZlJyB9IGFzIFJlYWN0Lk1vdXNlRXZlbnQpO1xuICAgICAgICBleHBlY3QoY3Rvck9wdHMub25EcmFnTW92ZSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgc3RhcnREcmFnZ2luZyhpbnN0YW5jZSk7XG4gICAgICAgIGluc3RhbmNlLl9oYW5kbGVEcmFnRXZlbnQoeyAuLi5iYXNlTW91c2VFdnQsIHR5cGU6ICdtb3VzZW1vdmUnIH0gYXMgUmVhY3QuTW91c2VFdmVudCk7XG4gICAgICAgIGV4cGVjdChjdG9yT3B0cy5vbkRyYWdNb3ZlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgaXQoJ2lzIGlnbm9yZWQgaWYgbm90IGFscmVhZHkgZHJhZ2dpbmcnLCAoKSA9PiB7XG4gICAgICAgIGluc3RhbmNlLl9oYW5kbGVEcmFnRXZlbnQoeyAuLi5iYXNlTW91c2VFdnQsIHR5cGU6ICdtb3VzZXVwJyB9IGFzIFJlYWN0Lk1vdXNlRXZlbnQpO1xuICAgICAgICBleHBlY3QoY3Rvck9wdHMub25EcmFnRW5kKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBzdGFydERyYWdnaW5nKGluc3RhbmNlKTtcbiAgICAgICAgaW5zdGFuY2UuX2hhbmRsZURyYWdFdmVudCh7IC4uLmJhc2VNb3VzZUV2dCwgdHlwZTogJ21vdXNldXAnIH0gYXMgUmVhY3QuTW91c2VFdmVudCk7XG4gICAgICAgIGV4cGVjdChjdG9yT3B0cy5vbkRyYWdFbmQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2V0cyBgaXNEcmFnZ2luZygpYCB0byBmYWxzZScsICgpID0+IHtcbiAgICAgICAgc3RhcnREcmFnZ2luZyhpbnN0YW5jZSk7XG4gICAgICAgIGV4cGVjdChpbnN0YW5jZS5pc0RyYWdnaW5nKCkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIGluc3RhbmNlLl9oYW5kbGVEcmFnRXZlbnQoeyAuLi5iYXNlTW91c2VFdnQsIHR5cGU6ICdtb3VzZXVwJyB9IGFzIFJlYWN0Lk1vdXNlRXZlbnQpO1xuICAgICAgICBleHBlY3QoaW5zdGFuY2UuaXNEcmFnZ2luZygpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmVtb3ZlcyB0aGUgd2luZG93IG1vdXNlIGxpc3RlbmVyIGV2ZW50cycsICgpID0+IHtcbiAgICAgICAgc3RhcnREcmFnZ2luZyhpbnN0YW5jZSk7XG4gICAgICAgIGV4cGVjdCh3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgaW5zdGFuY2UuX2hhbmRsZURyYWdFdmVudCh7IC4uLmJhc2VNb3VzZUV2dCwgdHlwZTogJ21vdXNldXAnIH0gYXMgUmVhY3QuTW91c2VFdmVudCk7XG4gICAgICAgIGV4cGVjdChqZXN0Lm1vY2tlZCh3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcikubW9jay5jYWxscykudG9FcXVhbChbXG4gICAgICAgICAgWydtb3VzZW1vdmUnLCBleHBlY3QuYW55KEZ1bmN0aW9uKV0sXG4gICAgICAgICAgWydtb3VzZXVwJywgZXhwZWN0LmFueShGdW5jdGlvbildLFxuICAgICAgICBdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Bhc3NlcyBkcmFnIGV2ZW50IGRhdGEgdG8gdGhlIGNhbGxiYWNrcycsICgpID0+IHtcbiAgICAgIGNvbnN0IHggPSBiYXNlQ2xpZW50WCAtIGJvdW5kcy5jbGllbnRYTGVmdDtcbiAgICAgIGNvbnN0IHZhbHVlID0gKGJhc2VDbGllbnRYIC0gYm91bmRzLmNsaWVudFhMZWZ0KSAvIGJvdW5kcy53aWR0aDtcbiAgICAgIGNvbnN0IGNhc2VzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ21vdXNlZG93bicsXG4gICAgICAgICAgaGFuZGxlcjogaW5zdGFuY2UuaGFuZGxlTW91c2VEb3duLFxuICAgICAgICAgIGNhbGxiYWNrOiBjdG9yT3B0cy5vbkRyYWdTdGFydCxcbiAgICAgICAgICB1cGRhdGVUeXBlOiBFVXBkYXRlVHlwZXMuRHJhZ1N0YXJ0LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ21vdXNlbW92ZScsXG4gICAgICAgICAgaGFuZGxlcjogaW5zdGFuY2UuX2hhbmRsZURyYWdFdmVudCxcbiAgICAgICAgICBjYWxsYmFjazogY3Rvck9wdHMub25EcmFnTW92ZSxcbiAgICAgICAgICB1cGRhdGVUeXBlOiBFVXBkYXRlVHlwZXMuRHJhZ01vdmUsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnbW91c2V1cCcsXG4gICAgICAgICAgaGFuZGxlcjogaW5zdGFuY2UuX2hhbmRsZURyYWdFdmVudCxcbiAgICAgICAgICBjYWxsYmFjazogY3Rvck9wdHMub25EcmFnRW5kLFxuICAgICAgICAgIHVwZGF0ZVR5cGU6IEVVcGRhdGVUeXBlcy5EcmFnRW5kLFxuICAgICAgICB9LFxuICAgICAgXTtcblxuICAgICAgY2FzZXMuZm9yRWFjaCgodGVzdENhc2UpID0+IHtcbiAgICAgICAgY29uc3QgeyB0eXBlLCBoYW5kbGVyLCBjYWxsYmFjaywgdXBkYXRlVHlwZSB9ID0gdGVzdENhc2U7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0geyAuLi5iYXNlTW91c2VFdnQsIHR5cGUgfSBhcyBSZWFjdC5Nb3VzZUV2ZW50O1xuICAgICAgICBoYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgZXhwZWN0KGplc3QubW9ja2VkKGNhbGxiYWNrKT8ubW9jay5jYWxscykudG9FcXVhbChbXG4gICAgICAgICAgW3sgZXZlbnQsIHRhZywgdmFsdWUsIHgsIG1hbmFnZXI6IGluc3RhbmNlLCB0eXBlOiB1cGRhdGVUeXBlIH1dLFxu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