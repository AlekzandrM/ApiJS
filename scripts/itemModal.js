import { itemModal, closeModal, itemContent } from './constants.js'

export class ItemModal {

    item = {}
    btnToAddRemove
    btnText = 'Add'

    closeModalCb = this.closeModalHandler.bind(this)
    getItemCb = this.getItemHandler.bind(this)

    render() {
        itemContent.innerHTML = `
            <span class="itemModal_content_img"><img alt="${this.item.title}" src="${this.item.photo}"></span>           
            <div class="itemModal_content_name">${this.item.title}</div>
            <div class="itemModal_content_description">${this.item.description}</div>
            <button class="btnAdd btnModal">${this.btnText}</button>
        `
        this.btnToAddRemove = this.getBtnModal()
        this.getAddButton()
    }

    runMethods() {
        this.getItem()
        this.closeModal()
    }

    getItemHandler(e) {
        this.item = e.detail.item
        this.btnText = e.detail.btn.innerText

        this.render()
    }
    getItem() {
        document.addEventListener('addToItemModal', e => this.getItemCb(e))
    }

    getAddButton() {
        const changeBtnToRemoveBind = this.changeBtnToRemove.bind(this)
        const changeBtnToAddBind = this.changeBtnToAdd.bind(this)

        this.checkButtonText(this.btnToAddRemove, this.btnText)
        if (this.btnText === 'Add') {
            this.btnToAddRemove.addEventListener('click', changeBtnToRemoveBind)
        }
        if (this.btnText === 'Remove') {
            this.btnToAddRemove.addEventListener('click', changeBtnToAddBind)
        }
    }

    changeBtnToRemove() {
        this.btnText = 'Remove'
        this.btnToAddRemove.classList.add('remove')
        this.render()
        document.dispatchEvent(new CustomEvent('addFavouriteFromItemModal', {
            detail: { id: this.item.id, item: this.item }
        }))
    }

    changeBtnToAdd() {
        this.btnText = 'Add'
        this.btnToAddRemove.classList.remove('remove')
        this.render()
        document.dispatchEvent(new CustomEvent('removeFavouriteFromItemModal', {
            detail: { id: this.item.id }
        }))
    }

    checkButtonText(btn, text) {
        if (text === 'Add') {
            btn.classList.remove('remove')
        }
        if (text === 'Remove') {
            btn.classList.add('remove')
        }
    }

    closeModalHandler() {
        itemModal.classList.add('hide')
    }

    closeModal() {
        closeModal.addEventListener('click', this.closeModalCb)
        window.addEventListener('keyup', e => {
            if (e.key === 'Escape') this.closeModalCb()
        })
    }

    getBtnModal() {
        return  document.querySelector('.btnModal')
    }
}


