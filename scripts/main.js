import { listComponent, searchComponent, favouriteModal, oneItemModal } from "./constants.js";


class PropertiesList {
    showList() {
        listComponent.runMethods()
        searchComponent.runMethods()
        favouriteModal.runMethods()
        oneItemModal.runMethods()
    }
}

const myApi = new PropertiesList()
myApi.showList()
