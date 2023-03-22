import React from 'react';
import { nanoid } from 'nanoid';
import { Tooltip } from 'antd';
const bib = new Map();
export const Bibliography = (props) => {
    const { style, mode, num = 0, source } = props;
    let _style = style || { listStyle: 'none' };
    const wrapUrlWithAnchorTag = (str, cite) => {
        const regex = /((?:https?:\/\/)?(?:www\.)?(?!mailto:)[^\s]+\.[^\s]+(\b\/\S*)?)/gi;
        const parts = str.split(regex);
        return parts.map((part, index) => {
            if (regex.test(part)) {
                const url = /^https?:\/\//i.test(part) ? part : `http://${part}`;
                const key = `url-${nanoid()}`; // add a unique key for React
                return (React.createElement("a", { href: url, key: key }, part));
            }
            if (cite && part.includes(cite)) {
                return React.createElement("cite", { key: `cite-${nanoid()}` }, part);
            }
            return part;
        });
    };
    if (mode === 'print') {
        return (React.createElement("ul", { style: _style }, [...bib.entries()].map((el) => (React.createElement("li", { key: nanoid() }, el[1].includes('http') ? (React.createElement(React.Fragment, null,
            React.createElement("b", null, el[0]),
            "\u00A0-\u00A0",
            React.createElement("i", null, wrapUrlWithAnchorTag(el[1])))) : (React.createElement(React.Fragment, null,
            React.createElement("b", null, el[0]),
            "\u00A0-\u00A0",
            React.createElement("i", null, el[1]))))))));
    }
    if (mode === 'input') {
        bib.set(num, source);
        return (React.createElement(Tooltip, { title: wrapUrlWithAnchorTag(bib.get(num)), color: 'black', style: { display: 'inline' } },
            React.createElement("b", { style: Object.assign({}, _style) },
                "[",
                num,
                "]")));
    }
    return React.createElement(React.Fragment, null);
};
//# sourceMappingURL=Bibliography.js.map