# 服务端私有部署

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

 `http://172.22.68.18:5000` / `https://videotogether.examples.com:5000`

6. 安装依赖 `pip install -r requirements.txt` 
7. 执行 `python ./script/build_extension.py` 
8. 生成的脚本插件是 `/release/vt.user.js`
9. 执行 `python ./source/server/main.py debug` 启动服务端
10. 如果需要后台运行，请使用 linux `screen` 或配置守护进程
11. 如果需要隐藏5000端口请自行反代至80，并更改`release_host`
12. 注意：如果使用纯公网IP或内网穿透可能会在https网站中出现问题
