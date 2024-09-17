import pytest
from src.auth import auth_register
from src.database import clear_users, access_users
from src.errors import InputError

@pytest.fixture
def clear_data():
    clear_users()

def test_return_api_key(clear_data):
    assert auth_register("myemail@gmail.com", "password") == '52519517682584b1848886a1d25e4027bda2dc6db9802c35ffc5d81f8a36217d'

def test_email_invalid(clear_data):
    with pytest.raises(InputError):
        auth_register("myemail", "password")

    with pytest.raises(InputError):
        auth_register("@mail.com", "password")

def test_email_used(clear_data):
    auth_register("myemail@gmail.com", "password")
    with pytest.raises(InputError):
        auth_register("myemail@gmail.com", "password123")

def test_password_length(clear_data):
    with pytest.raises(InputError):
        auth_register("myemail@gmail.com", "pass")

def test_user_storage(clear_data):
    auth_register("myemail@gmail.com", "password")

    collection = access_users()
    user = collection.find_one({'email': "myemail@gmail.com"})
    encrypted_pass = user['password']
    email = user['email']
    assert email == "myemail@gmail.com"
    assert encrypted_pass == '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
