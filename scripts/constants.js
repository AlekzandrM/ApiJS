import { ListComponent } from "./listOfProperties.js";
import { SearchComponent } from "./searchComponent.js";

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


export const listComponent = new ListComponent()
export const searchComponent = new SearchComponent()
