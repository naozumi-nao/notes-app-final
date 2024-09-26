class Utils {
  static emptyElement(element) {
    element.innerHTML = "";
  }

  static showElement(element) {
    element.style.display = "block";
    element.hidden = false;
  }

  static showElementFlex(element) {
    element.style.display = "flex";
    element.hidden = false;
  }

  static hideElement(element) {
    element.style.display = "none";
    element.hidden = true;
  }

  static isValidInteger(newValue) {
    return Number.isNaN(newValue) || Number.isFinite(newValue);
  }

  static convertDate(isoDate) {
    const date = new Date(isoDate);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${formattedHours}:${formattedMinutes} ${ampm} at ${day}/${month}/${year}`;

    return formattedDate;
  }
}

export default Utils;
