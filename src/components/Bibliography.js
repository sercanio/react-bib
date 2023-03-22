"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bibliography = void 0;
const react_1 = __importDefault(require("react"));
const Bibliography = (props) => {
    const { children, style } = props;
    let _style = style || {};
    return (react_1.default.createElement("div", Object.assign({ style: _style }, props), children));
};
exports.Bibliography = Bibliography;
