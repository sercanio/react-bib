"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bibliography = void 0;
const react_1 = __importDefault(require("react"));
const nanoid_1 = require("nanoid");
const antd_1 = require("antd");
const bib = new Map();
const Bibliography = (props) => {
    const { style, mode, num = 0, source } = props;
    let _style = style || { listStyle: 'none' };
    const wrapUrlWithAnchorTag = (str, cite) => {
        const regex = /((?:https?:\/\/)?(?:www\.)?(?!mailto:)[^\s]+\.[^\s]+(\b\/\S*)?)/gi;
        const parts = str.split(regex);
        return parts.map((part, index) => {
            if (regex.test(part)) {
                const url = /^https?:\/\//i.test(part) ? part : `http://${part}`;
                const key = `url-${(0, nanoid_1.nanoid)()}`; // add a unique key for React
                return (react_1.default.createElement("a", { href: url, key: key }, part));
            }
            if (cite && part.includes(cite)) {
                return react_1.default.createElement("cite", { key: `cite-${(0, nanoid_1.nanoid)()}` }, part);
            }
            return part;
        });
    };
    if (mode === 'print') {
        return (react_1.default.createElement("ul", { style: _style }, [...bib.entries()].map((el) => (react_1.default.createElement("li", { key: (0, nanoid_1.nanoid)() }, el[1].includes('http') ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("b", null, el[0]),
            "\u00A0-\u00A0",
            react_1.default.createElement("i", null, wrapUrlWithAnchorTag(el[1])))) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("b", null, el[0]),
            "\u00A0-\u00A0",
            react_1.default.createElement("i", null, el[1]))))))));
    }
    if (mode === 'input') {
        bib.set(num, source);
        return (react_1.default.createElement(antd_1.Tooltip, { title: wrapUrlWithAnchorTag(bib.get(num)), color: 'black', style: { display: 'inline' } },
            react_1.default.createElement("b", { style: Object.assign({}, _style) },
                "[",
                num,
                "]")));
    }
    return react_1.default.createElement(react_1.default.Fragment, null);
};
exports.Bibliography = Bibliography;
//# sourceMappingURL=Bibliography.js.map