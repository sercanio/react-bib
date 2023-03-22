import React from 'react'
import { nanoid } from 'nanoid'
import { Tooltip } from 'antd'

export interface IBibliographyProps
  extends React.DetailedHTMLProps<
    React.OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement
  > {
  mode: 'input' | 'print'
  num?: number
  source?: string
}

const bib = new Map()
export const Bibliography: React.FunctionComponent<IBibliographyProps> = (
  props
) => {
  const { style, mode, num = 0, source } = props
  let _style: React.CSSProperties = style || { listStyle: 'none' }
  const wrapUrlWithAnchorTag = (str: string, cite?: string) => {
    const regex =
      /((?:https?:\/\/)?(?:www\.)?(?!mailto:)[^\s]+\.[^\s]+(\b\/\S*)?)/gi
    const parts = str.split(regex)
    return parts.map((part, index) => {
      if (regex.test(part)) {
        const url = /^https?:\/\//i.test(part) ? part : `http://${part}`
        const key = `url-${nanoid()}` // add a unique key for React
        return (
          <a href={url} key={key}>
            {part}
          </a>
        )
      }
      if (cite && part.includes(cite)) {
        return <cite key={`cite-${nanoid()}`}>{part}</cite>
      }
      return part
    })
  }
  if (mode === 'print') {
    return (
      <ul style={_style}>
        {[...bib.entries()].map((el) => (
          <li key={nanoid()}>
            {el[1].includes('http') ? (
              <>
                <b>{el[0]}</b>
                &nbsp;-&nbsp;
                <i>{wrapUrlWithAnchorTag(el[1])}</i>
              </>
            ) : (
              <>
                <b>{el[0]}</b>
                &nbsp;-&nbsp;
                <i>{el[1]}</i>
              </>
            )}
          </li>
        ))}
      </ul>
    )
  }
  if (mode === 'input') {
    bib.set(num, source)
    return (
      <Tooltip
        title={wrapUrlWithAnchorTag(bib.get(num))}
        color='black'
        style={{ display: 'inline' }}
      >
        <b style={{ ..._style }}>[{num}]</b>
      </Tooltip>
    )
  }
  return <></>
}
