import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["getBounds", "tag", "resetBoundsOnResize"];
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

import { get as _get } from 'lodash';
import EUpdateTypes from './EUpdateTypes';
var LEFT_MOUSE_BUTTON = 0;
var DraggableManager = /*#__PURE__*/function () {
  // cache the last known DraggableBounds (invalidate via `#resetBounds())

  // optional callbacks for various dragging events

  // whether to reset the bounds on window resize

  /**
   * Get the `DraggableBounds` for the current drag. The returned value is
   * cached until either `#resetBounds()` is called or the window is resized
   * (assuming `_resetBoundsOnResize` is `true`). The `DraggableBounds` defines
   * the range the current drag can span to. It also establishes the left offset
   * to adjust `clientX` by (from the `MouseEvent`s).
   */

  // convenience data

  // handlers for integration with DOM elements

  function DraggableManager(_ref) {
    var _this = this;
    var getBounds = _ref.getBounds,
      tag = _ref.tag,
      _ref$resetBoundsOnRes = _ref.resetBoundsOnResize,
      resetBoundsOnResize = _ref$resetBoundsOnRes === void 0 ? true : _ref$resetBoundsOnRes,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);
    this.resetBounds = function () {
      _this._bounds = undefined;
    };
    this._handleMinorMouseEvent = function (event) {
      var button = event.button,
        clientX = event.clientX,
        eventType = event.type;
      if (_this._isDragging || button !== LEFT_MOUSE_BUTTON) {
        return;
      }
      var type = null;
      var handler;
      if (eventType === 'mouseenter') {
        type = EUpdateTypes.MouseEnter;
        handler = _this._onMouseEnter;
      } else if (eventType === 'mouseleave') {
        type = EUpdateTypes.MouseLeave;
        handler = _this._onMouseLeave;
      } else if (eventType === 'mousemove') {
        type = EUpdateTypes.MouseMove;
        handler = _this._onMouseMove;
      } else {
        throw new Error("invalid event type: " + eventType);
      }
      if (!handler) {
        return;
      }
      var _this$_getPosition = _this._getPosition(clientX),
        value = _this$_getPosition.value,
        x = _this$_getPosition.x;
      handler({
        event: event,
        type: type,
        value: value,
        x: x,
        manager: _this,
        tag: _this.tag
      });
    };
    this._handleDragEvent = function (event) {
      var button = event.button,
        clientX = event.clientX,
        eventType = event.type;
      var type = null;
      var handler;
      if (eventType === 'mousedown') {
        if (_this._isDragging || button !== LEFT_MOUSE_BUTTON) {
          return;
        }
        window.addEventListener('mousemove', _this._handleDragEvent);
        window.addEventListener('mouseup', _this._handleDragEvent);
        var style = _get(document, 'body.style');
        if (style) {
          style.userSelect = 'none';
        }
        _this._isDragging = true;
        type = EUpdateTypes.DragStart;
        handler = _this._onDragStart;
      } else if (eventType === 'mousemove') {
        if (!_this._isDragging) {
          return;
        }
        type = EUpdateTypes.DragMove;
        handler = _this._onDragMove;
      } else if (eventType === 'mouseup') {
        if (!_this._isDragging) {
          return;
        }
        _this._stopDragging();
        type = EUpdateTypes.DragEnd;
        handler = _this._onDragEnd;
      } else {
        throw new Error("invalid event type: " + eventType);
      }
      if (!handler) {
        return;
      }
      var _this$_getPosition2 = _this._getPosition(clientX),
        value = _this$_getPosition2.value,
        x = _this$_getPosition2.x;
      handler({
        event: event,
        type: type,
        value: value,
        x: x,
        manager: _this,
        tag: _this.tag
      });
    };
    this.handleMouseDown = this._handleDragEvent;
    this.handleMouseEnter = this._handleMinorMouseEvent;
    this.handleMouseMove = this._handleMinorMouseEvent;
    this.handleMouseLeave = this._handleMinorMouseEvent;
    this.getBounds = getBounds;
    this.tag = tag;
    this._isDragging = false;
    this._bounds = undefined;
    this._resetBoundsOnResize = Boolean(resetBoundsOnResize);
    if (this._resetBoundsOnResize) {
      window.addEventListener('resize', this.resetBounds);
    }
    this._onMouseEnter = rest.onMouseEnter;
    this._onMouseLeave = rest.onMouseLeave;
    this._onMouseMove = rest.onMouseMove;
    this._onDragStart = rest.onDragStart;
    this._onDragMove = rest.onDragMove;
    this._onDragEnd = rest.onDragEnd;
  }
  var _proto = DraggableManager.prototype;
  _proto._getBounds = function _getBounds() {
    if (!this._bounds) {
      this._bounds = this.getBounds(this.tag);
    }
    return this._bounds;
  };
  _proto._getPosition = function _getPosition(clientX) {
    var _this$_getBounds = this._getBounds(),
      clientXLeft = _this$_getBounds.clientXLeft,
      maxValue = _this$_getBounds.maxValue,
      minValue = _this$_getBounds.minValue,
      width = _this$_getBounds.width;
    var x = clientX - clientXLeft;
    var value = x / width;
    if (minValue != null && value < minValue) {
      value = minValue;
      x = minValue * width;
    } else if (maxValue != null && value > maxValue) {
      value = maxValue;
      x = maxValue * width;
    }
    return {
      value: value,
      x: x
    };
  };
  _proto._stopDragging = function _stopDragging() {
    window.removeEventListener('mousemove', this._handleDragEvent);
    window.removeEventListener('mouseup', this._handleDragEvent);
    var style = _get(document, 'body.style');
    if (style) {
      style.userSelect = 'auto';
    }
    this._isDragging = false;
  };
  _proto.isDragging = function isDragging() {
    return this._isDragging;
  };
  _proto.dispose = function dispose() {
    if (this._isDragging) {
      this._stopDragging();
    }
    if (this._resetBoundsOnResize) {
      window.removeEventListener('resize', this.resetBounds);
    }
    this._bounds = undefined;
    this._onMouseEnter = undefined;
    this._onMouseLeave = undefined;
    this._onMouseMove = undefined;
    this._onDragStart = undefined;
    this._onDragMove = undefined;
    this._onDragEnd = undefined;
  };
  return DraggableManager;
}();
export { DraggableManager as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJnZXQiLCJfZ2V0IiwiRVVwZGF0ZVR5cGVzIiwiTEVGVF9NT1VTRV9CVVRUT04iLCJEcmFnZ2FibGVNYW5hZ2VyIiwiX3JlZiIsIl90aGlzIiwiZ2V0Qm91bmRzIiwidGFnIiwiX3JlZiRyZXNldEJvdW5kc09uUmVzIiwicmVzZXRCb3VuZHNPblJlc2l6ZSIsInJlc3QiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSIsIl9leGNsdWRlZCIsInJlc2V0Qm91bmRzIiwiX2JvdW5kcyIsInVuZGVmaW5lZCIsIl9oYW5kbGVNaW5vck1vdXNlRXZlbnQiLCJldmVudCIsImJ1dHRvbiIsImNsaWVudFgiLCJldmVudFR5cGUiLCJ0eXBlIiwiX2lzRHJhZ2dpbmciLCJoYW5kbGVyIiwiTW91c2VFbnRlciIsIl9vbk1vdXNlRW50ZXIiLCJNb3VzZUxlYXZlIiwiX29uTW91c2VMZWF2ZSIsIk1vdXNlTW92ZSIsIl9vbk1vdXNlTW92ZSIsIkVycm9yIiwiX3RoaXMkX2dldFBvc2l0aW9uIiwiX2dldFBvc2l0aW9uIiwidmFsdWUiLCJ4IiwibWFuYWdlciIsIl9oYW5kbGVEcmFnRXZlbnQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwic3R5bGUiLCJkb2N1bWVudCIsInVzZXJTZWxlY3QiLCJEcmFnU3RhcnQiLCJfb25EcmFnU3RhcnQiLCJEcmFnTW92ZSIsIl9vbkRyYWdNb3ZlIiwiX3N0b3BEcmFnZ2luZyIsIkRyYWdFbmQiLCJfb25EcmFnRW5kIiwiX3RoaXMkX2dldFBvc2l0aW9uMiIsImhhbmRsZU1vdXNlRG93biIsImhhbmRsZU1vdXNlRW50ZXIiLCJoYW5kbGVNb3VzZU1vdmUiLCJoYW5kbGVNb3VzZUxlYXZlIiwiX3Jlc2V0Qm91bmRzT25SZXNpemUiLCJCb29sZWFuIiwib25Nb3VzZUVudGVyIiwib25Nb3VzZUxlYXZlIiwib25Nb3VzZU1vdmUiLCJvbkRyYWdTdGFydCIsIm9uRHJhZ01vdmUiLCJvbkRyYWdFbmQiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJfZ2V0Qm91bmRzIiwiX3RoaXMkX2dldEJvdW5kcyIsImNsaWVudFhMZWZ0IiwibWF4VmFsdWUiLCJtaW5WYWx1ZSIsIndpZHRoIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImlzRHJhZ2dpbmciLCJkaXNwb3NlIiwiZGVmYXVsdCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvdXRpbHMvRHJhZ2dhYmxlTWFuYWdlci9EcmFnZ2FibGVNYW5hZ2VyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgZ2V0IGFzIF9nZXQgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBUTmlsIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuXG5pbXBvcnQgRVVwZGF0ZVR5cGVzIGZyb20gJy4vRVVwZGF0ZVR5cGVzJztcbmltcG9ydCB7IERyYWdnYWJsZUJvdW5kcywgRHJhZ2dpbmdVcGRhdGUgfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3QgTEVGVF9NT1VTRV9CVVRUT04gPSAwO1xuXG5leHBvcnQgdHlwZSBEcmFnZ2FibGVNYW5hZ2VyT3B0aW9ucyA9IHtcbiAgZ2V0Qm91bmRzOiAodGFnOiBzdHJpbmcgfCBUTmlsKSA9PiBEcmFnZ2FibGVCb3VuZHM7XG4gIG9uTW91c2VFbnRlcj86ICh1cGRhdGU6IERyYWdnaW5nVXBkYXRlKSA9PiB2b2lkO1xuICBvbk1vdXNlTGVhdmU/OiAodXBkYXRlOiBEcmFnZ2luZ1VwZGF0ZSkgPT4gdm9pZDtcbiAgb25Nb3VzZU1vdmU/OiAodXBkYXRlOiBEcmFnZ2luZ1VwZGF0ZSkgPT4gdm9pZDtcbiAgb25EcmFnU3RhcnQ/OiAodXBkYXRlOiBEcmFnZ2luZ1VwZGF0ZSkgPT4gdm9pZDtcbiAgb25EcmFnTW92ZT86ICh1cGRhdGU6IERyYWdnaW5nVXBkYXRlKSA9PiB2b2lkO1xuICBvbkRyYWdFbmQ/OiAodXBkYXRlOiBEcmFnZ2luZ1VwZGF0ZSkgPT4gdm9pZDtcbiAgcmVzZXRCb3VuZHNPblJlc2l6ZT86IGJvb2xlYW47XG4gIHRhZz86IHN0cmluZztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYWdnYWJsZU1hbmFnZXIge1xuICAvLyBjYWNoZSB0aGUgbGFzdCBrbm93biBEcmFnZ2FibGVCb3VuZHMgKGludmFsaWRhdGUgdmlhIGAjcmVzZXRCb3VuZHMoKSlcbiAgX2JvdW5kczogRHJhZ2dhYmxlQm91bmRzIHwgVE5pbDtcbiAgX2lzRHJhZ2dpbmc6IGJvb2xlYW47XG4gIC8vIG9wdGlvbmFsIGNhbGxiYWNrcyBmb3IgdmFyaW91cyBkcmFnZ2luZyBldmVudHNcbiAgX29uTW91c2VFbnRlcjogKCh1cGRhdGU6IERyYWdnaW5nVXBkYXRlKSA9PiB2b2lkKSB8IFROaWw7XG4gIF9vbk1vdXNlTGVhdmU6ICgodXBkYXRlOiBEcmFnZ2luZ1VwZGF0ZSkgPT4gdm9pZCkgfCBUTmlsO1xuICBfb25Nb3VzZU1vdmU6ICgodXBkYXRlOiBEcmFnZ2luZ1VwZGF0ZSkgPT4gdm9pZCkgfCBUTmlsO1xuICBfb25EcmFnU3RhcnQ6ICgodXBkYXRlOiBEcmFnZ2luZ1VwZGF0ZSkgPT4gdm9pZCkgfCBUTmlsO1xuICBfb25EcmFnTW92ZTogKCh1cGRhdGU6IERyYWdnaW5nVXBkYXRlKSA9PiB2b2lkKSB8IFROaWw7XG4gIF9vbkRyYWdFbmQ6ICgodXBkYXRlOiBEcmFnZ2luZ1VwZGF0ZSkgPT4gdm9pZCkgfCBUTmlsO1xuICAvLyB3aGV0aGVyIHRvIHJlc2V0IHRoZSBib3VuZHMgb24gd2luZG93IHJlc2l6ZVxuICBfcmVzZXRCb3VuZHNPblJlc2l6ZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogR2V0IHRoZSBgRHJhZ2dhYmxlQm91bmRzYCBmb3IgdGhlIGN1cnJlbnQgZHJhZy4gVGhlIHJldHVybmVkIHZhbHVlIGlzXG4gICAqIGNhY2hlZCB1bnRpbCBlaXRoZXIgYCNyZXNldEJvdW5kcygpYCBpcyBjYWxsZWQgb3IgdGhlIHdpbmRvdyBpcyByZXNpemVkXG4gICAqIChhc3N1bWluZyBgX3Jlc2V0Qm91bmRzT25SZXNpemVgIGlzIGB0cnVlYCkuIFRoZSBgRHJhZ2dhYmxlQm91bmRzYCBkZWZpbmVzXG4gICAqIHRoZSByYW5nZSB0aGUgY3VycmVudCBkcmFnIGNhbiBzcGFuIHRvLiBJdCBhbHNvIGVzdGFibGlzaGVzIHRoZSBsZWZ0IG9mZnNldFxuICAgKiB0byBhZGp1c3QgYGNsaWVudFhgIGJ5IChmcm9tIHRoZSBgTW91c2VFdmVudGBzKS5cbiAgICovXG4gIGdldEJvdW5kczogKHRhZzogc3RyaW5nIHwgVE5pbCkgPT4gRHJhZ2dhYmxlQm91bmRzO1xuXG4gIC8vIGNvbnZlbmllbmNlIGRhdGFcbiAgdGFnOiBzdHJpbmcgfCBUTmlsO1xuXG4gIC8vIGhhbmRsZXJzIGZvciBpbnRlZ3JhdGlvbiB3aXRoIERPTSBlbGVtZW50c1xuICBoYW5kbGVNb3VzZUVudGVyOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHZvaWQ7XG4gIGhhbmRsZU1vdXNlTW92ZTogKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB2b2lkO1xuICBoYW5kbGVNb3VzZUxlYXZlOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHZvaWQ7XG4gIGhhbmRsZU1vdXNlRG93bjogKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHsgZ2V0Qm91bmRzLCB0YWcsIHJlc2V0Qm91bmRzT25SZXNpemUgPSB0cnVlLCAuLi5yZXN0IH06IERyYWdnYWJsZU1hbmFnZXJPcHRpb25zKSB7XG4gICAgdGhpcy5oYW5kbGVNb3VzZURvd24gPSB0aGlzLl9oYW5kbGVEcmFnRXZlbnQ7XG4gICAgdGhpcy5oYW5kbGVNb3VzZUVudGVyID0gdGhpcy5faGFuZGxlTWlub3JNb3VzZUV2ZW50O1xuICAgIHRoaXMuaGFuZGxlTW91c2VNb3ZlID0gdGhpcy5faGFuZGxlTWlub3JNb3VzZUV2ZW50O1xuICAgIHRoaXMuaGFuZGxlTW91c2VMZWF2ZSA9IHRoaXMuX2hhbmRsZU1pbm9yTW91c2VFdmVudDtcblxuICAgIHRoaXMuZ2V0Qm91bmRzID0gZ2V0Qm91bmRzO1xuICAgIHRoaXMudGFnID0gdGFnO1xuICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9ib3VuZHMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcmVzZXRCb3VuZHNPblJlc2l6ZSA9IEJvb2xlYW4ocmVzZXRCb3VuZHNPblJlc2l6ZSk7XG4gICAgaWYgKHRoaXMuX3Jlc2V0Qm91bmRzT25SZXNpemUpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2V0Qm91bmRzKTtcbiAgICB9XG4gICAgdGhpcy5fb25Nb3VzZUVudGVyID0gcmVzdC5vbk1vdXNlRW50ZXI7XG4gICAgdGhpcy5fb25Nb3VzZUxlYXZlID0gcmVzdC5vbk1vdXNlTGVhdmU7XG4gICAgdGhpcy5fb25Nb3VzZU1vdmUgPSByZXN0Lm9uTW91c2VNb3ZlO1xuICAgIHRoaXMuX29uRHJhZ1N0YXJ0ID0gcmVzdC5vbkRyYWdTdGFydDtcbiAgICB0aGlzLl9vbkRyYWdNb3ZlID0gcmVzdC5vbkRyYWdNb3ZlO1xuICAgIHRoaXMuX29uRHJhZ0VuZCA9IHJlc3Qub25EcmFnRW5kO1xuICB9XG5cbiAgX2dldEJvdW5kcygpOiBEcmFnZ2FibGVCb3VuZHMge1xuICAgIGlmICghdGhpcy5fYm91bmRzKSB7XG4gICAgICB0aGlzLl9ib3VuZHMgPSB0aGlzLmdldEJvdW5kcyh0aGlzLnRhZyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9ib3VuZHM7XG4gIH1cblxuICBfZ2V0UG9zaXRpb24oY2xpZW50WDogbnVtYmVyKSB7XG4gICAgY29uc3QgeyBjbGllbnRYTGVmdCwgbWF4VmFsdWUsIG1pblZhbHVlLCB3aWR0aCB9ID0gdGhpcy5fZ2V0Qm91bmRzKCk7XG4gICAgbGV0IHggPSBjbGllbnRYIC0gY2xpZW50WExlZnQ7XG4gICAgbGV0IHZhbHVlID0geCAvIHdpZHRoO1xuICAgIGlmIChtaW5WYWx1ZSAhPSBudWxsICYmIHZhbHVlIDwgbWluVmFsdWUpIHtcbiAgICAgIHZhbHVlID0gbWluVmFsdWU7XG4gICAgICB4ID0gbWluVmFsdWUgKiB3aWR0aDtcbiAgICB9IGVsc2UgaWYgKG1heFZhbHVlICE9IG51bGwgJiYgdmFsdWUgPiBtYXhWYWx1ZSkge1xuICAgICAgdmFsdWUgPSBtYXhWYWx1ZTtcbiAgICAgIHggPSBtYXhWYWx1ZSAqIHdpZHRoO1xuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZSwgeCB9O1xuICB9XG5cbiAgX3N0b3BEcmFnZ2luZygpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5faGFuZGxlRHJhZ0V2ZW50KTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX2hhbmRsZURyYWdFdmVudCk7XG4gICAgY29uc3Qgc3R5bGUgPSBfZ2V0KGRvY3VtZW50LCAnYm9keS5zdHlsZScpO1xuICAgIGlmIChzdHlsZSkge1xuICAgICAgc3R5bGUudXNlclNlbGVjdCA9ICdhdXRvJztcbiAgICB9XG4gICAgdGhpcy5faXNEcmFnZ2luZyA9IGZhbHNlO1xuICB9XG5cbiAgaXNEcmFnZ2luZygpIHtcbiAgICByZXR1cm4gdGhpcy5faXNEcmFnZ2luZztcbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgaWYgKHRoaXMuX2lzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuX3N0b3BEcmFnZ2luZygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fcmVzZXRCb3VuZHNPblJlc2l6ZSkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzZXRCb3VuZHMpO1xuICAgIH1cbiAgICB0aGlzLl9ib3VuZHMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fb25Nb3VzZUVudGVyID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX29uTW91c2VMZWF2ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9vbk1vdXNlTW92ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9vbkRyYWdTdGFydCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9vbkRyYWdNb3ZlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX29uRHJhZ0VuZCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJlc2V0Qm91bmRzID0gKCkgPT4ge1xuICAgIHRoaXMuX2JvdW5kcyA9IHVuZGVmaW5lZDtcbiAgfTtcblxuICBfaGFuZGxlTWlub3JNb3VzZUV2ZW50ID0gKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgY29uc3QgeyBidXR0b24sIGNsaWVudFgsIHR5cGU6IGV2ZW50VHlwZSB9ID0gZXZlbnQ7XG4gICAgaWYgKHRoaXMuX2lzRHJhZ2dpbmcgfHwgYnV0dG9uICE9PSBMRUZUX01PVVNFX0JVVFRPTikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgdHlwZTogRVVwZGF0ZVR5cGVzIHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IGhhbmRsZXI6ICgodXBkYXRlOiBEcmFnZ2luZ1VwZGF0ZSkgPT4gdm9pZCkgfCBUTmlsO1xuICAgIGlmIChldmVudFR5cGUgPT09ICdtb3VzZWVudGVyJykge1xuICAgICAgdHlwZSA9IEVVcGRhdGVUeXBlcy5Nb3VzZUVudGVyO1xuICAgICAgaGFuZGxlciA9IHRoaXMuX29uTW91c2VFbnRlcjtcbiAgICB9IGVsc2UgaWYgKGV2ZW50VHlwZSA9PT0gJ21vdXNlbGVhdmUnKSB7XG4gICAgICB0eXBlID0gRVVwZGF0ZVR5cGVzLk1vdXNlTGVhdmU7XG4gICAgICBoYW5kbGVyID0gdGhpcy5fb25Nb3VzZUxlYXZlO1xuICAgIH0gZWxzZSBpZiAoZXZlbnRUeXBlID09PSAnbW91c2Vtb3ZlJykge1xuICAgICAgdHlwZSA9IEVVcGRhdGVUeXBlcy5Nb3VzZU1vdmU7XG4gICAgICBoYW5kbGVyID0gdGhpcy5fb25Nb3VzZU1vdmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBldmVudCB0eXBlOiAke2V2ZW50VHlwZX1gKTtcbiAgICB9XG4gICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgdmFsdWUsIHggfSA9IHRoaXMuX2dldFBvc2l0aW9uKGNsaWVudFgpO1xuICAgIGhhbmRsZXIoe1xuICAgICAgZXZlbnQsXG4gICAgICB0eXBlLFxuICAgICAgdmFsdWUsXG4gICAgICB4LFxuICAgICAgbWFuYWdlcjogdGhpcyxcbiAgICAgIHRhZzogdGhpcy50YWcsXG4gICAgfSk7XG4gIH07XG5cbiAgX2hhbmRsZURyYWdFdmVudCA9IChldmVudDogTW91c2VFdmVudCB8IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICBjb25zdCB7IGJ1dHRvbiwgY2xpZW50WCwgdHlwZTogZXZlbnRUeXBlIH0gPSBldmVudDtcbiAgICBsZXQgdHlwZTogRVVwZGF0ZVR5cGVzIHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IGhhbmRsZXI6ICgodXBkYXRlOiBEcmFnZ2luZ1VwZGF0ZSkgPT4gdm9pZCkgfCBUTmlsO1xuICAgIGlmIChldmVudFR5cGUgPT09ICdtb3VzZWRvd24nKSB7XG4gICAgICBpZiAodGhpcy5faXNEcmFnZ2luZyB8fCBidXR0b24gIT09IExFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9oYW5kbGVEcmFnRXZlbnQpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9oYW5kbGVEcmFnRXZlbnQpO1xuICAgICAgY29uc3Qgc3R5bGUgPSBfZ2V0KGRvY3VtZW50LCAnYm9keS5zdHlsZScpO1xuICAgICAgaWYgKHN0eWxlKSB7XG4gICAgICAgIHN0eWxlLnVzZXJTZWxlY3QgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgICB0aGlzLl9pc0RyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgdHlwZSA9IEVVcGRhdGVUeXBlcy5EcmFnU3RhcnQ7XG4gICAgICBoYW5kbGVyID0gdGhpcy5fb25EcmFnU3RhcnQ7XG4gICAgfSBlbHNlIGlmIChldmVudFR5cGUgPT09ICdtb3VzZW1vdmUnKSB7XG4gICAgICBpZiAoIXRoaXMuX2lzRHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdHlwZSA9IEVVcGRhdGVUeXBlcy5EcmFnTW92ZTtcbiAgICAgIGhhbmRsZXIgPSB0aGlzLl9vbkRyYWdNb3ZlO1xuICAgIH0gZWxzZSBpZiAoZXZlbnRUeXBlID09PSAnbW91c2V1cCcpIHtcbiAgICAgIGlmICghdGhpcy5faXNEcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIHR5cGUgPSBFVXBkYXRlVHlwZXMuRHJhZ0VuZDtcbiAgICAgIGhhbmRsZXIgPSB0aGlzLl9vbkRyYWdFbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBldmVudCB0eXBlOiAke2V2ZW50VHlwZX1gKTtcbiAgICB9XG4gICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgdmFsdWUsIHggfSA9IHRoaXMuX2dldFBvc2l0aW9uKGNsaWVudFgpO1xuICAgIGhhbmRsZXIoe1xuICAgICAgZXZlbnQsXG4gICAgICB0eXBlLFxuICAgICAgdmFsdWUsXG4gICAgICB4LFxuICAgICAgbWFuYWdlcjogdGhpcyxcbiAgICAgIHRhZzogdGhpcy50YWcsXG4gICAgfSk7XG4gIH07XG59XG4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsR0FBRyxJQUFJQyxJQUFJLFFBQVEsUUFBUTtBQUlwQyxPQUFPQyxZQUFZLE1BQU0sZ0JBQWdCO0FBR3pDLElBQU1DLGlCQUFpQixHQUFHLENBQUM7QUFBQyxJQWNQQyxnQkFBZ0I7RUFDbkM7O0VBR0E7O0VBT0E7O0VBR0E7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0VBR0U7O0VBR0E7O0VBTUEsU0FBQUEsaUJBQUFDLElBQUEsRUFBOEY7SUFBQSxJQUFBQyxLQUFBO0lBQUEsSUFBaEZDLFNBQVMsR0FBQUYsSUFBQSxDQUFURSxTQUFTO01BQUVDLEdBQUcsR0FBQUgsSUFBQSxDQUFIRyxHQUFHO01BQUFDLHFCQUFBLEdBQUFKLElBQUEsQ0FBRUssbUJBQW1CO01BQW5CQSxtQkFBbUIsR0FBQUQscUJBQUEsY0FBRyxJQUFJLEdBQUFBLHFCQUFB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