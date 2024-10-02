from rest_framework.test import APITestCase
from rest_framework import status
from .models import Book
from django.urls import reverse

class BookTests(APITestCase):
    def setUp(self):
        self.book = Book.objects.create(
            title="Test Book",
            author="Author Name",
            genre="Fiction",
            published_year=2020
        )
    
    def test_get_books(self):
        url = reverse('book-list')  
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_create_book(self):
        url = reverse('book-create')
        data = {
            "title": "New Book",
            "author": "New Author",
            "genre": "Non-fiction",
            "published_year": 2021
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_book(self):
        url = reverse('book-update', kwargs={'pk': self.book.id})
        data = {
            "title": "Updated Title",
            "author": "Updated Author",
            "genre": "Fiction",
            "published_year": 2020
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_book(self):
        url = reverse('book-delete', kwargs={'pk': self.book.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
