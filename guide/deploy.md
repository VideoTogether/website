# 服务端私有部署

欢迎加入我们的交流群。QQ群： 170200260 ，Telegram：https://t.me/videotogether_group

## 在免费平台 `Replit` 上部署

1. 注册 `Replit` 账号: https://replit.com/
2. 新建一个 `python` 仓库 

![](/public/examples/deploy1.png)

3. 在 `shell` 中运行以下代码

```
git clone https://github.com/valetzx/VideoTogether && mv -b VideoTogether/* ./ && mv -b VideoTogether/.[^.]* ./ && rm -rf *~ && rm -rf VideoTogether
```

![](/public/examples/deploy2.png)

4. 等待 `Loading Nix environment...` 完成
5. 点绿色 `RUN` 运行
6. 将根目录生成的 `vt.user.js` 复制到油猴

![](/public/examples/deploy3.png)

7. 公开脚本示例：https://alist.learnonly.xyz/d/!Together/vt.user.js
8. 需要更新服务后端，请点 `STOP` 后重新输入步骤三的指令
9. 你可以使用replit的域名+/vt.user.js直接更新你的脚本 例：https://sync.pighog.repl.co/vt.user.js
10. 可以开启 `main.py` 中的 `redis` 缓存，`Replit` 脚本已做好适配，仅Replit！

## 自己的服务器上部署

1. 准备一个拥有 `Python` 环境的主机
2. 最好要准备一个域名，并A解析到你主机的公网IP
3. 用git下载仓库，或手动下载源码解压

```
git clone https://github.com/VideoTogether/VideoTogether.git
```

4. 转到源码根目录 `cd VideoTogether`
5. 更改 `/source/extension/config/release_host` 中的内容为 协议 + 你的域名/或公网IP/或内网穿透地址 + 5000端口，格式示例：

！注意请勿换行！只填一个！ `http://172.22.68.18:5000` / `https://videotogether.examples.com:5000` 

6. 安装依赖 `pip install -r requirements.txt` 
7. 执行 `python ./script/build_extension.py` 
8. 生成的脚本插件是 `/release/vt.user.js`
9. 执行 `python ./source/server/main.py debug` 启动服务端
10. 如果需要后台运行，请使用 linux `screen` 或配置守护进程
11. 如果需要隐藏5000端口请自行反代至80，并更改`release_host`
12. 注意：如果使用纯公网IP或内网穿透可能会在https网站中出现问题

## 使用Docker容器部署

1. 使用指令一键部署：

```
docker run -d --restart=always -p 5000:5000 --name="videotogether" pigeonpig/videotogether:latest
```

2. 以上指令解释：docker run运行 -d后台 --restart=always自动重启 -p 5000:5000链接5000:5000端口 --name="videotogether"容器名字 pigeonpig/videotogether:latest本镜像:最新
3. 注意：一键部署docker版暂时不支持redis缓存，需要自己配置
4. 在本地新建一个名为 `release_host` 的文件，在文件中填入 协议 + 你的域名/或公网IP/或内网穿透地址 + 5000端口，格式示例：

！注意请勿换行！只填一个！ `http://172.22.68.18:5000` / `https://videotogether.examples.com:5000` 
 
5. 执行命令复制该文件到容器内部 docker cp 你的文件路径 容器名:容器路径

```
docker cp ./release_host videotogether:/app/source/extension/config
```

6. 执行 `docker exec videotogether cat /app/source/extension/config/release_host` 检查容器内部host是否正确
7. 执行 `docker exec videotogether python /app/script/build_extension.py` 构建插件
8. 使用 `docker restart videotogether` 重启容器
9. 部署完成后，可使用你的ip:5000或域名+/vt.user.js 下载/更新后端生成的油猴脚本，格式示例：


 `http://172.22.68.18:5000/vt.user.js` / `https://videotogether.examples.com:5000/vt.user.js` 

10. 注意Docker版不会实时更新维护，https网站给http发请求会报错，请绑域名或自行转换为https协议
 
## 注意事项

1. 如果使用http协议出现`Failed to fetch`请检查请求，如果是https请求报错，请绑定域名并后更改`release_host`中内容
2. 如果上述内容更换无误还出现`Failed to fetch`可以尝试在你的端口后添加`/`例：`https://videotogether.examples.com:5000/` 
3. 如果你正好拥有证书文件，可以阅读源码，添加证书文件`keyfile='private.key', certfile='certificate.crt'`，更改启动命令，`python main.py prod`
4. 不维护没有域名/或证书的http问题，私有部署只维护`Replit`部署，其他随缘
5. 私有部署问题可以在群内 @金桔猪 随缘回答
