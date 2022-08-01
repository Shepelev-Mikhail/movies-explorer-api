const validErrorCode = 400;
const unauthorizedErrorCode = 401;
const accessErrorCode = 403;
const notFoundErrorCode = 404;
const conflictEmailErrorCode = 409;
const defaultErrorCode = 500;

const regex = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/;

const incorrectDataToCreate = 'Переданы некорректные данные для создания записи';
const notOwner = 'Вы не являетесь владельцем записи';
const incorrectData = 'Переданы некорректные данные записи';
const recordNotFound = 'Запись с указанным id не найдена';
const notProvided = 'Не указан Email, имя или пароль';
const emailBusy = 'Email занят';
const incorrectUserData = 'Переданы некорректные данные пользователя';
const unauthorized = 'Необходима авторизация';
const invalidEmailPassword = 'Неправильные почта или пароль';
const pageNotFound = 'Page not found';
const serverError = 'На сервере произошла ошибка';
const incorrectEmail = 'Некорректный емейл';
const incorrectUrl = 'Некорректная ссылка';

module.exports = {
  validErrorCode,
  unauthorizedErrorCode,
  accessErrorCode,
  notFoundErrorCode,
  conflictEmailErrorCode,
  defaultErrorCode,
  regex,
  incorrectDataToCreate,
  notOwner,
  incorrectData,
  recordNotFound,
  notProvided,
  emailBusy,
  incorrectUserData,
  unauthorized,
  invalidEmailPassword,
  pageNotFound,
  serverError,
  incorrectEmail,
  incorrectUrl,
};
