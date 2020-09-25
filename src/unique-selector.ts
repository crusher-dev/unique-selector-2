import { Configuration, UserConfiguration, DefaultConfiguration } from './interface/config'
import {UniqueSelectorResult} from './interface/result'
import { getIDSelectors } from './selectors/id'
import { getDataAttribute } from './selectors/dataAttribute'

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
    const idSelector = getIDSelectors(element,this._configuration.root)
    const getDataAttributes = getDataAttribute(element,this._configuration.root)

    return {
      mostUniqueSelector: idSelector,
      list: [idSelector, getDataAttributes]
    } as UniqueSelectorResult
   }
}

export default UniqueSelector;