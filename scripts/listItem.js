import { ul } from "./constants.js";

export class ListItem {
    constructor({photo, contributed, title, description}) {
        this.photo = photo
        this.contributed = contributed
        this.title = title
        this.description = description
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
                </div>  
            </div>
        `
        li.classList.add('resultList')
        ul.append(li)
    }
}
