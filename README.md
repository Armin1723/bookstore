
## Getting Started

### Prerequisites

- Python 3.x
- Node.js and npm
- Django
- Django-rest
- NextJs

### Backend Setup

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

### Frontend Setup

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

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
