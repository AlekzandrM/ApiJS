import { ListItem } from "./listItem.js";
import { ul, noItems, btnUp, stopToScrollToElement, header_btn } from './constants.js'


export class ListComponent {

    listOfProperties = []
    favouritesAmount = 0

    listOfLoadedCb = this.listOfLoadedHandler.bind(this)
    windowScrollCb = this.windowScrollHandler.bind(this)
    clearListCb = this.clearListHandler.bind(this)
    addFavouritesAmountCb = this.addFavouritesAmountHandler.bind(this)
    subtractFavouritesAmountCb = this.subtractFavouritesAmountHandler.bind(this)
    deductFavouriteAmountFromFavorModalCb = this.subtractFavouritesAmountFromFavorModalHandler.bind(this)

    render(arr) {
        arr.forEach(el => {
            const property = new ListItem(el)
            property.renderItem()
            property.runMethods()
        })
    }

    runMethods() {
        this.render(this.listOfProperties)
        this.listOfLoaded()
        this.setFavouritesAmount()
    }

    listOfLoadedHandler(e) {
        const list = e.detail.requestResult

        list.forEach(el => {
            const beer = this.getPositionsInObject(el)

            this.listOfProperties = [...this.listOfProperties, beer]
        })
        this.clearList()
        this.render(this.listOfProperties)
        this.scrollTo()
        this.showMessageNoItems()
    }
    listOfLoaded() {
        document.addEventListener('requestResult', e => this.listOfLoadedCb(e))
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

    addFavouritesAmountHandler() {
        this.favouritesAmount++
        header_btn.innerHTML = `Favourites (${this.favouritesAmount})`
    }

    subtractFavouritesAmountHandler() {
        this.favouritesAmount--
        if (this.favouritesAmount < 0) this.favouritesAmount = 0
        header_btn.innerHTML = `Favourites (${this.favouritesAmount})`
    }
    subtractFavouritesAmountFromFavorModalHandler(e) {
        const newAmount = e.detail.favouritesAmount
        this.favouritesAmount--
        if (this.favouritesAmount < 0) this.favouritesAmount = 0
        header_btn.innerHTML = `Favourites (${newAmount})`
    }

    setFavouritesAmount() {
        document.addEventListener('favouritesAdd', this.addFavouritesAmountCb)
        document.addEventListener('favouritesSubtract', this.subtractFavouritesAmountCb)
        document.addEventListener('deductFavouriteAmountFromFavorModal', (e) => this.deductFavouriteAmountFromFavorModalCb(e))
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
