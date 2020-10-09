import { ListComponent } from "./listOfProperties.js";
import { SearchComponent } from "./searchComponent.js";
import { FavouriteModal } from "./favouriteModal.js"
import { ItemModal } from "./itemModal.js";

export const searchInput = document.getElementById('searchInputs_input')
export const searchIcon = document.querySelector('.searchInputs_icon')
export const ul = document.getElementById('listOfProperties')
export const ulURL = document.getElementById('urlParams')
export const forbiddenSymbols = '^(?=.*[!@#$%^&(),.+=/\\]\\[{}?><":;|])'
export const noItems = document.getElementById('noItems')
export const btnLoad = document.querySelector('.btnLoad')
export const btnUp = document.querySelector('.btnUp')
export const lastItemMessage = document.getElementById('lastItemMessage')
export const stopToScrollToElement = 5

export const header_btn = document.querySelector('.header_btn')

export const favouriteUl = document.querySelector('.favouriteModal_body_ul')
export const favModal = document.querySelector('.favouriteModal')
export const favModalClose = document.querySelector('.favouriteModal_body_head_close')

export const itemModal = document.querySelector('.itemModal')
export const closeModal = document.querySelector('.itemModal_head_close')
export const itemContent = document.querySelector('.itemModal_content')
export const btnNameAdd = 'Add'
export const btnNameRemove = 'Remove'

export const listComponent = new ListComponent()
export const searchComponent = new SearchComponent()
export const favouriteModal = new FavouriteModal()
export const oneItemModal = new ItemModal()
