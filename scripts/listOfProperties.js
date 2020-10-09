import { ListItem } from "./listItem.js";
import { ul, noItems, btnUp, stopToScrollToElement, header_btn } from './constants.js'
import { setArrInLocalStorage, getArrInLocalStorage } from './generalMethods.js'


export class ListComponent {

    listOfProperties = []

    listOfLoadedCb = this.listOfLoadedHandler.bind(this)
    windowScrollCb = this.windowScrollHandler.bind(this)
    clearListCb = this.clearListHandler.bind(this)
    setFavouritesAmountCb = this.setFavouritesAmountHandler.bind(this)
    reloadSearchesCb = this.reloadSearchesHandler.bind(this)

    render(arr) {
        arr.forEach(el => {
            const property = new ListItem(el)
            property.renderItem()
            property.runMethods()
        })
        this.reloadSearches()
    }

    runMethods() {
        this.render(this.listOfProperties)
        this.listOfLoaded()
        this.setFavouritesAmount()
    }

    listOfLoadedHandler(e) {
        const list = e.detail.requestResult

        this.clearList()
        list.forEach(el => {
            const beer = this.getPositionsInObject(el)

            this.listOfProperties = [...this.listOfProperties, beer]
        })
        this.render(this.listOfProperties)
        this.scrollTo()
        this.showMessageNoItems()
        setArrInLocalStorage(this.listOfProperties, 'recentSearches')
    }

    listOfLoaded() {
        document.addEventListener('requestResult', e => this.listOfLoadedCb(e))
    }

    reloadSearchesHandler() {
        const recentSearches = getArrInLocalStorage('recentSearches')

        if (recentSearches) {
            this.clearList()
            this.listOfProperties = [...recentSearches]
            this.render(this.listOfProperties)
        }
    }
    reloadSearches() {
        window.addEventListener('load', this.reloadSearchesCb)
    }

    scrollTo() {
        if (this.listOfProperties.length >= 1) {
            this.scrollToElement()
            this.windowScroll()
        }
    }

    getPositionsInObject(receivedList = {}) {
        const { id, image_url, name, description, contributed_by } = receivedList

        return {id: id, photo: image_url, title: name, description, contributed: contributed_by }
    }

    scrollToElement() {
        const resultListFirstElement = document.querySelector('.resultList')
        const resultListAll = document.querySelectorAll('.resultList')
        const stopToScrolling = resultListAll.length > stopToScrollToElement

        if (stopToScrolling) return
        if (resultListFirstElement) resultListFirstElement.scrollIntoView({block: 'start', behavior: 'smooth'})
    }

    scrollToElementFromBtnUp() {
        const resultListFirstElement = document.querySelector('.resultList')

        if (resultListFirstElement) resultListFirstElement.scrollIntoView({block: 'start', behavior: 'smooth'})
    }

    windowScrollHandler(elemCoordsTop) {
        const scrolled = window.pageYOffset

        if (scrolled > elemCoordsTop) {
            btnUp.classList.remove('hide')
            btnUp.addEventListener('click', this.scrollToElementFromBtnUp)
        }
        if (scrolled < elemCoordsTop) btnUp.classList.add('hide')
    }

    windowScroll() {
        const elem = document.querySelector('.resultList')
        const elemCoords = elem.getBoundingClientRect()

        window.addEventListener('scroll', () => this.windowScrollCb(elemCoords.top))
    }

    setFavouritesAmountHandler(e) {
        const favAmount = e.detail.favouritesAmount

        header_btn.innerHTML = `Favourites (${favAmount})`
    }

    setFavouritesAmount() {
        document.addEventListener('favouritesAmount', (e) => this.setFavouritesAmountCb(e))
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
