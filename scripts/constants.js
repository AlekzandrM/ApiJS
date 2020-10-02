import { ListComponent } from "./listOfProperties.js";
import { SearchComponent } from "./searchComponent.js";

export const searchInput = document.getElementById('searchInputs_input')
export const searchIcon = document.querySelector('.searchInputs_icon')
export const ul = document.getElementById('listOfProperties')
export const ulURL = document.getElementById('urlParams')
export const forbiddenSymbols = '^(?=.*[!@#$%^&(),.+=/\\]\\[{}?><":;|])'
export const noItems = document.getElementById('noItems')


export const listComponent = new ListComponent()
export const searchComponent = new SearchComponent()
