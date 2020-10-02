import { forbiddenSymbols, searchInput, searchIcon, ulURL } from "./constants.js";

export class SearchComponent {

    request
    params = {
        per_page: 5,
        page: 1
    }

    runMethods() {
        this.fetchPropertiesInput()
        this.fetchPropertiesButton()
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
                if (response.length !== 0) this.showRequests(requestName)
                document.dispatchEvent(new CustomEvent('requestResult', {
                    detail: { requestResult: response }
                }))

            })
            .catch(err => console.error(err))

    }
    fetchPropertiesInput() {
        const validTextBind = this.validateText.bind(this)
        const fetchBind = this.fetchPropertiesHandler.bind(this)

        searchInput.addEventListener('keyup', function (e) {
            const requestBody = this.value
            const correctData = e.key === 'Enter' && requestBody

            this.classList.remove('invalid')
            searchIcon.classList.remove('btn_disable')
            if (validTextBind(requestBody)) {
                this.classList.toggle('invalid')
                searchIcon.classList.toggle('btn_disable')
                return
            }
            if (correctData) {
                fetchBind(requestBody)
                searchInput.value = ''
            }
        })
    }
    fetchPropertiesButton() {
        const fetchBind = this.fetchPropertiesHandler.bind(this)

        searchIcon.addEventListener('click', function (e) {
            const requestBody = searchInput.value
            const correctData = requestBody

            if (!correctData) return
            if (correctData) {
                fetchBind(requestBody)
                searchInput.value = ''
            }
        })
    }

    showRequests(requestName) {
        const li = document.createElement('li')
        li.innerHTML = `${requestName}`
        li.classList.add('urlParams_li')

        ulURL.append(li)
    }

    validateText(text) {
        return text.match(new RegExp(forbiddenSymbols))
    }
}
