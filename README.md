# Project-nexus < nX/>
Connecting aspiring project managers and developers.

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
>[!NOTE]
>Make sure to create .env file in the backend folder AND on the same level to docker-compose file \
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

## Project Listings:
Create detailed project listings with scope, objectives, and requirements.
Categories include web development, mobile apps, data analysis, and machine learning.

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
