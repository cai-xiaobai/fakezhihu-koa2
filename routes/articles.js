const ArticlesController = require('../controllers/articles');


module.exports = {
  'POST /articles': ArticlesController.createArticle,
  'DELETE /articles': ArticlesController.deleteArticles,
}