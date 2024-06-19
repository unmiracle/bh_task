# BH Test Task

## Postman collection link

[Postman Collection](https://elements.getpostman.com/redirect?entityId=1826146-9a9ab28e-9f3f-41cf-a67c-8265bf1620c7&entityType=collection)

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
