# YettelAplikacija

# REST API – Postman Uputstvo

Ovaj projekat sadrži API rute za:

* Autentikaciju (register, login)
* Upravljanje zadacima (tasks)
* Upravljanje korisnicima (users)

Sve zaštićene rute koriste JWT Bearer token.

---

# 1. AUTH – /auth

## 1.1 Registracija

**POST** `/auth/register`

### Body (JSON)

{
"firstName": "Pera",
"lastName": "Peric",
"username": "pera",
"email": "[pera@example.com](mailto:pera@example.com)",
"password": "12345"
}

### Moguće greške

* 400 → korisnik već postoji

---

## 1.2 Login

**POST** `/auth/login`

### Body (JSON)

{
"username": "pera",
"password": "12345"
}

### Odgovor

{
"token": "JWT_TOKEN_OVDE"
}

Ovaj token treba ubaciti u Postman:

Authorization → Bearer Token
i zalepiti ga u polje token.

---

# 2. TASKS – /tasks

Sve rute zahtevaju Bearer token.
Ako je korisnik `admin`, ne može da kreira task.

---

## 2.1 Kreiranje zadatka

**POST** `/tasks`

### Body (JSON)

{
"body": "Kupiti mleko"
}

### Odgovor

{
"message": "Task created",
"task": { ... }
}

### Greške

* 403 → admin ne može kreirati task

---

## 2.2 Dobavljanje taskova

**GET** `/tasks`

### Query parametri (opciono)

* page (default 1)
* limit (default 10)
* sort = asc | desc (default desc)

Primer:

```
/tasks?page=2&limit=5&sort=asc
```

### Odgovor

{
"page": 1,
"limit": 10,
"tasks": [ ... ]
}

* `admin` dobija sve taskove
* `basic` dobija samo svoje

---

## 2.3 Izmena taska

**PUT** `/tasks/:id`

Primer URL:

```
/tasks/5
```

### Body (primer)

{
"body": "Kupiti sok"
}

### Odgovor

{
"message": "Task updated",
"task": { ... }
}

### Greške

* 404 → task ne postoji
* 403 → korisnik pokušava da menja tuđi task

---

# 3. USERS – /users

Sve rute zahtevaju Bearer token.

---

## 3.1 Dobavljanje profila ulogovanog korisnika

**GET** `/users/me`

Nema body-ja.

### Odgovor

{
"id": 1,
"username": "pera",
...
}

---

## 3.2 Izmena korisnika

**PUT** `/users/:id`

Primer URL:

```
/users/3
```

Korisnik može menjati samo sebe, osim ako nije admin.

### Body (primer)

{
"email": "[novo@primer.com](mailto:novo@primer.com)"
}

### Moguće greške

* 404 → user ne postoji
* 403 → nije dozvoljeno menjanje tuđeg profila
* 400 → email ili username već postoji

---

## 3.3 Dobavljanje liste svih korisnika (samo admin)

**GET** `/users`

Nema body-ja.

Ako korisnik nema admin rolu:

* 403 unauthorized

---

# KORIŠĆENJE TOKENA U POSTMAN-U

1. Ulogovati se putem `/auth/login`
2. Kopirati `token` iz odgovora
3. U Postman-u:

   * Authorization → Bearer Token
   * Zalepiti token

Sve zaštićene rute više neće vraćati 401 Unauthorized.
