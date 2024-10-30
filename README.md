# 🌐 SPA-APP

![App Screenshot](https://github.com/user-attachments/assets/7448c3d5-4048-4377-84a6-6d862d86ae06)

Single Page Application (SPA) project with Dockerized deployment, designed for scalability and efficient organization. This README provides step-by-step instructions for setting up, running, and simulating the app with Docker.

---

## ⚙️ Requirements

To download and launch this application, ensure you have the `docker-compose.yml` file available in this repository. Follow these steps:
  
1. If you do not have Docker installed, you can download it on Linux using the following command:
   ```bash
   sudo snap install docker
   ```
   For **Windows**, follow the documentation suggested on [Docker.com](https://www.docker.com/).

2. Make sure to have the necessary ports available:

- **8081** for the App
- **3306** for MySQL
- **3001** for the Socket
- **3000** for the API
  
3. **Run Docker Compose**  
   Execute the following command in the directory containing `docker-compose.yml`:
   ```bash
   sudo docker-compose up --build 
   ```
   If you want to recreate the images and run the project from scratch, you can execute the script `RESET.sh` by following these steps. Note that it will delete all Docker volumes as well as the current containers:

   Use the following command to grant execution permissions to the script:
   ```bash
   sudo chmod +x RESET.sh
   ```
   And to execute it:
   ```
   ./RESET.sh
   ```

4. Once loaded, open your browser at the address [http://localhost:8081](http://localhost:8081). Be patient and wait for the project to load; it may take a few seconds depending on multiple factors.

5. 5. To simulate a moving vehicle, use the script called `client.js`, which allows for a random movement simulation for a specific vehicle. This file is located in the `Agent` folder, and you can execute it from outside the container by configuring only the **vehicle ID** in the `axios` parameter with a GET request.

6. The reason multiple images were created instead of just one is due to **scalability and organization**. This facilitates maintenance and future updates in case the project evolves.

# 📸 Views

Explore the different views of the application:

### 🔑 Login
![Login Screenshot](https://github.com/user-attachments/assets/c69f44bd-f762-41d7-a867-83b423ffe8ad)

### 📝 Registration
![Registro Screenshot](https://github.com/user-attachments/assets/57a26583-ee07-4ee4-8ea4-6df940406833)

### 📊 Dashboard
![Dashboard Screenshot](https://github.com/user-attachments/assets/e6981fee-655b-404a-b69c-63292daa4989)

### ❌ Eliminate
![Eliminar Screenshot](https://github.com/user-attachments/assets/f0fe7e08-0ba9-4777-878b-1cc6c6b921fc)

### 🔄 Update
![Actualizar Screenshot](https://github.com/user-attachments/assets/7e640164-e052-4caf-945b-7ebdb9674745)

### ➕ Add
![Agregar Screenshot](https://github.com/user-attachments/assets/c7f240a0-061a-40d5-ab48-995640313a3b)

### 🚫 No cars

![Sin Coches Screenshot](https://github.com/user-attachments/assets/6cc181b4-df03-441c-a601-17abd535de9f)

### 📱 Responsive
Responsive view across devices:
- ![Responsive Screenshot 1](https://github.com/user-attachments/assets/495b78eb-e4fc-4ac0-8947-1e08ee28914e)
- ![Responsive Screenshot 2](https://github.com/user-attachments/assets/87bb1734-246e-4b63-8f50-76e145f04ebf)
- ![Responsive Screenshot 3](https://github.com/user-attachments/assets/2d97717b-a09a-4916-9eb7-4e4bf731083d)

### 🐳 DockerHub Images
![DockerHub Screenshot](https://github.com/user-attachments/assets/39e2c734-3b34-4a33-b594-4b4e9b74f3b8)

### 🔢 Image versions
![Versiones de las Imágenes Screenshot](https://github.com/user-attachments/assets/dfc6cfd7-4eb5-4f45-ab4f-dc9b2fb772c4)

