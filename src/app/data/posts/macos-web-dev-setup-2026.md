If you're setting up a fresh Mac for web development (new machine, new job, or a clean reinstall), this is the checklist I use.

## 1) Xcode Command Line Tools

You don't need the full Xcode app (it's huge). For most web development workflows, you only need **Xcode Command Line Tools** (Git, compilers, headers, etc.).

Install it:

```bash
xcode-select --install
```

Then click **Install** in the prompt.

> Tip: This installs only the **Command Line Tools** (around ~1GB), much smaller than the full Xcode IDE.

## 2) Homebrew (package manager)

[Homebrew](https://brew.sh/) is the easiest way to install and manage common developer tools on macOS (git, node, terminals, etc.).

Install Homebrew:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After installation, open a new terminal window and verify:

```bash
brew --version
brew doctor
```

## 3) Terminal: iTerm2 or Warp

The built-in terminal is fine, but many developers prefer iTerm2 or Warp.

Install iTerm2:

```bash
brew install --cask iterm2
```

Install Warp (optional alternative):

```bash
brew install --cask warp
```

### Customization (optional)

- Pick a theme from [iTerm2-Color-Schemes](https://iterm2colorschemes.com/) and import it into your profile.
- Install Oh My Zsh for a nicer prompt and plugins:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

If you want **Powerlevel10k**:

```bash
brew install romkatv/powerlevel10k/powerlevel10k
```

Then set your theme in `~/.zshrc`:

```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```

## 4) Git (and SSH)

Install Git:

```bash
brew install git
git --version
```

Configure your identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### SSH for GitHub

Follow GitHub's official guide: [Connecting to GitHub with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).

## 5) Node.js with NVM

NVM lets you install and switch Node versions per project.

Install NVM:

```bash
brew install nvm
```

Create the NVM directory:

```bash
mkdir -p ~/.nvm
```

Add this to `~/.zshrc`:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && . "/opt/homebrew/opt/nvm/nvm.sh"
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && . "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"
```

Reload your shell:

```bash
source ~/.zshrc
```

Install and use Node:

```bash
nvm install node
nvm use node
node -v
```

## 6) Editors / IDEs

### Visual Studio Code

```bash
brew install --cask visual-studio-code
```

### WebStorm

WebStorm is a powerful JavaScript/TypeScript IDE. JetBrains offers a free license for non‑commercial use.

Download: [WebStorm](https://www.jetbrains.com/webstorm/)

## What I install next (optional)

- A browser dev setup (Chrome/Arc + extensions)
- Docker (if needed)
- A fonts/typography setup for design work
- A dotfiles repo to sync terminal + editor settings across machines
