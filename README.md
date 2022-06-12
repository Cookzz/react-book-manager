# React Book Manager

I have no clear name for this so the name is put as such.

Note that since this is a fully frontend website, there is no backend (API) nor a database to store any data, so all of the data available in the website are all hardcoded with some level of persistence using redux-persist. 

Since there is no backend, the code written may not be the best practices in terms of security (no cryptography involved, so things are stored in plaintext).

## Prerequisites

Before getting started, please ensure that you have these following software tools installed in your computer

* [Node.js](https://nodejs.org/en/) (minimum version 12 and above)
* [Git](https://gitforwindows.org/) (Only Git BASH needed - for windows computer)
* [yarn](https://yarnpkg.com/getting-started/install) or npm that comes default with your nodejs installation

If you are using windows, please add these to your environment variables depending if you are using yarn or npm:
```
npm: C:\Users\your_username\AppData\Roaming\npm

yarn: C:\Users\your_username\AppData\Local\Yarn\bin
```

In this guide, yarn will be used as the default package manager but you can use either one that you want as the steps doesn't change.

## Getting Started

First, run yarn to install all of the necessary packages and afterwards, run in development mode

```
yarn && yarn dev
```

If you want to run this in a production environment, please run the following commands:
```
yarn build

yarn global add serve

serve -s build
```

## Test Accounts

You will be encountering a login screen after running the website. There is already 3 users with different user types prepared:

* username: verner123 , password: abc123 (Admin)
* username: freda.gorc12 , password: helloworld123 (Editor)
* username: tim.harvey99 , password: timh123 (Guest)

## Incomplete

* Delete Books
* Add User
* Delete User
* Update User
* Borrow Books

## Redux Store

Instead of setting it up with plain redux and react-redux, RTK (Redux Toolkit) is used which is [recommended by the developer](https://github.com/reduxjs/redux).

Redux store is setup as such:
1. Create 3 sections of redux store in a src/ folder which are: reducers, redux and store
2. For reducers, there is 3 reducers/slices that are created (but more are permitted) which all of them will be imported into a file called rootReducer.js, which combines all of the individual reducers/slices into one place
3. For store, it is where all of the store setups are handled - setting up redux persist, combining persistConfig and rootReducer and finally configuring store [according to the setup guide](https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist)
4. Export to configured store and pass it over to the Provider component
5. If you wish to also support data persistence, you can setup a persistStore and pass it to the PersistGate component

The above is just a rough guide as to how redux store is being setup - but there may be a question: why is it setup like this?

### Reducers

It is called reducers but they are actually "slices". The traditional method was to create reducers and actions separately, connect them together and map them as props over to a component or page in a container. Slices just skips most of the steps above but simplifies the setup process for reducers with "slices".

My setup for each slice (bookSlice & userSlice) are for each "set" of data - for example, userSlice is setup to only store, update and retrieve user-related data which includes functions/API calls related to user data (login, logout, retrieve user details/permissions)

### redux/hooks
This was only setup due to the lack of typescript support for react redux, so this was actually just setup so that useDispatch() and useSelector() which is now respectively renamed to useAppDispatch() and useAppSelector() can be used in TypeScript.

## Project File Structure

The project file structure is split up into 7 different "parts"/folders

1. Components

  This folder is made to create any custom, reusable components. 

  While there are existing React UI Libraries like react-bootstrap and Material UI, there are some cases where their components lack some level of customizations or for example, like the CustomTable Component, would require importing and putting together many different components before building an actual functional table.

2. Constants

  This folder is made (instead of a constant file) are for cases where there are values that remains unchanged and/or are hardcoded, so many different constant files can be made - for example: a constants file just to export some variables that enable/different certain functionality or a constants file that stores hardcoded user data.

3. Pages

  This folder is to create every individual page - not to be mistaken with components that are considered "part" of the page, it is only made when users can navigate to that particular page. 
  
  Files that are created in the main *pages/* directory are the parent pages or dashboards of their individual sections and then there are sub-directories like *pages/books/* and *pages/users/* that are the child pages of their parent. For example, the files in **pages/books* directory are "child pages" under BookManager page.

4. Reducers

  As explained in the redux section, this folder is only here to store a specific set of data - for example, userSlice is created to store, update, delete and retrieve any data that is related to the user. The rest of the "slices" are also the same. The rootReducer is only to combine reducers/slices and export them to the store.

5. redux & store

  The *redux* directory only has one purpose and it is to convert a non-typescript supported useDispatch() and useSelector() to a typescript-friendly one. For the *store* directory, it is only to store one *store.tsx* file that handles configurations that are related to redux store - things like redux-persist for example.

6. Utils

  The *utils* folder is also known as the utility folder - this directory is mainly to create reusable external functions for different purposes. At the moment, there is only *FormatUtils.tsx* which handles all of the functions related to formatting data and that is why there are various functions like filterObj, createRowData, etc.

  In the future, there can be more things like *APIUtils* that can handle functions related to the API-related functions like POST or GET.

## Code Implementation

The code implementation was done with reusability and scalability in mind as well as API integration. Although currently the project's user and books data are hardcoded, functions as well as components were created where in the future occassion where API has to be implemented or if there will be more data/elements, either a) some parts of the app don't have to be changed at all and will adapt accordingly to whatever new data that is being supplied, or b) would reduce the amount of time to implement a new page, function or code.

## Scalability

This project will have some level of scalability - as explained in the previous section, some of the code was made with reusability and scalability in mind which meant that in the case where there are more data and/or users to manage, it can dynamically scale alongside at the very least.

While it will have trouble scaling with new feature requests, it does well with its current existing ones.