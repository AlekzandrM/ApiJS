import { listComponent, searchComponent } from "./constants.js";


class PropertiesList {
    showList() {
        listComponent.runMethods()
        searchComponent.runMethods()
    }
}

const myApi = new PropertiesList()
myApi.showList()
