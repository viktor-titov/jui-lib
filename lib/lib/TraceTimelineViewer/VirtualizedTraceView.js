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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJpc0VxdWFsIiwibWVtb2l6ZU9uZSIsIlJlYWN0IiwiY3JlYXRlUmVmIiwiY29uZmlnIiwicmVwb3J0SW50ZXJhY3Rpb24iLCJzdHlsZXNGYWN0b3J5Iiwid2l0aFRoZW1lMiIsIlRvb2xiYXJCdXR0b24iLCJQRUVSX1NFUlZJQ0UiLCJnZXRDb2xvckJ5S2V5IiwiTGlzdFZpZXciLCJTcGFuQmFyUm93IiwiU3BhbkRldGFpbFJvdyIsImNyZWF0ZVZpZXdlZEJvdW5kc0Z1bmMiLCJmaW5kU2VydmVyQ2hpbGRTcGFuIiwiaXNFcnJvclNwYW4iLCJpc0tpbmRDbGllbnQiLCJzcGFuQ29udGFpbnNFcnJlZFNwYW4iLCJqc3giLCJfanN4IiwiRnJhZ21lbnQiLCJfRnJhZ21lbnQiLCJqc3hzIiwiX2pzeHMiLCJnZXRTdHlsZXMiLCJwcm9wcyIsInRvcE9mVmlld1JlZlR5cGUiLCJwb3NpdGlvbiIsIlRvcE9mVmlld1JlZlR5cGUiLCJFeHBsb3JlIiwicm93c1dyYXBwZXIiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsTG9vc2UiLCJyb3ciLCJfdGVtcGxhdGVPYmplY3QyIiwic2Nyb2xsVG9Ub3BCdXR0b24iLCJfdGVtcGxhdGVPYmplY3QzIiwiREVGQVVMVF9IRUlHSFRTIiwiYmFyIiwiZGV0YWlsIiwiZGV0YWlsV2l0aExvZ3MiLCJOVU1fVElDS1MiLCJnZW5lcmF0ZVJvd1N0YXRlcyIsInNwYW5zIiwiY2hpbGRyZW5IaWRkZW5JRHMiLCJkZXRhaWxTdGF0ZXMiLCJjb2xsYXBzZURlcHRoIiwicm93U3RhdGVzIiwiaSIsImxlbmd0aCIsInNwYW4iLCJzcGFuSUQiLCJkZXB0aCIsImhpZGRlbiIsImhhcyIsInB1c2giLCJpc0RldGFpbCIsInNwYW5JbmRleCIsImdldENsaXBwaW5nIiwiY3VycmVudFZpZXdSYW5nZSIsInpvb21TdGFydCIsInpvb21FbmQiLCJsZWZ0IiwicmlnaHQiLCJnZW5lcmF0ZVJvd1N0YXRlc0Zyb21UcmFjZSIsInRyYWNlIiwibWVtb2l6ZWRHZW5lcmF0ZVJvd1N0YXRlcyIsIm1lbW9pemVkVmlld0JvdW5kc0Z1bmMiLCJtZW1vaXplZEdldENsaXBwaW5nIiwiVW50aGVtZWRWaXJ0dWFsaXplZFRyYWNlVmlldyIsIl9SZWFjdCRDb21wb25lbnQiLCJfdGhpcyIsImNhbGwiLCJ0b3BUcmFjZVZpZXdSZWYiLCJnZXRWaWV3UmFuZ2UiLCJjdXJyZW50Vmlld1JhbmdlVGltZSIsImdldFNlYXJjaGVkU3BhbklEcyIsImZpbmRNYXRjaGVzSURzIiwiZ2V0Q29sbGFwc2VkQ2hpbGRyZW4iLCJtYXBSb3dJbmRleFRvU3BhbkluZGV4IiwiaW5kZXgiLCJnZXRSb3dTdGF0ZXMiLCJtYXBTcGFuSW5kZXhUb1Jvd0luZGV4IiwibWF4IiwiRXJyb3IiLCJzZXRMaXN0VmlldyIsImxpc3RWaWV3IiwiaXNDaGFuZ2VkIiwicmVnaXN0ZXJBY2Nlc3NvcnMiLCJnZXRBY2Nlc3NvcnMiLCJnZXRLZXlGcm9tSW5kZXgiLCJfdGhpcyRnZXRSb3dTdGF0ZXMkaW4iLCJ0cmFjZUlEIiwiZ2V0SW5kZXhGcm9tS2V5Iiwia2V5IiwicGFydHMiLCJzcGxpdCIsIl90cmFjZUlEIiwiX3NwYW5JRCIsIl9pc0RldGFpbCIsIl90aGlzJGdldFJvd1N0YXRlcyRpIiwiZ2V0Um93SGVpZ2h0IiwiX3RoaXMkZ2V0Um93U3RhdGVzJGluMiIsIkFycmF5IiwiaXNBcnJheSIsImxvZ3MiLCJyZW5kZXJSb3ciLCJzdHlsZSIsImF0dHJzIiwiX3RoaXMkZ2V0Um93U3RhdGVzJGluMyIsInJlbmRlclNwYW5EZXRhaWxSb3ciLCJyZW5kZXJTcGFuQmFyUm93Iiwic2Nyb2xsVG9TcGFuIiwiZmluZEluZGV4IiwiX3RoaXMkbGlzdFZpZXciLCJzY3JvbGxUb0luZGV4Iiwic2Nyb2xsVG9Ub3AiLCJfdG9wT2ZWaWV3UmVmJGN1cnJlbnQiLCJfdGhpcyRwcm9wcyIsInRvcE9mVmlld1JlZiIsImRhdGFzb3VyY2VUeXBlIiwiY3VycmVudCIsInNjcm9sbEludG9WaWV3IiwiYmVoYXZpb3IiLCJncmFmYW5hX3ZlcnNpb24iLCJidWlsZEluZm8iLCJ2ZXJzaW9uIiwibnVtU2VydmljZXMiLCJzZXJ2aWNlcyIsIm51bVNwYW5zIiwic2V0VHJhY2UiLCJ1aUZpbmQiLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsImNvbXBvbmVudERpZE1vdW50IiwiZm9jdXNlZFNwYW5JZCIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsIm5leHRQcm9wcyIsIm5leHRQcm9wS2V5cyIsIk9iamVjdCIsImtleXMiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJfdGhpcyRwcm9wczIiLCJzaG91bGRTY3JvbGxUb0ZpcnN0VWlGaW5kTWF0Y2giLCJjbGVhclNob3VsZFNjcm9sbFRvRmlyc3RVaUZpbmRNYXRjaCIsInNjcm9sbFRvRmlyc3RWaXNpYmxlU3BhbiIsIm5leHRSZWdpc3RlckFjY2Vzc29ycyIsIm5leHRUcmFjZSIsImZvY3VzZWRTcGFuSWRGb3JTZWFyY2giLCJfdGhpcyRwcm9wczMiLCJnZXRWaWV3ZWRCb3VuZHMiLCJfdGhpcyRwcm9wczQiLCJtaW4iLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwidmlld1N0YXJ0Iiwidmlld0VuZCIsImx2IiwiZ2V0Vmlld0hlaWdodCIsImdldEJvdHRvbVJvd0luZGV4VmlzaWJsZSIsImdldEJvdHRvbVZpc2libGVJbmRleCIsImdldFRvcFJvd0luZGV4VmlzaWJsZSIsImdldFRvcFZpc2libGVJbmRleCIsImdldFJvd1Bvc2l0aW9uIiwic2VydmljZU5hbWUiLCJwcm9jZXNzIiwiX3RoaXMkcHJvcHM1IiwiY2hpbGRyZW5Ub2dnbGUiLCJkZXRhaWxUb2dnbGUiLCJzcGFuTmFtZUNvbHVtbldpZHRoIiwic3BhbkJhck9wdGlvbnMiLCJob3ZlckluZGVudEd1aWRlSWRzIiwiYWRkSG92ZXJJbmRlbnRHdWlkZUlkIiwicmVtb3ZlSG92ZXJJbmRlbnRHdWlkZUlkIiwiY3JlYXRlU3BhbkxpbmsiLCJ0aGVtZSIsImNvbG9yIiwiaXNDb2xsYXBzZWQiLCJpc0RldGFpbEV4cGFuZGVkIiwiaXNNYXRjaGluZ0ZpbHRlciIsImlzRm9jdXNlZCIsInNob3dFcnJvckljb24iLCJycGMiLCJycGNTcGFuIiwic2xpY2UiLCJycGNWaWV3Qm91bmRzIiwiZHVyYXRpb24iLCJvcGVyYXRpb25OYW1lIiwiZW5kIiwic3RhcnQiLCJwZWVyU2VydmljZUtWIiwidGFncyIsImZpbmQiLCJrdiIsIm5vSW5zdHJ1bWVudGVkU2VydmVyIiwiaGFzQ2hpbGRyZW4iLCJ2YWx1ZSIsInN0eWxlcyIsIl9leHRlbmRzIiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJjbGlwcGluZ0xlZnQiLCJjbGlwcGluZ1JpZ2h0IiwiY29sdW1uRGl2aXNpb24iLCJpc0NoaWxkcmVuRXhwYW5kZWQiLCJudW1UaWNrcyIsIm9uRGV0YWlsVG9nZ2xlZCIsIm9uQ2hpbGRyZW5Ub2dnbGVkIiwidHJhY2VTdGFydFRpbWUiLCJfdGhpcyRwcm9wczYiLCJkZXRhaWxMb2dJdGVtVG9nZ2xlIiwiZGV0YWlsTG9nc1RvZ2dsZSIsImRldGFpbFByb2Nlc3NUb2dnbGUiLCJkZXRhaWxSZWZlcmVuY2VzVG9nZ2xlIiwiZGV0YWlsUmVmZXJlbmNlSXRlbVRvZ2dsZSIsImRldGFpbFdhcm5pbmdzVG9nZ2xlIiwiZGV0YWlsU3RhY2tUcmFjZXNUb2dnbGUiLCJkZXRhaWxUYWdzVG9nZ2xlIiwidGltZVpvbmUiLCJsaW5rc0dldHRlciIsImNyZWF0ZUZvY3VzU3BhbkxpbmsiLCJkZXRhaWxTdGF0ZSIsImdldCIsInpJbmRleCIsImxvZ0l0ZW1Ub2dnbGUiLCJsb2dzVG9nZ2xlIiwicHJvY2Vzc1RvZ2dsZSIsInJlZmVyZW5jZUl0ZW1Ub2dnbGUiLCJyZWZlcmVuY2VzVG9nZ2xlIiwid2FybmluZ3NUb2dnbGUiLCJzdGFja1RyYWNlc1RvZ2dsZSIsInRhZ3NUb2dnbGUiLCJyZW5kZXIiLCJzY3JvbGxFbGVtZW50IiwicmVmIiwiZGF0YUxlbmd0aCIsIml0ZW1IZWlnaHRHZXR0ZXIiLCJpdGVtUmVuZGVyZXIiLCJ2aWV3QnVmZmVyIiwidmlld0J1ZmZlck1pbiIsIml0ZW1zV3JhcHBlckNsYXNzTmFtZSIsIndpbmRvd1Njcm9sbGVyIiwib25DbGljayIsInRpdGxlIiwiaWNvbiIsIkNvbXBvbmVudCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvVHJhY2VUaW1lbGluZVZpZXdlci9WaXJ0dWFsaXplZFRyYWNlVmlldy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2Nzcyc7XG5pbXBvcnQgeyBpc0VxdWFsIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBtZW1vaXplT25lIGZyb20gJ21lbW9pemUtb25lJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNyZWF0ZVJlZiwgUmVmT2JqZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBHcmFmYW5hVGhlbWUyLCBMaW5rTW9kZWwsIFRpbWVab25lIH0gZnJvbSAnQGdyYWZhbmEvZGF0YSc7XG5pbXBvcnQgeyBjb25maWcsIHJlcG9ydEludGVyYWN0aW9uIH0gZnJvbSAnQGdyYWZhbmEvcnVudGltZSc7XG5pbXBvcnQgeyBzdHlsZXNGYWN0b3J5LCB3aXRoVGhlbWUyLCBUb29sYmFyQnV0dG9uIH0gZnJvbSAnQGdyYWZhbmEvdWknO1xuXG5pbXBvcnQgeyBBY2Nlc3NvcnMgfSBmcm9tICcuLi9TY3JvbGxNYW5hZ2VyJztcbmltcG9ydCB7IFBFRVJfU0VSVklDRSB9IGZyb20gJy4uL2NvbnN0YW50cy90YWcta2V5cyc7XG5pbXBvcnQgeyBTcGFuQmFyT3B0aW9ucywgU3BhbkxpbmtGdW5jLCBUTmlsIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IFRUcmFjZVRpbWVsaW5lIGZyb20gJy4uL3R5cGVzL1RUcmFjZVRpbWVsaW5lJztcbmltcG9ydCB7IFRyYWNlTG9nLCBUcmFjZVNwYW4sIFRyYWNlLCBUcmFjZUtleVZhbHVlUGFpciwgVHJhY2VMaW5rLCBUcmFjZVNwYW5SZWZlcmVuY2UgfSBmcm9tICcuLi90eXBlcy90cmFjZSc7XG5pbXBvcnQgeyBnZXRDb2xvckJ5S2V5IH0gZnJvbSAnLi4vdXRpbHMvY29sb3ItZ2VuZXJhdG9yJztcblxuaW1wb3J0IExpc3RWaWV3IGZyb20gJy4vTGlzdFZpZXcnO1xuaW1wb3J0IFNwYW5CYXJSb3cgZnJvbSAnLi9TcGFuQmFyUm93JztcbmltcG9ydCBEZXRhaWxTdGF0ZSBmcm9tICcuL1NwYW5EZXRhaWwvRGV0YWlsU3RhdGUnO1xuaW1wb3J0IFNwYW5EZXRhaWxSb3cgZnJvbSAnLi9TcGFuRGV0YWlsUm93JztcbmltcG9ydCB7XG4gIGNyZWF0ZVZpZXdlZEJvdW5kc0Z1bmMsXG4gIGZpbmRTZXJ2ZXJDaGlsZFNwYW4sXG4gIGlzRXJyb3JTcGFuLFxuICBpc0tpbmRDbGllbnQsXG4gIHNwYW5Db250YWluc0VycmVkU3BhbixcbiAgVmlld2VkQm91bmRzRnVuY3Rpb25UeXBlLFxufSBmcm9tICcuL3V0aWxzJztcblxudHlwZSBURXh0cmFjdFVpRmluZEZyb21TdGF0ZVJldHVybiA9IHtcbiAgdWlGaW5kOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG59O1xuXG5jb25zdCBnZXRTdHlsZXMgPSBzdHlsZXNGYWN0b3J5KChwcm9wczogVFZpcnR1YWxpemVkVHJhY2VWaWV3T3duUHJvcHMpID0+IHtcbiAgY29uc3QgeyB0b3BPZlZpZXdSZWZUeXBlIH0gPSBwcm9wcztcbiAgY29uc3QgcG9zaXRpb24gPSB0b3BPZlZpZXdSZWZUeXBlID09PSBUb3BPZlZpZXdSZWZUeXBlLkV4cGxvcmUgPyAnZml4ZWQnIDogJ2Fic29sdXRlJztcblxuICByZXR1cm4ge1xuICAgIHJvd3NXcmFwcGVyOiBjc3NgXG4gICAgICB3aWR0aDogMTAwJTtcbiAgICBgLFxuICAgIHJvdzogY3NzYFxuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgYCxcbiAgICBzY3JvbGxUb1RvcEJ1dHRvbjogY3NzYFxuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICB3aWR0aDogNDBweDtcbiAgICAgIGhlaWdodDogNDBweDtcbiAgICAgIHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcbiAgICAgIGJvdHRvbTogMzBweDtcbiAgICAgIHJpZ2h0OiAzMHB4O1xuICAgICAgei1pbmRleDogMTtcbiAgICBgLFxuICB9O1xufSk7XG5cbnR5cGUgUm93U3RhdGUgPSB7XG4gIGlzRGV0YWlsOiBib29sZWFuO1xuICBzcGFuOiBUcmFjZVNwYW47XG4gIHNwYW5JbmRleDogbnVtYmVyO1xufTtcblxuZXhwb3J0IGVudW0gVG9wT2ZWaWV3UmVmVHlwZSB7XG4gIEV4cGxvcmUgPSAnRXhwbG9yZScsXG4gIFBhbmVsID0gJ1BhbmVsJyxcbn1cblxudHlwZSBUVmlydHVhbGl6ZWRUcmFjZVZpZXdPd25Qcm9wcyA9IHtcbiAgY3VycmVudFZpZXdSYW5nZVRpbWU6IFtudW1iZXIsIG51bWJlcl07XG4gIHRpbWVab25lOiBUaW1lWm9uZTtcbiAgZmluZE1hdGNoZXNJRHM6IFNldDxzdHJpbmc+IHwgVE5pbDtcbiAgc2Nyb2xsVG9GaXJzdFZpc2libGVTcGFuOiAoKSA9PiB2b2lkO1xuICByZWdpc3RlckFjY2Vzc29yczogKGFjY2Vzb3JzOiBBY2Nlc3NvcnMpID0+IHZvaWQ7XG4gIHRyYWNlOiBUcmFjZTtcbiAgc3BhbkJhck9wdGlvbnM6IFNwYW5CYXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICBsaW5rc0dldHRlcjogKHNwYW46IFRyYWNlU3BhbiwgaXRlbXM6IFRyYWNlS2V5VmFsdWVQYWlyW10sIGl0ZW1JbmRleDogbnVtYmVyKSA9PiBUcmFjZUxpbmtbXTtcbiAgY2hpbGRyZW5Ub2dnbGU6IChzcGFuSUQ6IHN0cmluZykgPT4gdm9pZDtcbiAgY2xlYXJTaG91bGRTY3JvbGxUb0ZpcnN0VWlGaW5kTWF0Y2g6ICgpID0+IHZvaWQ7XG4gIGRldGFpbExvZ0l0ZW1Ub2dnbGU6IChzcGFuSUQ6IHN0cmluZywgbG9nOiBUcmFjZUxvZykgPT4gdm9pZDtcbiAgZGV0YWlsTG9nc1RvZ2dsZTogKHNwYW5JRDogc3RyaW5nKSA9PiB2b2lkO1xuICBkZXRhaWxXYXJuaW5nc1RvZ2dsZTogKHNwYW5JRDogc3RyaW5nKSA9PiB2b2lkO1xuICBkZXRhaWxTdGFja1RyYWNlc1RvZ2dsZTogKHNwYW5JRDogc3RyaW5nKSA9PiB2b2lkO1xuICBkZXRhaWxSZWZlcmVuY2VzVG9nZ2xlOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGRldGFpbFJlZmVyZW5jZUl0ZW1Ub2dnbGU6IChzcGFuSUQ6IHN0cmluZywgcmVmZXJlbmNlOiBUcmFjZVNwYW5SZWZlcmVuY2UpID0+IHZvaWQ7XG4gIGRldGFpbFByb2Nlc3NUb2dnbGU6IChzcGFuSUQ6IHN0cmluZykgPT4gdm9pZDtcbiAgZGV0YWlsVGFnc1RvZ2dsZTogKHNwYW5JRDogc3RyaW5nKSA9PiB2b2lkO1xuICBkZXRhaWxUb2dnbGU6IChzcGFuSUQ6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0U3Bhbk5hbWVDb2x1bW5XaWR0aDogKHdpZHRoOiBudW1iZXIpID0+IHZvaWQ7XG4gIHNldFRyYWNlOiAodHJhY2U6IFRyYWNlIHwgVE5pbCwgdWlGaW5kOiBzdHJpbmcgfCBUTmlsKSA9PiB2b2lkO1xuICBob3ZlckluZGVudEd1aWRlSWRzOiBTZXQ8c3RyaW5nPjtcbiAgYWRkSG92ZXJJbmRlbnRHdWlkZUlkOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHJlbW92ZUhvdmVySW5kZW50R3VpZGVJZDogKHNwYW5JRDogc3RyaW5nKSA9PiB2b2lkO1xuICB0aGVtZTogR3JhZmFuYVRoZW1lMjtcbiAgY3JlYXRlU3Bhbkxpbms/OiBTcGFuTGlua0Z1bmM7XG4gIHNjcm9sbEVsZW1lbnQ/OiBFbGVtZW50O1xuICBmb2N1c2VkU3BhbklkPzogc3RyaW5nO1xuICBmb2N1c2VkU3BhbklkRm9yU2VhcmNoOiBzdHJpbmc7XG4gIGNyZWF0ZUZvY3VzU3Bhbkxpbms6ICh0cmFjZUlkOiBzdHJpbmcsIHNwYW5JZDogc3RyaW5nKSA9PiBMaW5rTW9kZWw7XG4gIHRvcE9mVmlld1JlZj86IFJlZk9iamVjdDxIVE1MRGl2RWxlbWVudD47XG4gIHRvcE9mVmlld1JlZlR5cGU/OiBUb3BPZlZpZXdSZWZUeXBlO1xuICBkYXRhc291cmNlVHlwZTogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgVmlydHVhbGl6ZWRUcmFjZVZpZXdQcm9wcyA9IFRWaXJ0dWFsaXplZFRyYWNlVmlld093blByb3BzICYgVEV4dHJhY3RVaUZpbmRGcm9tU3RhdGVSZXR1cm4gJiBUVHJhY2VUaW1lbGluZTtcblxuLy8gZXhwb3J0IGZvciB0ZXN0c1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfSEVJR0hUUyA9IHtcbiAgYmFyOiAyOCxcbiAgZGV0YWlsOiAxNjEsXG4gIGRldGFpbFdpdGhMb2dzOiAxOTcsXG59O1xuXG5jb25zdCBOVU1fVElDS1MgPSA1O1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVJvd1N0YXRlcyhcbiAgc3BhbnM6IFRyYWNlU3BhbltdIHwgVE5pbCxcbiAgY2hpbGRyZW5IaWRkZW5JRHM6IFNldDxzdHJpbmc+LFxuICBkZXRhaWxTdGF0ZXM6IE1hcDxzdHJpbmcsIERldGFpbFN0YXRlIHwgVE5pbD5cbik6IFJvd1N0YXRlW10ge1xuICBpZiAoIXNwYW5zKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGxldCBjb2xsYXBzZURlcHRoID0gbnVsbDtcbiAgY29uc3Qgcm93U3RhdGVzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3BhbnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBzcGFuID0gc3BhbnNbaV07XG4gICAgY29uc3QgeyBzcGFuSUQsIGRlcHRoIH0gPSBzcGFuO1xuICAgIGxldCBoaWRkZW4gPSBmYWxzZTtcbiAgICBpZiAoY29sbGFwc2VEZXB0aCAhPSBudWxsKSB7XG4gICAgICBpZiAoZGVwdGggPj0gY29sbGFwc2VEZXB0aCkge1xuICAgICAgICBoaWRkZW4gPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sbGFwc2VEZXB0aCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChoaWRkZW4pIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoY2hpbGRyZW5IaWRkZW5JRHMuaGFzKHNwYW5JRCkpIHtcbiAgICAgIGNvbGxhcHNlRGVwdGggPSBkZXB0aCArIDE7XG4gICAgfVxuICAgIHJvd1N0YXRlcy5wdXNoKHtcbiAgICAgIHNwYW4sXG4gICAgICBpc0RldGFpbDogZmFsc2UsXG4gICAgICBzcGFuSW5kZXg6IGksXG4gICAgfSk7XG4gICAgaWYgKGRldGFpbFN0YXRlcy5oYXMoc3BhbklEKSkge1xuICAgICAgcm93U3RhdGVzLnB1c2goe1xuICAgICAgICBzcGFuLFxuICAgICAgICBpc0RldGFpbDogdHJ1ZSxcbiAgICAgICAgc3BhbkluZGV4OiBpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByb3dTdGF0ZXM7XG59XG5cbmZ1bmN0aW9uIGdldENsaXBwaW5nKGN1cnJlbnRWaWV3UmFuZ2U6IFtudW1iZXIsIG51bWJlcl0pIHtcbiAgY29uc3QgW3pvb21TdGFydCwgem9vbUVuZF0gPSBjdXJyZW50Vmlld1JhbmdlO1xuICByZXR1cm4ge1xuICAgIGxlZnQ6IHpvb21TdGFydCA+IDAsXG4gICAgcmlnaHQ6IHpvb21FbmQgPCAxLFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVJvd1N0YXRlc0Zyb21UcmFjZShcbiAgdHJhY2U6IFRyYWNlIHwgVE5pbCxcbiAgY2hpbGRyZW5IaWRkZW5JRHM6IFNldDxzdHJpbmc+LFxuICBkZXRhaWxTdGF0ZXM6IE1hcDxzdHJpbmcsIERldGFpbFN0YXRlIHwgVE5pbD5cbik6IFJvd1N0YXRlW10ge1xuICByZXR1cm4gdHJhY2UgPyBnZW5lcmF0ZVJvd1N0YXRlcyh0cmFjZS5zcGFucywgY2hpbGRyZW5IaWRkZW5JRHMsIGRldGFpbFN0YXRlcykgOiBbXTtcbn1cblxuY29uc3QgbWVtb2l6ZWRHZW5lcmF0ZVJvd1N0YXRlcyA9IG1lbW9pemVPbmUoZ2VuZXJhdGVSb3dTdGF0ZXNGcm9tVHJhY2UpO1xuY29uc3QgbWVtb2l6ZWRWaWV3Qm91bmRzRnVuYyA9IG1lbW9pemVPbmUoY3JlYXRlVmlld2VkQm91bmRzRnVuYywgaXNFcXVhbCk7XG5jb25zdCBtZW1vaXplZEdldENsaXBwaW5nID0gbWVtb2l6ZU9uZShnZXRDbGlwcGluZywgaXNFcXVhbCk7XG5cbi8vIGV4cG9ydCBmcm9tIHRlc3RzXG5leHBvcnQgY2xhc3MgVW50aGVtZWRWaXJ0dWFsaXplZFRyYWNlVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxWaXJ0dWFsaXplZFRyYWNlVmlld1Byb3BzPiB7XG4gIGxpc3RWaWV3OiBMaXN0VmlldyB8IFROaWw7XG4gIHRvcFRyYWNlVmlld1JlZiA9IGNyZWF0ZVJlZjxIVE1MRGl2RWxlbWVudD4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogVmlydHVhbGl6ZWRUcmFjZVZpZXdQcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7IHNldFRyYWNlLCB0cmFjZSwgdWlGaW5kIH0gPSBwcm9wcztcbiAgICBzZXRUcmFjZSh0cmFjZSwgdWlGaW5kKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuc2Nyb2xsVG9TcGFuKHRoaXMucHJvcHMuZm9jdXNlZFNwYW5JZCk7XG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzOiBWaXJ0dWFsaXplZFRyYWNlVmlld1Byb3BzKSB7XG4gICAgLy8gSWYgYW55IHByb3AgdXBkYXRlcywgVmlydHVhbGl6ZWRUcmFjZVZpZXdJbXBsIHNob3VsZCB1cGRhdGUuXG4gICAgY29uc3QgbmV4dFByb3BLZXlzID0gT2JqZWN0LmtleXMobmV4dFByb3BzKSBhcyBBcnJheTxrZXlvZiBWaXJ0dWFsaXplZFRyYWNlVmlld1Byb3BzPjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5leHRQcm9wS2V5cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKG5leHRQcm9wc1tuZXh0UHJvcEtleXNbaV1dICE9PSB0aGlzLnByb3BzW25leHRQcm9wS2V5c1tpXV0pIHtcbiAgICAgICAgLy8gVW5sZXNzIHRoZSBvbmx5IGNoYW5nZSB3YXMgcHJvcHMuc2hvdWxkU2Nyb2xsVG9GaXJzdFVpRmluZE1hdGNoIGNoYW5naW5nIHRvIGZhbHNlLlxuICAgICAgICBpZiAobmV4dFByb3BLZXlzW2ldID09PSAnc2hvdWxkU2Nyb2xsVG9GaXJzdFVpRmluZE1hdGNoJykge1xuICAgICAgICAgIGlmIChuZXh0UHJvcHNbbmV4dFByb3BLZXlzW2ldXSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHM6IFJlYWRvbmx5PFZpcnR1YWxpemVkVHJhY2VWaWV3UHJvcHM+KSB7XG4gICAgY29uc3QgeyByZWdpc3RlckFjY2Vzc29ycywgdHJhY2UgfSA9IHByZXZQcm9wcztcbiAgICBjb25zdCB7XG4gICAgICBzaG91bGRTY3JvbGxUb0ZpcnN0VWlGaW5kTWF0Y2gsXG4gICAgICBjbGVhclNob3VsZFNjcm9sbFRvRmlyc3RVaUZpbmRNYXRjaCxcbiAgICAgIHNjcm9sbFRvRmlyc3RWaXNpYmxlU3BhbixcbiAgICAgIHJlZ2lzdGVyQWNjZXNzb3JzOiBuZXh0UmVnaXN0ZXJBY2Nlc3NvcnMsXG4gICAgICBzZXRUcmFjZSxcbiAgICAgIHRyYWNlOiBuZXh0VHJhY2UsXG4gICAgICB1aUZpbmQsXG4gICAgICBmb2N1c2VkU3BhbklkLFxuICAgICAgZm9jdXNlZFNwYW5JZEZvclNlYXJjaCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICh0cmFjZSAhPT0gbmV4dFRyYWNlKSB7XG4gICAgICBzZXRUcmFjZShuZXh0VHJhY2UsIHVpRmluZCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGlzdFZpZXcgJiYgcmVnaXN0ZXJBY2Nlc3NvcnMgIT09IG5leHRSZWdpc3RlckFjY2Vzc29ycykge1xuICAgICAgbmV4dFJlZ2lzdGVyQWNjZXNzb3JzKHRoaXMuZ2V0QWNjZXNzb3JzKCkpO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRTY3JvbGxUb0ZpcnN0VWlGaW5kTWF0Y2gpIHtcbiAgICAgIHNjcm9sbFRvRmlyc3RWaXNpYmxlU3BhbigpO1xuICAgICAgY2xlYXJTaG91bGRTY3JvbGxUb0ZpcnN0VWlGaW5kTWF0Y2goKTtcbiAgICB9XG5cbiAgICBpZiAoZm9jdXNlZFNwYW5JZCAhPT0gcHJldlByb3BzLmZvY3VzZWRTcGFuSWQpIHtcbiAgICAgIHRoaXMuc2Nyb2xsVG9TcGFuKGZvY3VzZWRTcGFuSWQpO1xuICAgIH1cblxuICAgIGlmIChmb2N1c2VkU3BhbklkRm9yU2VhcmNoICE9PSBwcmV2UHJvcHMuZm9jdXNlZFNwYW5JZEZvclNlYXJjaCkge1xuICAgICAgdGhpcy5zY3JvbGxUb1NwYW4oZm9jdXNlZFNwYW5JZEZvclNlYXJjaCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Um93U3RhdGVzKCk6IFJvd1N0YXRlW10ge1xuICAgIGNvbnN0IHsgY2hpbGRyZW5IaWRkZW5JRHMsIGRldGFpbFN0YXRlcywgdHJhY2UgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIG1lbW9pemVkR2VuZXJhdGVSb3dTdGF0ZXModHJhY2UsIGNoaWxkcmVuSGlkZGVuSURzLCBkZXRhaWxTdGF0ZXMpO1xuICB9XG5cbiAgZ2V0Q2xpcHBpbmcoKTogeyBsZWZ0OiBib29sZWFuOyByaWdodDogYm9vbGVhbiB9IHtcbiAgICBjb25zdCB7IGN1cnJlbnRWaWV3UmFuZ2VUaW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBtZW1vaXplZEdldENsaXBwaW5nKGN1cnJlbnRWaWV3UmFuZ2VUaW1lKTtcbiAgfVxuXG4gIGdldFZpZXdlZEJvdW5kcygpOiBWaWV3ZWRCb3VuZHNGdW5jdGlvblR5cGUge1xuICAgIGNvbnN0IHsgY3VycmVudFZpZXdSYW5nZVRpbWUsIHRyYWNlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IFt6b29tU3RhcnQsIHpvb21FbmRdID0gY3VycmVudFZpZXdSYW5nZVRpbWU7XG5cbiAgICByZXR1cm4gbWVtb2l6ZWRWaWV3Qm91bmRzRnVuYyh7XG4gICAgICBtaW46IHRyYWNlLnN0YXJ0VGltZSxcbiAgICAgIG1heDogdHJhY2UuZW5kVGltZSxcbiAgICAgIHZpZXdTdGFydDogem9vbVN0YXJ0LFxuICAgICAgdmlld0VuZDogem9vbUVuZCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldEFjY2Vzc29ycygpIHtcbiAgICBjb25zdCBsdiA9IHRoaXMubGlzdFZpZXc7XG4gICAgaWYgKCFsdikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMaXN0VmlldyB1bmF2YWlsYWJsZScpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZ2V0Vmlld1JhbmdlOiB0aGlzLmdldFZpZXdSYW5nZSxcbiAgICAgIGdldFNlYXJjaGVkU3BhbklEczogdGhpcy5nZXRTZWFyY2hlZFNwYW5JRHMsXG4gICAgICBnZXRDb2xsYXBzZWRDaGlsZHJlbjogdGhpcy5nZXRDb2xsYXBzZWRDaGlsZHJlbixcbiAgICAgIGdldFZpZXdIZWlnaHQ6IGx2LmdldFZpZXdIZWlnaHQsXG4gICAgICBnZXRCb3R0b21Sb3dJbmRleFZpc2libGU6IGx2LmdldEJvdHRvbVZpc2libGVJbmRleCxcbiAgICAgIGdldFRvcFJvd0luZGV4VmlzaWJsZTogbHYuZ2V0VG9wVmlzaWJsZUluZGV4LFxuICAgICAgZ2V0Um93UG9zaXRpb246IGx2LmdldFJvd1Bvc2l0aW9uLFxuICAgICAgbWFwUm93SW5kZXhUb1NwYW5JbmRleDogdGhpcy5tYXBSb3dJbmRleFRvU3BhbkluZGV4LFxuICAgICAgbWFwU3BhbkluZGV4VG9Sb3dJbmRleDogdGhpcy5tYXBTcGFuSW5kZXhUb1Jvd0luZGV4LFxuICAgIH07XG4gIH1cblxuICBnZXRWaWV3UmFuZ2UgPSAoKSA9PiB0aGlzLnByb3BzLmN1cnJlbnRWaWV3UmFuZ2VUaW1lO1xuXG4gIGdldFNlYXJjaGVkU3BhbklEcyA9ICgpID0+IHRoaXMucHJvcHMuZmluZE1hdGNoZXNJRHM7XG5cbiAgZ2V0Q29sbGFwc2VkQ2hpbGRyZW4gPSAoKSA9PiB0aGlzLnByb3BzLmNoaWxkcmVuSGlkZGVuSURzO1xuXG4gIG1hcFJvd0luZGV4VG9TcGFuSW5kZXggPSAoaW5kZXg6IG51bWJlcikgPT4gdGhpcy5nZXRSb3dTdGF0ZXMoKVtpbmRleF0uc3BhbkluZGV4O1xuXG4gIG1hcFNwYW5JbmRleFRvUm93SW5kZXggPSAoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IG1heCA9IHRoaXMuZ2V0Um93U3RhdGVzKCkubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgIGNvbnN0IHsgc3BhbkluZGV4IH0gPSB0aGlzLmdldFJvd1N0YXRlcygpW2ldO1xuICAgICAgaWYgKHNwYW5JbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgdW5hYmxlIHRvIGZpbmQgcm93IGZvciBzcGFuIGluZGV4OiAke2luZGV4fWApO1xuICB9O1xuXG4gIHNldExpc3RWaWV3ID0gKGxpc3RWaWV3OiBMaXN0VmlldyB8IFROaWwpID0+IHtcbiAgICBjb25zdCBpc0NoYW5nZWQgPSB0aGlzLmxpc3RWaWV3ICE9PSBsaXN0VmlldztcbiAgICB0aGlzLmxpc3RWaWV3ID0gbGlzdFZpZXc7XG4gICAgaWYgKGxpc3RWaWV3ICYmIGlzQ2hhbmdlZCkge1xuICAgICAgdGhpcy5wcm9wcy5yZWdpc3RlckFjY2Vzc29ycyh0aGlzLmdldEFjY2Vzc29ycygpKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gdXNlIGxvbmcgZm9ybSBzeW50YXggdG8gYXZlcnQgZmxvdyBlcnJvclxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmxvdy9pc3N1ZXMvMzA3NiNpc3N1ZWNvbW1lbnQtMjkwOTQ0MDUxXG4gIGdldEtleUZyb21JbmRleCA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgeyBpc0RldGFpbCwgc3BhbiB9ID0gdGhpcy5nZXRSb3dTdGF0ZXMoKVtpbmRleF07XG4gICAgcmV0dXJuIGAke3NwYW4udHJhY2VJRH0tLSR7c3Bhbi5zcGFuSUR9LS0ke2lzRGV0YWlsID8gJ2RldGFpbCcgOiAnYmFyJ31gO1xuICB9O1xuXG4gIGdldEluZGV4RnJvbUtleSA9IChrZXk6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHBhcnRzID0ga2V5LnNwbGl0KCctLScpO1xuICAgIGNvbnN0IF90cmFjZUlEID0gcGFydHNbMF07XG4gICAgY29uc3QgX3NwYW5JRCA9IHBhcnRzWzFdO1xuICAgIGNvbnN0IF9pc0RldGFpbCA9IHBhcnRzWzJdID09PSAnZGV0YWlsJztcbiAgICBjb25zdCBtYXggPSB0aGlzLmdldFJvd1N0YXRlcygpLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1heDsgaSsrKSB7XG4gICAgICBjb25zdCB7IHNwYW4sIGlzRGV0YWlsIH0gPSB0aGlzLmdldFJvd1N0YXRlcygpW2ldO1xuICAgICAgaWYgKHNwYW4uc3BhbklEID09PSBfc3BhbklEICYmIHNwYW4udHJhY2VJRCA9PT0gX3RyYWNlSUQgJiYgaXNEZXRhaWwgPT09IF9pc0RldGFpbCkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9O1xuXG4gIGdldFJvd0hlaWdodCA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgeyBzcGFuLCBpc0RldGFpbCB9ID0gdGhpcy5nZXRSb3dTdGF0ZXMoKVtpbmRleF07XG4gICAgaWYgKCFpc0RldGFpbCkge1xuICAgICAgcmV0dXJuIERFRkFVTFRfSEVJR0hUUy5iYXI7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KHNwYW4ubG9ncykgJiYgc3Bhbi5sb2dzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIERFRkFVTFRfSEVJR0hUUy5kZXRhaWxXaXRoTG9ncztcbiAgICB9XG4gICAgcmV0dXJuIERFRkFVTFRfSEVJR0hUUy5kZXRhaWw7XG4gIH07XG5cbiAgcmVuZGVyUm93ID0gKGtleTogc3RyaW5nLCBzdHlsZTogUmVhY3QuQ1NTUHJvcGVydGllcywgaW5kZXg6IG51bWJlciwgYXR0cnM6IHt9KSA9PiB7XG4gICAgY29uc3QgeyBpc0RldGFpbCwgc3Bhbiwgc3BhbkluZGV4IH0gPSB0aGlzLmdldFJvd1N0YXRlcygpW2luZGV4XTtcbiAgICByZXR1cm4gaXNEZXRhaWxcbiAgICAgID8gdGhpcy5yZW5kZXJTcGFuRGV0YWlsUm93KHNwYW4sIGtleSwgc3R5bGUsIGF0dHJzKVxuICAgICAgOiB0aGlzLnJlbmRlclNwYW5CYXJSb3coc3Bhbiwgc3BhbkluZGV4LCBrZXksIHN0eWxlLCBhdHRycyk7XG4gIH07XG5cbiAgc2Nyb2xsVG9TcGFuID0gKHNwYW5JRD86IHN0cmluZykgPT4ge1xuICAgIGlmIChzcGFuSUQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpID0gdGhpcy5nZXRSb3dTdGF0ZXMoKS5maW5kSW5kZXgoKHJvdykgPT4gcm93LnNwYW4uc3BhbklEID09PSBzcGFuSUQpO1xuICAgIGlmIChpID49IDApIHtcbiAgICAgIHRoaXMubGlzdFZpZXc/LnNjcm9sbFRvSW5kZXgoaSk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlclNwYW5CYXJSb3coc3BhbjogVHJhY2VTcGFuLCBzcGFuSW5kZXg6IG51bWJlciwga2V5OiBzdHJpbmcsIHN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzLCBhdHRyczoge30pIHtcbiAgICBjb25zdCB7IHNwYW5JRCB9ID0gc3BhbjtcbiAgICBjb25zdCB7IHNlcnZpY2VOYW1lIH0gPSBzcGFuLnByb2Nlc3M7XG4gICAgY29uc3Qge1xuICAgICAgY2hpbGRyZW5IaWRkZW5JRHMsXG4gICAgICBjaGlsZHJlblRvZ2dsZSxcbiAgICAgIGRldGFpbFN0YXRlcyxcbiAgICAgIGRldGFpbFRvZ2dsZSxcbiAgICAgIGZpbmRNYXRjaGVzSURzLFxuICAgICAgc3Bhbk5hbWVDb2x1bW5XaWR0aCxcbiAgICAgIHRyYWNlLFxuICAgICAgc3BhbkJhck9wdGlvbnMsXG4gICAgICBob3ZlckluZGVudEd1aWRlSWRzLFxuICAgICAgYWRkSG92ZXJJbmRlbnRHdWlkZUlkLFxuICAgICAgcmVtb3ZlSG92ZXJJbmRlbnRHdWlkZUlkLFxuICAgICAgY3JlYXRlU3BhbkxpbmssXG4gICAgICBmb2N1c2VkU3BhbklkLFxuICAgICAgZm9jdXNlZFNwYW5JZEZvclNlYXJjaCxcbiAgICAgIHRoZW1lLFxuICAgICAgZGF0YXNvdXJjZVR5cGUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gdG8gYXZlcnQgZmxvdyBlcnJvclxuICAgIGlmICghdHJhY2UpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBjb2xvciA9IGdldENvbG9yQnlLZXkoc2VydmljZU5hbWUsIHRoZW1lKTtcbiAgICBjb25zdCBpc0NvbGxhcHNlZCA9IGNoaWxkcmVuSGlkZGVuSURzLmhhcyhzcGFuSUQpO1xuICAgIGNvbnN0IGlzRGV0YWlsRXhwYW5kZWQgPSBkZXRhaWxTdGF0ZXMuaGFzKHNwYW5JRCk7XG4gICAgY29uc3QgaXNNYXRjaGluZ0ZpbHRlciA9IGZpbmRNYXRjaGVzSURzID8gZmluZE1hdGNoZXNJRHMuaGFzKHNwYW5JRCkgOiBmYWxzZTtcbiAgICBjb25zdCBpc0ZvY3VzZWQgPSBzcGFuSUQgPT09IGZvY3VzZWRTcGFuSWQgfHwgc3BhbklEID09PSBmb2N1c2VkU3BhbklkRm9yU2VhcmNoO1xuICAgIGNvbnN0IHNob3dFcnJvckljb24gPSBpc0Vycm9yU3BhbihzcGFuKSB8fCAoaXNDb2xsYXBzZWQgJiYgc3BhbkNvbnRhaW5zRXJyZWRTcGFuKHRyYWNlLnNwYW5zLCBzcGFuSW5kZXgpKTtcblxuICAgIC8vIENoZWNrIGZvciBkaXJlY3QgY2hpbGQgXCJzZXJ2ZXJcIiBzcGFuIGlmIHRoZSBzcGFuIGlzIGEgXCJjbGllbnRcIiBzcGFuLlxuICAgIGxldCBycGMgPSBudWxsO1xuICAgIGlmIChpc0NvbGxhcHNlZCkge1xuICAgICAgY29uc3QgcnBjU3BhbiA9IGZpbmRTZXJ2ZXJDaGlsZFNwYW4odHJhY2Uuc3BhbnMuc2xpY2Uoc3BhbkluZGV4KSk7XG4gICAgICBpZiAocnBjU3Bhbikge1xuICAgICAgICBjb25zdCBycGNWaWV3Qm91bmRzID0gdGhpcy5nZXRWaWV3ZWRCb3VuZHMoKShycGNTcGFuLnN0YXJ0VGltZSwgcnBjU3Bhbi5zdGFydFRpbWUgKyBycGNTcGFuLmR1cmF0aW9uKTtcbiAgICAgICAgcnBjID0ge1xuICAgICAgICAgIGNvbG9yOiBnZXRDb2xvckJ5S2V5KHJwY1NwYW4ucHJvY2Vzcy5zZXJ2aWNlTmFtZSwgdGhlbWUpLFxuICAgICAgICAgIG9wZXJhdGlvbk5hbWU6IHJwY1NwYW4ub3BlcmF0aW9uTmFtZSxcbiAgICAgICAgICBzZXJ2aWNlTmFtZTogcnBjU3Bhbi5wcm9jZXNzLnNlcnZpY2VOYW1lLFxuICAgICAgICAgIHZpZXdFbmQ6IHJwY1ZpZXdCb3VuZHMuZW5kLFxuICAgICAgICAgIHZpZXdTdGFydDogcnBjVmlld0JvdW5kcy5zdGFydCxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwZWVyU2VydmljZUtWID0gc3Bhbi50YWdzLmZpbmQoKGt2KSA9PiBrdi5rZXkgPT09IFBFRVJfU0VSVklDRSk7XG4gICAgLy8gTGVhZiwga2luZCA9PSBjbGllbnQgYW5kIGhhcyBwZWVyLnNlcnZpY2UudGFnLCBpcyBsaWtlbHkgYSBjbGllbnQgc3BhbiB0aGF0IGRvZXMgYSByZXF1ZXN0XG4gICAgLy8gdG8gYW4gdW5pbnN0cnVtZW50ZWQvZXh0ZXJuYWwgc2VydmljZVxuICAgIGxldCBub0luc3RydW1lbnRlZFNlcnZlciA9IG51bGw7XG4gICAgaWYgKCFzcGFuLmhhc0NoaWxkcmVuICYmIHBlZXJTZXJ2aWNlS1YgJiYgaXNLaW5kQ2xpZW50KHNwYW4pKSB7XG4gICAgICBub0luc3RydW1lbnRlZFNlcnZlciA9IHtcbiAgICAgICAgc2VydmljZU5hbWU6IHBlZXJTZXJ2aWNlS1YudmFsdWUsXG4gICAgICAgIGNvbG9yOiBnZXRDb2xvckJ5S2V5KHBlZXJTZXJ2aWNlS1YudmFsdWUsIHRoZW1lKSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3Qgc3R5bGVzID0gZ2V0U3R5bGVzKHRoaXMucHJvcHMpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnJvd30ga2V5PXtrZXl9IHN0eWxlPXtzdHlsZX0gey4uLmF0dHJzfT5cbiAgICAgICAgPFNwYW5CYXJSb3dcbiAgICAgICAgICBjbGlwcGluZ0xlZnQ9e3RoaXMuZ2V0Q2xpcHBpbmcoKS5sZWZ0fVxuICAgICAgICAgIGNsaXBwaW5nUmlnaHQ9e3RoaXMuZ2V0Q2xpcHBpbmcoKS5yaWdodH1cbiAgICAgICAgICBjb2xvcj17Y29sb3J9XG4gICAgICAgICAgc3BhbkJhck9wdGlvbnM9e3NwYW5CYXJPcHRpb25zfVxuICAgICAgICAgIGNvbHVtbkRpdmlzaW9uPXtzcGFuTmFtZUNvbHVtbldpZHRofVxuICAgICAgICAgIGlzQ2hpbGRyZW5FeHBhbmRlZD17IWlzQ29sbGFwc2VkfVxuICAgICAgICAgIGlzRGV0YWlsRXhwYW5kZWQ9e2lzRGV0YWlsRXhwYW5kZWR9XG4gICAgICAgICAgaXNNYXRjaGluZ0ZpbHRlcj17aXNNYXRjaGluZ0ZpbHRlcn1cbiAgICAgICAgICBpc0ZvY3VzZWQ9e2lzRm9jdXNlZH1cbiAgICAgICAgICBudW1UaWNrcz17TlVNX1RJQ0tTfVxuICAgICAgICAgIG9uRGV0YWlsVG9nZ2xlZD17ZGV0YWlsVG9nZ2xlfVxuICAgICAgICAgIG9uQ2hpbGRyZW5Ub2dnbGVkPXtjaGlsZHJlblRvZ2dsZX1cbiAgICAgICAgICBycGM9e3JwY31cbiAgICAgICAgICBub0luc3RydW1lbnRlZFNlcnZlcj17bm9JbnN0cnVtZW50ZWRTZXJ2ZXJ9XG4gICAgICAgICAgc2hvd0Vycm9ySWNvbj17c2hvd0Vycm9ySWNvbn1cbiAgICAgICAgICBnZXRWaWV3ZWRCb3VuZHM9e3RoaXMuZ2V0Vmlld2VkQm91bmRzKCl9XG4gICAgICAgICAgdHJhY2VTdGFydFRpbWU9e3RyYWNlLnN0YXJ0VGltZX1cbiAgICAgICAgICBzcGFuPXtzcGFufVxuICAgICAgICAgIGhvdmVySW5kZW50R3VpZGVJZHM9e2hvdmVySW5kZW50R3VpZGVJZHN9XG4gICAgICAgICAgYWRkSG92ZXJJbmRlbnRHdWlkZUlkPXthZGRIb3ZlckluZGVudEd1aWRlSWR9XG4gICAgICAgICAgcmVtb3ZlSG92ZXJJbmRlbnRHdWlkZUlkPXtyZW1vdmVIb3ZlckluZGVudEd1aWRlSWR9XG4gICAgICAgICAgY3JlYXRlU3Bhbkxpbms9e2NyZWF0ZVNwYW5MaW5rfVxuICAgICAgICAgIGRhdGFzb3VyY2VUeXBlPXtkYXRhc291cmNlVHlwZX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXJTcGFuRGV0YWlsUm93KHNwYW46IFRyYWNlU3Bhbiwga2V5OiBzdHJpbmcsIHN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzLCBhdHRyczoge30pIHtcbiAgICBjb25zdCB7IHNwYW5JRCB9ID0gc3BhbjtcbiAgICBjb25zdCB7IHNlcnZpY2VOYW1lIH0gPSBzcGFuLnByb2Nlc3M7XG4gICAgY29uc3Qge1xuICAgICAgZGV0YWlsTG9nSXRlbVRvZ2dsZSxcbiAgICAgIGRldGFpbExvZ3NUb2dnbGUsXG4gICAgICBkZXRhaWxQcm9jZXNzVG9nZ2xlLFxuICAgICAgZGV0YWlsUmVmZXJlbmNlc1RvZ2dsZSxcbiAgICAgIGRldGFpbFJlZmVyZW5jZUl0ZW1Ub2dnbGUsXG4gICAgICBkZXRhaWxXYXJuaW5nc1RvZ2dsZSxcbiAgICAgIGRldGFpbFN0YWNrVHJhY2VzVG9nZ2xlLFxuICAgICAgZGV0YWlsU3RhdGVzLFxuICAgICAgZGV0YWlsVGFnc1RvZ2dsZSxcbiAgICAgIGRldGFpbFRvZ2dsZSxcbiAgICAgIHNwYW5OYW1lQ29sdW1uV2lkdGgsXG4gICAgICB0cmFjZSxcbiAgICAgIHRpbWVab25lLFxuICAgICAgaG92ZXJJbmRlbnRHdWlkZUlkcyxcbiAgICAgIGFkZEhvdmVySW5kZW50R3VpZGVJZCxcbiAgICAgIHJlbW92ZUhvdmVySW5kZW50R3VpZGVJZCxcbiAgICAgIGxpbmtzR2V0dGVyLFxuICAgICAgY3JlYXRlU3BhbkxpbmssXG4gICAgICBmb2N1c2VkU3BhbklkLFxuICAgICAgY3JlYXRlRm9jdXNTcGFuTGluayxcbiAgICAgIHRvcE9mVmlld1JlZlR5cGUsXG4gICAgICB0aGVtZSxcbiAgICAgIGRhdGFzb3VyY2VUeXBlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGRldGFpbFN0YXRlID0gZGV0YWlsU3RhdGVzLmdldChzcGFuSUQpO1xuICAgIGlmICghdHJhY2UgfHwgIWRldGFpbFN0YXRlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgY29sb3IgPSBnZXRDb2xvckJ5S2V5KHNlcnZpY2VOYW1lLCB0aGVtZSk7XG4gICAgY29uc3Qgc3R5bGVzID0gZ2V0U3R5bGVzKHRoaXMucHJvcHMpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnJvd30ga2V5PXtrZXl9IHN0eWxlPXt7IC4uLnN0eWxlLCB6SW5kZXg6IDEgfX0gey4uLmF0dHJzfT5cbiAgICAgICAgPFNwYW5EZXRhaWxSb3dcbiAgICAgICAgICBjb2xvcj17Y29sb3J9XG4gICAgICAgICAgY29sdW1uRGl2aXNpb249e3NwYW5OYW1lQ29sdW1uV2lkdGh9XG4gICAgICAgICAgb25EZXRhaWxUb2dnbGVkPXtkZXRhaWxUb2dnbGV9XG4gICAgICAgICAgZGV0YWlsU3RhdGU9e2RldGFpbFN0YXRlfVxuICAgICAgICAgIGxpbmtzR2V0dGVyPXtsaW5rc0dldHRlcn1cbiAgICAgICAgICBsb2dJdGVtVG9nZ2xlPXtkZXRhaWxMb2dJdGVtVG9nZ2xlfVxuICAgICAgICAgIGxvZ3NUb2dnbGU9e2RldGFpbExvZ3NUb2dnbGV9XG4gICAgICAgICAgcHJvY2Vzc1RvZ2dsZT17ZGV0YWlsUHJvY2Vzc1RvZ2dsZX1cbiAgICAgICAgICByZWZlcmVuY2VJdGVtVG9nZ2xlPXtkZXRhaWxSZWZlcmVuY2VJdGVtVG9nZ2xlfVxuICAgICAgICAgIHJlZmVyZW5jZXNUb2dnbGU9e2RldGFpbFJlZmVyZW5jZXNUb2dnbGV9XG4gICAgICAgICAgd2FybmluZ3NUb2dnbGU9e2RldGFpbFdhcm5pbmdzVG9nZ2xlfVxuICAgICAgICAgIHN0YWNrVHJhY2VzVG9nZ2xlPXtkZXRhaWxTdGFja1RyYWNlc1RvZ2dsZX1cbiAgICAgICAgICBzcGFuPXtzcGFufVxuICAgICAgICAgIHRpbWVab25lPXt0aW1lWm9uZX1cbiAgICAgICAgICB0YWdzVG9nZ2xlPXtkZXRhaWxUYWdzVG9nZ2xlfVxuICAgICAgICAgIHRyYWNlU3RhcnRUaW1lPXt0cmFjZS5zdGFydFRpbWV9XG4gICAgICAgICAgaG92ZXJJbmRlbnRHdWlkZUlkcz17aG92ZXJJbmRlbnRHdWlkZUlkc31cbiAgICAgICAgICBhZGRIb3ZlckluZGVudEd1aWRlSWQ9e2FkZEhvdmVySW5kZW50R3VpZGVJZH1cbiAgICAgICAgICByZW1vdmVIb3ZlckluZGVudEd1aWRlSWQ9e3JlbW92ZUhvdmVySW5kZW50R3VpZGVJZH1cbiAgICAgICAgICBjcmVhdGVTcGFuTGluaz17Y3JlYXRlU3Bhbkxpbmt9XG4gICAgICAgICAgZm9jdXNlZFNwYW5JZD17Zm9jdXNlZFNwYW5JZH1cbiAgICAgICAgICBjcmVhdGVGb2N1c1NwYW5MaW5rPXtjcmVhdGVGb2N1c1NwYW5MaW5rfVxuICAgICAgICAgIHRvcE9mVmlld1JlZlR5cGU9e3RvcE9mVmlld1JlZlR5cGV9XG4gICAgICAgICAgZGF0YXNvdXJjZVR5cGU9e2RhdGFzb3VyY2VUeXBlfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHNjcm9sbFRvVG9wID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdG9wT2ZWaWV3UmVmLCBkYXRhc291cmNlVHlwZSwgdHJhY2UgfSA9IHRoaXMucHJvcHM7XG4gICAgdG9wT2ZWaWV3UmVmPy5jdXJyZW50Py5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcbiAgICByZXBvcnRJbnRlcmFjdGlvbignZ3JhZmFuYV90cmFjZXNfdHJhY2Vfdmlld19zY3JvbGxfdG9fdG9wX2NsaWNrZWQnLCB7XG4gICAgICBkYXRhc291cmNlVHlwZTogZGF0YXNvdXJjZVR5cGUsXG4gICAgICBncmFmYW5hX3ZlcnNpb246IGNvbmZpZy5idWlsZEluZm8udmVyc2lvbixcbiAgICAgIG51bVNlcnZpY2VzOiB0cmFjZS5zZXJ2aWNlcy5sZW5ndGgsXG4gICAgICBudW1TcGFuczogdHJhY2Uuc3BhbnMubGVuZ3RoLFxuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzdHlsZXMgPSBnZXRTdHlsZXModGhpcy5wcm9wcyk7XG4gICAgY29uc3QgeyBzY3JvbGxFbGVtZW50IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8PlxuICAgICAgICA8TGlzdFZpZXdcbiAgICAgICAgICByZWY9e3RoaXMuc2V0TGlzdFZpZXd9XG4gICAgICAgICAgZGF0YUxlbmd0aD17dGhpcy5nZXRSb3dTdGF0ZXMoKS5sZW5ndGh9XG4gICAgICAgICAgaXRlbUhlaWdodEdldHRlcj17dGhpcy5nZXRSb3dIZWlnaHR9XG4gICAgICAgICAgaXRlbVJlbmRlcmVyPXt0aGlzLnJlbmRlclJvd31cbiAgICAgICAgICB2aWV3QnVmZmVyPXs1MH1cbiAgICAgICAgICB2aWV3QnVmZmVyTWluPXs1MH1cbiAgICAgICAgICBpdGVtc1dyYXBwZXJDbGFzc05hbWU9e3N0eWxlcy5yb3dzV3JhcHBlcn1cbiAgICAgICAgICBnZXRLZXlGcm9tSW5kZXg9e3RoaXMuZ2V0S2V5RnJvbUluZGV4fVxuICAgICAgICAgIGdldEluZGV4RnJvbUtleT17dGhpcy5nZXRJbmRleEZyb21LZXl9XG4gICAgICAgICAgd2luZG93U2Nyb2xsZXI9e2ZhbHNlfVxuICAgICAgICAgIHNjcm9sbEVsZW1lbnQ9e3Njcm9sbEVsZW1lbnR9XG4gICAgICAgIC8+XG4gICAgICAgIDxUb29sYmFyQnV0dG9uXG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuc2Nyb2xsVG9Ub3BCdXR0b259XG4gICAgICAgICAgb25DbGljaz17dGhpcy5zY3JvbGxUb1RvcH1cbiAgICAgICAgICB0aXRsZT1cIlNjcm9sbCB0byB0b3BcIlxuICAgICAgICAgIGljb249XCJhcnJvdy11cFwiXG4gICAgICAgID48L1Rvb2xiYXJCdXR0b24+XG4gICAgICA8Lz5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhUaGVtZTIoVW50aGVtZWRWaXJ0dWFsaXplZFRyYWNlVmlldyk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxHQUFHLFFBQVEsY0FBYztBQUNsQyxTQUFTQyxPQUFPLFFBQVEsUUFBUTtBQUNoQyxPQUFPQyxVQUFVLE1BQU0sYUFBYTtBQUNwQyxPQUFPLEtBQUtDLEtBQUssTUFBTSxPQUFPO0FBQzlCLFNBQVNDLFNBQVMsUUFBbUIsT0FBTztBQUc1QyxTQUFTQyxNQUFNLEVBQUVDLGlCQUFpQixRQUFRLGtCQUFrQjtBQUM1RCxTQUFTQyxhQUFhLEVBQUVDLFVBQVUsRUFBRUMsYUFBYSxRQUFRLGFBQWE7QUFHdEUsU0FBU0MsWUFBWSxRQUFRLHVCQUF1QjtBQUlwRCxTQUFTQyxhQUFhLFFBQVEsMEJBQTBCO0FBRXhELE9BQU9DLFFBQVEsTUFBTSxZQUFZO0FBQ2pDLE9BQU9DLFVBQVUsTUFBTSxjQUFjO0FBRXJDLE9BQU9DLGFBQWEsTUFBTSxpQkFBaUI7QUFDM0MsU0FDRUMsc0JBQXNCLEVBQ3RCQyxtQkFBbUIsRUFDbkJDLFdBQVcsRUFDWEMsWUFBWSxFQUNaQyxxQkFBcUIsUUFFaEIsU0FBUztBQUFDLFNBQUFDLEdBQUEsSUFBQUMsSUFBQSxFQUFBQyxRQUFBLElB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