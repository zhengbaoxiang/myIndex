# my_index
```
本项目是纯vue静态页面，未使用webpack,所有资源包统一在index.html中引入
```

## 一、项目启动
### 安装git，拉取代码
```
https://github.com/zhenggenshuo/myWebProj.git
https://github.com.cnpmjs.org/zhenggenshuo/myWebProj.git
```
### 安装Node.js,安装依赖
```
本地有三种启动方法：

1 使用node server.js 启动服务器运行环境，
2 手动启动点击server521.bat
3 将 vue-server-selfstart.放于下方目录可实现开机自启动，
C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp

```
### 本地开发
```
由于没有webpack环境，无法使用vue模板解析，因此各模板组件以.js为后缀，导入注册方法与.vue一致
需指定模板文件    template:template

```



### 本地创建仓库
```
…or create a new repository on the command line
echo "# myIndex" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M master
git remote add origin https://github.com/zhenggenshuo/myIndex.git
git push -u origin master

…or push an existing repository from the command line
git remote add origin https://github.com/zhenggenshuo/myIndex.git
git branch -M master
git push -u origin master
```


