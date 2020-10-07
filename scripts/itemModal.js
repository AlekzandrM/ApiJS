import { itemModal, closeModal, itemContent } from './constants.js'

export class ItemModal {

    item = {}
    btn = {
        text: 'Add'
    }

    closeModalCb = this.closeModalHandler.bind(this)
    getItemCb = this.getItemHandler.bind(this)

    render() {
        itemContent.innerHTML = `
            <span class="itemModal_content_img"><img alt="${this.item.title}" src="${this.item.photo}"></span>           
            <div class="itemModal_content_name">${this.item.title}</div>
            <div class="itemModal_content_description">${this.item.description}</div>
            <button class="itemModal_content_button btn">${this.btn.text}</button>
        `
    }

    runMethods() {
        this.getItem()
        this.closeModal()
    }

    getItemHandler(e) {
        this.item = e.detail.item
        // itemModal.classList.remove('hide')
        this.render()
        this.getAddButton()
    }
    getItem() {
        document.addEventListener('addToItemModal', e => this.getItemCb(e))
    }

    getAddButton() {
        // const btnAddFromList = document.getElementById(`${this.item.id}`)
        // this.btn.text = btnAddFromList.innerText
    }

    closeModalHandler() {
        itemModal.classList.add('hide')
    }
    closeModal() {
        closeModal.addEventListener('click', this.closeModalCb)
    }
}


