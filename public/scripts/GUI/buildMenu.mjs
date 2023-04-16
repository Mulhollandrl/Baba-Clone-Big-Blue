import { Mode } from "../state/globals.mjs"
import { MODES, PAUSE_OPTIONS } from "../state/enums.mjs"


export const MainMenu = buildMenu(center, new Set([MODES.NEWGAME, MODES.CREDITS]), 'gui-main-menu')
export const CreditsMenu = buildMenu(footer, new Set([MODES.MAIN]), 'gui-credits')
export const PauseMenu = buildMenu(center, new Set([PAUSE_OPTIONS.RESUME, PAUSE_OPTIONS.QUIT]), 'gui-pause-menu')

let menus = []

export function hideMenus() {
    for (menu in menus) {
        menu.setVisibility(false);
    }
}

export function buildMenu (parent, items, menuName) {
    const elements = new Map()
    const wrapper = document.createElement('div')

    wrapper.classList.add('hidden', 'menu', menuName)

    for (const name of items) {
      const element = document.createElement('button')
      element.innerHTML = name
      wrapper.appendChild(element)
      elements.set(name, element)
    }

    parent.appendChild(wrapper)
    
    let circularRef = {}
    
    const setVisibility = (visible) => {
      visible ? wrapper.classList.remove('hidden') : wrapper.classList.add('hidden')
      return circularRef
    }
  
    const onButton = (name, callback) => {
      if (!elements.has(name)) {
        return
      }
      
      elements.get(name).onclick = callback
      return circularRef
    }
    
    const freeze = () => {
      delete circularRef.onButton
      delete circularRef.freeze
      return circularRef
    }
    
    circularRef = {
      setVisibility,
      onButton,
      freeze
    }
  
    menus.push(circularRef)
    
    return circularRef
  }
