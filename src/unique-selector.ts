import { Configuration, UserConfiguration, DefaultConfiguration } from './interface/config'
import {UniqueSelectorResult} from './interface/result'
import { getIDSelectors } from './selectors/id'
import { getDataAttribute } from './selectors/dataAttribute'
import {getAttribute} from './selectors/attribute'
import { getPnC } from './selectors/pnc'

/**
 * Entry File.
 */
class UniqueSelector {

  private _configuration: Configuration;

  /**
   * Constructor for function. Take Config
   * @param config
   */
  constructor(config: UserConfiguration){
    this._configuration = {...DefaultConfiguration, ...config};
  }

  /**
   *
   * @param element. HTML Node for which you want to find code
   * @return . Set of unique element with computed most unique element.
   */
   getUniqueSelector(element: HTMLElement):UniqueSelectorResult{

    if (element.nodeType !== Node.ELEMENT_NODE) {
      throw new Error(`Can't generate CSS selector for non-element node type.`)
    }

    const idSelector = getIDSelectors(element,this._configuration.root)
    const getDataAttributesSelector = getDataAttribute(element,this._configuration.root)
    const geAttributesSelector = getAttribute(element,this._configuration.root);
    const genPnCSelectors = getPnC(element,this._configuration.root);

    let mostUniqueSelector = null;

    if(idSelector.length>1){
      mostUniqueSelector = idSelector[0];
    } else if(getDataAttributesSelector && getDataAttributesSelector.length>0){
      mostUniqueSelector = getDataAttributesSelector[0];
    } else if(geAttributesSelector && geAttributesSelector.length>0){
      mostUniqueSelector = geAttributesSelector[0];
    } else if(genPnCSelectors && genPnCSelectors.length>0){
      mostUniqueSelector = genPnCSelectors[0];
    }

    // @ts-ignore
    return {
      mostUniqueSelector: idSelector,
      list: [...idSelector, ...getDataAttributesSelector, ...geAttributesSelector, ...genPnCSelectors ]
    } as UniqueSelectorResult
   }
}

export default UniqueSelector;
