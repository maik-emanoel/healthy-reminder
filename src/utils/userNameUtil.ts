export function saveUserName(name: string | null) {
    localStorage.setItem('userName', JSON.stringify(name))
}

export function loadUserName() {
    const savedUserName = localStorage.getItem('userName')
    return savedUserName ? JSON.parse(savedUserName) : null
}