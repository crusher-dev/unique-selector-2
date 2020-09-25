import { SELECTOR_TYPE } from '../constants'

export interface SelectorData{
  value: String;
  type: String;
  uniquenessScore: Number;
}

export interface UniqueSelectorResult{
    mostUniqueSelector: SelectorData;
    list: SelectorData[];
}
