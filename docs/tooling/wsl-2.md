# WSL2

If you're a Windows user and you will be working on any of balena's repos, you will often have to run the app you're working on locally. Balena apps must be run through a Linux terminal due to how env vars are passed to a lot of scripts, so follow this [guide](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to install WSL2 and a Linux terminal on your development machine.

## `nvm`

Now that you have WSL2 and a Linux terminal installed, you may need to install Node to develop with certain repositories. Because installing Node via apt (`sudo apt install nodejs`) usually installs an older version, you should install [nvm](https://github.com/nvm-sh/nvm). `nvm` allows you to easily switch between different versions of node.

:::note

When switching Node versions, run `npm ci` to remove all `node modules` before reinstalling them to ensure the repo has the correct package versions.

:::

## Cloning a repo

When you open your WSL terminal, by default you will find yourself in `/mnt/c/Users/$USER`. Cloning your repo anywhere in this directory and running it will result in permissions errors. To avoid these errors, clone your repo anywhere in your `$HOME/balena` directory instead. To set `$HOME` to `/home/user` instead of the default `/mnt/c/Users`, if you are using Windows Terminal, you can [set the home path in the settings for your specific distro](https://goulet.dev/posts/how-to-set-windows-terminal-starting-directory/). Next, when working with GitHub, it's recommended to [generate a new ssh key and add it to your GitHub](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

## Locally running the dev environment

Now that you have your repository cloned, you could run it via your WSL terminal with one of its `run` commands. Let's use [balena-ui](https://github.com/balena-io/balena-ui) as an example repository. If you run the app, it will compile successfully. You should be able to access it at `https://localhost:3000`, but you will find that you cannot. This is because it is being hosted on WSL's IP, not on localhost. To solve this, you can either add the [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) extension to VS Code (if that is your preferred editor) or you can use a `netsh` command to change the IPv4 and port your localhost will listen for.

### Remote - WSL

If using VSCode, we recommend installing this VSCode extension. Once installed, a button resembling a monitor, called `Remote Explorer` will appear on your sidebar. Click it and connect to the available WSL target of choice. Now, VSCode will track changes via File Explorer and Source Control and you will be able to run the commands available in your repository's `package.json`. Once the terminal says that it has compiled successfully, go to `https://localhost:3000` to see your local site.

### `netsh`

You need to run the following one-line command in a Powershell terminal with Admin privileges: `netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=$($(wsl hostname -I).Trim());` (note that `3000` is the port used in `balena-ui` and may differ per repo, so replace `3000` with the port used by the repo you are in). Then, in 2 _separate_ WSL terminals, run these two commands (note that these examples are based off the `balena-ui` repo and should be adjusted per repo's run commands. The important part to focus on here is that the app is being served using `ngrok` over plain `http` on the specified port):

1. `npm run serve-dev-http:staging|prod` (choose only staging or prod depending on which API you want to use)
2. `npm run ngrok-http 3000`

Finally, you can access your locally hosted development server by going to one of the **forwarded** links in ngrok. The ngrok session links expire after 2 hours by default.

:::note

This Powershell command must be run every time you close and reopen your WSL terminal completely, because if your WSL terminal has been closed completely and then reopened, it will have a different IP than during the prior session.

:::
