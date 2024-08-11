from rest_framework import serializers
from .models import Reservation

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ('id', 'fullname', 'description', 'reservation_date', 'reservation_time', 'number_of_guests')
        read_only_fields = ('id')