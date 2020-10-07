import { ul } from "./constants.js";

export class ListItem {

    changeRemoveBtnStatusFromFavouriteModalCb = this.changeRemoveBtnStatusFromFavouriteModalHandler.bind(this)

    constructor({photo, contributed, title, description, id}) {
        this.photo = photo
        this.contributed = contributed
        this.title = title
        this.description = description
        this.id = id
    }

    runMethods() {
        this.addToFavourites()
        this.changeRemoveBtnStatusFromFavouriteModal()
        this.removeEvents()
    }

    renderItem() {
        const li = document.createElement('li')

        li.innerHTML = `
            <div class="item">
                <div class="item_photo"><img src="${this.photo}" alt="${this.title}"></div> 
                <div class="item_description">
                    <span class="item_description_elem "> 
                        <span class="bold title">${this.title}</span>
                    </span> 
                    <span class="item_description_elem"> 
                        <span class="bold description">Description:</span> ${this.description}
                    </span> 
                    <span class="item_description_elem small"> 
                        <span class="small_contributed">Contributed by:</span> ${this.contributed}
                    </span> 
                    <span class="spanBtnAdd"> 
                        <button class="btn btnAdd" id="${this.id}">Add</button>
                    </span> 
                </div>  
            </div>
        `
        li.classList.add('resultList')
        ul.append(li)
    }

    addToFavourites() {
        const btnAdd = document.getElementById(`${this.id}`)
        const checkButtonAddBind = this.checkButtonAdd.bind(this)

        btnAdd.addEventListener('click', function () {
            const buttonName = this.innerText

            checkButtonAddBind(buttonName, btnAdd)
        })
    }

    checkButtonAdd(buttonName, btnAdd) {
        if (buttonName === 'Add') {
            btnAdd.innerText = 'Remove'
            btnAdd.classList.add('remove')
            this.favouritesAmountAdd()
            this.showItemInFavouriteModal()
        }
        if (buttonName === 'Remove') {
            btnAdd.innerText = 'Add'
            btnAdd.classList.remove('remove')
            this.favouritesAmountSubtract()
            this.removeItemInFavouriteModal()
        }
    }

    favouritesAmountAdd() {
        document.dispatchEvent(new CustomEvent('favouritesAdd'))
    }
    favouritesAmountSubtract() {
        document.dispatchEvent(new CustomEvent('favouritesSubtract'))
    }

    showItemInFavouriteModal() {
        const item = {id: this.id, photo: this.photo, title: this.title, description: this.description}

        document.dispatchEvent(new CustomEvent('addToFavourites', {
            detail: { item }
        }))
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

        this.checkButtonAdd('Remove', addRemoveButton)
    }
    changeRemoveBtnStatusFromFavouriteModal() {
        document.addEventListener('changeRemoveBtnStatus', e => this.changeRemoveBtnStatusFromFavouriteModalCb(e))
    }

    removeEvents() {
        document.removeEventListener('changeRemoveBtnStatus', e => this.changeRemoveBtnStatusFromFavouriteModalCb(e))
    }
}
