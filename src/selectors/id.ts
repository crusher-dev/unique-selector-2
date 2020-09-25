import { SELECTOR_TYPE } from '../constants'
import { SelectorData } from '../interface/result'

/**
 * Returns id, value and uniqueness of HTML node
 * @param htmlNode
 * @param target
 * @return SelectorData
 */
export const getIDSelectors = (htmlNode:HTMLElement, target:HTMLElement):SelectorData | null => {
  const elementId = htmlNode.id;
  if(!elementId) return null;

  const selectorValue = `#${elementId}`;
  const noOfElementWithSameId = target.querySelectorAll(selectorValue).length;
  const uniquenessScore = Number((1/noOfElementWithSameId).toPrecision());

  return {
    type: SELECTOR_TYPE.ID,
    value: selectorValue,
    uniquenessScore
  }
}
