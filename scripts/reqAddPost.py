import requests
import os
import base64
import json
from markdown import markdown, markdownFromFile
from getpass import getpass
from tkinter.filedialog import askopenfilename


filename = askopenfilename(
    title="Post markdown file",
    defaultextension=("*.md"),
    filetypes=(("Markdown File","*.md"),),
    multiple=False
)

imagename = askopenfilename(
    title="Post image file",
    defaultextension="*",
    filetypes=(
        ("Portable Network Graphics File","*.png"),
        ("Joint Photographic Experts Group",("*.jpeg","*.jpg"))
    ),
    multiple=False
)

print("Enable the post? [y|N]")

tmp = str(input())
enabled = False if tmp == "" else tmp.lower()[0] == 'y'


print(filename)
print(imagename)
print(enabled)

image = ""
file = ""

if filename != "" and os.path.exists(filename):
    with open(filename, "r") as md_file:
        file = md_file.read()

if imagename != "" and os.path.exists(imagename):
    with open(imagename, "rb") as img_file:
        image = base64.b64encode(img_file.read()).decode('utf-8')


assert(image != "")
assert(file != "")

res = requests.post(
    "http://localhost:3000/api/posts_admin",
    headers={'jsa-auth-token':getpass("JSA Auth Token:")},
    json=json.dumps({
        'type': 'add',
        'filename': filename.rsplit("/",1)[1].split(".",1)[0],
        'enabled': enabled,
        'image': image,
        'file': file
    })
)

print(res.status_code)

posts_list = res.json()

print(posts_list)
