var Parse = require('parse').Parse;

var Content = Parse.Object.extend('Content', {}, {
  create: function(pageName) {
    var instance = new Content();
    instance.set('pageName', pageName);
    instance.set('content', 'No content... *yet*.');
    instance.save();
    return instance;
  },

  getByPageName: function(pageName, defaultContent, cb) {
    var collection = new Content.Collection();
    collection.query = new Parse.Query(Content);
    collection.query.equalTo('pageName', pageName);
    collection.fetch({
      success: function(obj) {
        cb(obj.models[0] || Content.create(pageName, defaultContent));
      },
      error: function(obj, err) {
        console.error('getByPageName() error', obj, err);
      }
    });
  },

  getAll: function(cb) {
    var collection = new Content.Collection();
    collection.query = new Parse.Query(Content);
    collection.fetch({
      success: function(obj) {
        cb(obj);
      },
      error: function(obj, err) {
        console.error('getAll() error', obj, err);
      }
    });
  }
});

Content.Collection = Parse.Collection.extend({
  model: Content,

  createContent: function(pageName) {
    this.add(Content.create(pageName));
  }
});

module.exports = Content;