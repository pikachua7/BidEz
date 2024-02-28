# API

Backend for Project Jumpstart written in python using FastAPI.

## Table of Contents
- [API](#api)
  - [Table of Contents](#table-of-contents)
  - [Setup](#setup)
    - [Pre-requisite software](#pre-requisite-software)
    - [Software configuration](#software-configuration)
      - [Make poetry create local virtual env](#make-poetry-create-local-virtual-env)
      - [Enabling VS code autocomplete for python project](#enabling-vs-code-autocomplete-for-python-project)
    - [Install dependencies](#install-dependencies)
  - [Start the server](#start-the-server)
    - [Setup the database](#setup-the-database)
    - [Setup the env variables](#setup-the-env-variables)
    - [Start the API server](#start-the-api-server)
  - [Run the server in development mode](#run-the-server-in-development-mode)
  - [View API swagger docs](#view-api-swagger-docs)
  - [Utilities](#utilities)
    - [DB management](#db-management)
    - [Print env](#print-env)

## Setup

### Pre-requisite software

1. Python 3.11
2. VSCode IDE with python extensions installed
3. Poetry - a package manager ([installation instructions](https://python-poetry.org/docs/#installing-with-the-official-installer))

### Software configuration

#### Make poetry create local virtual env

Configure poetry to create virtual env in project root.  
This will allow vscode to detect the virtual env created by poetry.  
Run `poetry config virtualenvs.in-project true`

#### Enabling VS code autocomplete for python project

After opening the project in VSCode, configure the python extension's python  
interpreter to use the virtual env created by poetry by giving the path to  
python in the virtual env.  

This step must be done after poetry creates the env for the first time  
e.g. after running `poetry install` else VScode will not find the interpreter  
for the virtual env.

### Install dependencies

Run `poetry install`

> To add/remove dependencies, use the `poetry add` or `poetry remove` command  
> and avoid using `pip`.

## Start the server

### Setup the database

Start the database process and create the database, and user for api.

### Setup the env variables

Set the variables in a `.env` file in the project root.

> See `.env.example` for env variables required

### Start the API server

1. Run `poetry shell` to activate the virtual env created by poetry in the shell.  
   This will allow you to invoke commands installed in the virtual env.
2. Run `python3 -m api.main` to run the server.

## Run the server in development mode

Run `uvicorn api.main:app --reload` to start the server in development mode.  
> Remember to activate the virtual env created by poetry using `poetry shell`


## View API swagger docs

Open the browser and go to `http://{API_HOST}:{API_PORT}/docs` to view the API swagger spec

## Utilities

### DB management

The script [`manage_db.py`](./scripts/manage_db.py) helps in db managements  
tasks like creating tables, deleting tables, adding sample data to tables.

Run it using `python3 -m scripts.manage_db` to see available options.


### Print env

The script [`print_env.py`](./scripts/print_env.py) helps to print the settings  
loaded by API from the environment (from shell, .env or default)

Run it using `python3 -m scripts.print_env` to see the settings.
