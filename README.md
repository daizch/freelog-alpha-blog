# freelog-alpha-blog

> A freelog widget

## Build Setup

``` bash
# install dependencies
npm install

# serve at localhost:9001
npm run dev

# build for production with minification
npm run build
```


## config
package.json中freelogConfig字段可配置freelog资源相关的配置数据。



## usage

### blog-config
* type: json
* tags: 'blog-config'
* 例如

```json
{
  "name": "博客页面标题",
  "avatar": "博主头像资源ID",
  "postImage": "博客导航封面图资源ID",
  "blogDesc": "博客介绍"
}
```


### aboutme
* type： md
* tags： 'aboutme'


### article
* type: md
* tags: article & meta.tags
* meta

```json
{
  "tags": ["aaa", "bbb"]
}
```
