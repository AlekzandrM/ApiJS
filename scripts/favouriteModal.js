import { favouriteUl, favModal, header_btn, favModalClose } from "./constants.js";

export class FavouriteModal {

    favouriteList = []
    elemWithEventsArray = []

    addToFavouriteListCb = this.addToFavouriteListHandler.bind(this)
    openModalCb = this.openModalHandler.bind(this)
    closeModalCb = this.closeModalHandler.bind(this)
    removeFromFavouriteListCb = this.removeFromFavouriteListHandler.bind(this)

    render() {
        this.favouriteList.forEach(el => {
            const li = document.createElement('li')

            li.innerHTML = `
                <div class="modalItem">
                    <span class="modalItem_img">
                        <img src="${el.photo}" alt="${el.photo}">
                    </span>                    
                    <span class="modalItem_context">
                        <div class="modalItem_context_title">${el.title}</div>
                        <div class="modalItem_context_description">${el.description}</div>
                    </span>
                    <button class="modalItem_context_btnRemove btn" id="${el.id}">Remove</button>
                </div>
            `
            favouriteUl.append(li)
        })
        this.addToFavouriteList()
        this.removeItemFromButtonRemove()
        this.removeItemFromListItem()
    }

    runMethods() {
        this.openModal()
        this.closeModal()
        this.render()
        // this.addToFavouriteList()
        // this.removeItemFromListItem()
        this.removeEvents()
    }

    openModalHandler() {
        this.clearList()
        this.render()
        favModal.classList.remove('hide')
    }
    openModal() {
        header_btn.addEventListener('click', this.openModalCb)
    }
    closeModalHandler() {
        favModal.classList.add('hide')
    }
    closeModal() {
        favModalClose.addEventListener('click', this.closeModalCb)
    }

    addToFavouriteListHandler(e) {
        const item = e.detail.item
        const duplicate = this.favouriteList.some(el => el.id === item.id)

        if (!duplicate) {
            this.clearList()
            this.favouriteList = [...this.favouriteList, item]
            this.render()
        }
    }
    addToFavouriteList() {
        document.addEventListener('addToFavourites', e => this.addToFavouriteListCb(e))
    }

    removeFromFavouriteListHandler(e) {
        e.stopImmediatePropagation()
        const filteredList = this.favouriteList.filter(el => el.id !== +e.detail.removeItemID)

        this.favouriteList = [...filteredList]
        this.clearList()
        this.render()
    }
    removeItemFromListItem() {
        document.addEventListener('removeFromFavourites', e => this.removeFromFavouriteListCb(e))
    }

    removeFromButtonHandler(id) {
        const filteredList = this.favouriteList.filter(el => el.id !== +id)
        const elemHasEvent = this.elemWithEventsArray.includes(id)

        if (!elemHasEvent) {
            this.elemWithEventsArray = [...this.elemWithEventsArray, id]
            document.dispatchEvent(new CustomEvent('changeRemoveBtnStatus', {
                detail: { id }
            }))

            document.dispatchEvent(new CustomEvent('deductFavouriteAmountFromFavorModal', {
                detail: { favouritesAmount: filteredList.length}
            }))
        }

        this.favouriteList = [...filteredList]
        this.clearList()
        this.render()

    }

    removeItemFromButtonRemove() {
        const removeButtons = document.querySelectorAll(`.modalItem_context_btnRemove`)
        const removeButtonsArray = Array.from(removeButtons)
        const removeFromFavouriteListHandlerBind = this.removeFromButtonHandler.bind(this)

        removeButtonsArray.forEach(el => {
            el.addEventListener('click', function() {
                const id = el.getAttribute('id')
                removeFromFavouriteListHandlerBind(id)
            })
        })
    }

    clearList() {
        favouriteUl.innerHTML = null
    }

    removeEvents() {
        // document.removeEventListener('removeFromFavourites', e => this.removeFromFavouriteListCb(e.detail.removeItemID))
        // document.removeEventListener('addToFavourites', e => this.addToFavouriteListCb(e))
    }
}
