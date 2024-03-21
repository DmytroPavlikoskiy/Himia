from django.contrib.sessions.models import Session
from django.contrib.auth.models import AnonymousUser


# def get_user_or_create_session(request):
#     print(request)
#     print("get_user_or_create_session IM HERE")
#     if request.user.is_authenticated:
#         print(request.user)
#         return request.user
#
#     if not request.session.session_key:
#         print(request.session)
#         request.session.create()
#         return request.user
#     return request.user

def get_user_or_create_session(request):
    if request.user.is_authenticated:
        return request.user

    if not request.session.session_key:
        request.session.create()
    return request.session


def get_user_or_session(request):
    if request.user is not None and request.user.is_authenticated:
        return request.user
    else:
        return request.session