import fs, { writeFileSync } from 'fs'
import sha256 from 'crypto-js/sha256';
import { NextApiRequest, NextApiResponse } from 'next'
import { disabledPostsDirectory, postImageDirectory, postsDirectory } from '../../lib/posts';
import path from 'path';

const auth_hash = <API TOKEN>

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {

        const body = JSON.parse(req.body);

        if (req.headers['jsa-auth-token'] == undefined) {
            res.status(400).json({success: false, error: "HTTP bad request."});// Bad request
        } else if (sha256(req.headers['jsa-auth-token']).toString() !== auth_hash) {
            res.status(401).json({success: false, error: "Unauthorized..."});// Unauthorized
        } else {

            // Check body content: type
            if (body.type == undefined) {
                res.status(400).json({success: false, error: "HTTP bad request."});// Bad request

            } else if (body.type === 'list') {
                //*---------------------------------------------------------------------
                //* List enabled and disabled posts                                  ---
                //*---------------------------------------------------------------------
                res.status(200).json({
                    enabled: fs.readdirSync(postsDirectory).map(s => s.substring(0,s.length-3)),
                    disabled: fs.readdirSync(disabledPostsDirectory).map(s => s.substring(0,s.length-3))
                })

            } else if (body.type === 'enable') {
                //*---------------------------------------------------------------------
                //* Enable a post                                                    ---
                //*---------------------------------------------------------------------
                if (body.filename == undefined || typeof(body.filename) != 'string') {
                    res.status(400).json({success: false, error: "HTTP bad filename argument."});// Bad request
                } else {
                    // Try to find the document
                    if (fs.readdirSync(disabledPostsDirectory).includes(body.filename+".md")) {
                        fs.renameSync(disabledPostsDirectory+'/'+body.filename+".md", postsDirectory+'/'+body.filename+".md");
                        res.status(200).json({
                            success: true
                        })
                    } else {
                        res.status(400).json({success: false, error: "HTTP unknown filename: "+body.filename+".md"});// Bad request
                    }
                }

            } else if (body.type === 'disable') {
                //*---------------------------------------------------------------------
                //* Disable a post                                                   ---
                //*---------------------------------------------------------------------
                if (body.filename == undefined || typeof(body.filename) != 'string') {
                    res.status(400).json({success: false, error: "HTTP bad filename argument."});// Bad request
                } else {
                    // Try to find the document
                    if (fs.readdirSync(postsDirectory).includes(body.filename+".md")) {
                        fs.renameSync(postsDirectory+'/'+body.filename+".md", disabledPostsDirectory+'/'+body.filename+".md");
                        res.status(200).json({
                            success: true
                        })
                    } else {
                        res.status(400).json({success: false, error: "HTTP unknown filename: "+body.filename+".md"});// Bad request
                    }
                }

            } else if (body.type === 'add') {
                //*---------------------------------------------------------------------
                //* Add a post                                                       ---
                //*---------------------------------------------------------------------
                if (
                    body.file == undefined || typeof(body.file) != 'string'         ||// .md
                    body.filename == undefined || typeof(body.filename) != 'string' ||// string
                    body.enabled == undefined || typeof(body.enabled) != 'boolean'  ||// true/false
                    body.image == undefined || typeof(body.image) != 'string'         // png/jpeg
                ) {
                    // Check arguments types
                    res.status(400).json({success: false, error: "HTTP bad requests arguments."});// Bad request
                } else {

                    // Check filename value
                    if (!/^[0-9]{4}-(1[012]|0[1-9])-(0[1-9]|[12][0-9]|3[01])_.+$/.test(body.filename)) {
                        res.status(400).json({success: false, error: "Bad filename."});// Bad request
                    } else if (
                        fs.readdirSync(postsDirectory).includes(body.filename+".md") ||
                        fs.readdirSync(disabledPostsDirectory).includes(body.filename+".md")
                    ) {
                        res.status(400).json({success: false, error: "Filename already in use."});// Bad request
                    } else {

                        // Valid args
                        writeFileSync(
                            path.join(
                                body.enabled == true ? postsDirectory : disabledPostsDirectory,
                                body.filename+".md"
                            ),
                            body.file
                        )
                        writeFileSync(
                            path.join(postImageDirectory,body.filename+".png"),
                            Buffer.from(body.image, "base64")
                        )

                        res.status(200).json({
                            success: true
                        })
                    }

                }

            } else if (body.type === 'remove') {
                //*---------------------------------------------------------------------
                //* Remove a post                                                    ---
                //*---------------------------------------------------------------------
                // TODO - {filename}
                if (body.filename == undefined || typeof(body.filename) != 'string') {
                    res.status(400).json({success: false, error: "Bad filename."});// Bad request
                } else {

                    // Check filename value
                    if (!/^[0-9]{4}-(1[012]|0[1-9])-(0[1-9]|[12][0-9]|3[01])_.+$/.test(body.filename)) {
                        res.status(400).json({success: false, error: "Bad filename."});// Bad request
                    } else {

                        if (fs.readdirSync(postsDirectory).includes(body.filename+".md")) {
                            fs.rmSync(path.join(postsDirectory,body.filename+".md"))
                            fs.rmSync(path.join(postImageDirectory,body.filename+".png"), {force: true})
                            fs.rmSync(path.join(postImageDirectory,body.filename+".jpg"), {force: true})
                            fs.rmSync(path.join(postImageDirectory,body.filename+".jpeg"), {force: true})

                        } else if (fs.readdirSync(disabledPostsDirectory).includes(body.filename+".md")) {
                            fs.rmSync(path.join(disabledPostsDirectory,body.filename+".md"))
                            fs.rmSync(path.join(postImageDirectory,body.filename+".png"), {force: true})
                            fs.rmSync(path.join(postImageDirectory,body.filename+".jpg"), {force: true})
                            fs.rmSync(path.join(postImageDirectory,body.filename+".jpeg"), {force: true})

                        } else {
                            res.status(400).json({success: false, error: "File not on the server."});// Bad request
                        }

                        res.status(200).json({
                            success: true
                        })
                    }

                }

            } else {
                res.status(400).json({success: false, error: "HTTP bad request."});// Bad request
            }

        }

    } else {
        // Return 404 if not a POST
        res.status(405).send("HTTP method not allowed.");
    }

}
