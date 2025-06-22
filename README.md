# CurlUp-Frontend
Front end for grooming app


sudo apt update
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER
newgrp docker
sudo apt install -y nodejs
sudo apt install -y npm
sudo apt install -y make


🔐 1. Generate an SSH key pair on your EC2 instance
SSH into your EC2 instance and run:

ssh-keygen -t rsa -b 4096 -C "deploy-key" -f ~/.ssh/deploy_key
Press Enter to skip the passphrase (or add one if you prefer).
This creates:
~/.ssh/deploy_key (private key)
~/.ssh/deploy_key.pub (public key)
🧑‍💻 2. Copy the Public Key
Run:

cat ~/.ssh/deploy_key.pub
Copy the full contents (starts with ssh-rsa).

🔧 3. Add the Public Key to Your GitHub Repo
Go to your GitHub repository → Settings → Deploy Keys
Click Add deploy key
Set a name like EC2 deploy key
Paste the public key (.pub) you copied
✅ Check Allow write access if the EC2 needs to push (not just pull)
Click Add key
🔐 4. Configure Git to Use the Deploy Key on EC2
Still on the EC2 instance, create a custom SSH config so git uses this key:

echo "
Host github.com
  IdentityFile ~/.ssh/deploy_key
  StrictHostKeyChecking no
" >> ~/.ssh/config

chmod 600 ~/.ssh/config