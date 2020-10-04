import { forbiddenSymbols, searchInput, searchIcon, ulURL, btnLoad, lastItemMessage } from "./constants.js";

export class SearchComponent {

    requestName
    requestsArr = []
    params = {
        per_page: 5,
        page: 1
    }

    fetchMoreItemsCb = this.fetchMoreItemsHandler.bind(this)
    showRequestsCb = this.showRequestsHandler.bind(this)

    runMethods() {
        this.fetchPropertiesInput()
        this.fetchPropertiesButton()
        this.fetchMoreItems()
    }

    getURl(requestName) {
        return `https://api.punkapi.com/v2/beers/?beer_name=${requestName}&page=${this.params.page}&per_page=${this.params.per_page}`
    }

    fetchPropertiesHandler(requestName) {
        const requestURL = this.getURl(requestName)
        const request = new Request(requestURL)

        fetch(request)
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw new Error('Something goes wrong')
                }
            })
            .then(response => {
                const success = response.length === this.params.per_page
                const lastItemsReceived = response.length < 5 && response.length > 0
                const failure = response.length === 0

                if (success) this.getSuccessResponse(requestName)
                if (lastItemsReceived) this.getLastItemsReceived(requestName)
                if (failure) btnLoad.classList.add('hide')

                document.dispatchEvent(new CustomEvent('requestResult', {
                    detail: { requestResult: response }
                }))

            })
            .catch(err => console.error(err.message))
    }

    fetchPropertiesInput() {
        const validTextBind = this.validateText.bind(this)
        const getRequestNameBind = this.getRequestName.bind(this)
        const checkInputDataBind = this.checkInputData.bind(this)

        searchInput.addEventListener('keyup', function (e) {
            const requestBody = this.value
            const requestName = getRequestNameBind()
            const correctDataFirst = e.key === 'Enter' && requestBody && (requestBody !== requestName && requestName === undefined)
            const correctDataSame = e.key === 'Enter' && requestBody && (requestBody === requestName && requestName !== undefined)
            const correctDataNew = e.key === 'Enter' && requestBody && (requestBody !== requestName && requestName !== undefined)

            this.classList.remove('invalid')
            searchIcon.classList.remove('btn_disable')

            if (validTextBind(requestBody)) {
                this.classList.toggle('invalid')
                searchIcon.classList.toggle('btn_disable')
                return
            }
            checkInputDataBind(requestBody, requestName, correctDataSame, correctDataNew, correctDataFirst)
        })
    }

    fetchPropertiesButton() {
        const getRequestNameBind = this.getRequestName.bind(this)
        const checkInputDataBind = this.checkInputData.bind(this)

        searchIcon.addEventListener('click', function (e) {
            const requestBody = searchInput.value
            const requestName = getRequestNameBind()
            const correctDataFirst = requestBody && (requestBody !== requestName && requestName === undefined)
            const correctDataSame = requestBody && (requestBody === requestName && requestName !== undefined)
            const correctDataNew = requestBody && (requestBody !== requestName && requestName !== undefined)

            checkInputDataBind(requestBody, requestName, correctDataSame, correctDataNew, correctDataFirst)
        })
    }

    getSuccessResponse(requestName) {
        this.showRequests(requestName)
        btnLoad.classList.remove('hide')
        lastItemMessage.classList.add('hide')
    }

    getLastItemsReceived(requestName) {
        this.showRequests(requestName)
        this.showNoMoreItems()
        btnLoad.classList.add('hide')
    }

    checkInputData(requestBody, requestName, correctDataSame, correctDataNew, correctDataFirst) {
        if (correctDataFirst) this.checkInputDataCorrectDataFirst(requestBody)
        if (correctDataSame) searchInput.value = ''
        if (correctDataNew) this.checkInputDataCorrectDataNew(requestBody)
    }

    checkInputDataCorrectDataFirst(requestBody) {
        this.setRequestName(requestBody)
        this.fetchPropertiesHandler(requestBody)
        searchInput.value = ''
    }

    checkInputDataCorrectDataNew(requestBody) {
        this.setRequestName(requestBody)
        document.dispatchEvent(new CustomEvent('clearListEvent'))
        this.fetchPropertiesHandler(requestBody)
        searchInput.value = ''
    }

    showNoMoreItems() {
        lastItemMessage.classList.toggle('hide')
    }

    showRequestsHandler(requestName) {
        this.params.page = 1
        this.fetchPropertiesHandler(requestName)

        document.dispatchEvent(new CustomEvent('clearListEvent'))
        searchInput.value = requestName
    }

    showRequests(requestName) {
        const li = document.createElement('li')
        const repeatedName = this.requestsArr.some(el => el === requestName)

        if (!repeatedName) {
            this.requestsArr = [...this.requestsArr, requestName]
            li.innerHTML = `<a href="#"> ${requestName} </a>`
            li.classList.add('urlParams_li')
            ulURL.append(li)
            li.addEventListener('click', () => this.showRequestsCb(requestName))
        }
    }

    getRequestName() {
        return this.requestName
    }

    setRequestName(name) {
        this.requestName = name
    }

    fetchMoreItemsHandler() {
        this.params.page++
        this.fetchPropertiesHandler(this.requestName)
    }

    fetchMoreItems() {
        btnLoad.addEventListener('click', this.fetchMoreItemsCb)
    }

    validateText(text) {
        return text.match(new RegExp(forbiddenSymbols))
    }
}
