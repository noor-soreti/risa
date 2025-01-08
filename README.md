Backend Repo: https://github.com/noor-soreti/RisaBackendDemo

# RISA - Real-Time Chat Application

RISA is a real-time chat application built to enable bi-directional communication between users. The app features a modern interface, real-time messaging, and user authentication. RISA was developed as a project to enhance my skills in mobile app development, backend design, and state management. 

The app leverages Expo for the frontend and a custom backend in Java, utilizes WebSockets for real-time communication and ensuring a robust, scalable architecture

## App Features

- **Real-Time Messaging**: Instant delivery of messages between users.
<!-- - **User Authentication**: Secure login/signup functionality using Firebase Authentication. -->
<!-- - **User Profiles**: Each user has a unique profile with custom attributes. -->
- **State Management**: Powered by Redux for efficient global state handling.
<!-- - **Media Sharing**: Users can upload and share images in conversations. -->
- **Cross-Platform Compatibility**: Built with React Native for a consistent experience across Android and iOS devices.

## App Architecture

The application is built on a modern stack with a custom backend the dockerizes MySQL database for scalability. Below is an overview of the technologies used:

### Frontend
- **Framework**: Expo (React Native)
- **State Management**: Redux
- **UI Design**: Focused on a bright, tangerine-inspired aesthetic with minimal use of blue or green.

### Backend
- **Language**: Java (Spring Boot)
- **Database**: MySQL (containerized with Docker for scalability)
- **Real-Time Communication**: WebSockets for real-time message delivery
<!-- - **Authentication**: Firebase Authentication for user registration and login -->
- **Media Storage**: Local storage for storing media files

<!-- ## User Authentication

Firebase Authentication ensures secure user management:
- Users must sign up with an email and password or log in using existing credentials.
- Upon login, Firebase issues JSON Web Tokens (JWTs) for authentication and secure resource access:
  - **Access Token**: Authorizes API operations.
  - **ID Token**: Provides user identity claims.
  - **Refresh Token**: Retrieves new access tokens upon expiration. -->

## Dockerized MySQL Database

To ensure scalability and ease of deployment, the MySQL database is containerized using Docker. This setup allows the backend to run consistently across different environments and simplifies the management of database instances.

### Backend Repository
The backend is built with Java using Spring Boot and MySQL. The backend is dockerized for scalability, making it easier to scale and deploy the application. You can find the backend code here:  
[Backend Repository](https://github.com/noor-soreti/RisaBackendDemo)

### WebSocket Communication
WebSocket is used for real-time messaging between users. When a message is sent, it is broadcasted to the recipient via WebSocket.

## Development Highlights

### Challenges Overcome
- **Real-Time Messaging**: Utilizes WebSockets for real-time message delivery, ensuring instant communication between users.
- **State Management**: Successfully integrated Redux to manage user authentication and app-wide state.
- **Cross-Platform Compatibility**: Ensured consistent design and functionality across iOS and Android.