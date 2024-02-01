from .models import Order


def get_order(user_or_session):
    if hasattr(user_or_session, 'session_key'):
        session_key = user_or_session.session_key
        try:
            order = Order.objects.get(session_id=session_key, complete=False)
        except Order.DoesNotExist:
            order = None
    else:
        try:
            order = Order.objects.get(user=user_or_session.id, complete=False)
        except Order.DoesNotExist:
            order = None
    return order


def create_order(user_or_session):
    if hasattr(user_or_session, 'is_authenticated') and user_or_session.is_authenticated:
        try:
            order = Order.objects.get(user=user_or_session, complete=False)
        except Order.DoesNotExist:
            order = Order.objects.create(user=user_or_session, complete=False)
    else:
        try:
            order = Order.objects.get(session_id=user_or_session.session_key, complete=False)
        except Order.DoesNotExist:
            order = Order.objects.create(session_id=user_or_session.session_key, complete=False)

    return order


def check_int_or_sting(input_str):
    boolean_char = all(char.isdigit() for char in input_str)
    if boolean_char:
        obj = int(input_str)
    else:
        obj = input_str
    return obj