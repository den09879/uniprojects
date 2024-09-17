'''this module contains functions to connect to the database'''
import hashlib
import boto3
from pymongo import MongoClient
from src.errors import InputError, AccessError


def add_render_to_bucket(render_id, file_name, file_type):
    """
    Adds the render in the current directory, given it's file name to the S3 bucket

    Arguments:
        render_id: int
        file_name: str
        file_type: str

    Return value:
        None
    """

    # Accessing s3 bucket
    bucket = boto3.client('s3', aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)

    # Upload file to bucket
    save_name = 'invoice' + str(render_id) + '.' + str(file_type)
    bucket.upload_file(file_name, 'rendered-invoices', save_name, ExtraArgs={'ACL': 'public-read'})

def add_render_to_db(render_id, file_type, api_key):
    """
    Adds a render to the database. The render must be added to the bucket BEFORE
    this function is called. Returns file's S3 url for user to download.

    Arguments:
        render_id: int
        file_type: str

    Return value:
        url: str (file url of render in S3 bucket. User can download file using link)
    """

    # Access and connect to the online DB
    collection = access_db()

    # Create the str url of the rendered invoice
    invoice = "invoice" + str(render_id) + '.' + str(file_type)
    url = f'https://rendered-invoices.s3.ap-southeast-2.amazonaws.com/{invoice}'

    # Stores the rendered invoice's id (r_id), file type and its S3 Bucket's file url
    collection.insert_one(
        {
            "render_id": render_id,
            "file_type": str(file_type),
            "file_url": url,
            "api_key": api_key
        }
    )

    return url

def get_render_id():
    """
    Generates the render_id for a new render by taking the highest render_id
    in the database and incrementing it.

    Arguments:
        None

    Return value:
        render_id: int
    """
    collection = access_db()

    all_ids = []
    # Store all render_ids in a list
    all_invoices = collection.find({})
    for invoice in all_invoices:
        all_ids.append(invoice['render_id'])

    # Return max render_id + 1 as new render_id, else 1.
    if all_ids == []:
        return 1
    return int(max(all_ids) + 1)

def api_key_check(api_key):
    """
    Traverse through each user's info in DB.
    Regenerate API key of each user to see if input API key exists.

    Arguments:
        api_key

    Return value:
        True : if api_key exists
        False: if api_key does not exist
    """
    collection = access_users()
    for user in collection.find():
        combine = user['email'] + user['password']
        key = hashlib.sha256(combine.encode()).hexdigest()
        if api_key == key:
            return True
    return False

def access_db():
    """
    Access and connect to the online mongoDB. Returns collection of invoices.

    Arguments:
        None

    Return value:
        invoice collection object
    """
    cluster = MongoClient("mongodb+srv://AW:donutsaretasty@cluster0.hfra9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    database = cluster['rendersDB']
    collection = database['renders']
    return collection

def access_users():
    """
    Access and connect to the online mongoDB. Returns collection of users.

    Arguments:
        None

    Return value:
        user collection object
    """
    cluster = MongoClient("mongodb+srv://AW:donutsaretasty@cluster0.hfra9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    database = cluster['rendersDB']
    collection = database['users']
    return collection

def clear_users():
    """
    Access and connect to the online DB. Remove all users from the collection.

    Arguments:
        None

    Return value:
        None
    """
    collection = access_users()
    collection.drop()

def clear_invoices():
    """
    Access and connect to the online DB. Remove all invoices from the collection.

    Arguments:
        None

    Return value:
        None
    """
    collection = access_db()
    collection.drop()

def clear_bucket():
    """
    Access and connect to the S3 bucket. Empty bucket.

    Arguments:
        None

    Return value:
        None
    """
    # Accessing s3 bucket
    s3 = boto3.resource('s3', aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)
    bucket = s3.Bucket('rendered-invoices')
    # Empty bucket
    bucket.objects.all().delete()

def render_delete(render_id, api_key):
    """
    Given the ID of a rendered invoice in the database, delete it from the database.
    Users can only delete rendered invoices that they created.

    Arguments:
        render_id: int

    Return value:
        None
    """
    # Check if api_key is not empty str
    if api_key == '':
        raise InputError

    file_type = delete_in_db(render_id, api_key)
    delete_in_bucket(render_id, file_type)

def delete_in_db(render_id, api_key):
    """
    Given the ID of a rendered invoice in the database, delete its info from the mongoDB.

    Arguments:
        render_id: int

    Return value:
        file_type: str
    """
    collection = access_db()

    # Find target invoice in render collection
    results = collection.find({'render_id': int(render_id)})

    file_type = ''
    for obj in results:
        # Raise AccessError if invoice does not belong to user
        if api_key != obj['api_key']:
            raise AccessError
        # Save file type as str
        file_type = obj['file_type']

    # Delete invoice info from database
    collection.delete_one({"render_id": int(render_id)})
    return file_type

def delete_in_bucket(render_id, file_type):
    """
    Given the ID of a rendered invoice in the database, delete it from the S3 bucket

    Arguments:
        render_id: int
        file_type: str

    Return value:
        None
    """
    # Determine target file name
    target = 'invoice' + str(render_id) + '.' + str(file_type)
    # Accessing s3 bucket
    bucket = boto3.resource('s3', aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)
    # Delete target file in bucket
    bucket.Object('rendered-invoices', target).delete()

def render_id_invalid(render_id):
    """
    Given a render id, check if there exists an invoice with that render id.

    Arguments:
        render_id: int

    Return value:
        True: If render id does not exist
        False: If render id exists
    """
    collection = access_db()

    # Find target invoice in render collection
    results = collection.find({'render_id': int(render_id)})
    for obj in results:
        if obj['render_id'] == int(render_id):
            return False
    return True
