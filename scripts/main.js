import { listComponent, searchComponent, favouriteModal } from "./constants.js";


class PropertiesList {
    showList() {
        listComponent.runMethods()
        searchComponent.runMethods()
        favouriteModal.runMethods()
    }
}

const myApi = new PropertiesList()
myApi.showList()
