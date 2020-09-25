import { SELECTOR_TYPE } from '../constants'
import { SelectorData } from '../interface/result'
import { Map } from '../interface/common'

const getUniqueScore = (querySelector: String, target: HTMLElement): Number=>{
  // @ts-ignore
  const totalNodes = target.querySelectorAll(querySelector).length;
  return Number((1 / totalNodes).toPrecision());
}

const getQuerySelector = (nodeName: String, attributeName: String, attributeValue: string | undefined): String=>{
  return `${nodeName.toLowerCase()}[${attributeName}="${attributeValue}"]`;
}

/**
 * Returns id, value and uniqueness of HTML node
 * @param htmlNode
 * @param target
 * @return SelectorData
 */
export const getDataAttribute = (htmlNode:HTMLElement, target:HTMLElement):SelectorData[]|null => {
  const nodeName = htmlNode.nodeName;
  const attributes = htmlNode.attributes;
  const length = attributes.length
  const attributeList:Map = {};

  for(let i=0; i<length;i++){
    const attribute = attributes[i]
    const attributeName = attribute.nodeName;
    const attributeValue = attribute.nodeValue;

    // If data-id is not present, continue
    if(attributeName.indexOf("data-") === -1) continue;
    attributeList[attributeName]=attributeValue
  }

  if(Object.keys(attributeList).length === -1 ) return null;

  return Object.keys(attributeList).map((attributeName) => {
    const attributeValue = attributeList[attributeName] as string;
    const querySelector =  getQuerySelector(nodeName, attributeName, attributeValue);
    const uniqueScore = getUniqueScore(querySelector, target);

    return {
      type: SELECTOR_TYPE.DATA_ATTRIBUTE,
      value: querySelector,
      uniquenessScore: uniqueScore
    }
  });
}
