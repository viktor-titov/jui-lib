import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
var _templateObject, _templateObject2, _templateObject3;
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

import { css } from '@emotion/css';
import { isEqual } from 'lodash';
import memoizeOne from 'memoize-one';
import * as React from 'react';
import { createRef } from 'react';
import { config, reportInteraction } from '@grafana/runtime';
import { stylesFactory, withTheme2, ToolbarButton } from '@grafana/ui';
import { PEER_SERVICE } from '../constants/tag-keys';
import { getColorByKey } from '../utils/color-generator';
import ListView from './ListView';
import SpanBarRow from './SpanBarRow';
import SpanDetailRow from './SpanDetailRow';
import { createViewedBoundsFunc, findServerChildSpan, isErrorSpan, isKindClient, spanContainsErredSpan } from './utils';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
var getStyles = stylesFactory(function (props) {
  var topOfViewRefType = props.topOfViewRefType;
  var position = topOfViewRefType === TopOfViewRefType.Explore ? 'fixed' : 'absolute';
  return {
    rowsWrapper: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      width: 100%;\n    "]))),
    row: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      width: 100%;\n    "]))),
    scrollToTopButton: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n      width: 40px;\n      height: 40px;\n      position: ", ";\n      bottom: 30px;\n      right: 30px;\n      z-index: 1;\n    "])), position)
  };
});
export var TopOfViewRefType = /*#__PURE__*/function (TopOfViewRefType) {
  TopOfViewRefType["Explore"] = "Explore";
  TopOfViewRefType["Panel"] = "Panel";
  return TopOfViewRefType;
}({});
// export for tests
export var DEFAULT_HEIGHTS = {
  bar: 28,
  detail: 161,
  detailWithLogs: 197
};
var NUM_TICKS = 5;
function generateRowStates(spans, childrenHiddenIDs, detailStates) {
  if (!spans) {
    return [];
  }
  var collapseDepth = null;
  var rowStates = [];
  for (var i = 0; i < spans.length; i++) {
    var span = spans[i];
    var spanID = span.spanID,
      depth = span.depth;
    var hidden = false;
    if (collapseDepth != null) {
      if (depth >= collapseDepth) {
        hidden = true;
      } else {
        collapseDepth = null;
      }
    }
    if (hidden) {
      continue;
    }
    if (childrenHiddenIDs.has(spanID)) {
      collapseDepth = depth + 1;
    }
    rowStates.push({
      span: span,
      isDetail: false,
      spanIndex: i
    });
    if (detailStates.has(spanID)) {
      rowStates.push({
        span: span,
        isDetail: true,
        spanIndex: i
      });
    }
  }
  return rowStates;
}
function getClipping(currentViewRange) {
  var zoomStart = currentViewRange[0],
    zoomEnd = currentViewRange[1];
  return {
    left: zoomStart > 0,
    right: zoomEnd < 1
  };
}
function generateRowStatesFromTrace(trace, childrenHiddenIDs, detailStates) {
  return trace ? generateRowStates(trace.spans, childrenHiddenIDs, detailStates) : [];
}
var memoizedGenerateRowStates = memoizeOne(generateRowStatesFromTrace);
var memoizedViewBoundsFunc = memoizeOne(createViewedBoundsFunc, isEqual);
var memoizedGetClipping = memoizeOne(getClipping, isEqual);

// export from tests
export var UnthemedVirtualizedTraceView = /*#__PURE__*/function (_React$Component) {
  function UnthemedVirtualizedTraceView(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.topTraceViewRef = /*#__PURE__*/createRef();
    _this.getViewRange = function () {
      return _this.props.currentViewRangeTime;
    };
    _this.getSearchedSpanIDs = function () {
      return _this.props.findMatchesIDs;
    };
    _this.getCollapsedChildren = function () {
      return _this.props.childrenHiddenIDs;
    };
    _this.mapRowIndexToSpanIndex = function (index) {
      return _this.getRowStates()[index].spanIndex;
    };
    _this.mapSpanIndexToRowIndex = function (index) {
      var max = _this.getRowStates().length;
      for (var i = 0; i < max; i++) {
        var spanIndex = _this.getRowStates()[i].spanIndex;
        if (spanIndex === index) {
          return i;
        }
      }
      throw new Error("unable to find row for span index: " + index);
    };
    _this.setListView = function (listView) {
      var isChanged = _this.listView !== listView;
      _this.listView = listView;
      if (listView && isChanged) {
        _this.props.registerAccessors(_this.getAccessors());
      }
    };
    // use long form syntax to avert flow error
    // https://github.com/facebook/flow/issues/3076#issuecomment-290944051
    _this.getKeyFromIndex = function (index) {
      var _this$getRowStates$in = _this.getRowStates()[index],
        isDetail = _this$getRowStates$in.isDetail,
        span = _this$getRowStates$in.span;
      return span.traceID + "--" + span.spanID + "--" + (isDetail ? 'detail' : 'bar');
    };
    _this.getIndexFromKey = function (key) {
      var parts = key.split('--');
      var _traceID = parts[0];
      var _spanID = parts[1];
      var _isDetail = parts[2] === 'detail';
      var max = _this.getRowStates().length;
      for (var i = 0; i < max; i++) {
        var _this$getRowStates$i = _this.getRowStates()[i],
          span = _this$getRowStates$i.span,
          isDetail = _this$getRowStates$i.isDetail;
        if (span.spanID === _spanID && span.traceID === _traceID && isDetail === _isDetail) {
          return i;
        }
      }
      return -1;
    };
    _this.getRowHeight = function (index) {
      var _this$getRowStates$in2 = _this.getRowStates()[index],
        span = _this$getRowStates$in2.span,
        isDetail = _this$getRowStates$in2.isDetail;
      if (!isDetail) {
        return DEFAULT_HEIGHTS.bar;
      }
      if (Array.isArray(span.logs) && span.logs.length) {
        return DEFAULT_HEIGHTS.detailWithLogs;
      }
      return DEFAULT_HEIGHTS.detail;
    };
    _this.renderRow = function (key, style, index, attrs) {
      var _this$getRowStates$in3 = _this.getRowStates()[index],
        isDetail = _this$getRowStates$in3.isDetail,
        span = _this$getRowStates$in3.span,
        spanIndex = _this$getRowStates$in3.spanIndex;
      return isDetail ? _this.renderSpanDetailRow(span, key, style, attrs) : _this.renderSpanBarRow(span, spanIndex, key, style, attrs);
    };
    _this.scrollToSpan = function (spanID) {
      if (spanID == null) {
        return;
      }
      var i = _this.getRowStates().findIndex(function (row) {
        return row.span.spanID === spanID;
      });
      if (i >= 0) {
        var _this$listView;
        (_this$listView = _this.listView) == null || _this$listView.scrollToIndex(i);
      }
    };
    _this.scrollToTop = function () {
      var _topOfViewRef$current;
      var _this$props = _this.props,
        topOfViewRef = _this$props.topOfViewRef,
        datasourceType = _this$props.datasourceType,
        trace = _this$props.trace;
      topOfViewRef == null || (_topOfViewRef$current = topOfViewRef.current) == null || _topOfViewRef$current.scrollIntoView({
        behavior: 'smooth'
      });
      reportInteraction('grafana_traces_trace_view_scroll_to_top_clicked', {
        datasourceType: datasourceType,
        grafana_version: config.buildInfo.version,
        numServices: trace.services.length,
        numSpans: trace.spans.length
      });
    };
    var setTrace = props.setTrace,
      _trace = props.trace,
      uiFind = props.uiFind;
    setTrace(_trace, uiFind);
    return _this;
  }
  _inheritsLoose(UnthemedVirtualizedTraceView, _React$Component);
  var _proto = UnthemedVirtualizedTraceView.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.scrollToSpan(this.props.focusedSpanId);
  };
  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    // If any prop updates, VirtualizedTraceViewImpl should update.
    var nextPropKeys = Object.keys(nextProps);
    for (var i = 0; i < nextPropKeys.length; i += 1) {
      if (nextProps[nextPropKeys[i]] !== this.props[nextPropKeys[i]]) {
        // Unless the only change was props.shouldScrollToFirstUiFindMatch changing to false.
        if (nextPropKeys[i] === 'shouldScrollToFirstUiFindMatch') {
          if (nextProps[nextPropKeys[i]]) {
            return true;
          }
        } else {
          return true;
        }
      }
    }
    return false;
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var registerAccessors = prevProps.registerAccessors,
      trace = prevProps.trace;
    var _this$props2 = this.props,
      shouldScrollToFirstUiFindMatch = _this$props2.shouldScrollToFirstUiFindMatch,
      clearShouldScrollToFirstUiFindMatch = _this$props2.clearShouldScrollToFirstUiFindMatch,
      scrollToFirstVisibleSpan = _this$props2.scrollToFirstVisibleSpan,
      nextRegisterAccessors = _this$props2.registerAccessors,
      setTrace = _this$props2.setTrace,
      nextTrace = _this$props2.trace,
      uiFind = _this$props2.uiFind,
      focusedSpanId = _this$props2.focusedSpanId,
      focusedSpanIdForSearch = _this$props2.focusedSpanIdForSearch;
    if (trace !== nextTrace) {
      setTrace(nextTrace, uiFind);
    }
    if (this.listView && registerAccessors !== nextRegisterAccessors) {
      nextRegisterAccessors(this.getAccessors());
    }
    if (shouldScrollToFirstUiFindMatch) {
      scrollToFirstVisibleSpan();
      clearShouldScrollToFirstUiFindMatch();
    }
    if (focusedSpanId !== prevProps.focusedSpanId) {
      this.scrollToSpan(focusedSpanId);
    }
    if (focusedSpanIdForSearch !== prevProps.focusedSpanIdForSearch) {
      this.scrollToSpan(focusedSpanIdForSearch);
    }
  };
  _proto.getRowStates = function getRowStates() {
    var _this$props3 = this.props,
      childrenHiddenIDs = _this$props3.childrenHiddenIDs,
      detailStates = _this$props3.detailStates,
      trace = _this$props3.trace;
    return memoizedGenerateRowStates(trace, childrenHiddenIDs, detailStates);
  };
  _proto.getClipping = function getClipping() {
    var currentViewRangeTime = this.props.currentViewRangeTime;
    return memoizedGetClipping(currentViewRangeTime);
  };
  _proto.getViewedBounds = function getViewedBounds() {
    var _this$props4 = this.props,
      currentViewRangeTime = _this$props4.currentViewRangeTime,
      trace = _this$props4.trace;
    var zoomStart = currentViewRangeTime[0],
      zoomEnd = currentViewRangeTime[1];
    return memoizedViewBoundsFunc({
      min: trace.startTime,
      max: trace.endTime,
      viewStart: zoomStart,
      viewEnd: zoomEnd
    });
  };
  _proto.getAccessors = function getAccessors() {
    var lv = this.listView;
    if (!lv) {
      throw new Error('ListView unavailable');
    }
    return {
      getViewRange: this.getViewRange,
      getSearchedSpanIDs: this.getSearchedSpanIDs,
      getCollapsedChildren: this.getCollapsedChildren,
      getViewHeight: lv.getViewHeight,
      getBottomRowIndexVisible: lv.getBottomVisibleIndex,
      getTopRowIndexVisible: lv.getTopVisibleIndex,
      getRowPosition: lv.getRowPosition,
      mapRowIndexToSpanIndex: this.mapRowIndexToSpanIndex,
      mapSpanIndexToRowIndex: this.mapSpanIndexToRowIndex
    };
  };
  _proto.renderSpanBarRow = function renderSpanBarRow(span, spanIndex, key, style, attrs) {
    var spanID = span.spanID;
    var serviceName = span.process.serviceName;
    var _this$props5 = this.props,
      childrenHiddenIDs = _this$props5.childrenHiddenIDs,
      childrenToggle = _this$props5.childrenToggle,
      detailStates = _this$props5.detailStates,
      detailToggle = _this$props5.detailToggle,
      findMatchesIDs = _this$props5.findMatchesIDs,
      spanNameColumnWidth = _this$props5.spanNameColumnWidth,
      trace = _this$props5.trace,
      spanBarOptions = _this$props5.spanBarOptions,
      hoverIndentGuideIds = _this$props5.hoverIndentGuideIds,
      addHoverIndentGuideId = _this$props5.addHoverIndentGuideId,
      removeHoverIndentGuideId = _this$props5.removeHoverIndentGuideId,
      createSpanLink = _this$props5.createSpanLink,
      focusedSpanId = _this$props5.focusedSpanId,
      focusedSpanIdForSearch = _this$props5.focusedSpanIdForSearch,
      theme = _this$props5.theme,
      datasourceType = _this$props5.datasourceType;
    // to avert flow error
    if (!trace) {
      return null;
    }
    var color = getColorByKey(serviceName, theme);
    var isCollapsed = childrenHiddenIDs.has(spanID);
    var isDetailExpanded = detailStates.has(spanID);
    var isMatchingFilter = findMatchesIDs ? findMatchesIDs.has(spanID) : false;
    var isFocused = spanID === focusedSpanId || spanID === focusedSpanIdForSearch;
    var showErrorIcon = isErrorSpan(span) || isCollapsed && spanContainsErredSpan(trace.spans, spanIndex);

    // Check for direct child "server" span if the span is a "client" span.
    var rpc = null;
    if (isCollapsed) {
      var rpcSpan = findServerChildSpan(trace.spans.slice(spanIndex));
      if (rpcSpan) {
        var rpcViewBounds = this.getViewedBounds()(rpcSpan.startTime, rpcSpan.startTime + rpcSpan.duration);
        rpc = {
          color: getColorByKey(rpcSpan.process.serviceName, theme),
          operationName: rpcSpan.operationName,
          serviceName: rpcSpan.process.serviceName,
          viewEnd: rpcViewBounds.end,
          viewStart: rpcViewBounds.start
        };
      }
    }
    var peerServiceKV = span.tags.find(function (kv) {
      return kv.key === PEER_SERVICE;
    });
    // Leaf, kind == client and has peer.service.tag, is likely a client span that does a request
    // to an uninstrumented/external service
    var noInstrumentedServer = null;
    if (!span.hasChildren && peerServiceKV && isKindClient(span)) {
      noInstrumentedServer = {
        serviceName: peerServiceKV.value,
        color: getColorByKey(peerServiceKV.value, theme)
      };
    }
    var styles = getStyles(this.props);
    return /*#__PURE__*/_jsx("div", _extends({
      className: styles.row,
      style: style
    }, attrs, {
      children: /*#__PURE__*/_jsx(SpanBarRow, {
        clippingLeft: this.getClipping().left,
        clippingRight: this.getClipping().right,
        color: color,
        spanBarOptions: spanBarOptions,
        columnDivision: spanNameColumnWidth,
        isChildrenExpanded: !isCollapsed,
        isDetailExpanded: isDetailExpanded,
        isMatchingFilter: isMatchingFilter,
        isFocused: isFocused,
        numTicks: NUM_TICKS,
        onDetailToggled: detailToggle,
        onChildrenToggled: childrenToggle,
        rpc: rpc,
        noInstrumentedServer: noInstrumentedServer,
        showErrorIcon: showErrorIcon,
        getViewedBounds: this.getViewedBounds(),
        traceStartTime: trace.startTime,
        span: span,
        hoverIndentGuideIds: hoverIndentGuideIds,
        addHoverIndentGuideId: addHoverIndentGuideId,
        removeHoverIndentGuideId: removeHoverIndentGuideId,
        createSpanLink: createSpanLink,
        datasourceType: datasourceType
      })
    }), key);
  };
  _proto.renderSpanDetailRow = function renderSpanDetailRow(span, key, style, attrs) {
    var spanID = span.spanID;
    var serviceName = span.process.serviceName;
    var _this$props6 = this.props,
      detailLogItemToggle = _this$props6.detailLogItemToggle,
      detailLogsToggle = _this$props6.detailLogsToggle,
      detailProcessToggle = _this$props6.detailProcessToggle,
      detailReferencesToggle = _this$props6.detailReferencesToggle,
      detailReferenceItemToggle = _this$props6.detailReferenceItemToggle,
      detailWarningsToggle = _this$props6.detailWarningsToggle,
      detailStackTracesToggle = _this$props6.detailStackTracesToggle,
      detailStates = _this$props6.detailStates,
      detailTagsToggle = _this$props6.detailTagsToggle,
      detailToggle = _this$props6.detailToggle,
      spanNameColumnWidth = _this$props6.spanNameColumnWidth,
      trace = _this$props6.trace,
      timeZone = _this$props6.timeZone,
      hoverIndentGuideIds = _this$props6.hoverIndentGuideIds,
      addHoverIndentGuideId = _this$props6.addHoverIndentGuideId,
      removeHoverIndentGuideId = _this$props6.removeHoverIndentGuideId,
      linksGetter = _this$props6.linksGetter,
      createSpanLink = _this$props6.createSpanLink,
      focusedSpanId = _this$props6.focusedSpanId,
      createFocusSpanLink = _this$props6.createFocusSpanLink,
      topOfViewRefType = _this$props6.topOfViewRefType,
      theme = _this$props6.theme,
      datasourceType = _this$props6.datasourceType;
    var detailState = detailStates.get(spanID);
    if (!trace || !detailState) {
      return null;
    }
    var color = getColorByKey(serviceName, theme);
    var styles = getStyles(this.props);
    return /*#__PURE__*/_jsx("div", _extends({
      className: styles.row,
      style: _extends({}, style, {
        zIndex: 1
      })
    }, attrs, {
      children: /*#__PURE__*/_jsx(SpanDetailRow, {
        color: color,
        columnDivision: spanNameColumnWidth,
        onDetailToggled: detailToggle,
        detailState: detailState,
        linksGetter: linksGetter,
        logItemToggle: detailLogItemToggle,
        logsToggle: detailLogsToggle,
        processToggle: detailProcessToggle,
        referenceItemToggle: detailReferenceItemToggle,
        referencesToggle: detailReferencesToggle,
        warningsToggle: detailWarningsToggle,
        stackTracesToggle: detailStackTracesToggle,
        span: span,
        timeZone: timeZone,
        tagsToggle: detailTagsToggle,
        traceStartTime: trace.startTime,
        hoverIndentGuideIds: hoverIndentGuideIds,
        addHoverIndentGuideId: addHoverIndentGuideId,
        removeHoverIndentGuideId: removeHoverIndentGuideId,
        createSpanLink: createSpanLink,
        focusedSpanId: focusedSpanId,
        createFocusSpanLink: createFocusSpanLink,
        topOfViewRefType: topOfViewRefType,
        datasourceType: datasourceType
      })
    }), key);
  };
  _proto.render = function render() {
    var styles = getStyles(this.props);
    var scrollElement = this.props.scrollElement;
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(ListView, {
        ref: this.setListView,
        dataLength: this.getRowStates().length,
        itemHeightGetter: this.getRowHeight,
        itemRenderer: this.renderRow,
        viewBuffer: 50,
        viewBufferMin: 50,
        itemsWrapperClassName: styles.rowsWrapper,
        getKeyFromIndex: this.getKeyFromIndex,
        getIndexFromKey: this.getIndexFromKey,
        windowScroller: false,
        scrollElement: scrollElement
      }), /*#__PURE__*/_jsx(ToolbarButton, {
        className: styles.scrollToTopButton,
        onClick: this.scrollToTop,
        title: "Scroll to top",
        icon: "arrow-up"
      })]
    });
  };
  return UnthemedVirtualizedTraceView;
}(React.Component);
export default withTheme2(UnthemedVirtualizedTraceView);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJpc0VxdWFsIiwibWVtb2l6ZU9uZSIsIlJlYWN0IiwiY3JlYXRlUmVmIiwiY29uZmlnIiwicmVwb3J0SW50ZXJhY3Rpb24iLCJzdHlsZXNGYWN0b3J5Iiwid2l0aFRoZW1lMiIsIlRvb2xiYXJCdXR0b24iLCJQRUVSX1NFUlZJQ0UiLCJnZXRDb2xvckJ5S2V5IiwiTGlzdFZpZXciLCJTcGFuQmFyUm93IiwiU3BhbkRldGFpbFJvdyIsImNyZWF0ZVZpZXdlZEJvdW5kc0Z1bmMiLCJmaW5kU2VydmVyQ2hpbGRTcGFuIiwiaXNFcnJvclNwYW4iLCJpc0tpbmRDbGllbnQiLCJzcGFuQ29udGFpbnNFcnJlZFNwYW4iLCJqc3giLCJfanN4IiwiRnJhZ21lbnQiLCJfRnJhZ21lbnQiLCJqc3hzIiwiX2pzeHMiLCJnZXRTdHlsZXMiLCJwcm9wcyIsInRvcE9mVmlld1JlZlR5cGUiLCJwb3NpdGlvbiIsIlRvcE9mVmlld1JlZlR5cGUiLCJFeHBsb3JlIiwicm93c1dyYXBwZXIiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsTG9vc2UiLCJyb3ciLCJfdGVtcGxhdGVPYmplY3QyIiwic2Nyb2xsVG9Ub3BCdXR0b24iLCJfdGVtcGxhdGVPYmplY3QzIiwiREVGQVVMVF9IRUlHSFRTIiwiYmFyIiwiZGV0YWlsIiwiZGV0YWlsV2l0aExvZ3MiLCJOVU1fVElDS1MiLCJnZW5lcmF0ZVJvd1N0YXRlcyIsInNwYW5zIiwiY2hpbGRyZW5IaWRkZW5JRHMiLCJkZXRhaWxTdGF0ZXMiLCJjb2xsYXBzZURlcHRoIiwicm93U3RhdGVzIiwiaSIsImxlbmd0aCIsInNwYW4iLCJzcGFuSUQiLCJkZXB0aCIsImhpZGRlbiIsImhhcyIsInB1c2giLCJpc0RldGFpbCIsInNwYW5JbmRleCIsImdldENsaXBwaW5nIiwiY3VycmVudFZpZXdSYW5nZSIsInpvb21TdGFydCIsInpvb21FbmQiLCJsZWZ0IiwicmlnaHQiLCJnZW5lcmF0ZVJvd1N0YXRlc0Zyb21UcmFjZSIsInRyYWNlIiwibWVtb2l6ZWRHZW5lcmF0ZVJvd1N0YXRlcyIsIm1lbW9pemVkVmlld0JvdW5kc0Z1bmMiLCJtZW1vaXplZEdldENsaXBwaW5nIiwiVW50aGVtZWRWaXJ0dWFsaXplZFRyYWNlVmlldyIsIl9SZWFjdCRDb21wb25lbnQiLCJfdGhpcyIsImNhbGwiLCJ0b3BUcmFjZVZpZXdSZWYiLCJnZXRWaWV3UmFuZ2UiLCJjdXJyZW50Vmlld1JhbmdlVGltZSIsImdldFNlYXJjaGVkU3BhbklEcyIsImZpbmRNYXRjaGVzSURzIiwiZ2V0Q29sbGFwc2VkQ2hpbGRyZW4iLCJtYXBSb3dJbmRleFRvU3BhbkluZGV4IiwiaW5kZXgiLCJnZXRSb3dTdGF0ZXMiLCJtYXBTcGFuSW5kZXhUb1Jvd0luZGV4IiwibWF4IiwiRXJyb3IiLCJzZXRMaXN0VmlldyIsImxpc3RWaWV3IiwiaXNDaGFuZ2VkIiwicmVnaXN0ZXJBY2Nlc3NvcnMiLCJnZXRBY2Nlc3NvcnMiLCJnZXRLZXlGcm9tSW5kZXgiLCJfdGhpcyRnZXRSb3dTdGF0ZXMkaW4iLCJ0cmFjZUlEIiwiZ2V0SW5kZXhGcm9tS2V5Iiwia2V5IiwicGFydHMiLCJzcGxpdCIsIl90cmFjZUlEIiwiX3NwYW5JRCIsIl9pc0RldGFpbCIsIl90aGlzJGdldFJvd1N0YXRlcyRpIiwiZ2V0Um93SGVpZ2h0IiwiX3RoaXMkZ2V0Um93U3RhdGVzJGluMiIsIkFycmF5IiwiaXNBcnJheSIsImxvZ3MiLCJyZW5kZXJSb3ciLCJzdHlsZSIsImF0dHJzIiwiX3RoaXMkZ2V0Um93U3RhdGVzJGluMyIsInJlbmRlclNwYW5EZXRhaWxSb3ciLCJyZW5kZXJTcGFuQmFyUm93Iiwic2Nyb2xsVG9TcGFuIiwiZmluZEluZGV4IiwiX3RoaXMkbGlzdFZpZXciLCJzY3JvbGxUb0luZGV4Iiwic2Nyb2xsVG9Ub3AiLCJfdG9wT2ZWaWV3UmVmJGN1cnJlbnQiLCJfdGhpcyRwcm9wcyIsInRvcE9mVmlld1JlZiIsImRhdGFzb3VyY2VUeXBlIiwiY3VycmVudCIsInNjcm9sbEludG9WaWV3IiwiYmVoYXZpb3IiLCJncmFmYW5hX3ZlcnNpb24iLCJidWlsZEluZm8iLCJ2ZXJzaW9uIiwibnVtU2VydmljZXMiLCJzZXJ2aWNlcyIsIm51bVNwYW5zIiwic2V0VHJhY2UiLCJ1aUZpbmQiLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsImNvbXBvbmVudERpZE1vdW50IiwiZm9jdXNlZFNwYW5JZCIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsIm5leHRQcm9wcyIsIm5leHRQcm9wS2V5cyIsIk9iamVjdCIsImtleXMiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJfdGhpcyRwcm9wczIiLCJzaG91bGRTY3JvbGxUb0ZpcnN0VWlGaW5kTWF0Y2giLCJjbGVhclNob3VsZFNjcm9sbFRvRmlyc3RVaUZpbmRNYXRjaCIsInNjcm9sbFRvRmlyc3RWaXNpYmxlU3BhbiIsIm5leHRSZWdpc3RlckFjY2Vzc29ycyIsIm5leHRUcmFjZSIsImZvY3VzZWRTcGFuSWRGb3JTZWFyY2giLCJfdGhpcyRwcm9wczMiLCJnZXRWaWV3ZWRCb3VuZHMiLCJfdGhpcyRwcm9wczQiLCJtaW4iLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwidmlld1N0YXJ0Iiwidmlld0VuZCIsImx2IiwiZ2V0Vmlld0hlaWdodCIsImdldEJvdHRvbVJvd0luZGV4VmlzaWJsZSIsImdldEJvdHRvbVZpc2libGVJbmRleCIsImdldFRvcFJvd0luZGV4VmlzaWJsZSIsImdldFRvcFZpc2libGVJbmRleCIsImdldFJvd1Bvc2l0aW9uIiwic2VydmljZU5hbWUiLCJwcm9jZXNzIiwiX3RoaXMkcHJvcHM1IiwiY2hpbGRyZW5Ub2dnbGUiLCJkZXRhaWxUb2dnbGUiLCJzcGFuTmFtZUNvbHVtbldpZHRoIiwic3BhbkJhck9wdGlvbnMiLCJob3ZlckluZGVudEd1aWRlSWRzIiwiYWRkSG92ZXJJbmRlbnRHdWlkZUlkIiwicmVtb3ZlSG92ZXJJbmRlbnRHdWlkZUlkIiwiY3JlYXRlU3BhbkxpbmsiLCJ0aGVtZSIsImNvbG9yIiwiaXNDb2xsYXBzZWQiLCJpc0RldGFpbEV4cGFuZGVkIiwiaXNNYXRjaGluZ0ZpbHRlciIsImlzRm9jdXNlZCIsInNob3dFcnJvckljb24iLCJycGMiLCJycGNTcGFuIiwic2xpY2UiLCJycGNWaWV3Qm91bmRzIiwiZHVyYXRpb24iLCJvcGVyYXRpb25OYW1lIiwiZW5kIiwic3RhcnQiLCJwZWVyU2VydmljZUtWIiwidGFncyIsImZpbmQiLCJrdiIsIm5vSW5zdHJ1bWVudGVkU2VydmVyIiwiaGFzQ2hpbGRyZW4iLCJ2YWx1ZSIsInN0eWxlcyIsIl9leHRlbmRzIiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJjbGlwcGluZ0xlZnQiLCJjbGlwcGluZ1JpZ2h0IiwiY29sdW1uRGl2aXNpb24iLCJpc0NoaWxkcmVuRXhwYW5kZWQiLCJudW1UaWNrcyIsIm9uRGV0YWlsVG9nZ2xlZCIsIm9uQ2hpbGRyZW5Ub2dnbGVkIiwidHJhY2VTdGFydFRpbWUiLCJfdGhpcyRwcm9wczYiLCJkZXRhaWxMb2dJdGVtVG9nZ2xlIiwiZGV0YWlsTG9nc1RvZ2dsZSIsImRldGFpbFByb2Nlc3NUb2dnbGUiLCJkZXRhaWxSZWZlcmVuY2VzVG9nZ2xlIiwiZGV0YWlsUmVmZXJlbmNlSXRlbVRvZ2dsZSIsImRldGFpbFdhcm5pbmdzVG9nZ2xlIiwiZGV0YWlsU3RhY2tUcmFjZXNUb2dnbGUiLCJkZXRhaWxUYWdzVG9nZ2xlIiwidGltZVpvbmUiLCJsaW5rc0dldHRlciIsImNyZWF0ZUZvY3VzU3BhbkxpbmsiLCJkZXRhaWxTdGF0ZSIsImdldCIsInpJbmRleCIsImxvZ0l0ZW1Ub2dnbGUiLCJsb2dzVG9nZ2xlIiwicHJvY2Vzc1RvZ2dsZSIsInJlZmVyZW5jZUl0ZW1Ub2dnbGUiLCJyZWZlcmVuY2VzVG9nZ2xlIiwid2FybmluZ3NUb2dnbGUiLCJzdGFja1RyYWNlc1RvZ2dsZSIsInRhZ3NUb2dnbGUiLCJyZW5kZXIiLCJzY3JvbGxFbGVtZW50IiwicmVmIiwiZGF0YUxlbmd0aCIsIml0ZW1IZWlnaHRHZXR0ZXIiLCJpdGVtUmVuZGVyZXIiLCJ2aWV3QnVmZmVyIiwidmlld0J1ZmZlck1pbiIsIml0ZW1zV3JhcHBlckNsYXNzTmFtZSIsIndpbmRvd1Njcm9sbGVyIiwib25DbGljayIsInRpdGxlIiwiaWNvbiIsIkNvbXBvbmVudCJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UcmFjZVRpbWVsaW5lVmlld2VyL1ZpcnR1YWxpemVkVHJhY2VWaWV3LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCB7IGlzRXF1YWwgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG1lbW9pemVPbmUgZnJvbSAnbWVtb2l6ZS1vbmUnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3JlYXRlUmVmLCBSZWZPYmplY3QgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEdyYWZhbmFUaGVtZTIsIExpbmtNb2RlbCwgVGltZVpvbmUgfSBmcm9tICdAZ3JhZmFuYS9kYXRhJztcbmltcG9ydCB7IGNvbmZpZywgcmVwb3J0SW50ZXJhY3Rpb24gfSBmcm9tICdAZ3JhZmFuYS9ydW50aW1lJztcbmltcG9ydCB7IHN0eWxlc0ZhY3RvcnksIHdpdGhUaGVtZTIsIFRvb2xiYXJCdXR0b24gfSBmcm9tICdAZ3JhZmFuYS91aSc7XG5cbmltcG9ydCB7IEFjY2Vzc29ycyB9IGZyb20gJy4uL1Njcm9sbE1hbmFnZXInO1xuaW1wb3J0IHsgUEVFUl9TRVJWSUNFIH0gZnJvbSAnLi4vY29uc3RhbnRzL3RhZy1rZXlzJztcbmltcG9ydCB7IFNwYW5CYXJPcHRpb25zLCBTcGFuTGlua0Z1bmMsIFROaWwgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgVFRyYWNlVGltZWxpbmUgZnJvbSAnLi4vdHlwZXMvVFRyYWNlVGltZWxpbmUnO1xuaW1wb3J0IHsgVHJhY2VMb2csIFRyYWNlU3BhbiwgVHJhY2UsIFRyYWNlS2V5VmFsdWVQYWlyLCBUcmFjZUxpbmssIFRyYWNlU3BhblJlZmVyZW5jZSB9IGZyb20gJy4uL3R5cGVzL3RyYWNlJztcbmltcG9ydCB7IGdldENvbG9yQnlLZXkgfSBmcm9tICcuLi91dGlscy9jb2xvci1nZW5lcmF0b3InO1xuXG5pbXBvcnQgTGlzdFZpZXcgZnJvbSAnLi9MaXN0Vmlldyc7XG5pbXBvcnQgU3BhbkJhclJvdyBmcm9tICcuL1NwYW5CYXJSb3cnO1xuaW1wb3J0IERldGFpbFN0YXRlIGZyb20gJy4vU3BhbkRldGFpbC9EZXRhaWxTdGF0ZSc7XG5pbXBvcnQgU3BhbkRldGFpbFJvdyBmcm9tICcuL1NwYW5EZXRhaWxSb3cnO1xuaW1wb3J0IHtcbiAgY3JlYXRlVmlld2VkQm91bmRzRnVuYyxcbiAgZmluZFNlcnZlckNoaWxkU3BhbixcbiAgaXNFcnJvclNwYW4sXG4gIGlzS2luZENsaWVudCxcbiAgc3BhbkNvbnRhaW5zRXJyZWRTcGFuLFxuICBWaWV3ZWRCb3VuZHNGdW5jdGlvblR5cGUsXG59IGZyb20gJy4vdXRpbHMnO1xuXG50eXBlIFRFeHRyYWN0VWlGaW5kRnJvbVN0YXRlUmV0dXJuID0ge1xuICB1aUZpbmQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IGdldFN0eWxlcyA9IHN0eWxlc0ZhY3RvcnkoKHByb3BzOiBUVmlydHVhbGl6ZWRUcmFjZVZpZXdPd25Qcm9wcykgPT4ge1xuICBjb25zdCB7IHRvcE9mVmlld1JlZlR5cGUgfSA9IHByb3BzO1xuICBjb25zdCBwb3NpdGlvbiA9IHRvcE9mVmlld1JlZlR5cGUgPT09IFRvcE9mVmlld1JlZlR5cGUuRXhwbG9yZSA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnO1xuXG4gIHJldHVybiB7XG4gICAgcm93c1dyYXBwZXI6IGNzc2BcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgIGAsXG4gICAgcm93OiBjc3NgXG4gICAgICB3aWR0aDogMTAwJTtcbiAgICBgLFxuICAgIHNjcm9sbFRvVG9wQnV0dG9uOiBjc3NgXG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIHdpZHRoOiA0MHB4O1xuICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgICAgcG9zaXRpb246ICR7cG9zaXRpb259O1xuICAgICAgYm90dG9tOiAzMHB4O1xuICAgICAgcmlnaHQ6IDMwcHg7XG4gICAgICB6LWluZGV4OiAxO1xuICAgIGAsXG4gIH07XG59KTtcblxudHlwZSBSb3dTdGF0ZSA9IHtcbiAgaXNEZXRhaWw6IGJvb2xlYW47XG4gIHNwYW46IFRyYWNlU3BhbjtcbiAgc3BhbkluZGV4OiBudW1iZXI7XG59O1xuXG5leHBvcnQgZW51bSBUb3BPZlZpZXdSZWZUeXBlIHtcbiAgRXhwbG9yZSA9ICdFeHBsb3JlJyxcbiAgUGFuZWwgPSAnUGFuZWwnLFxufVxuXG50eXBlIFRWaXJ0dWFsaXplZFRyYWNlVmlld093blByb3BzID0ge1xuICBjdXJyZW50Vmlld1JhbmdlVGltZTogW251bWJlciwgbnVtYmVyXTtcbiAgdGltZVpvbmU6IFRpbWVab25lO1xuICBmaW5kTWF0Y2hlc0lEczogU2V0PHN0cmluZz4gfCBUTmlsO1xuICBzY3JvbGxUb0ZpcnN0VmlzaWJsZVNwYW46ICgpID0+IHZvaWQ7XG4gIHJlZ2lzdGVyQWNjZXNzb3JzOiAoYWNjZXNvcnM6IEFjY2Vzc29ycykgPT4gdm9pZDtcbiAgdHJhY2U6IFRyYWNlO1xuICBzcGFuQmFyT3B0aW9uczogU3BhbkJhck9wdGlvbnMgfCB1bmRlZmluZWQ7XG4gIGxpbmtzR2V0dGVyOiAoc3BhbjogVHJhY2VTcGFuLCBpdGVtczogVHJhY2VLZXlWYWx1ZVBhaXJbXSwgaXRlbUluZGV4OiBudW1iZXIpID0+IFRyYWNlTGlua1tdO1xuICBjaGlsZHJlblRvZ2dsZTogKHNwYW5JRDogc3RyaW5nKSA9PiB2b2lkO1xuICBjbGVhclNob3VsZFNjcm9sbFRvRmlyc3RVaUZpbmRNYXRjaDogKCkgPT4gdm9pZDtcbiAgZGV0YWlsTG9nSXRlbVRvZ2dsZTogKHNwYW5JRDogc3RyaW5nLCBsb2c6IFRyYWNlTG9nKSA9PiB2b2lkO1xuICBkZXRhaWxMb2dzVG9nZ2xlOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGRldGFpbFdhcm5pbmdzVG9nZ2xlOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGRldGFpbFN0YWNrVHJhY2VzVG9nZ2xlOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGRldGFpbFJlZmVyZW5jZXNUb2dnbGU6IChzcGFuSUQ6IHN0cmluZykgPT4gdm9pZDtcbiAgZGV0YWlsUmVmZXJlbmNlSXRlbVRvZ2dsZTogKHNwYW5JRDogc3RyaW5nLCByZWZlcmVuY2U6IFRyYWNlU3BhblJlZmVyZW5jZSkgPT4gdm9pZDtcbiAgZGV0YWlsUHJvY2Vzc1RvZ2dsZTogKHNwYW5JRDogc3RyaW5nKSA9PiB2b2lkO1xuICBkZXRhaWxUYWdzVG9nZ2xlOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGRldGFpbFRvZ2dsZTogKHNwYW5JRDogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRTcGFuTmFtZUNvbHVtbldpZHRoOiAod2lkdGg6IG51bWJlcikgPT4gdm9pZDtcbiAgc2V0VHJhY2U6ICh0cmFjZTogVHJhY2UgfCBUTmlsLCB1aUZpbmQ6IHN0cmluZyB8IFROaWwpID0+IHZvaWQ7XG4gIGhvdmVySW5kZW50R3VpZGVJZHM6IFNldDxzdHJpbmc+O1xuICBhZGRIb3ZlckluZGVudEd1aWRlSWQ6IChzcGFuSUQ6IHN0cmluZykgPT4gdm9pZDtcbiAgcmVtb3ZlSG92ZXJJbmRlbnRHdWlkZUlkOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHRoZW1lOiBHcmFmYW5hVGhlbWUyO1xuICBjcmVhdGVTcGFuTGluaz86IFNwYW5MaW5rRnVuYztcbiAgc2Nyb2xsRWxlbWVudD86IEVsZW1lbnQ7XG4gIGZvY3VzZWRTcGFuSWQ/OiBzdHJpbmc7XG4gIGZvY3VzZWRTcGFuSWRGb3JTZWFyY2g6IHN0cmluZztcbiAgY3JlYXRlRm9jdXNTcGFuTGluazogKHRyYWNlSWQ6IHN0cmluZywgc3BhbklkOiBzdHJpbmcpID0+IExpbmtNb2RlbDtcbiAgdG9wT2ZWaWV3UmVmPzogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50PjtcbiAgdG9wT2ZWaWV3UmVmVHlwZT86IFRvcE9mVmlld1JlZlR5cGU7XG4gIGRhdGFzb3VyY2VUeXBlOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBWaXJ0dWFsaXplZFRyYWNlVmlld1Byb3BzID0gVFZpcnR1YWxpemVkVHJhY2VWaWV3T3duUHJvcHMgJiBURXh0cmFjdFVpRmluZEZyb21TdGF0ZVJldHVybiAmIFRUcmFjZVRpbWVsaW5lO1xuXG4vLyBleHBvcnQgZm9yIHRlc3RzXG5leHBvcnQgY29uc3QgREVGQVVMVF9IRUlHSFRTID0ge1xuICBiYXI6IDI4LFxuICBkZXRhaWw6IDE2MSxcbiAgZGV0YWlsV2l0aExvZ3M6IDE5Nyxcbn07XG5cbmNvbnN0IE5VTV9USUNLUyA9IDU7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUm93U3RhdGVzKFxuICBzcGFuczogVHJhY2VTcGFuW10gfCBUTmlsLFxuICBjaGlsZHJlbkhpZGRlbklEczogU2V0PHN0cmluZz4sXG4gIGRldGFpbFN0YXRlczogTWFwPHN0cmluZywgRGV0YWlsU3RhdGUgfCBUTmlsPlxuKTogUm93U3RhdGVbXSB7XG4gIGlmICghc3BhbnMpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgbGV0IGNvbGxhcHNlRGVwdGggPSBudWxsO1xuICBjb25zdCByb3dTdGF0ZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGFucy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHNwYW4gPSBzcGFuc1tpXTtcbiAgICBjb25zdCB7IHNwYW5JRCwgZGVwdGggfSA9IHNwYW47XG4gICAgbGV0IGhpZGRlbiA9IGZhbHNlO1xuICAgIGlmIChjb2xsYXBzZURlcHRoICE9IG51bGwpIHtcbiAgICAgIGlmIChkZXB0aCA+PSBjb2xsYXBzZURlcHRoKSB7XG4gICAgICAgIGhpZGRlbiA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2xsYXBzZURlcHRoID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGhpZGRlbikge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChjaGlsZHJlbkhpZGRlbklEcy5oYXMoc3BhbklEKSkge1xuICAgICAgY29sbGFwc2VEZXB0aCA9IGRlcHRoICsgMTtcbiAgICB9XG4gICAgcm93U3RhdGVzLnB1c2goe1xuICAgICAgc3BhbixcbiAgICAgIGlzRGV0YWlsOiBmYWxzZSxcbiAgICAgIHNwYW5JbmRleDogaSxcbiAgICB9KTtcbiAgICBpZiAoZGV0YWlsU3RhdGVzLmhhcyhzcGFuSUQpKSB7XG4gICAgICByb3dTdGF0ZXMucHVzaCh7XG4gICAgICAgIHNwYW4sXG4gICAgICAgIGlzRGV0YWlsOiB0cnVlLFxuICAgICAgICBzcGFuSW5kZXg6IGksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJvd1N0YXRlcztcbn1cblxuZnVuY3Rpb24gZ2V0Q2xpcHBpbmcoY3VycmVudFZpZXdSYW5nZTogW251bWJlciwgbnVtYmVyXSkge1xuICBjb25zdCBbem9vbVN0YXJ0LCB6b29tRW5kXSA9IGN1cnJlbnRWaWV3UmFuZ2U7XG4gIHJldHVybiB7XG4gICAgbGVmdDogem9vbVN0YXJ0ID4gMCxcbiAgICByaWdodDogem9vbUVuZCA8IDEsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUm93U3RhdGVzRnJvbVRyYWNlKFxuICB0cmFjZTogVHJhY2UgfCBUTmlsLFxuICBjaGlsZHJlbkhpZGRlbklEczogU2V0PHN0cmluZz4sXG4gIGRldGFpbFN0YXRlczogTWFwPHN0cmluZywgRGV0YWlsU3RhdGUgfCBUTmlsPlxuKTogUm93U3RhdGVbXSB7XG4gIHJldHVybiB0cmFjZSA/IGdlbmVyYXRlUm93U3RhdGVzKHRyYWNlLnNwYW5zLCBjaGlsZHJlbkhpZGRlbklEcywgZGV0YWlsU3RhdGVzKSA6IFtdO1xufVxuXG5jb25zdCBtZW1vaXplZEdlbmVyYXRlUm93U3RhdGVzID0gbWVtb2l6ZU9uZShnZW5lcmF0ZVJvd1N0YXRlc0Zyb21UcmFjZSk7XG5jb25zdCBtZW1vaXplZFZpZXdCb3VuZHNGdW5jID0gbWVtb2l6ZU9uZShjcmVhdGVWaWV3ZWRCb3VuZHNGdW5jLCBpc0VxdWFsKTtcbmNvbnN0IG1lbW9pemVkR2V0Q2xpcHBpbmcgPSBtZW1vaXplT25lKGdldENsaXBwaW5nLCBpc0VxdWFsKTtcblxuLy8gZXhwb3J0IGZyb20gdGVzdHNcbmV4cG9ydCBjbGFzcyBVbnRoZW1lZFZpcnR1YWxpemVkVHJhY2VWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFZpcnR1YWxpemVkVHJhY2VWaWV3UHJvcHM+IHtcbiAgbGlzdFZpZXc6IExpc3RWaWV3IHwgVE5pbDtcbiAgdG9wVHJhY2VWaWV3UmVmID0gY3JlYXRlUmVmPEhUTUxEaXZFbGVtZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBWaXJ0dWFsaXplZFRyYWNlVmlld1Byb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IHsgc2V0VHJhY2UsIHRyYWNlLCB1aUZpbmQgfSA9IHByb3BzO1xuICAgIHNldFRyYWNlKHRyYWNlLCB1aUZpbmQpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5zY3JvbGxUb1NwYW4odGhpcy5wcm9wcy5mb2N1c2VkU3BhbklkKTtcbiAgfVxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHM6IFZpcnR1YWxpemVkVHJhY2VWaWV3UHJvcHMpIHtcbiAgICAvLyBJZiBhbnkgcHJvcCB1cGRhdGVzLCBWaXJ0dWFsaXplZFRyYWNlVmlld0ltcGwgc2hvdWxkIHVwZGF0ZS5cbiAgICBjb25zdCBuZXh0UHJvcEtleXMgPSBPYmplY3Qua2V5cyhuZXh0UHJvcHMpIGFzIEFycmF5PGtleW9mIFZpcnR1YWxpemVkVHJhY2VWaWV3UHJvcHM+O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV4dFByb3BLZXlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAobmV4dFByb3BzW25leHRQcm9wS2V5c1tpXV0gIT09IHRoaXMucHJvcHNbbmV4dFByb3BLZXlzW2ldXSkge1xuICAgICAgICAvLyBVbmxlc3MgdGhlIG9ubHkgY2hhbmdlIHdhcyBwcm9wcy5zaG91bGRTY3JvbGxUb0ZpcnN0VWlGaW5kTWF0Y2ggY2hhbmdpbmcgdG8gZmFsc2UuXG4gICAgICAgIGlmIChuZXh0UHJvcEtleXNbaV0gPT09ICdzaG91bGRTY3JvbGxUb0ZpcnN0VWlGaW5kTWF0Y2gnKSB7XG4gICAgICAgICAgaWYgKG5leHRQcm9wc1tuZXh0UHJvcEtleXNbaV1dKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wczogUmVhZG9ubHk8VmlydHVhbGl6ZWRUcmFjZVZpZXdQcm9wcz4pIHtcbiAgICBjb25zdCB7IHJlZ2lzdGVyQWNjZXNzb3JzLCB0cmFjZSB9ID0gcHJldlByb3BzO1xuICAgIGNvbnN0IHtcbiAgICAgIHNob3VsZFNjcm9sbFRvRmlyc3RVaUZpbmRNYXRjaCxcbiAgICAgIGNsZWFyU2hvdWxkU2Nyb2xsVG9GaXJzdFVpRmluZE1hdGNoLFxuICAgICAgc2Nyb2xsVG9GaXJzdFZpc2libGVTcGFuLFxuICAgICAgcmVnaXN0ZXJBY2Nlc3NvcnM6IG5leHRSZWdpc3RlckFjY2Vzc29ycyxcbiAgICAgIHNldFRyYWNlLFxuICAgICAgdHJhY2U6IG5leHRUcmFjZSxcbiAgICAgIHVpRmluZCxcbiAgICAgIGZvY3VzZWRTcGFuSWQsXG4gICAgICBmb2N1c2VkU3BhbklkRm9yU2VhcmNoLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHRyYWNlICE9PSBuZXh0VHJhY2UpIHtcbiAgICAgIHNldFRyYWNlKG5leHRUcmFjZSwgdWlGaW5kKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5saXN0VmlldyAmJiByZWdpc3RlckFjY2Vzc29ycyAhPT0gbmV4dFJlZ2lzdGVyQWNjZXNzb3JzKSB7XG4gICAgICBuZXh0UmVnaXN0ZXJBY2Nlc3NvcnModGhpcy5nZXRBY2Nlc3NvcnMoKSk7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFNjcm9sbFRvRmlyc3RVaUZpbmRNYXRjaCkge1xuICAgICAgc2Nyb2xsVG9GaXJzdFZpc2libGVTcGFuKCk7XG4gICAgICBjbGVhclNob3VsZFNjcm9sbFRvRmlyc3RVaUZpbmRNYXRjaCgpO1xuICAgIH1cblxuICAgIGlmIChmb2N1c2VkU3BhbklkICE9PSBwcmV2UHJvcHMuZm9jdXNlZFNwYW5JZCkge1xuICAgICAgdGhpcy5zY3JvbGxUb1NwYW4oZm9jdXNlZFNwYW5JZCk7XG4gICAgfVxuXG4gICAgaWYgKGZvY3VzZWRTcGFuSWRGb3JTZWFyY2ggIT09IHByZXZQcm9wcy5mb2N1c2VkU3BhbklkRm9yU2VhcmNoKSB7XG4gICAgICB0aGlzLnNjcm9sbFRvU3Bhbihmb2N1c2VkU3BhbklkRm9yU2VhcmNoKTtcbiAgICB9XG4gIH1cblxuICBnZXRSb3dTdGF0ZXMoKTogUm93U3RhdGVbXSB7XG4gICAgY29uc3QgeyBjaGlsZHJlbkhpZGRlbklEcywgZGV0YWlsU3RhdGVzLCB0cmFjZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gbWVtb2l6ZWRHZW5lcmF0ZVJvd1N0YXRlcyh0cmFjZSwgY2hpbGRyZW5IaWRkZW5JRHMsIGRldGFpbFN0YXRlcyk7XG4gIH1cblxuICBnZXRDbGlwcGluZygpOiB7IGxlZnQ6IGJvb2xlYW47IHJpZ2h0OiBib29sZWFuIH0ge1xuICAgIGNvbnN0IHsgY3VycmVudFZpZXdSYW5nZVRpbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIG1lbW9pemVkR2V0Q2xpcHBpbmcoY3VycmVudFZpZXdSYW5nZVRpbWUpO1xuICB9XG5cbiAgZ2V0Vmlld2VkQm91bmRzKCk6IFZpZXdlZEJvdW5kc0Z1bmN0aW9uVHlwZSB7XG4gICAgY29uc3QgeyBjdXJyZW50Vmlld1JhbmdlVGltZSwgdHJhY2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgW3pvb21TdGFydCwgem9vbUVuZF0gPSBjdXJyZW50Vmlld1JhbmdlVGltZTtcblxuICAgIHJldHVybiBtZW1vaXplZFZpZXdCb3VuZHNGdW5jKHtcbiAgICAgIG1pbjogdHJhY2Uuc3RhcnRUaW1lLFxuICAgICAgbWF4OiB0cmFjZS5lbmRUaW1lLFxuICAgICAgdmlld1N0YXJ0OiB6b29tU3RhcnQsXG4gICAgICB2aWV3RW5kOiB6b29tRW5kLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0QWNjZXNzb3JzKCkge1xuICAgIGNvbnN0IGx2ID0gdGhpcy5saXN0VmlldztcbiAgICBpZiAoIWx2KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpc3RWaWV3IHVuYXZhaWxhYmxlJyk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBnZXRWaWV3UmFuZ2U6IHRoaXMuZ2V0Vmlld1JhbmdlLFxuICAgICAgZ2V0U2VhcmNoZWRTcGFuSURzOiB0aGlzLmdldFNlYXJjaGVkU3BhbklEcyxcbiAgICAgIGdldENvbGxhcHNlZENoaWxkcmVuOiB0aGlzLmdldENvbGxhcHNlZENoaWxkcmVuLFxuICAgICAgZ2V0Vmlld0hlaWdodDogbHYuZ2V0Vmlld0hlaWdodCxcbiAgICAgIGdldEJvdHRvbVJvd0luZGV4VmlzaWJsZTogbHYuZ2V0Qm90dG9tVmlzaWJsZUluZGV4LFxuICAgICAgZ2V0VG9wUm93SW5kZXhWaXNpYmxlOiBsdi5nZXRUb3BWaXNpYmxlSW5kZXgsXG4gICAgICBnZXRSb3dQb3NpdGlvbjogbHYuZ2V0Um93UG9zaXRpb24sXG4gICAgICBtYXBSb3dJbmRleFRvU3BhbkluZGV4OiB0aGlzLm1hcFJvd0luZGV4VG9TcGFuSW5kZXgsXG4gICAgICBtYXBTcGFuSW5kZXhUb1Jvd0luZGV4OiB0aGlzLm1hcFNwYW5JbmRleFRvUm93SW5kZXgsXG4gICAgfTtcbiAgfVxuXG4gIGdldFZpZXdSYW5nZSA9ICgpID0+IHRoaXMucHJvcHMuY3VycmVudFZpZXdSYW5nZVRpbWU7XG5cbiAgZ2V0U2VhcmNoZWRTcGFuSURzID0gKCkgPT4gdGhpcy5wcm9wcy5maW5kTWF0Y2hlc0lEcztcblxuICBnZXRDb2xsYXBzZWRDaGlsZHJlbiA9ICgpID0+IHRoaXMucHJvcHMuY2hpbGRyZW5IaWRkZW5JRHM7XG5cbiAgbWFwUm93SW5kZXhUb1NwYW5JbmRleCA9IChpbmRleDogbnVtYmVyKSA9PiB0aGlzLmdldFJvd1N0YXRlcygpW2luZGV4XS5zcGFuSW5kZXg7XG5cbiAgbWFwU3BhbkluZGV4VG9Sb3dJbmRleCA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgbWF4ID0gdGhpcy5nZXRSb3dTdGF0ZXMoKS5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXg7IGkrKykge1xuICAgICAgY29uc3QgeyBzcGFuSW5kZXggfSA9IHRoaXMuZ2V0Um93U3RhdGVzKClbaV07XG4gICAgICBpZiAoc3BhbkluZGV4ID09PSBpbmRleCkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGB1bmFibGUgdG8gZmluZCByb3cgZm9yIHNwYW4gaW5kZXg6ICR7aW5kZXh9YCk7XG4gIH07XG5cbiAgc2V0TGlzdFZpZXcgPSAobGlzdFZpZXc6IExpc3RWaWV3IHwgVE5pbCkgPT4ge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9IHRoaXMubGlzdFZpZXcgIT09IGxpc3RWaWV3O1xuICAgIHRoaXMubGlzdFZpZXcgPSBsaXN0VmlldztcbiAgICBpZiAobGlzdFZpZXcgJiYgaXNDaGFuZ2VkKSB7XG4gICAgICB0aGlzLnByb3BzLnJlZ2lzdGVyQWNjZXNzb3JzKHRoaXMuZ2V0QWNjZXNzb3JzKCkpO1xuICAgIH1cbiAgfTtcblxuICAvLyB1c2UgbG9uZyBmb3JtIHN5bnRheCB0byBhdmVydCBmbG93IGVycm9yXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mbG93L2lzc3Vlcy8zMDc2I2lzc3VlY29tbWVudC0yOTA5NDQwNTFcbiAgZ2V0S2V5RnJvbUluZGV4ID0gKGluZGV4OiBudW1iZXIpID0+IHtcbiAgICBjb25zdCB7IGlzRGV0YWlsLCBzcGFuIH0gPSB0aGlzLmdldFJvd1N0YXRlcygpW2luZGV4XTtcbiAgICByZXR1cm4gYCR7c3Bhbi50cmFjZUlEfS0tJHtzcGFuLnNwYW5JRH0tLSR7aXNEZXRhaWwgPyAnZGV0YWlsJyA6ICdiYXInfWA7XG4gIH07XG5cbiAgZ2V0SW5kZXhGcm9tS2V5ID0gKGtleTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgcGFydHMgPSBrZXkuc3BsaXQoJy0tJyk7XG4gICAgY29uc3QgX3RyYWNlSUQgPSBwYXJ0c1swXTtcbiAgICBjb25zdCBfc3BhbklEID0gcGFydHNbMV07XG4gICAgY29uc3QgX2lzRGV0YWlsID0gcGFydHNbMl0gPT09ICdkZXRhaWwnO1xuICAgIGNvbnN0IG1heCA9IHRoaXMuZ2V0Um93U3RhdGVzKCkubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgIGNvbnN0IHsgc3BhbiwgaXNEZXRhaWwgfSA9IHRoaXMuZ2V0Um93U3RhdGVzKClbaV07XG4gICAgICBpZiAoc3Bhbi5zcGFuSUQgPT09IF9zcGFuSUQgJiYgc3Bhbi50cmFjZUlEID09PSBfdHJhY2VJRCAmJiBpc0RldGFpbCA9PT0gX2lzRGV0YWlsKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH07XG5cbiAgZ2V0Um93SGVpZ2h0ID0gKGluZGV4OiBudW1iZXIpID0+IHtcbiAgICBjb25zdCB7IHNwYW4sIGlzRGV0YWlsIH0gPSB0aGlzLmdldFJvd1N0YXRlcygpW2luZGV4XTtcbiAgICBpZiAoIWlzRGV0YWlsKSB7XG4gICAgICByZXR1cm4gREVGQVVMVF9IRUlHSFRTLmJhcjtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3Bhbi5sb2dzKSAmJiBzcGFuLmxvZ3MubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gREVGQVVMVF9IRUlHSFRTLmRldGFpbFdpdGhMb2dzO1xuICAgIH1cbiAgICByZXR1cm4gREVGQVVMVF9IRUlHSFRTLmRldGFpbDtcbiAgfTtcblxuICByZW5kZXJSb3cgPSAoa2V5OiBzdHJpbmcsIHN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzLCBpbmRleDogbnVtYmVyLCBhdHRyczoge30pID0+IHtcbiAgICBjb25zdCB7IGlzRGV0YWlsLCBzcGFuLCBzcGFuSW5kZXggfSA9IHRoaXMuZ2V0Um93U3RhdGVzKClbaW5kZXhdO1xuICAgIHJldHVybiBpc0RldGFpbFxuICAgICAgPyB0aGlzLnJlbmRlclNwYW5EZXRhaWxSb3coc3Bhbiwga2V5LCBzdHlsZSwgYXR0cnMpXG4gICAgICA6IHRoaXMucmVuZGVyU3BhbkJhclJvdyhzcGFuLCBzcGFuSW5kZXgsIGtleSwgc3R5bGUsIGF0dHJzKTtcbiAgfTtcblxuICBzY3JvbGxUb1NwYW4gPSAoc3BhbklEPzogc3RyaW5nKSA9PiB7XG4gICAgaWYgKHNwYW5JRCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGkgPSB0aGlzLmdldFJvd1N0YXRlcygpLmZpbmRJbmRleCgocm93KSA9PiByb3cuc3Bhbi5zcGFuSUQgPT09IHNwYW5JRCk7XG4gICAgaWYgKGkgPj0gMCkge1xuICAgICAgdGhpcy5saXN0Vmlldz8uc2Nyb2xsVG9JbmRleChpKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyU3BhbkJhclJvdyhzcGFuOiBUcmFjZVNwYW4sIHNwYW5JbmRleDogbnVtYmVyLCBrZXk6IHN0cmluZywgc3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMsIGF0dHJzOiB7fSkge1xuICAgIGNvbnN0IHsgc3BhbklEIH0gPSBzcGFuO1xuICAgIGNvbnN0IHsgc2VydmljZU5hbWUgfSA9IHNwYW4ucHJvY2VzcztcbiAgICBjb25zdCB7XG4gICAgICBjaGlsZHJlbkhpZGRlbklEcyxcbiAgICAgIGNoaWxkcmVuVG9nZ2xlLFxuICAgICAgZGV0YWlsU3RhdGVzLFxuICAgICAgZGV0YWlsVG9nZ2xlLFxuICAgICAgZmluZE1hdGNoZXNJRHMsXG4gICAgICBzcGFuTmFtZUNvbHVtbldpZHRoLFxuICAgICAgdHJhY2UsXG4gICAgICBzcGFuQmFyT3B0aW9ucyxcbiAgICAgIGhvdmVySW5kZW50R3VpZGVJZHMsXG4gICAgICBhZGRIb3ZlckluZGVudEd1aWRlSWQsXG4gICAgICByZW1vdmVIb3ZlckluZGVudEd1aWRlSWQsXG4gICAgICBjcmVhdGVTcGFuTGluayxcbiAgICAgIGZvY3VzZWRTcGFuSWQsXG4gICAgICBmb2N1c2VkU3BhbklkRm9yU2VhcmNoLFxuICAgICAgdGhlbWUsXG4gICAgICBkYXRhc291cmNlVHlwZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAvLyB0byBhdmVydCBmbG93IGVycm9yXG4gICAgaWYgKCF0cmFjZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGNvbG9yID0gZ2V0Q29sb3JCeUtleShzZXJ2aWNlTmFtZSwgdGhlbWUpO1xuICAgIGNvbnN0IGlzQ29sbGFwc2VkID0gY2hpbGRyZW5IaWRkZW5JRHMuaGFzKHNwYW5JRCk7XG4gICAgY29uc3QgaXNEZXRhaWxFeHBhbmRlZCA9IGRldGFpbFN0YXRlcy5oYXMoc3BhbklEKTtcbiAgICBjb25zdCBpc01hdGNoaW5nRmlsdGVyID0gZmluZE1hdGNoZXNJRHMgPyBmaW5kTWF0Y2hlc0lEcy5oYXMoc3BhbklEKSA6IGZhbHNlO1xuICAgIGNvbnN0IGlzRm9jdXNlZCA9IHNwYW5JRCA9PT0gZm9jdXNlZFNwYW5JZCB8fCBzcGFuSUQgPT09IGZvY3VzZWRTcGFuSWRGb3JTZWFyY2g7XG4gICAgY29uc3Qgc2hvd0Vycm9ySWNvbiA9IGlzRXJyb3JTcGFuKHNwYW4pIHx8IChpc0NvbGxhcHNlZCAmJiBzcGFuQ29udGFpbnNFcnJlZFNwYW4odHJhY2Uuc3BhbnMsIHNwYW5JbmRleCkpO1xuXG4gICAgLy8gQ2hlY2sgZm9yIGRpcmVjdCBjaGlsZCBcInNlcnZlclwiIHNwYW4gaWYgdGhlIHNwYW4gaXMgYSBcImNsaWVudFwiIHNwYW4uXG4gICAgbGV0IHJwYyA9IG51bGw7XG4gICAgaWYgKGlzQ29sbGFwc2VkKSB7XG4gICAgICBjb25zdCBycGNTcGFuID0gZmluZFNlcnZlckNoaWxkU3Bhbih0cmFjZS5zcGFucy5zbGljZShzcGFuSW5kZXgpKTtcbiAgICAgIGlmIChycGNTcGFuKSB7XG4gICAgICAgIGNvbnN0IHJwY1ZpZXdCb3VuZHMgPSB0aGlzLmdldFZpZXdlZEJvdW5kcygpKHJwY1NwYW4uc3RhcnRUaW1lLCBycGNTcGFuLnN0YXJ0VGltZSArIHJwY1NwYW4uZHVyYXRpb24pO1xuICAgICAgICBycGMgPSB7XG4gICAgICAgICAgY29sb3I6IGdldENvbG9yQnlLZXkocnBjU3Bhbi5wcm9jZXNzLnNlcnZpY2VOYW1lLCB0aGVtZSksXG4gICAgICAgICAgb3BlcmF0aW9uTmFtZTogcnBjU3Bhbi5vcGVyYXRpb25OYW1lLFxuICAgICAgICAgIHNlcnZpY2VOYW1lOiBycGNTcGFuLnByb2Nlc3Muc2VydmljZU5hbWUsXG4gICAgICAgICAgdmlld0VuZDogcnBjVmlld0JvdW5kcy5lbmQsXG4gICAgICAgICAgdmlld1N0YXJ0OiBycGNWaWV3Qm91bmRzLnN0YXJ0LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHBlZXJTZXJ2aWNlS1YgPSBzcGFuLnRhZ3MuZmluZCgoa3YpID0+IGt2LmtleSA9PT0gUEVFUl9TRVJWSUNFKTtcbiAgICAvLyBMZWFmLCBraW5kID09IGNsaWVudCBhbmQgaGFzIHBlZXIuc2VydmljZS50YWcsIGlzIGxpa2VseSBhIGNsaWVudCBzcGFuIHRoYXQgZG9lcyBhIHJlcXVlc3RcbiAgICAvLyB0byBhbiB1bmluc3RydW1lbnRlZC9leHRlcm5hbCBzZXJ2aWNlXG4gICAgbGV0IG5vSW5zdHJ1bWVudGVkU2VydmVyID0gbnVsbDtcbiAgICBpZiAoIXNwYW4uaGFzQ2hpbGRyZW4gJiYgcGVlclNlcnZpY2VLViAmJiBpc0tpbmRDbGllbnQoc3BhbikpIHtcbiAgICAgIG5vSW5zdHJ1bWVudGVkU2VydmVyID0ge1xuICAgICAgICBzZXJ2aWNlTmFtZTogcGVlclNlcnZpY2VLVi52YWx1ZSxcbiAgICAgICAgY29sb3I6IGdldENvbG9yQnlLZXkocGVlclNlcnZpY2VLVi52YWx1ZSwgdGhlbWUpLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdCBzdHlsZXMgPSBnZXRTdHlsZXModGhpcy5wcm9wcyk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucm93fSBrZXk9e2tleX0gc3R5bGU9e3N0eWxlfSB7Li4uYXR0cnN9PlxuICAgICAgICA8U3BhbkJhclJvd1xuICAgICAgICAgIGNsaXBwaW5nTGVmdD17dGhpcy5nZXRDbGlwcGluZygpLmxlZnR9XG4gICAgICAgICAgY2xpcHBpbmdSaWdodD17dGhpcy5nZXRDbGlwcGluZygpLnJpZ2h0fVxuICAgICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgICBzcGFuQmFyT3B0aW9ucz17c3BhbkJhck9wdGlvbnN9XG4gICAgICAgICAgY29sdW1uRGl2aXNpb249e3NwYW5OYW1lQ29sdW1uV2lkdGh9XG4gICAgICAgICAgaXNDaGlsZHJlbkV4cGFuZGVkPXshaXNDb2xsYXBzZWR9XG4gICAgICAgICAgaXNEZXRhaWxFeHBhbmRlZD17aXNEZXRhaWxFeHBhbmRlZH1cbiAgICAgICAgICBpc01hdGNoaW5nRmlsdGVyPXtpc01hdGNoaW5nRmlsdGVyfVxuICAgICAgICAgIGlzRm9jdXNlZD17aXNGb2N1c2VkfVxuICAgICAgICAgIG51bVRpY2tzPXtOVU1fVElDS1N9XG4gICAgICAgICAgb25EZXRhaWxUb2dnbGVkPXtkZXRhaWxUb2dnbGV9XG4gICAgICAgICAgb25DaGlsZHJlblRvZ2dsZWQ9e2NoaWxkcmVuVG9nZ2xlfVxuICAgICAgICAgIHJwYz17cnBjfVxuICAgICAgICAgIG5vSW5zdHJ1bWVudGVkU2VydmVyPXtub0luc3RydW1lbnRlZFNlcnZlcn1cbiAgICAgICAgICBzaG93RXJyb3JJY29uPXtzaG93RXJyb3JJY29ufVxuICAgICAgICAgIGdldFZpZXdlZEJvdW5kcz17dGhpcy5nZXRWaWV3ZWRCb3VuZHMoKX1cbiAgICAgICAgICB0cmFjZVN0YXJ0VGltZT17dHJhY2Uuc3RhcnRUaW1lfVxuICAgICAgICAgIHNwYW49e3NwYW59XG4gICAgICAgICAgaG92ZXJJbmRlbnRHdWlkZUlkcz17aG92ZXJJbmRlbnRHdWlkZUlkc31cbiAgICAgICAgICBhZGRIb3ZlckluZGVudEd1aWRlSWQ9e2FkZEhvdmVySW5kZW50R3VpZGVJZH1cbiAgICAgICAgICByZW1vdmVIb3ZlckluZGVudEd1aWRlSWQ9e3JlbW92ZUhvdmVySW5kZW50R3VpZGVJZH1cbiAgICAgICAgICBjcmVhdGVTcGFuTGluaz17Y3JlYXRlU3Bhbkxpbmt9XG4gICAgICAgICAgZGF0YXNvdXJjZVR5cGU9e2RhdGFzb3VyY2VUeXBlfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlclNwYW5EZXRhaWxSb3coc3BhbjogVHJhY2VTcGFuLCBrZXk6IHN0cmluZywgc3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMsIGF0dHJzOiB7fSkge1xuICAgIGNvbnN0IHsgc3BhbklEIH0gPSBzcGFuO1xuICAgIGNvbnN0IHsgc2VydmljZU5hbWUgfSA9IHNwYW4ucHJvY2VzcztcbiAgICBjb25zdCB7XG4gICAgICBkZXRhaWxMb2dJdGVtVG9nZ2xlLFxuICAgICAgZGV0YWlsTG9nc1RvZ2dsZSxcbiAgICAgIGRldGFpbFByb2Nlc3NUb2dnbGUsXG4gICAgICBkZXRhaWxSZWZlcmVuY2VzVG9nZ2xlLFxuICAgICAgZGV0YWlsUmVmZXJlbmNlSXRlbVRvZ2dsZSxcbiAgICAgIGRldGFpbFdhcm5pbmdzVG9nZ2xlLFxuICAgICAgZGV0YWlsU3RhY2tUcmFjZXNUb2dnbGUsXG4gICAgICBkZXRhaWxTdGF0ZXMsXG4gICAgICBkZXRhaWxUYWdzVG9nZ2xlLFxuICAgICAgZGV0YWlsVG9nZ2xlLFxuICAgICAgc3Bhbk5hbWVDb2x1bW5XaWR0aCxcbiAgICAgIHRyYWNlLFxuICAgICAgdGltZVpvbmUsXG4gICAgICBob3ZlckluZGVudEd1aWRlSWRzLFxuICAgICAgYWRkSG92ZXJJbmRlbnRHdWlkZUlkLFxuICAgICAgcmVtb3ZlSG92ZXJJbmRlbnRHdWlkZUlkLFxuICAgICAgbGlua3NHZXR0ZXIsXG4gICAgICBjcmVhdGVTcGFuTGluayxcbiAgICAgIGZvY3VzZWRTcGFuSWQsXG4gICAgICBjcmVhdGVGb2N1c1NwYW5MaW5rLFxuICAgICAgdG9wT2ZWaWV3UmVmVHlwZSxcbiAgICAgIHRoZW1lLFxuICAgICAgZGF0YXNvdXJjZVR5cGUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZGV0YWlsU3RhdGUgPSBkZXRhaWxTdGF0ZXMuZ2V0KHNwYW5JRCk7XG4gICAgaWYgKCF0cmFjZSB8fCAhZGV0YWlsU3RhdGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBjb2xvciA9IGdldENvbG9yQnlLZXkoc2VydmljZU5hbWUsIHRoZW1lKTtcbiAgICBjb25zdCBzdHlsZXMgPSBnZXRTdHlsZXModGhpcy5wcm9wcyk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucm93fSBrZXk9e2tleX0gc3R5bGU9e3sgLi4uc3R5bGUsIHpJbmRleDogMSB9fSB7Li4uYXR0cnN9PlxuICAgICAgICA8U3BhbkRldGFpbFJvd1xuICAgICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgICBjb2x1bW5EaXZpc2lvbj17c3Bhbk5hbWVDb2x1bW5XaWR0aH1cbiAgICAgICAgICBvbkRldGFpbFRvZ2dsZWQ9e2RldGFpbFRvZ2dsZX1cbiAgICAgICAgICBkZXRhaWxTdGF0ZT17ZGV0YWlsU3RhdGV9XG4gICAgICAgICAgbGlua3NHZXR0ZXI9e2xpbmtzR2V0dGVyfVxuICAgICAgICAgIGxvZ0l0ZW1Ub2dnbGU9e2RldGFpbExvZ0l0ZW1Ub2dnbGV9XG4gICAgICAgICAgbG9nc1RvZ2dsZT17ZGV0YWlsTG9nc1RvZ2dsZX1cbiAgICAgICAgICBwcm9jZXNzVG9nZ2xlPXtkZXRhaWxQcm9jZXNzVG9nZ2xlfVxuICAgICAgICAgIHJlZmVyZW5jZUl0ZW1Ub2dnbGU9e2RldGFpbFJlZmVyZW5jZUl0ZW1Ub2dnbGV9XG4gICAgICAgICAgcmVmZXJlbmNlc1RvZ2dsZT17ZGV0YWlsUmVmZXJlbmNlc1RvZ2dsZX1cbiAgICAgICAgICB3YXJuaW5nc1RvZ2dsZT17ZGV0YWlsV2FybmluZ3NUb2dnbGV9XG4gICAgICAgICAgc3RhY2tUcmFjZXNUb2dnbGU9e2RldGFpbFN0YWNrVHJhY2VzVG9nZ2xlfVxuICAgICAgICAgIHNwYW49e3NwYW59XG4gICAgICAgICAgdGltZVpvbmU9e3RpbWVab25lfVxuICAgICAgICAgIHRhZ3NUb2dnbGU9e2RldGFpbFRhZ3NUb2dnbGV9XG4gICAgICAgICAgdHJhY2VTdGFydFRpbWU9e3RyYWNlLnN0YXJ0VGltZX1cbiAgICAgICAgICBob3ZlckluZGVudEd1aWRlSWRzPXtob3ZlckluZGVudEd1aWRlSWRzfVxuICAgICAgICAgIGFkZEhvdmVySW5kZW50R3VpZGVJZD17YWRkSG92ZXJJbmRlbnRHdWlkZUlkfVxuICAgICAgICAgIHJlbW92ZUhvdmVySW5kZW50R3VpZGVJZD17cmVtb3ZlSG92ZXJJbmRlbnRHdWlkZUlkfVxuICAgICAgICAgIGNyZWF0ZVNwYW5MaW5rPXtjcmVhdGVTcGFuTGlua31cbiAgICAgICAgICBmb2N1c2VkU3BhbklkPXtmb2N1c2VkU3BhbklkfVxuICAgICAgICAgIGNyZWF0ZUZvY3VzU3Bhbkxpbms9e2NyZWF0ZUZvY3VzU3Bhbkxpbmt9XG4gICAgICAgICAgdG9wT2ZWaWV3UmVmVHlwZT17dG9wT2ZWaWV3UmVmVHlwZX1cbiAgICAgICAgICBkYXRhc291cmNlVHlwZT17ZGF0YXNvdXJjZVR5cGV9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgc2Nyb2xsVG9Ub3AgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB0b3BPZlZpZXdSZWYsIGRhdGFzb3VyY2VUeXBlLCB0cmFjZSB9ID0gdGhpcy5wcm9wcztcbiAgICB0b3BPZlZpZXdSZWY/LmN1cnJlbnQ/LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnIH0pO1xuICAgIHJlcG9ydEludGVyYWN0aW9uKCdncmFmYW5hX3RyYWNlc190cmFjZV92aWV3X3Njcm9sbF90b190b3BfY2xpY2tlZCcsIHtcbiAgICAgIGRhdGFzb3VyY2VUeXBlOiBkYXRhc291cmNlVHlwZSxcbiAgICAgIGdyYWZhbmFfdmVyc2lvbjogY29uZmlnLmJ1aWxkSW5mby52ZXJzaW9uLFxuICAgICAgbnVtU2VydmljZXM6IHRyYWNlLnNlcnZpY2VzLmxlbmd0aCxcbiAgICAgIG51bVNwYW5zOiB0cmFjZS5zcGFucy5sZW5ndGgsXG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHN0eWxlcyA9IGdldFN0eWxlcyh0aGlzLnByb3BzKTtcbiAgICBjb25zdCB7IHNjcm9sbEVsZW1lbnQgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgIDxMaXN0Vmlld1xuICAgICAgICAgIHJlZj17dGhpcy5zZXRMaXN0Vmlld31cbiAgICAgICAgICBkYXRhTGVuZ3RoPXt0aGlzLmdldFJvd1N0YXRlcygpLmxlbmd0aH1cbiAgICAgICAgICBpdGVtSGVpZ2h0R2V0dGVyPXt0aGlzLmdldFJvd0hlaWdodH1cbiAgICAgICAgICBpdGVtUmVuZGVyZXI9e3RoaXMucmVuZGVyUm93fVxuICAgICAgICAgIHZpZXdCdWZmZXI9ezUwfVxuICAgICAgICAgIHZpZXdCdWZmZXJNaW49ezUwfVxuICAgICAgICAgIGl0ZW1zV3JhcHBlckNsYXNzTmFtZT17c3R5bGVzLnJvd3NXcmFwcGVyfVxuICAgICAgICAgIGdldEtleUZyb21JbmRleD17dGhpcy5nZXRLZXlGcm9tSW5kZXh9XG4gICAgICAgICAgZ2V0SW5kZXhGcm9tS2V5PXt0aGlzLmdldEluZGV4RnJvbUtleX1cbiAgICAgICAgICB3aW5kb3dTY3JvbGxlcj17ZmFsc2V9XG4gICAgICAgICAgc2Nyb2xsRWxlbWVudD17c2Nyb2xsRWxlbWVudH1cbiAgICAgICAgLz5cbiAgICAgICAgPFRvb2xiYXJCdXR0b25cbiAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5zY3JvbGxUb1RvcEJ1dHRvbn1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNjcm9sbFRvVG9wfVxuICAgICAgICAgIHRpdGxlPVwiU2Nyb2xsIHRvIHRvcFwiXG4gICAgICAgICAgaWNvbj1cImFycm93LXVwXCJcbiAgICAgICAgPjwvVG9vbGJhckJ1dHRvbj5cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFRoZW1lMihVbnRoZW1lZFZpcnR1YWxpemVkVHJhY2VWaWV3KTtcbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLEdBQUcsUUFBUSxjQUFjO0FBQ2xDLFNBQVNDLE9BQU8sUUFBUSxRQUFRO0FBQ2hDLE9BQU9DLFVBQVUsTUFBTSxhQUFhO0FBQ3BDLE9BQU8sS0FBS0MsS0FBSyxNQUFNLE9BQU87QUFDOUIsU0FBU0MsU0FBUyxRQUFtQixPQUFPO0FBRzVDLFNBQVNDLE1BQU0sRUFBRUMsaUJBQWlCLFFBQVEsa0JBQWtCO0FBQzVELFNBQVNDLGFBQWEsRUFBRUMsVUFBVSxFQUFFQyxhQUFhLFFBQVEsYUFBYTtBQUd0RSxTQUFTQyxZQUFZLFFBQVEsdUJBQXVCO0FBSXBELFNBQVNDLGFBQWEsUUFBUSwwQkFBMEI7QUFFeEQsT0FBT0MsUUFBUSxNQUFNLFlBQVk7QUFDakMsT0FBT0MsVUFBVSxNQUFNLGNBQWM7QUFFckMsT0FBT0MsYUFBYSxNQUFNLGlCQUFpQjtBQUMzQyxTQUNFQyxzQkFBc0IsRUFDdEJDLG1CQUFtQixFQUNuQkMsV0FBVyxFQUNYQyxZQUFZLEVBQ1pDLHFCQUFxQixRQUVoQixTQUFTO0FBQUMsU0FBQUMsR0FBQSxJQUFBQyxJQUFBLEVBQUFDLFFBQUEsSUFBQUMsU0FB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