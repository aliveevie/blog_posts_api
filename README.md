# Blog Post API with Node.js and PostgreSQL

![Node.js](https://img.shields.io/badge/Node.js-v14.17.6-green)
![Express](https://img.shields.io/badge/Express-v4.17.1-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v13.4-blue)

This is a simple RESTful API for managing blog posts using Node.js, Express.js, and PostgreSQL as the database.

You can access the website and view the blog posts at https://blog-post-api-t5u8.onrender.com/.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Database Configuration](#database-configuration)
  - [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Example Usage Local](#example-usage-local)
- [Example Usage Remote](#example-usage-remote)
- [Functional test](#functional-test)


## Features

- Create, Read, Update, and Delete blog posts.
- PostgreSQL database for data storage.
- RESTful API endpoints for easy integration with front-end applications.

## Requirements

- [Node.js](https://nodejs.org/) (v14.17.6 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v13.4 or higher)

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aliveevie/blog_posts_api

2. cd blog_posts_api
3. npm install

## Database Configuration

create a .env in the root of the project
   STRING='postgres://yourusername:yourpassword@trumpet.db.elephantsql.com/yourusername'



## Start the Node server
    ```bash
    npm run start

The site is now live at http://localhost:4000 or your own post

## API Endpoints

- `/blogs`: Get a list of all the posts.
- `/posts.html`: Create a username and email to add a post to the API.
- `/edit.html`: Edit a post from the blogs.
- `/delete.html`: Delete a post from the blog posts.
- `/search.html`: Search through the posts by page number in Blog Posts.

## Example Usage Local

- List all blog posts: `http://localhost:4000/blogs`
- Get posts on page 1: `http://localhost:4000/posts?page=1`
- Get posts on page 2: `http://localhost:4000/posts?page=2`
- Get posts on page 1 with a specific title: `http://localhost:4000/posts?page=1&title=Example`
- Get posts on page 1 by a specific author: `http://localhost:4000/posts?page=1&author=Ibrahim`
- Get posts on page 2 with a specific title and author: `http://localhost:4000/posts?page=2&title=Example&author=ExamplePost`


## Examples Remote

Visit https://blog-post-api-t5u8.onrender.com to see real-life examples of the blog posts in action.

- List all blog posts: `https://blog-post-api-t5u8.onrender.com/blogs`
- Get posts on page 1: `https://blog-post-api-t5u8.onrender.com/posts?page=1`
- Get posts on page 2: `https://blog-post-api-t5u8.onrender.com/posts?page=2`
- Get posts on page 1 with a specific title: `https://blog-post-api-t5u8.onrender.com/posts?page=1&title=Example`
- Get posts on page 1 by a specific author: `https://blog-post-api-t5u8.onrender.com/posts?page=1&author=Ibrahim`
- Get posts on page 2 with a specific title and author: `https://blog-post-api-t5u8.onrender.com/posts?page=2&title=Example&author=ExamplePost`

## Functional Test

In this section, you will find information about the functional tests implemented for the blog post API. These tests help ensure that the API functions correctly and meets the expected behavior.

There are seven functional tests implemented, and you can run them using the following command:

```bash
npm run test

