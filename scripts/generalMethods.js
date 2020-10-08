
export const setArrInLocalStorage = (arr = [], name) => {
    const recentSearches = JSON.stringify(arr)
    localStorage.setItem(`${name}`, recentSearches)
}

export const getArrInLocalStorage = (name) => {
    const  recentSearches = localStorage.getItem(`${name}`)

    return JSON.parse(recentSearches)
}

export const setButtonState = (id, state) => {
    const key = `${id}`
    const btnState = JSON.stringify(state)
    localStorage.setItem(key, btnState)
}

export const getButtonState = id => {
    const buttonState = localStorage.getItem(`${id}`)

    return JSON.parse(buttonState)
}