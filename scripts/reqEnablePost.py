import requests
import json
from os import environ
from getpass import getpass

print("File to enable:")

filename = str(input())

res = requests.post(environ["url"]+"api/posts_admin", headers={'jsa-auth-token':getpass("JSA Auth Token:")}, json=json.dumps({'type':'enable', 'filename':filename}))

print(res.status_code)

posts_list = res.json()

print(posts_list)
