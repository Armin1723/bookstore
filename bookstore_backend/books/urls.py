from django.urls import path
from .views import (
    BookCreateView,
    BookListView,
    BookDetailView,
    BookUpdateView,
    BookDeleteView,
    CreateSuperUser
)

urlpatterns = [
    path('books/', BookListView.as_view(), name='book-list'),        # GET: List all books
    path('books/create/', BookCreateView.as_view(), name='book-create'),  # POST: Create a book
    path('books/<int:pk>/', BookDetailView.as_view(), name='book-detail'), # GET: Retrieve a single book
    path('books/update/<int:pk>/', BookUpdateView.as_view(), name='book-update'), # PUT: Update a book
    path('books/delete/<int:pk>/', BookDeleteView.as_view(), name='book-delete'), # DELETE: Delete a book
    path('create-superuser/', CreateSuperUser.as_view(), name='create_superuser'),
]