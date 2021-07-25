const normalize = (string) => {
    return string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export default normalize