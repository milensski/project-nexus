# Project-nexus < nX/>
Connecting aspiring project managers and developers.

## Brief overview
Application for connecting Team leaders with developers

### Public part
  LANDING PAGE  for getting started with the platform

  EXPLORE TAB
  - Unauthorized users can only `list` all created projects and see `the details` for a project

### Private part
  DASHBOARD TAB 
  - Personal for every user information with statistics for his created projects and a *quick actions* TAB for easy access 

  MENU TAB 
  - Create project ->
    - Authorized Users can `create` Projects in which other users can `join` as participants.
    - When a user creates a project he becomes the Team lead for this project and can `EDIT` or `DELETE` the project
    - Other users can only JOIN or LEAVE the project

  - My projects -> where each user can manage his created projects \List\View\Edit\Remove




## Prerequisites

- Docker installed on your machine
- Node.js and npm installed on your machine (for running the frontend)
- Angular installed globally: npm install -g @angular/cli
  
1. ```bash
    git clone https://github.com/milensski/project-nexus.git
   ```
2. Navigate to the project root directory:
   ```bash
    cd projext-nexus/
   ```
>[!IMPORTANT]
>Make sure to create .env file in the `backend` folder AND `on the same level` as docker-compose file \
> SAMPLE VARIABLE for .env
  ``` bash
      DB_HOST=host.docker.internal
      DB_PORT=5432
      DB_USERNAME=postgres
      DB_PASSWORD=parolka123
      DB_NAME=nexus_db
      
      PGADMIN_DEFAULT_EMAIL=admin@admin.com
      PGADMIN_DEFAULT_PASSWORD=parolka123
      
      JWT_SECRET=supersecretphrase
  ```
3. Inside the project root directory run the containers:
  ```bash
    docker compose up -d

  ```
4. Navigate to frontend folder and run the following:
 ```bash
    ng serve
 ```
This will start Angular server on your localhost

> [!TIP]
> POST request to `localhost:3000/seed` will create 9 dummy users and projects participating in each other
> it will also create a user with *username* milen_palachorov and *password* 123 for testing purposes

![Screenshot 2024-04-04 170348](https://github.com/milensski/project-nexus/assets/38993490/5e36b4a5-bcc4-40ff-9b99-1f05b5220ef1)
![Screenshot 2024-04-04 170424](https://github.com/milensski/project-nexus/assets/38993490/364f80c0-c263-42e8-9c58-c1c6dbc0a3cf)
![Screenshot 2024-04-04 170454](https://github.com/milensski/project-nexus/assets/38993490/4a5c89a8-c70e-4bd5-9ae9-5b33b277f546)
![Screenshot 2024-04-04 170511](https://github.com/milensski/project-nexus/assets/38993490/4bd56a56-27c0-4a2d-8c35-53853c332d6d)


## Project Listings:
Create detailed project listings with description, category, and technical stack.
Categories include Frontend, Backend, Full-stack.

## Browse and Apply:
Students explore listings based on interests and skills.
Apply to relevant projects.

## Teams:
Join diverse project teams led by managers or mentors.
Collaboration:
Virtual teamwork using project management tools.

## Mentorship:
Industry professionals guide students throughout projects.
In short, Project Nexus fosters collaboration and impactful experiences. 🌟✨
