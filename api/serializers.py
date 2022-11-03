from rest_framework.serializers import ModelSerializer

from .models import Note


class NoteSerializer(ModelSerializer):
    ''' This class is used to serialize the notes into a supported format for the rest_frameworks Response.'''
    class Meta:
        model = Note  # the model used for serialization
        fields = '__all__'  # the all refer to all the data in the models. we can also specify selected one using ['body', 'created] ...