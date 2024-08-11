from django.db import models
from django.utils import timezone

# Create your models here.
class Reservation(models.Model):
    fullname = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)
    reservation_date = models.DateField(default=timezone.now)
    reservation_time = models.TimeField(default=timezone.now)
    number_of_guests = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"Reservación para {self.number_of_guests} personas el {self.reservation_date} a las {self.reservation_time}"