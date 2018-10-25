function createLoader(loader) {
  var loading = false;
  var handles = [];
  var value;

  return function (callback) {
    if (value) {
      callback(value)
    } else if (loading) {
      handles.push(callback)
    } else {
      loading = true;
      handles.push(callback)
      loader(function (v) {
        value = v;
        let h;
        while ((h = handles.shift())) {
          h(v)
        }
      })
    }
  }
}

var onloadAboutMe = createLoader(function (callback) {
  loadPresentablesByTags('aboutme')
    .then(data => {
      if (data.errcode === undefined) {
        var presentable = data[0];
        if (presentable) {
          requestPresentableData(presentable.presentableId).then(data => {
            callback(Object.assign(presentable, data));
          });
        } else {
          return ''
        }
      } else {
        window.FreelogApp.trigger('HANDLE_INVALID_RESPONSE', {response: data})
      }
    })
});

function loadPresentablesByTags(tags) {
  return window.FreelogApp.QI.fetchPresentablesList({
    tags
  }).then(res => {
    if (res.errcode === 0) {
      return res.data
    } else {
      return res
    }
  })
}

function loadBlogConfig() {
  return loadPresentablesByTags('blog-config')
    .then(data => {
      if (data.errcode === undefined) {
        var presentable = data[0]
        if (presentable) {
          return window.FreelogApp.QI.fetchPresentableResourceData(presentable.presentableId).then(res => {
            presentable.token = decodeURIComponent(res.headers.get('freelog-sub-resource-auth-token'))
            return res.json().then(data => {
              return Object.assign(presentable, data)
            })
          })
        } else {
          return null
        }
      } else {
        window.FreelogApp.trigger('HANDLE_INVALID_RESPONSE', {response: data})
      }
    })
}


var onloadArticles = createLoader(function (callback) {
  return window.FreelogApp.QI.fetchPresentablesList({
    tags: 'article',
    resourceType: 'markdown'
  }).then(res => {
    if (res.errcode === 0) {
      callback(res.data)
    } else {
      window.FreelogApp.trigger('HANDLE_INVALID_RESPONSE', {response: res})
    }
  })
});

function loadPresentableInfo(presentableId) {
  return window.FreelogApp.QI.fetchPresentableResourceInfo(presentableId)
}

function requestPresentableData(presentableId) {
  return window.FreelogApp.QI.fetchPresentableResourceData(presentableId)
    .then(res => {
      var meta = decodeURIComponent(res.headers.get('freelog-meta'))
      var token = decodeURIComponent(res.headers.get('freelog-sub-resource-auth-token'))
      var article

      try {
        article = JSON.parse(meta)
        token = JSON.parse(token)
      } catch (e) {
        article = {}
      }
      if (!article) {
        return res.json().then(errResponse => {
          return loadPresentableInfo(presentableId)
            .then(data => {
              article = data.resourceInfo.meta || {}
              article.presentableId = presentableId
              article.error = errResponse
              article.token = token
              return Object.assign(article, data);
            })
        })
      } else {
        return res.text().then(content => {
          article.content = content;
          article.token = token
          return article
        })
      }
    })
}

var presentablesMap = {}

function onloadPresentableData(presentableId, disabledCache) {
  if (!disabledCache && presentablesMap[presentableId]) {
    return Promise.resolve(presentablesMap[presentableId])
  } else {
    return requestPresentableData(presentableId).then((article) => {
      if (!article.presentableId) {
        return loadPresentableInfo(presentableId)
          .then(res => {
            presentablesMap[presentableId] = article
            return Object.assign(res.data, article);
          })
      } else {
        presentablesMap[presentableId] = article
        return article
      }
    })
  }
}

//alias
var onloadArticleContent = onloadPresentableData

export {
  onloadAboutMe,
  onloadArticles,
  loadBlogConfig,
  loadPresentablesByTags,
  onloadPresentableData,
  onloadArticleContent
}
