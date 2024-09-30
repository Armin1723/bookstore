from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    genre = models.CharField(max_length=100)
    published_year = models.IntegerField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['title', 'author'], name='unique_book')
        ]

    def __str__(self):
        return self.title