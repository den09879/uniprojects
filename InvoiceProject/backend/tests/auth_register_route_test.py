import pytest
import requests
import json
from src import config
from src.database import clear_users

@pytest.fixture
def clear_data():
    clear_users()

def test_return_api_key(clear_data):
    payload = {'email': 'myemail@gmail.com', 'password': 'password'}
    resp = requests.post(config.url+'auth/register', data=payload)
    assert resp.status_code == 200
    assert json.loads(resp.text) == {'api_key': '52519517682584b1848886a1d25e4027bda2dc6db9802c35ffc5d81f8a36217d'}

def test_email_invalid(clear_data):
    payload = {'email': 'myemail', 'password': 'password'}
    resp = requests.post(config.url+'auth/register', data=payload)
    assert resp.status_code == 400

    payload = {'email': '@mail.com', 'password': 'password'}
    resp = requests.post(config.url+'auth/register', data=payload)
    assert resp.status_code == 400

def test_email_used(clear_data):
    payload = {'email': 'myemail@gmail.com', 'password': 'password'}
    resp = requests.post(config.url+'auth/register', data=payload)
    assert resp.status_code == 200

    payload = {'email': 'myemail@gmail.com', 'password': 'password'}
    resp = requests.post(config.url+'auth/register', data=payload)
    assert resp.status_code == 400

def test_password_length(clear_data):
    payload = {'email': 'myemail@gmail.com', 'password': 'hi'}
    resp = requests.post(config.url+'auth/register', data=payload)
    assert resp.status_code == 400
