/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ExtensionLoader from './ExtensionLoader'
import IExtension from './IExtension'

export interface SearchOption {
  searchBy: string
  version: string
  searchRegexOption: string
}

class RemoteExtensionManager {
  search(regex: string, option: SearchOption): IExtension[] {
    return []
  }

  getExtension(id: string): IExtension {
    return null as any
  }

  hasUpgrade(id: string): boolean {
    return false
  }
}

export default RemoteExtensionManager
