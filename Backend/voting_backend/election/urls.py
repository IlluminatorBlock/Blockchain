from django.urls import path # type: ignore
from . import views

urlpatterns = [
    path('register_voter/', views.register_voter, name='register_voter'),
    path('add_candidate/', views.add_candidate, name='add_candidate'),
    path('remove_candidate/', views.remove_candidate, name='remove_candidate'),
    path('vote/', views.vote, name='vote'),
    path('get_candidates_count/', views.get_candidates_count, name='get_candidates_count'),
    path('get_total_votes/', views.get_total_votes, name='get_total_votes'),
    path('get_candidates/', views.get_candidates, name='get_candidates'),
]
