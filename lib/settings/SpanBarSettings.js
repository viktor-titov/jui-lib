import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
import _extends from "@babel/runtime/helpers/extends";
var _templateObject, _templateObject2;
import { css } from '@emotion/css';
import React from 'react';
import { toOption, updateDatasourcePluginJsonDataOption } from '@grafana/data';
import { InlineField, InlineFieldRow, Input, Select, useStyles2 } from '@grafana/ui';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export var NONE = 'None';
export var DURATION = 'Duration';
export var TAG = 'Tag';
export default function SpanBarSettings(_ref) {
  var _options$jsonData$spa, _options$jsonData$spa2, _options$jsonData$spa3;
  var options = _ref.options,
    onOptionsChange = _ref.onOptionsChange;
  var styles = useStyles2(getStyles);
  var selectOptions = [NONE, DURATION, TAG].map(toOption);
  return /*#__PURE__*/_jsxs("div", {
    className: css({
      width: '100%'
    }),
    children: [/*#__PURE__*/_jsx("h3", {
      className: "page-heading",
      children: "Span bar label"
    }), /*#__PURE__*/_jsx("div", {
      className: styles.infoText,
      children: "Span bar label lets you add additional info to the span bar row."
    }), /*#__PURE__*/_jsx(InlineFieldRow, {
      className: styles.row,
      children: /*#__PURE__*/_jsx(InlineField, {
        label: "Label",
        labelWidth: 26,
        grow: true,
        children: /*#__PURE__*/_jsx(Select, {
          inputId: "label",
          options: selectOptions,
          value: ((_options$jsonData$spa = options.jsonData.spanBar) == null ? void 0 : _options$jsonData$spa.type) || '',
          onChange: function onChange(v) {
            var _v$value;
            updateDatasourcePluginJsonDataOption({
              onOptionsChange: onOptionsChange,
              options: options
            }, 'spanBar', _extends({}, options.jsonData.spanBar, {
              type: (_v$value = v == null ? void 0 : v.value) != null ? _v$value : ''
            }));
          },
          placeholder: "Duration",
          isClearable: true,
          "aria-label": 'select-label-name',
          width: 25
        })
      })
    }), ((_options$jsonData$spa2 = options.jsonData.spanBar) == null ? void 0 : _options$jsonData$spa2.type) === TAG && /*#__PURE__*/_jsx(InlineFieldRow, {
      className: styles.row,
      children: /*#__PURE__*/_jsx(InlineField, {
        label: "Tag key",
        labelWidth: 26,
        tooltip: "Tag key which will be used to get the tag value",
        children: /*#__PURE__*/_jsx(Input, {
          type: "text",
          placeholder: "Enter tag key",
          onChange: function onChange(v) {
            return updateDatasourcePluginJsonDataOption({
              onOptionsChange: onOptionsChange,
              options: options
            }, 'spanBar', _extends({}, options.jsonData.spanBar, {
              tag: v.currentTarget.value
            }));
          },
          value: ((_options$jsonData$spa3 = options.jsonData.spanBar) == null ? void 0 : _options$jsonData$spa3.tag) || '',
          width: 25
        })
      })
    })]
  });
}
var getStyles = function getStyles(theme) {
  return {
    infoText: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n    label: infoText;\n    padding-bottom: ", ";\n    color: ", ";\n  "])), theme.spacing(2), theme.colors.text.secondary),
    row: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n    label: row;\n    align-items: baseline;\n  "])))
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJSZWFjdCIsInRvT3B0aW9uIiwidXBkYXRlRGF0YXNvdXJjZVBsdWdpbkpzb25EYXRhT3B0aW9uIiwiSW5saW5lRmllbGQiLCJJbmxpbmVGaWVsZFJvdyIsIklucHV0IiwiU2VsZWN0IiwidXNlU3R5bGVzMiIsImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJOT05FIiwiRFVSQVRJT04iLCJUQUciLCJTcGFuQmFyU2V0dGluZ3MiLCJfcmVmIiwiX29wdGlvbnMkanNvbkRhdGEkc3BhIiwiX29wdGlvbnMkanNvbkRhdGEkc3BhMiIsIl9vcHRpb25zJGpzb25EYXRhJHNwYTMiLCJvcHRpb25zIiwib25PcHRpb25zQ2hhbmdlIiwic3R5bGVzIiwiZ2V0U3R5bGVzIiwic2VsZWN0T3B0aW9ucyIsIm1hcCIsImNsYXNzTmFtZSIsIndpZHRoIiwiY2hpbGRyZW4iLCJpbmZvVGV4dCIsInJvdyIsImxhYmVsIiwibGFiZWxXaWR0aCIsImdyb3ciLCJpbnB1dElkIiwidmFsdWUiLCJqc29uRGF0YSIsInNwYW5CYXIiLCJ0eXBlIiwib25DaGFuZ2UiLCJ2IiwiX3YkdmFsdWUiLCJfZXh0ZW5kcyIsInBsYWNlaG9sZGVyIiwiaXNDbGVhcmFibGUiLCJ0b29sdGlwIiwidGFnIiwiY3VycmVudFRhcmdldCIsInRoZW1lIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlIiwic3BhY2luZyIsImNvbG9ycyIsInRleHQiLCJzZWNvbmRhcnkiLCJfdGVtcGxhdGVPYmplY3QyIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NldHRpbmdzL1NwYW5CYXJTZXR0aW5ncy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7XG4gIERhdGFTb3VyY2VKc29uRGF0YSxcbiAgRGF0YVNvdXJjZVBsdWdpbk9wdGlvbnNFZGl0b3JQcm9wcyxcbiAgR3JhZmFuYVRoZW1lMixcbiAgdG9PcHRpb24sXG4gIHVwZGF0ZURhdGFzb3VyY2VQbHVnaW5Kc29uRGF0YU9wdGlvbixcbn0gZnJvbSAnQGdyYWZhbmEvZGF0YSc7XG5pbXBvcnQgeyBJbmxpbmVGaWVsZCwgSW5saW5lRmllbGRSb3csIElucHV0LCBTZWxlY3QsIHVzZVN0eWxlczIgfSBmcm9tICdAZ3JhZmFuYS91aSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3BhbkJhck9wdGlvbnMge1xuICB0eXBlPzogc3RyaW5nO1xuICB0YWc/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3BhbkJhck9wdGlvbnNEYXRhIGV4dGVuZHMgRGF0YVNvdXJjZUpzb25EYXRhIHtcbiAgc3BhbkJhcj86IFNwYW5CYXJPcHRpb25zO1xufVxuXG5leHBvcnQgY29uc3QgTk9ORSA9ICdOb25lJztcbmV4cG9ydCBjb25zdCBEVVJBVElPTiA9ICdEdXJhdGlvbic7XG5leHBvcnQgY29uc3QgVEFHID0gJ1RhZyc7XG5cbmludGVyZmFjZSBQcm9wcyBleHRlbmRzIERhdGFTb3VyY2VQbHVnaW5PcHRpb25zRWRpdG9yUHJvcHM8U3BhbkJhck9wdGlvbnNEYXRhPiB7fVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTcGFuQmFyU2V0dGluZ3MoeyBvcHRpb25zLCBvbk9wdGlvbnNDaGFuZ2UgfTogUHJvcHMpIHtcbiAgY29uc3Qgc3R5bGVzID0gdXNlU3R5bGVzMihnZXRTdHlsZXMpO1xuICBjb25zdCBzZWxlY3RPcHRpb25zID0gW05PTkUsIERVUkFUSU9OLCBUQUddLm1hcCh0b09wdGlvbik7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzKHsgd2lkdGg6ICcxMDAlJyB9KX0+XG4gICAgICA8aDMgY2xhc3NOYW1lPVwicGFnZS1oZWFkaW5nXCI+U3BhbiBiYXIgbGFiZWw8L2gzPlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmluZm9UZXh0fT5TcGFuIGJhciBsYWJlbCBsZXRzIHlvdSBhZGQgYWRkaXRpb25hbCBpbmZvIHRvIHRoZSBzcGFuIGJhciByb3cuPC9kaXY+XG5cbiAgICAgIDxJbmxpbmVGaWVsZFJvdyBjbGFzc05hbWU9e3N0eWxlcy5yb3d9PlxuICAgICAgICA8SW5saW5lRmllbGQgbGFiZWw9XCJMYWJlbFwiIGxhYmVsV2lkdGg9ezI2fSBncm93PlxuICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgIGlucHV0SWQ9XCJsYWJlbFwiXG4gICAgICAgICAgICBvcHRpb25zPXtzZWxlY3RPcHRpb25zfVxuICAgICAgICAgICAgdmFsdWU9e29wdGlvbnMuanNvbkRhdGEuc3BhbkJhcj8udHlwZSB8fCAnJ31cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsodikgPT4ge1xuICAgICAgICAgICAgICB1cGRhdGVEYXRhc291cmNlUGx1Z2luSnNvbkRhdGFPcHRpb24oeyBvbk9wdGlvbnNDaGFuZ2UsIG9wdGlvbnMgfSwgJ3NwYW5CYXInLCB7XG4gICAgICAgICAgICAgICAgLi4ub3B0aW9ucy5qc29uRGF0YS5zcGFuQmFyLFxuICAgICAgICAgICAgICAgIHR5cGU6IHY/LnZhbHVlID8/ICcnLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkR1cmF0aW9uXCJcbiAgICAgICAgICAgIGlzQ2xlYXJhYmxlXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXsnc2VsZWN0LWxhYmVsLW5hbWUnfVxuICAgICAgICAgICAgd2lkdGg9ezI1fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvSW5saW5lRmllbGQ+XG4gICAgICA8L0lubGluZUZpZWxkUm93PlxuICAgICAge29wdGlvbnMuanNvbkRhdGEuc3BhbkJhcj8udHlwZSA9PT0gVEFHICYmIChcbiAgICAgICAgPElubGluZUZpZWxkUm93IGNsYXNzTmFtZT17c3R5bGVzLnJvd30+XG4gICAgICAgICAgPElubGluZUZpZWxkIGxhYmVsPVwiVGFnIGtleVwiIGxhYmVsV2lkdGg9ezI2fSB0b29sdGlwPVwiVGFnIGtleSB3aGljaCB3aWxsIGJlIHVzZWQgdG8gZ2V0IHRoZSB0YWcgdmFsdWVcIj5cbiAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgdGFnIGtleVwiXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsodikgPT5cbiAgICAgICAgICAgICAgICB1cGRhdGVEYXRhc291cmNlUGx1Z2luSnNvbkRhdGFPcHRpb24oeyBvbk9wdGlvbnNDaGFuZ2UsIG9wdGlvbnMgfSwgJ3NwYW5CYXInLCB7XG4gICAgICAgICAgICAgICAgICAuLi5vcHRpb25zLmpzb25EYXRhLnNwYW5CYXIsXG4gICAgICAgICAgICAgICAgICB0YWc6IHYuY3VycmVudFRhcmdldC52YWx1ZSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhbHVlPXtvcHRpb25zLmpzb25EYXRhLnNwYW5CYXI/LnRhZyB8fCAnJ31cbiAgICAgICAgICAgICAgd2lkdGg9ezI1fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0lubGluZUZpZWxkPlxuICAgICAgICA8L0lubGluZUZpZWxkUm93PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuY29uc3QgZ2V0U3R5bGVzID0gKHRoZW1lOiBHcmFmYW5hVGhlbWUyKSA9PiAoe1xuICBpbmZvVGV4dDogY3NzYFxuICAgIGxhYmVsOiBpbmZvVGV4dDtcbiAgICBwYWRkaW5nLWJvdHRvbTogJHt0aGVtZS5zcGFjaW5nKDIpfTtcbiAgICBjb2xvcjogJHt0aGVtZS5jb2xvcnMudGV4dC5zZWNvbmRhcnl9O1xuICBgLFxuXG4gIHJvdzogY3NzYFxuICAgIGxhYmVsOiByb3c7XG4gICAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xuICBgLFxufSk7XG4iXSwibWFwcGluZ3MiOiI7OztBQUFB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