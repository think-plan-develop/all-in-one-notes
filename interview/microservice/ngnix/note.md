**Nginx (pronounced “engine-ex”) is a web server that receives requests from browsers and either serves files or forwards requests to a backend application.**

For your **React + Node.js application**, it can do these jobs:

| Role | What it does |
|---|---|
| **Web server** | Serves your React build files: HTML, CSS, JavaScript and images |
| **Reverse proxy ⭐** | Receives API requests and forwards them to your Node.js server |
| **Load balancer** | Distributes requests across multiple backend instances |
| **HTTPS handling** | Uses SSL/TLS certificates to provide secure connections |
| **Caching** | Stores reusable responses to reduce backend work |

For example, suppose you have two Node.js services:

| Request received by Nginx | Where Nginx forwards it |
|---|---|
| `example.com/api/auth/login` | Auth service on port `3001` |
| `example.com/api/properties` | Property service on port `3002` |
| `example.com/` | Serves the React frontend files |

You configure these routing rules in Nginx.

**Express handles your application logic**—login, validation, database queries. **Nginx handles incoming traffic**, serving files and forwarding requests to the appropriate application.

**Yes—Nginx can act as a basic API gateway**, depending on how you configure it.

An **API gateway is the entry point for clients to access backend services**. Nginx can perform that role by routing requests:

| Incoming request | Destination |
|---|---|
| `/api/auth/*` | Auth service — port `3001` |
| `/api/properties/*` | Property service — port `3002` |
| `/api/payments/*` | Payment service — port `3003` |

Along with routing, Nginx can handle **load balancing, HTTPS, rate limiting and request-size limits**.

The distinction is:

- **Reverse proxy** describes forwarding requests to backend servers.
- **API gateway** describes managing access to backend APIs, often with routing, authentication and traffic policies.

**Nginx is the software; API gateway is a role it can perform.** Advanced API management features—such as developer portals, API subscriptions and usage billing—typically require additional tools or a dedicated gateway product.

**Interview answer:**  
“Nginx is primarily a web server and reverse proxy, but we can configure it as an API gateway for routing, load balancing, TLS termination and rate limiting.”



|-=>
now these below setup lets you run Linux-based Docker containers—such as Nginx and Node.js—on your Windows laptop

    Install WSL and Ubuntu
    Open PowerShell → Run as Administrator, then run:
    wsl --install -d Ubuntu
    | Part | Meaning |
|---|---|
| `wsl` | Windows tool for managing Linux environments |
| `--install` | Installs the required components |
| `-d Ubuntu` | Selects Ubuntu as the Linux distribution |



Note :

(WSL stands for Windows Subsystem for Linux.
It lets you run Linux environments, such as Ubuntu, inside Windows.
The “2” means version 2 of WSL.
Version	How it works
WSL 1	Translates Linux system calls into operations Windows understands
WSL 2	Runs a real Linux kernel inside a lightweight virtual machine, providing better Linux compatibility


For your setup: Windows is your operating system, WSL 2 provides the Linux environment, and Ubuntu is the Linux distribution you use.)


Enable Ubuntu integration
In Docker Desktop, check:
Settings → Resources → WSL Integration → enable Ubuntu → Apply



Install the helper tools in Ubuntu
sudo apt update
sudo apt install -y ca-certificates curl openssl

sudo apt update

This command refreshes Ubuntu’s list of available software packages and their versions.
Part	Meaning
sudo	Runs the command with administrator privileges
apt	Advanced Package Tool—manages software packages in Ubuntu
update	Downloads the latest package information from configured repositories


It updates the package list, not the installed software.


```bash
sudo apt install -y ca-certificates curl openssl
```

**Meaning: “Install these three tools with administrator permission, and automatically answer yes.”**

| Part | Simple meaning |
|---|---|
| `sudo` | Run as administrator |
| `apt install` | Install software |
| `-y` | Automatically say **yes** to confirmation |
| `ca-certificates` | Helps verify trusted HTTPS websites |
| `curl` | Sends requests to websites/APIs |
| `openssl` | Works with SSL/TLS certificates and encryption |

**For your Nginx practice:** `curl` tests requests, and `openssl` helps create a local HTTPS certificate.



**1. In Ubuntu — exit the Linux shell:**

```bash
exit
```

**2. Quit Docker Desktop, then run in PowerShell:**

```powershell
wsl --shutdown
```

**3. Reopen Docker Desktop and wait for the engine to start.**

**4. In PowerShell — enter Ubuntu again:**

```powershell
wsl -d Ubuntu
```

**5. In Ubuntu — verify Docker:**

```bash
docker version
docker compose version
docker run --rm hello-world
```



### 3.4 Create a workspace

**1. Open Ubuntu**

If you are currently in PowerShell, run:

```powershell
wsl -d Ubuntu
```

**2. Create and enter the project folder**

Run in **Ubuntu/Bash**:

```bash
mkdir -p ~/nginx-lab
cd ~/nginx-lab
```

| Command | Meaning |
|---|---|
| `mkdir -p` | Creates the folder and any missing parent folders; accepts existing folders |
| `~` | Your Ubuntu home directory: `/home/shivam_singh` |
| `cd` | Moves into a directory |

Your workspace will be:

```text
/home/shivam_singh/nginx-lab
```

This is a separate location from your existing Windows folder, `D:\ngnix-learn`, which appears in Ubuntu as `/mnt/d/ngnix-learn`. Use one workspace consistently.

**3. Create the lab folders**

```bash
mkdir -p auth property nginx/conf.d nginx/snippets web frontend/src certs backups
```

| Folder | Purpose |
|---|---|
| `auth` | Node.js authentication service |
| `property` | Node.js property service |
| `nginx/conf.d` | Nginx server and routing configurations |
| `nginx/snippets` | Reusable Nginx configuration sections |
| `web` | Simple HTML files for static-site practice |
| `frontend/src` | Frontend source code |
| `certs` | Local HTTPS certificates and keys |
| `backups` | Configuration backups |

**4. Verify the workspace**

```bash
pwd
ls
```

`pwd` should display:

```text
/home/shivam_singh/nginx-lab
```

`ls` should list your newly created top-level folders.

**5. Open it in VS Code**

With **VS Code installed on Windows** and its **WSL extension** enabled, run from Ubuntu:

```bash
code .
```

The `.` means **the current directory**. VS Code should open the workspace in a WSL window.



note:
(
    In **`mkdir -p`**, the **`-p` means “parents.”**

It does two things:

1. **Creates missing parent folders.**
2. **Doesn’t give an error if the folder already exists.**

Example:

```bash
mkdir -p nginx/conf.d
```

If neither folder exists, it creates **`nginx` first**, then **`conf.d` inside it**.

Without `-p`:

```bash
mkdir nginx/conf.d
```

This fails if the parent folder `nginx` doesn’t exist.

**Remember:** `mkdir -p` = “Create the whole folder path, and accept folders that already exist.”
)



## 4

For your Nginx lab, focus on **starting containers, accessing them, checking problems, and stopping them**. Run the commands below in **Ubuntu/Bash**, with Docker Desktop running.

**An image is a package; a container is an instance created from that package.**

| Term | Better explanation | Example |
|---|---|---|
| **Image** | Contains application files, libraries, configuration and startup instructions | `nginx:stable-alpine` contains Nginx and its supporting files |
| **Container** | An isolated environment created from an image; it can run or remain stopped | A container named `nginx-practice` running a web server |
| **Dockerfile** | A text file describing how to build your own image | Start with Nginx, then copy your website into the image |
| **Docker Compose** | A tool that reads a YAML file to manage related containers | Start Nginx, Auth and Property services together |
| **Bind mount** | Exposes an existing file or directory from your computer inside a container | Make your local HTML files available to Nginx |

One image can create several containers. Each container has its own writable filesystem layer; modifying a container does not modify the original image. [Docker Docs](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/?utm_source=chatgpt.com)

**First, download the Nginx image.**

```bash
docker pull nginx:stable-alpine
```

| Part | Meaning |
|---|---|
| `pull` | Download an image |
| `nginx` | Image repository/name |
| `stable-alpine` | Tag identifying a particular image variant |
| `alpine` | A small Linux distribution used as the image’s base |

List downloaded images:

```bash
docker image ls
```

Downloading an image **does not start a container**. Also, `docker run` automatically downloads a missing image, so a separate `pull` is optional. [Docker Docs](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/?utm_source=chatgpt.com)

**Now create a container you can stop and start repeatedly.**

For this exercise, leave out `--rm` so the stopped container remains available:

```bash
docker run -d --name nginx-practice -p 127.0.0.1:8080:80 nginx:stable-alpine
```

If your earlier `nginx-check` container is still using port `8080`, stop it first:

```bash
docker stop nginx-check
```

| Part | Explanation |
|---|---|
| `docker run` | Creates and starts a **new** container |
| `-d` | Runs it in the background |
| `--name nginx-practice` | Assigns a name you can use in later commands |
| `-p 127.0.0.1:8080:80` | Publishes the container’s port |
| `nginx:stable-alpine` | Selects the image |

With `-d`, your terminal becomes available immediately while Nginx continues running. Docker prints the new container’s ID. [Docker Docs](https://docs.docker.com/reference/cli/docker/container/run/?utm_source=chatgpt.com)

**Port mapping connects your browser to the application inside the container.**

```text
127.0.0.1:8080:80
```

| Position | Value | Meaning |
|---|---|---|
| Host IP | `127.0.0.1` | Accept connections through your computer’s loopback address |
| Host port | `8080` | Port you use in your browser |
| Container port | `80` | Port where Nginx listens inside the container |

Open **[http://localhost:8080](http://localhost:8080)**.

Docker receives the connection on your computer’s port `8080` and forwards it to Nginx on container port `80`.

Two containers can both use port `80` internally, but they need different published host ports if they use the same host IP:

| Container | Port mapping | Browser address |
|---|---|---|
| First Nginx | `127.0.0.1:8080:80` | `http://localhost:8080` |
| Second Nginx | `127.0.0.1:8081:80` | `http://localhost:8081` |

Binding to `127.0.0.1` keeps these published entry points local to your computer. [docs.docker.com](https://docs.docker.com/engine/network/port-publishing/?utm_source=chatgpt.com)

**Check which containers exist and which are running.**

```bash
docker ps
```

Shows **running containers**.

```bash
docker ps -a
```

Shows **all containers**, including stopped ones.

| Output column | Meaning |
|---|---|
| `CONTAINER ID` | Identifier for the container |
| `IMAGE` | Image used to create it |
| `STATUS` | Whether it is running, stopped or in another state |
| `PORTS` | Port information and published mappings |
| `NAMES` | Container name |

Typical statuses:

- **`Up ...`**: the container’s main process is running.
- **`Exited (...)`**: its main process has stopped.

`Up` alone does not prove that the website or API works—test it with a request. [Docker Docs](https://docs.docker.com/reference/cli/docker/container/run/?utm_source=chatgpt.com)

**Use `curl` to test Nginx without opening a browser.**

```bash
curl http://localhost:8080
```

Prints the response body—in this case, the default page’s HTML.

```bash
curl -I http://localhost:8080
```

Sends a **HEAD request**, displaying response headers without the HTML body.

```bash
curl -i http://localhost:8080
```

Displays **headers and body**.

| Option | Meaning |
|---|---|
| Uppercase `-I` | Request headers only |
| Lowercase `-i` | Include headers with the response body |
| `-v` | Show extra connection/request details for debugging |

For the default page, expect:

```text
HTTP/1.1 200 OK
```

`200` is the HTTP status indicating success. [How To Use](https://curl.se/docs/manpage.html?utm_source=chatgpt.com)

**Use `docker exec` to run commands inside an existing container.**

For example:

```bash
docker exec nginx-practice nginx -t
```

Read this as:

> Run `nginx -t` inside the running container named `nginx-practice`.

Other examples:

```bash
docker exec nginx-practice ls /etc/nginx
```

Lists the Nginx configuration directory **inside the container**.

```bash
docker exec nginx-practice cat /etc/nginx/nginx.conf
```

Displays its main configuration file.

To open an interactive shell:

```bash
docker exec -it nginx-practice sh
```

| Part | Meaning |
|---|---|
| `exec` | Execute a command in a running container |
| `-i` | Keep input open so you can type |
| `-t` | Provide a terminal interface |
| `sh` | Start a shell available in the Alpine image |

Once inside, you can run:

```sh
pwd
ls
cat /etc/nginx/nginx.conf
```

Return to Ubuntu with:

```sh
exit
```

**Here, `exit` closes the extra shell; Nginx keeps running.** [Docker Docs](https://docs.docker.com/reference/cli/docker/container/exec/?utm_source=chatgpt.com)

**Three Nginx commands will be useful throughout your practice.**

| Command | Purpose |
|---|---|
| `nginx -t` | Validate configuration syntax and referenced files |
| `nginx -T` | Validate and print the configuration, including included files |
| `nginx -s reload` | Ask Nginx to reload its configuration |

Run them inside the container:

```bash
docker exec nginx-practice nginx -t
```

Expected output includes:

```text
syntax is ok
test is successful
```

After a configuration change, **reload only if the test succeeds**:

```bash
docker exec nginx-practice nginx -s reload
```

A successful syntax test does not prove that every API route or backend connection works. Test those with `curl` too. [nginx.org](https://nginx.org/en/docs/switches.html?utm_source=chatgpt.com)

**Logs show what the container has been doing.**

```bash
docker logs nginx-practice
```

Displays its captured output.

For the latest 20 lines:

```bash
docker logs --tail 20 nginx-practice
```

To watch new messages arrive:

```bash
docker logs -f nginx-practice
```

Here, `-f` means **follow**.

While following logs, refresh the page in your browser. With the standard Nginx image, you should see request logs appear.

Press **Ctrl+C** to stop following the logs. This **does not stop the container**. [Docker Docs](https://docs.docker.com/reference/cli/docker/container/logs/?utm_source=chatgpt.com)

**Stopping, starting, restarting and removing are different operations.**

These examples apply to the container we created **without `--rm`**:

| Command | What happens |
|---|---|
| `docker stop nginx-practice` | Stops its processes; retains the container |
| `docker start nginx-practice` | Starts that existing stopped container |
| `docker restart nginx-practice` | Stops and starts the existing container |
| `docker rm nginx-practice` | Removes the stopped container and its writable layer |

Stopping normally gives the application time to shut down before Docker forcibly terminates it if necessary. [Docker Docs](https://docs.docker.com/reference/cli/docker/container/?utm_source=chatgpt.com)

Try:

```bash
docker stop nginx-practice
docker ps -a
docker start nginx-practice
curl -I http://localhost:8080
```

**`run` creates a new container; `start` reuses an existing one.**

Your original command included `--rm`. With that option, stopping the container automatically removes it, so it can no longer be started again. You would use `docker run` to create another one. [Docker Docs](https://docs.docker.com/reference/cli/docker/container/run/?utm_source=chatgpt.com)

**A bind mount lets Nginx serve files you edit on your computer.**

From your workspace:

```bash
cd ~/nginx-lab
mkdir -p web
```

Create `web/index.html` in your editor:

```html
<h1>Hello from Shivam's Nginx lab</h1>
```

Start a second container on port **8081**:

```bash
docker run -d --name nginx-site -p 127.0.0.1:8081:80 --mount "type=bind,source=$PWD/web,target=/usr/share/nginx/html,readonly" nginx:stable-alpine
```

| Mount option | Meaning |
|---|---|
| `type=bind` | Use a directory from your computer |
| `source=$PWD/web` | Use the `web` folder in your current directory |
| `target=/usr/share/nginx/html` | Make it visible at Nginx’s website directory |
| `readonly` | The container can read the files but cannot modify them through this mount |

`$PWD` contains your current directory’s full path.

Open **[http://localhost:8081](http://localhost:8081)**. Edit the HTML and refresh the browser.

The mounted files stay on your computer when the container is removed. Changes to HTML are available without rebuilding an image; Nginx configuration changes generally need a reload. [Docker Docs](https://docs.docker.com/engine/storage/bind-mounts/?utm_source=chatgpt.com)

**A Dockerfile packages your files into an image.**

For example, create a file named `Dockerfile` in the workspace:

```dockerfile
FROM nginx:stable-alpine
COPY web/ /usr/share/nginx/html/
```

| Instruction | Meaning |
|---|---|
| `FROM` | Choose the base image |
| `COPY` | Copy your local website files into the new image |

Build it:

```bash
docker build -t my-nginx:1.0 .
```

- `build`: build an image.
- `-t my-nginx:1.0`: give it a name and tag.
- `.`: use the current directory as the build context.

The build context supplies files that instructions such as `COPY` can use. Building creates an image; it does not start a container. [Docker Docs](https://docs.docker.com/get-started/docker-concepts/building-images/writing-a-dockerfile/?utm_source=chatgpt.com)

| Approach | What happens when you edit local HTML? |
|---|---|
| **Bind mount** | The container sees the changed files |
| **Dockerfile `COPY`** | Rebuild the image and recreate the container to use the changes |

**Compose becomes useful when your lab has several services.**

Your future `compose.yaml` will describe:

- Which image or Dockerfile each service uses.
- Published ports.
- Environment variables.
- Mounts and networks.

Once that file exists, run these from the project directory:

| Command | Purpose |
|---|---|
| `docker compose config` | Validate and display the resolved configuration |
| `docker compose up -d` | Create/start the application in the background |
| `docker compose up -d --build` | Build applicable service images before starting |
| `docker compose ps` | Show project container status |
| `docker compose logs -f` | Follow project logs |
| `docker compose stop` | Stop the project’s containers |
| `docker compose start` | Start existing stopped project containers |
| `docker compose down` | Stop and remove project containers and its managed networks |

Ordinary `down` keeps named volumes; adding `-v` also removes applicable volumes, so that option can delete stored database data. [Docker Docs](https://docs.docker.com/compose/intro/compose-application-model/?utm_source=chatgpt.com)

**These additional commands help you inspect problems.**

| Command | What it shows |
|---|---|
| `docker port nginx-practice` | Published port mappings |
| `docker inspect nginx-practice` | Detailed configuration, state, mounts and networking |
| `docker stats nginx-practice` | Live CPU and memory usage |
| `docker top nginx-practice` | Processes running inside the container |
| `docker run --help` | Available options for `docker run` |

For example, if a browser request fails, check **container status**, then **port mappings**, then **logs**. [Docker Docs](https://docs.docker.com/reference/cli/docker/container/?utm_source=chatgpt.com)

**After finishing the exercises, remove only the practice containers you created.**

```bash
docker stop nginx-practice nginx-site
docker rm nginx-practice nginx-site
```

These commands remove those containers. Your images and the local `web` folder remain available for the next exercise.