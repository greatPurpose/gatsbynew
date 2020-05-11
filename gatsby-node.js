const path = require(`path`)

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createParentChildLink } = actions

  const templates = [
    [/\/healthcare\//, path.resolve(`src/templates/healthcareTemplate.js`)],
    [/\/companies\/.+/, path.resolve(`src/templates/companyTemplate.js`)],
    [/.+/, path.resolve(`src/templates/baseTemplate.js`)]
  ]

  function getTemplate(path) {
    for (item of templates) {
      if (item[0].test(path)) {
        return item[1]
      }
    }
  }

  return graphql(`{
    allMarkdownRemark(filter: {frontmatter: {path: {ne: null}}}) {
      edges {
        node {
          frontmatter {
            path
          }
          children {
            id
          }
          internal {
            type
          }
          id
        }
      }
    }
  }`).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    // Archive Pages
    createPage({
      component: path.resolve('src/templates/fundraisingTemplate.js'),
      path: '/fundraising/'
    })

    createPage({
      component: path.resolve('src/templates/patentsTemplate.js'),
      path: '/patents/'
    })

    // Healthcare page
    const regCompanyName = /(\/.+)?\/companies\/(\w+|\W+)\/$/
    const regCompanySubDir = /(companies\/(\w+|\W+)\/).+/

    const healthcareDir = /healthcare(:?\/?[\w\/]+)?$/

    return result.data.allMarkdownRemark.edges.forEach(({ node }, index) => {
      const { path } = node.frontmatter
      const pageTemplate = getTemplate(path)

      let context = {}

      // Companies
      if (regCompanyName.test(path)) {
        context = {
          companyName: path.match(regCompanyName)[2],
          companyPath: path
        }
      }

      // SubCompanyDirs
      if (regCompanySubDir.test(path)) {
        context = {
          companyPath: '/' + path.match(regCompanySubDir)[1],
          companyName: path.match(regCompanySubDir)[2],
          subPath: path
        }
      }

      // Healthcare
      if (healthcareDir.test(path)) {
        context = {
          mainPath: '/healthcare/',
          subPath: path
        }
      }

      let pageSettings = {
        path: node.frontmatter.path,
        component: pageTemplate,
        context: context
      }

      createPage(pageSettings)
    })
  })
}

exports.onCreateWebpackConfig = ({ actions, loaders }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.xlsx$/,
          loader: 'file-loader',
          options: {
            name(file) {
              return '[name].[ext]'
            }
          }
        },
      ]
    }
  })
}
