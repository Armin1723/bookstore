from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'genre', 'published_year']

def validate(self, data):
        # Check if a book with the same title and author exists
        if Book.objects.filter(title=data['title'], author=data['author']).exists():
            raise serializers.ValidationError("A book with this title and author already exists.")
        return data