export class Persistent {
  name
  data
  
  /**
   * @param {string} name 
   * @param {T} defaultData  Type T is any type
   */
  constructor (name, defaultData) {
    this.name = name
    if (localStorage.hasItem(name)) {
      this.get(true)
    } else {
      this.set(defaultData)
      this.data = defaultData
    }
  }

  /**
   * 
   * @param {boolean} live Retrieve from localstorage, else use cached value
   * @returns {T}
   */
  get (live) {
    if (live && localStorage.hasItem(this.name)) {
      const dataString = localStorage.get(this.name)
      this.data = JSON.parse(dataString)
    }
    return this.data
  }
  
  /**
   * @param {T} data 
   */
  set (data) {
    this.data = data
    localStorage.setItem(this.name, JSON.stringify(data))
  }
  
  clear () {
    localStorage.removeItem(this.name)
    this.data = undefined
  }
}
