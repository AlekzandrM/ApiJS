import { ul, itemModal, btnNameAdd, btnNameRemove } from "./constants.js";
import { setButtonState, getButtonState } from './generalMethods.js'

export class ListItem {

    btnState = btnNameAdd

    changeRemoveBtnStatusFromFavouriteModalCb = this.changeRemoveBtnStatusFromFavouriteModalHandler.bind(this)
    openItemModalCb = this.openItemModalHandler.bind(this)
    addFavouritesFromItemModalCb = this.addFavouritesFromItemModalHandler.bind(this)
    removeFavouritesFromItemModalCb = this.removeFavouritesFromItemModalHandler.bind(this)

    constructor({photo, contributed, title, description, id}) {
        this.photo = photo
        this.contributed = contributed
        this.title = title
        this.description = description
        this.id = id
    }

    runMethods() {
        this.openItemModal()
        this.addFavouritesFromItemModal()
        this.removeFavouritesFromItemModal()
    }

    renderItem() {
        const li = document.createElement('li')

        li.innerHTML = `
            <div class="item">
                <div class="item_photo"><img src="${this.photo}" alt="${this.title}"></div> 
                <div class="item_description">
                    <span class="item_description_elem "> 
                        <span class="bold title" id="${this.id}Name"><a>${this.title}</a></span>
                    </span> 
                    <span class="item_description_elem"> 
                        <span class="bold description">Description:</span> ${this.description}
                    </span> 
                    <span class="item_description_elem small"> 
                        <span class="small_contributed">Contributed by:</span> ${this.contributed}
                    </span> 
                    <span class="spanBtnAdd"> 
                        <button class="btn btnAdd ${this.setButtonClass()}" id="${this.id}">
                            ${this.setButtonName()}
                        </button>
                    </span> 
                </div>  
            </div>
        `
        li.classList.add('resultList')
        ul.append(li)
        this.addToFavourites()
        this.changeRemoveBtnStatusFromFavouriteModal()
    }

    setButtonName() {
        const btnStateStored = getButtonState(`${this.id}`)

        return btnStateStored ? btnStateStored : this.btnState
    }

    setButtonClass() {
        const btnStateStored = getButtonState(`${this.id}`)

        return btnStateStored === btnNameRemove ? 'remove' : ''
    }

    addToFavourites() {
        const btnAdd = document.getElementById(`${this.id}`)
        const checkButtonAddBind = this.checkButtonAdd.bind(this)

        btnAdd.addEventListener('click', function (e) {
            e.stopImmediatePropagation()
            const buttonName = this.innerText

            checkButtonAddBind(buttonName, btnAdd)
        })
    }

    checkButtonAdd(buttonName, btnAdd) {
        if (buttonName === btnNameAdd) {
            this.showItemInFavouriteModal()
            btnAdd.innerText = btnNameRemove
            btnAdd.classList.add('remove')
            setButtonState(this.id, btnNameRemove)
        }
        if (buttonName === btnNameRemove) {
            btnAdd.innerText = btnNameAdd
            btnAdd.classList.remove('remove')
            this.removeItemInFavouriteModal()
            setButtonState(this.id, btnNameAdd)
        }
    }

    showItemInFavouriteModal() {
        const item = {id: this.id, photo: this.photo, title: this.title, description: this.description}

        document.dispatchEvent(new CustomEvent('addToFavourites', {
            detail: { item }
        }))
    }

    showItemInItemModal() {
        const item = {id: this.id, photo: this.photo, title: this.title, description: this.description}
        const btn = document.getElementById(`${this.id}`)

        document.dispatchEvent(new CustomEvent('addToItemModal', {
            detail: { item, btn }
        }))
    }

    addFavouritesFromItemModalHandler(e) {
        e.stopImmediatePropagation()
        const id = e.detail.id
        const btnAdd = document.getElementById(id)

        this.checkButtonAdd(btnNameAdd, btnAdd)
    }

    addFavouritesFromItemModal() {
        document.addEventListener('addFavouriteFromItemModal', e => this.addFavouritesFromItemModalCb(e))
    }

    removeFavouritesFromItemModalHandler(e) {
        e.stopImmediatePropagation()
        const id = e.detail.id
        const btnAdd = document.getElementById(id)

        this.checkButtonAdd(btnNameRemove, btnAdd)
        this.removeItemInFavouriteModal()
    }

    removeFavouritesFromItemModal() {
        document.addEventListener('removeFavouriteFromItemModal', e => this.removeFavouritesFromItemModalCb(e))
    }

    openItemModalEvent() {
        this.showItemInItemModal()
        itemModal.classList.remove('hide')
    }

    openItemModalHandler() {
        const btnAddFromList = document.getElementById(`${this.id}Name`)
        const openItemModalEventBind = this.openItemModalEvent.bind(this)

        btnAddFromList.addEventListener('click', () => openItemModalEventBind() )
    }

    openItemModal() {
        const itemName = document.getElementById(`${this.id}Name`)

        itemName.addEventListener('click', this.openItemModalCb)
    }

    removeItemInFavouriteModal() {
        document.dispatchEvent(new CustomEvent('removeFromFavourites', {
            detail: { removeItemID: this.id }
        }))
    }

    changeRemoveBtnStatusFromFavouriteModalHandler(e) {
        e.stopImmediatePropagation()
        const id = e.detail.id
        const addRemoveButton = document.getElementById(`${id}`)

        this.checkButtonAdd(btnNameRemove, addRemoveButton)
    }

    changeRemoveBtnStatusFromFavouriteModal() {
        document.addEventListener('changeRemoveBtnStatus', e => this.changeRemoveBtnStatusFromFavouriteModalCb(e))
    }
}
