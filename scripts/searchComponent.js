import { forbiddenSymbols, searchInput, searchIcon, ulURL, btnLoad, lastItemMessage, ul } from "./constants.js";

export class SearchComponent {

    requestName
    requestsArr = []
    params = {
        per_page: 5,
        page: 1
    }

    fetchMoreItemsCb = this.fetchMoreItemsHandler.bind(this)

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
                }  if (response.status === 404) {
                    console.log('no items')
                } else {
                    throw new Error('Something goes wrong')
                }
            })
            .then(response => {
                const success = response.length === this.params.per_page
                const lastItemsReceived = response.length < 5 && response.length > 0
                const failure = response.length === 0

                if (success) {
                    this.showRequests(requestName)
                    btnLoad.classList.remove('hide')
                    lastItemMessage.classList.add('hide')
                }
                if (lastItemsReceived) {
                    this.showNoMoreItems()
                    btnLoad.classList.add('hide')
                }
                if (failure) btnLoad.classList.add('hide')

                document.dispatchEvent(new CustomEvent('requestResult', {
                    detail: { requestResult: response }
                }))

            })
            .catch(err => console.error(err.message))
    }
    fetchPropertiesInput() {
        const validTextBind = this.validateText.bind(this)
        const fetchBind = this.fetchPropertiesHandler.bind(this)
        const setRequestNameBind = this.setRequestName.bind(this)
        const getRequestNameBind = this.getRequestName.bind(this)

        searchInput.addEventListener('keyup', function (e) {
            const requestBody = this.value
            const requestName = getRequestNameBind()
            const correctDataSame = e.key === 'Enter' && requestBody && (requestBody === requestName || requestName === undefined)
            const correctDataNew = e.key === 'Enter' && requestBody && (requestBody !== requestName && requestName !== undefined)

            this.classList.remove('invalid')
            searchIcon.classList.remove('btn_disable')

            if (validTextBind(requestBody)) {
                this.classList.toggle('invalid')
                searchIcon.classList.toggle('btn_disable')
                return
            }
            if (correctDataSame) {
                fetchBind(requestBody)
                setRequestNameBind(requestBody)
                searchInput.value = ''
            }
            if (correctDataNew) {
                document.dispatchEvent(new CustomEvent('clearListEvent'))
                fetchBind(requestBody)
                setRequestNameBind(requestBody)
                searchInput.value = ''
            }
        })
    }
    fetchPropertiesButton() {
        const fetchBind = this.fetchPropertiesHandler.bind(this)
        const setRequestNameBind = this.setRequestName.bind(this)

        searchIcon.addEventListener('click', function (e) {
            const requestBody = searchInput.value
            const correctData = requestBody

            if (!correctData) return
            if (correctData) {
                fetchBind(requestBody)
                setRequestNameBind(requestBody)
                searchInput.value = ''
            }
        })
    }

    showNoMoreItems() {
        lastItemMessage.classList.toggle('hide')
    }
    showRequests(requestName) {
        const li = document.createElement('li')

        if (this.requestsArr.some(el => el === requestName)) return
        this.requestsArr = [...this.requestsArr, requestName]
        li.innerHTML = `${requestName}`
        li.classList.add('urlParams_li')
        ulURL.append(li)
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
