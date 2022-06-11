import { Book } from '../reducers/bookSlice'
import { Users } from '../reducers/userSlice'

/* Since there is no API, this is made as hardcoded data (treat this as if it comes from an API) */
export const BOOKS: Array<Book> = [{
  "id": 1,
  "title":"Eloquent JavaScript, Third Edition",
  "subtitle":"A Modern Introduction to Programming",
  "genre": "Programming",
  "author":"Marijn Haverbeke",
  "published_year":2018,
  "publisher":"No Starch Press",
  "owner": null
},
{
  "id": 2,
  "title":"Practical Modern JavaScript",
  "subtitle":"Dive into ES6 and the Future of JavaScript",
  "genre": "Programming",
  "author":"Nicolás Bevacqua",
  "published_year":2017,
  "publisher":"O'Reilly Media",
  "owner": null
},
{
  "id": 3,
  "title":"Understanding ECMAScript 6",
  "subtitle":"The Definitive Guide for JavaScript Developers",
  "genre": "Programming",
  "author":"Nicholas C. Zakas",
  "published_year":2016,
  "publisher":"No Starch Press",
  "owner": null
},
{
  "id": 4,
  "title":"Speaking JavaScript",
  "subtitle":"An In-Depth Guide for Programmers",
  "genre": "Programming",
  "author":"Axel Rauschmayer",
  "published_year":2014,
  "publisher":"O'Reilly Media",
  "owner": null
},
{
  "id": 5,
  "title":"Learning JavaScript Design Patterns",
  "subtitle":"A JavaScript and jQuery Developer's Guide",
  "genre": "Programming",
  "author":"Addy Osmani",
  "published_year":2012,
  "publisher":"O'Reilly Media",
  "owner": null
},
{
  "id": 6,
  "title":"You Don't Know JS Yet",
  "subtitle":"Get Started",
  "genre": "Programming",
  "author":"Kyle Simpson",
  "published_year":2020,
  "publisher":"Independently published",
  "owner": null
},
{
  "id": 7,
  "title":"Pro Git",
  "subtitle":"Everything you neeed to know about Git",
  "genre": "Programming",
  "author":"Scott Chacon and Ben Straub",
  "published_year": 2014,
  "publisher":"Apress; 2nd edition",
  "owner": null
},
{
  "id": 8,
  "title":"Rethinking Productivity in Software Engineering",
  "subtitle":"",
  "genre": "Programming",
  "author":"Caitlin Sadowski, Thomas Zimmermann",
  "published_year": 2019,
  "publisher":"Apress",
  "owner": null
},
{
  "id": 9,
  "author": "Chinua Achebe",
  "title": "Things Fall Apart",
  "subtitle":"",
  "genre": "History",
  "publisher":"William Heinemann Ltd.",
  "published_year": 1958,
  "owner": null
},
{
  "id": 10,
  "author": "Hans Christian Andersen",
  "title": "Fairy tales",
  "subtitle":"",
  "genre": "Literary fairy tale",
  "publisher":"C. A. Reitzel",
  "published_year": 1836,
  "owner": null
},
{
  "id": 11,
  "author": "Dante Alighieri",
  "title": "The Divine Comedy",
  "subtitle":"",
  "genre": "History",
  "publisher":"Gabriel Giolito",
  "published_year": 1315,
  "owner": null
},
{
  "id": 12,
  "author": "Unknown",
  "title": "The Epic Of Gilgamesh",
  "subtitle":"",
  "genre": "History",
  "publisher":"Bolchazy-Carducci Publishers.",
  "published_year": -1700,
  "owner": null
},]

//password shouldn't be stored in plaintext. if locally stored, please encrypt it
export const USERS: Array<Users> = [
  {
    "id": 1,
    "name": "Verner Rodriguez",
    "username": "verner123",
    "password": "abc123",
    "phone": 7319838260,
    "email": "mariah46@hotmail.com",
    "user_type": "Admin"
  },
  {
    "id": 2,
    "name": "Freda Sporer",
    "username": "freda.gorc12",
    "password": "helloworld123",
    "phone": 18793468330,
    "email": "marianne.gorczany@gmail.com",
    "user_type": "Editor"
  },
  {
    "id": 3,
    "name": "Timothy Harvey",
    "username": "tim.harvey99",
    "password": "timh123",
    "phone": 7899142397,
    "email": "abshire.bella@yahoo.com",
    "user_type": "Guest"
  },
  {
    "id": 4,
    "name": "Stone Leannon",
    "username": "leannS123",
    "password": "le12345",
    "phone": 19322995852,
    "email": "pkoelpin@yahoo.com",
    "user_type": "Guest"
  },
  {
    "id": 5,
    "name": "Agustina Bernhard",
    "username": "agusbern1",
    "password": "aggg22",
    "phone": 5833713224,
    "email": "larkin.darrion@gmail.com",
    "user_type": "Guest"
  },
  {
    "id": 6,
    "name": "Edythe Tromp",
    "username": "edythe123",
    "password": "ed11111",
    "phone": 9698937012,
    "email": "deckow.elisha@yahoo.com",
    "user_type": "Guest"
  },
  {
    "id": 7,
    "name": "Kathlyn Zieme",
    "username": "kathlyn.z1",
    "password": "asdf1234",
    "phone": 13147019236,
    "email": "aliza86@hotmail.com",
    "user_type": "Guest"
  },
  {
    "id": 8,
    "name": "Margie Homenick",
    "username": "margie131",
    "password": "aaa111",
    "phone": 13147019236,
    "email": "hagenes.gene@gmail.com",
    "user_type": "Guest"
  }
]