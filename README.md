# Identity Reconciliation Service

This project is a backend service for handling identity reconciliation, built using Node.js, Express, javascript It manages contact information and handles scenarios where duplicate contacts may be created.

# Hosted endpoints
https://bitespeed-identity-service.onrender.com/api/welcome
https://bitespeed-identity-service.onrender.com/api/contacts
![Screenshot (143)](https://github.com/Anshul-eng/Bitespeed-Identity-Service/assets/105932043/97da239d-84d3-4ec7-922f-0e034d66d02a)


## Features

- Create new contact with email and phone number.
- Link secondary contacts to a primary contact if duplicates are found.
- Return contact details with primary and secondary information.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- JavaScript
- Database

## Getting Started

Follow these steps to set up and run the project on your local system.

### Clone the Repository

```sh
git clone https://github.com/YourUsername/Bitespeed-Identity-Service.git
cd Bitespeed-Identity-Service

