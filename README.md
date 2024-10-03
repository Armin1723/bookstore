
## Getting Started

### Introduction

Bookstore is a book management app bootstrapped on NextJs frontend and django-rest backend that allows for CRUD opeations on books using an interative USer Interface. It leverages various other technologies like tailwindCSS for styling , react-hook-form for form validation, react-toastify for success and error messages, redux for global state management and drf-yasg, swagger for API documentation. A user can add, create, update, delete or view books in this app.

### State Management

This project uses Redux for state management. Redux helps to manage the state of the application in a predictable way. The state is centralized in a single store, making it easier to manage and debug.

#### Store Configuration

The store is configured using @reduxjs/toolkit which simplifies the setup and usage of Redux.

#### Reducers

The state is divided into slices, each managed by a reducer. In this project, there are two slices:

**Theme Slice:** Manages the state related to the application's theme.

**Results Slice:** Manages the state related to the results data. This slice contains the array of books along with total page length which is useful for pagination.

Each slice is defined in its respective file (themeSlice.js and resultsSlice.js), and they are combined in the store configuration.

#### Usage

To use the store in your components, you can use the useSelector and useDispatch hooks from react-redux:

useSelector: Allows you to extract data from the Redux store state.

useDispatch: Returns the dispatch function to send actions to the store.

- **Theme Slice** gets persisted across page reloads as it makes use of localStorage to store theme choice and hydrates this choice on client side as localStorage is not available on the backend.
  
- **Results Slice** stores data about books and is persisted till page is reloaded , caching is done using this slice to bypass fetching data repeatedly whenever a single book info in needed.

### Prerequisites

- Python 3.x
- Node.js and npm
- Django
- Django-rest
- NextJs

## Backend Setup

1.Clone the Github Repository:

  ```sh
  git clone "https://github.com/Armin1723/bookstore.git"
  ```

2. Navigate to the `backend` directory:

    ```sh
    cd bookstore_backend
    ```

3. Create a virtual environment and activate it:

    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

4. Install the required packages:

    ```sh
    pip install -r requirements.txt
    ```

5. Run the Django migrations:

    ```sh
    python manage.py migrate
    ```

6. Start the Django development server:

    ```sh
    python manage.py runserver
    ```

## Frontend Setup

1. Navigate to the `frontend` directory:

    ```sh
    cd bookstore_frontend
    ```

2. Install the required packages:

    ```sh
    npm install
    ```

3. Start the NextJs development server:

    ```sh
    npm run dev
    ```

## Running the Application

1. Ensure the Django backend server is running:

    ```sh
    python manage.py runserver
    ```

2. Ensure the NextJs frontend server is running:

    ```sh
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## API Documentation

The API documentation for the Django backend can be accessed at `http://localhost:8000/swagger` or `http://localhost:8000/redoc` once the server is running.

## API Endpoints.

#### Admin

URL: `/admin/`

Description: Django admin interface.

**Books API**

  **- List all books.**
  
  URL: `/api/books`

  Method:  GET

  Description: Lists all book with an additional `?page=` query for getting paginated results.
  
  **- Create a book.**
  
  URL:  `api/create`

  Method:  POST

  Description:  Creates a book in the database with Author, Title, Genre and Published_year fields.
  
  **- Fetching a single book.**
  
  URL:  `/api/books/{id}`

  Method:  GET

  Description:  Fetches details about a single book based on its unique id.
  
  **- Update a book.**
  
  URL:  `api/books/edit/{id}`

  Method: PUT

  Description:  Modies the content of already existing book.
  
  **- Delete book.**
  
  URL:  `api/books/delete/{id}`

  Method: DELETE

  Description:  Deletes a given book based on Id identitfier.

#### Swagger UI

URL: `/swagger/`

Description: Interactive API documentation using Swagger UI.

#### ReDoc UI

URL: `/redoc/`

Description: Interactive API documentation using ReDoc UI.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
