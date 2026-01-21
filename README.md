# CA Monk Blog Application

This project was built as part of the CA Monk internship assignment.  
The objective was to create a standalone blog application while demonstrating practical usage of React, TypeScript, and TanStack Query.



## Overview

The application displays a list of blogs and allows users to view detailed content in a two-panel layout.  
Users can also create new blogs using a simple form, with the blog list updating automatically after creation.

The backend is powered by JSON Server and runs locally.


## Features

- Fetch and display all blogs from the backend
- View individual blog details in a split-panel layout
- Create new blogs using a clean, simple form
- Automatic data refetching after blog creation
- Loading and error states handled using TanStack Query
- Responsive layout for both mobile and desktop screens


## Tech Stack

- React + TypeScript
- TanStack Query for server-state management
- Tailwind CSS for styling
- shadcn/ui for reusable UI components
- JSON Server for the mock backend API


## Project Structure

The structure is kept simple to separate concerns and keep the codebase easy to understand and maintain.



## Notes on Implementation

- Blog content is rendered as plain text, as required by the assignment.
- Cover images are handled using public image URLs to match the provided API structure.
- TanStack Query is configured at the application root to manage server state consistently.


## Running the Project

Install dependencies:
1.npm install
2.npm run server
3.npm run dev