# Resume analysis using nachine learning to optimize recruitment processes

This repository contains the full implementation and documentation of the bachelor's thesis prepared as part of the Computer Science and Information Systems bachelor's program at Warsaw University of Technology.

## Summary

This thesis provides a detailed description of the FoodReview system for rating dishes and restaurants. The system is designed to allow users to rate both restaurants and dishes for popular restaurant chains. The described solution consists of a mobile application, a web application and a server application. The mobile application, designed for customers and guests, will provide the ability to rate dishes and restaurants, as well as the ability to view other users' ratings in order to select a dish. A web interface is also provided as an administrative panel, from where administrators will be able to manage system elements and view statistics. The connection of the above-mentioned applications with the database is provided by the server application.

## Running the Application

To run the backend and the web application, use docker-compose:  
`docker compose up`

You can also run the applications independently:  
- backend – `docker compose up api`  
- web application – `docker compose up webapp`

## User UI

![feed](https://github.com/user-attachments/assets/ee854a87-aa45-41f4-8679-72f8eb2ed5ec)
![detale-restauracji-1](https://github.com/user-attachments/assets/fc868a98-9e48-46eb-8340-5888cb1efe3d)
![detale-restauracji-2](https://github.com/user-attachments/assets/d7b59406-1d65-4ca6-93f8-8c71020c8aa6)
![edycja-oceny](https://github.com/user-attachments/assets/64754947-a07f-4e44-8714-f69a6ae18899)
![logowanie](https://github.com/user-attachments/assets/38f3dfd8-af01-47ac-a788-e4fc19aa8766)
![profil](https://github.com/user-attachments/assets/9e398915-4efd-41a6-be30-bd10297beb6b)
![rejestracja](https://github.com/user-attachments/assets/527ab2d5-0df8-4d4b-aacd-7c1587400840)
![szukajka](https://github.com/user-attachments/assets/bc875a84-9d6e-42e8-9abc-5a027490f9b1)

## Admin UI
