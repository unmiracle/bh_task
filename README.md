
# BH Test Task




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```bash
cp .env.example .env
```
## Run Locally

Clone the project

```bash
//ssh
git clone git@github.com:unmiracle/bh_task.git
```
```bash
//https
git clone https://github.com/unmiracle/bh_task.git
```

Go to the project directory

```bash
cd bh_task
```

Install dependencies

```bash
yarn
```

Create docker container

```bash
docker compose up -d
```
or (in case if you have old docker version installed)

```bash
docke-compose up -d
```

Start the server

```bash
yarn start:nodemon
```

