# Эндпоинты

## GET

### Метод (GET): '/api/users/get/:username'
* Возвращает юзера по юзернейму

## POST

### Метод (POST): '/api/users/register'
* Регистрирует юзера в базе
* Принимает: {Username, Email}
    * Username - нейм юзера
    * Email - эмейл юзера

## PATCH

### Метод (PATCH): '/api/users/edit/:username'
* Редактирует (эмейл) юзера в базе
* Принимает: {Username, Email}
    * Username - нейм юзера
    * Email - эмейл юзера

## DELETE

### Метод (DELETE): '/api/users/delete/:username'
* Удаляет юзера из базы
