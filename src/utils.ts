import { SELECTOR_TYPE } from './constants'
import { SelectorData } from './interface/result'
import { Map } from './interface/common'

export const getUniqueScore = (querySelector: String, target: HTMLElement): Number=>{
  // @ts-ignore
  const totalNodes = target.querySelectorAll(querySelector).length;
  return Number((1 / totalNodes).toPrecision());
}

export const getQuerySelector = (nodeName: String, attributeName: String, attributeValue: string | undefined): String=>{
  return `${nodeName.toLowerCase()}[${attributeName}="${attributeValue}"]`;
}
