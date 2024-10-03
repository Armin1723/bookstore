from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from .models import Book
from .serializers import BookSerializer
from rest_framework.pagination import PageNumberPagination
from django.http import Http404

from django.http import HttpResponse
from django.contrib.auth import get_user_model

# Create a Book
class BookCreateView(APIView):
    def post(self, request):
        
        title = request.data.get('title')
        author = request.data.get('author')
        # Check if a book with the same title and author exists
        if Book.objects.filter(title=title, author=author).exists():
            return Response({"error": "A book with this title and author already exists."}, status=status.HTTP_400_BAD_REQUEST)     
        
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Read all Books
class BookListView(ListAPIView):
    queryset = Book.objects.all().order_by('id')
    serializer_class = BookSerializer
    pagination_class = PageNumberPagination

# Read a Single Book
class BookDetailView(APIView):
    def get_object(self, pk):
        try:
            return Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        book = self.get_object(pk)
        serializer = BookSerializer(book)
        return Response(serializer.data)

# Update a Book
class BookUpdateView(APIView):
    def get_object(self, pk):
        try:
            return Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            raise Http404

    def put(self, request, pk):
        book = self.get_object(pk)
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete a Book
class BookDeleteView(APIView):
    def get_object(self, pk):
        try:
            return Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            raise Http404

    def delete(self, request, pk):
        book = self.get_object(pk)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class SuperUserView(APIView):
    def get(self, request):
        User = get_user_model()
        username = 'airuz'  
        password = 'airuz2323'  
        email = 'alam.airuz23@gmail.com'
        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username=username, email=email, password=password)
            return HttpResponse("Superuser created successfully!")
        else:
            return HttpResponse("Superuser already exists.")
