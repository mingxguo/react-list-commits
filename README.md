# React list commits

The application lists the commits of the [React repository](https://github.com/facebook/react).

## How to use

In the project directory, you can run

`yarn install`

to install the dependencies and 

`yarn start` 

to run the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project structure

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
and I used AntDesign as the CSS framework. All react components developed for the application
are found under the folder `src/components`.

### `src/components/app`

In this folder we include the main components of the application, like the modal to show
user information, the table to list all commits, etc. 

### `src/components/common`

In this folder we include common components which can be reused throughout the application,
like the application header, the loading message.

### `src/components/pages`

In this folder we include the two views of the application. 

## GitHub API requests

I will quickly introduce some decisions I made regarding when to call the GitHub API.

### List of commits

The list of commits is rendered using a table with custom pagination to allow viewing 
arbitrary old commits (up to 1000 pages).
Each time a pagination change occurs a request to the API is made to retrieve the corresponding
commits. 

### User information

The user information is only requested when the modal component is updated (made visible 
by the parent component) and the requested user is different than before. 

### Commit information

Similar to the user modal, the commit information is only requested when the commit view is
opened and the component is mounted. 
