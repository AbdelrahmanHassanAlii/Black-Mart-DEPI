export const truncate = (text, maxLenght) => {
    if (text.length > maxLenght) {
        return text.substring(0, maxLenght) + "...";
    } else {
        return text;
    }
}