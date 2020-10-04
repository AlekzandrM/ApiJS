import { ListItem } from "./listItem.js";
import { ul, noItems, btnUp } from './constants.js'


export class ListComponent {

    scrollElement = 5
    listOfProperties = []

    listOfLoadedCb = this.listOfLoadedHandler.bind(this)
    windowScrollCb = this.windowScrollHandler.bind(this)
    clearListCb = this.clearListHandler.bind(this)

    render(arr) {
        arr.forEach(el => {
            const property = new ListItem(el)
            property.renderItem()
        })
    }

    runMethods() {
        this.render(this.listOfProperties)
        this.listOfLoaded()
    }

    listOfLoadedHandler(e) {
        const list = e.detail.requestResult

        list.forEach(el => {
            const beer = this.getPositionsInObject(el)

            this.listOfProperties = [...this.listOfProperties, beer]
        })
        this.clearList()
        this.render(this.listOfProperties)
        if (this.listOfProperties.length >= 1) {
            this.scrollToElement()
            this.windowScroll()
        }
        this.showMessageNoItems()
    }
    listOfLoaded() {
        document.addEventListener('requestResult', e => this.listOfLoadedCb(e))
    }

    getPositionsInObject(obj = {}) {
        const {id, image_url, name, description, contributed_by} = obj

        return {id: id, photo: image_url, title: name, description, contributed: contributed_by }
    }

    scrollToElement() {
        const element = document.querySelector('.resultList')
        const elements = document.querySelectorAll('.resultList')
        const secondFetch = elements.length > this.scrollElement

        if (secondFetch) return
        if (element) element.scrollIntoView({block: 'start', behavior: 'smooth'})
    }

    windowScrollHandler(elemCoordsTop) {
        let scrolled = window.pageYOffset

        if (scrolled > elemCoordsTop) {
            btnUp.classList.remove('hide')
            btnUp.addEventListener('click', this.scrollToElement)
        }
        if (scrolled < elemCoordsTop) btnUp.classList.add('hide')
    }
    windowScroll() {
        const elem = document.querySelector('.resultList')
        const elemCoords = elem.getBoundingClientRect()

        window.addEventListener('scroll', () => this.windowScrollCb(elemCoords.top))
    }

    clearListHandler() {
        ul.innerHTML = null
        this.listOfProperties = []
    }
    clearList() {
        document.addEventListener('clearListEvent', this.clearListCb)
    }

    showMessageNoItems() {
        if (this.listOfProperties.length !== 0) {
            noItems.classList.add('hide')
        } else  noItems.classList.remove('hide')
    }
}
