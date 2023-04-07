let menus = []

export const MainMenu = buildMenu(center, new Set(['new game', 'high scores', 'credits']), 'gui-main-menu')
export const HighScoresMenu = buildMenu(footer, new Set(['main menu', 'delete scores']), 'gui-high-scores')
export const CreditsMenu = buildMenu(footer, new Set(['main menu']), 'gui-credits')
export const PauseMenu = buildMenu(center, new Set(['resume', 'quit']), 'gui-pause-menu')

export function hideMenus() {
    for (menu in menus) {
        menu.hide();
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
  
    return circularRef
  }