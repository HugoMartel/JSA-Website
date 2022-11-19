# JSAWebsite

Junia Space Association's website using Nextjs.

## Site usage

The server uses markdown files to store articles and display them dynamically. A small API is available to list members of the association or get a list of the available posts.

The API has 2 functions for now:

- /api/bureau/ : GET

- /api/posts_admin/ : POST

Example python scripts to call the API can be found in the `./scripts/` folder.

**An authentication token is required to be able to use the API**

## Deployment

Install needed packages, build the site and start the server

```bash
npm i
npm run build
npm run start
```

