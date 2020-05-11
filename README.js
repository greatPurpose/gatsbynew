# Project Name

[![Build Status](https://travis-ci.com/Varro25/Varro-Site.svg?token=TeW6sto2gPEUqzkyiUnq&branch=master)](https://travis-ci.com/Varro25/Varro-Site)

This is a GatsbyJS project started using [gatsby-starter-prologue][1]

For an overview of the project structure please refer to the
[Gatsby documentation - Building with Components][2].

[1]: https://github.com/anubhavsrivastava/gatsby-starter-prologue
[2]: https://www.gatsbyjs.org/docs/building-with-components/


## Requirements

 - Node.js (tested with v11.10.0)


## Installation

```sh
git clone git@github.com:Varro25/Varro-Site.git
cd Varro-Site
npm install
npm run develop
```

## Deployment

Travis is used to deploy to AWS (S3 bucket) on each successful build in the
`master` branch. See `.travis.yml` for details. For infrastructure details
see the infrastructure repo.

## Content Strcuture

Content in this project is located in `src/content/`. This project mostly
uses .md files for now:

  - `src/content/md/*PAGE*.md` - regular page
  - `src/content/md/companies/*COMPANY*/whitepaper.md` - "main" article for
    each company
  - `src/content/md/companies/*COMPANY*/index.md` - company key figures.
    This should later be replaced with an API
  - `src/content/md/companies/*COMPANY*/news/*ARTICLE*.md` - company
    news articles (will appear on the right in the company page)

Also, for compnay pages notice:

  - `src/content/md/companies/*COMPANY*/logo.png` - company logo
  - `src/content/md/companies/*COMPANY*/documetn.xlsx` - excel file for
    downloading
  - `src/content/md/companies/*COMPANY*/whitepaper.pdf` - whitepaper in a
    pdf form

Check existing files for examples. Notice parameters at the top, proper
`path` value is important for the page to appear in the output.

For more details regarding processing of those files please refer to
`gatsby-node.js` and `companyTemplate.js`.
