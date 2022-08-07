import requests
import json
from getpass import getpass

print("File to remove:")

filename = str(input())

res = requests.post(
    "http://localhost:3000/api/posts_admin",
    headers={'jsa-auth-token':getpass("JSA Auth Token:")},
    json=json.dumps({
        'type':'remove',
        'filename':filename
    })
)

print(res.status_code)

posts_list = res.json()

print(posts_list)
