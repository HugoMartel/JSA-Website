# JSAWebsite

Junia Space Association's website using Nextjs.

## Site usage

The server uses markdown files to store articles and display them dynamically. Articles can be added using the `/api/posts_admin` location.

The API has 5 functions for posts manipulation:

- list

- enable

- disable

- add

- remove

Example python scripts to call the API can be found in the `./scripts/` folder.

**An authentication token is required to be able to use the API**

## Deployment

Install needed packages, build the site and start the server

```bash
npm i
npm run build
npm run start
```
