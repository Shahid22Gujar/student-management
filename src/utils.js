function convertUTCDateToLocalDate(date) {
  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
}
function validateEmail(email) {
  const isValidEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
  return isValidEmail.test(email);
}
export { convertUTCDateToLocalDate, validateEmail };
