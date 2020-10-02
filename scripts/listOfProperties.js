import { ListItem } from "./listItem.js";
import { ul, noItems } from './constants.js'


export class ListComponent {

    scrollItem = 0
    listOfProperties = []

    listOfLoadedCb = this.listOfLoadedHandler.bind(this)

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

        this.clearListOfProperties()
        this.render(this.listOfProperties)
        this.showMessageNoItems()
        this.scrollToElement()
    }
    listOfLoaded() {
        document.addEventListener('requestResult', e => this.listOfLoadedCb(e))
    }

    getPositionsInObject(obj = {}) {
        const {id, image_url, name, description, contributed_by} = obj
        return {id: id, photo: image_url, title: name, description, contributed: contributed_by }
    }

    scrollToElement() {
        const elements = document.querySelectorAll('.resultList')
        const focusedElement = elements[this.scrollItem]

        if (focusedElement) focusedElement.scrollIntoView({block: 'start', behavior: 'smooth'})
    }

    clearListOfProperties() {
        ul.innerHTML = null
    }

    showMessageNoItems() {
        if (this.listOfProperties.length !== 0) {
            noItems.classList.add('noItems')
        } else  noItems.classList.remove('noItems')
    }
}
