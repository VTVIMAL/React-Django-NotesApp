from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer


def getNotesList(request):
    notes = Note.objects.all().order_by('-updated')
    # we cannot pass notes directly into Response so we serialize it
    serializer = NoteSerializer(notes, many=True)
    # serializer is an object so we only display its data.
    return Response(serializer.data)


def getNoteDetail(request, pk):
    # we pass a id parameter that holds the primary key of the note.
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)


def createNote(request):
    data = request.data
    note = Note.objects.create(body=data['body'])
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)


def updateNote(request, pk):

    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note deleted')
