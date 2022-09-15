import fs from 'fs'
import sha256 from 'crypto-js/sha256';
import { NextApiRequest, NextApiResponse } from 'next'
import { disabledPostsDirectory, fetchAllPosts, postImageDirectory, posts, postsDirectory } from '../../lib/posts';
import path from 'path';
import { s3 } from '../../lib/posts'
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const auth_hash = process.env.auth_hash;


export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {

        const body = JSON.parse(req.body);

        if (req.headers['jsa-auth-token'] == undefined) {
            res.status(400).json({ success: false, error: "HTTP bad request." });// Bad request
        } else if (sha256(req.headers['jsa-auth-token']).toString() !== auth_hash) {
            res.status(401).json({ success: false, error: "Unauthorized..." });// Unauthorized
        } else {

            // Check body content: type
            if (body.type == undefined) {
                res.status(400).json({ success: false, error: "HTTP bad request." });// Bad request

            } else if (body.type === 'list') {
                //*---------------------------------------------------------------------
                //* List enabled and disabled posts                                  ---
                //*---------------------------------------------------------------------
                s3.listObjects({ Bucket: process.env.S3_BUCKET, Prefix: "posts" }, function (err, data) {
                    if (err) {
                        console.log("Error", err);
                        res.status(400).json({ success: false, error: "Image upload error." });// Bad request
                    } else {
                        res.status(200).json(
                            data.Contents.map(post => {
                                const title = post.Key.split("/")[1];
                                return title.slice(0, title.length - 3);
                            })
                        )
                    }
                })

            } else if (body.type === 'enable') {
                //*---------------------------------------------------------------------
                //* Enable a post                                                    ---
                //*---------------------------------------------------------------------
                if (body.filename == undefined || typeof (body.filename) != 'string') {
                    res.status(400).json({ success: false, error: "HTTP bad filename argument." });// Bad request
                } else {
                    // Copy file than remove the previous one
                    const copyParams = {
                        Bucket: process.env.S3_BUCKET,
                        CopySource: "/disabled_posts/" + body.filename + ".md",
                        Key: "/posts/" + body.filename + ".md"
                    };
                    s3.copyObject(copyParams, function (err, data) {
                        if (err) {
                            console.log(err, err.stack); // an error occurred
                            res.status(400).json({ success: false, error: "Files not in the S3 bucket." });
                        } else {
                            console.log(data);           // successful response

                            const deleteParams = {
                                Bucket: process.env.S3_BUCKET,
                                Key: "/disabled_posts/" + body.filename + ".md"
                            };
                            s3.deleteObject(deleteParams, function (err, data) {
                                if (err) {
                                    console.log(err, err.stack); // an error occurred
                                    res.status(400).json({ success: false, error: "Files not in the S3 bucket." });
                                } else {
                                    console.log(data);           // successful response

                                    // Reimport all posts to update the list
                                    fetchAllPosts();

                                    res.status(200).json({
                                        success: true
                                    })
                                }
                            });
                        }
                    });
                }

            } else if (body.type === 'disable') {
                //*---------------------------------------------------------------------
                //* Disable a post                                                   ---
                //*---------------------------------------------------------------------
                if (body.filename == undefined || typeof (body.filename) != 'string') {
                    res.status(400).json({ success: false, error: "HTTP bad filename argument." });// Bad request
                } else {

                    const post_id = posts.findIndex(function (post) {
                        return post.id == body.filename;
                    })

                    // Try to find the document
                    if (post_id != -1) {
                        // Copy file than remove the previous one
                        const copyParams = {
                            Bucket: process.env.S3_BUCKET,
                            CopySource: "/posts/" + body.filename + ".md",
                            Key: "/disabled_posts/" + body.filename + ".md"
                        };
                        s3.copyObject(copyParams, function (err, data) {
                            if (err) {
                                console.log(err, err.stack); // an error occurred
                                res.status(400).json({ success: false, error: "Files not in the S3 bucket." });
                            } else {
                                console.log(data);           // successful response

                                const deleteParams = {
                                    Bucket: process.env.S3_BUCKET,
                                    Key: "/posts/" + body.filename + ".md"
                                };
                                s3.deleteObject(deleteParams, function (err, data) {
                                    if (err) {
                                        console.log(err, err.stack); // an error occurred
                                        res.status(400).json({ success: false, error: "Files not in the S3 bucket." });
                                    } else {
                                        console.log(data);           // successful response

                                        posts.splice(post_id, 1);// Remove post from the posts Array

                                        res.status(200).json({
                                            success: true
                                        })
                                    }
                                });
                            }
                        });

                    } else {
                        res.status(400).json({ success: false, error: "HTTP file is not enabled: " + body.filename + ".md" });// Bad request
                    }
                }

            } else if (body.type === 'add') {
                //*---------------------------------------------------------------------
                //* Add a post                                                       ---
                //*---------------------------------------------------------------------
                if (
                    body.file == undefined || typeof (body.file) != 'string' ||// .md
                    body.filename == undefined || typeof (body.filename) != 'string' ||// string
                    body.enabled == undefined || typeof (body.enabled) != 'boolean' ||// true/false
                    body.image == undefined || typeof (body.image) != 'string'         // png/jpeg
                ) {
                    // Check arguments types
                    res.status(400).json({ success: false, error: "HTTP bad requests arguments." });// Bad request
                } else {

                    // Check filename value
                    if (!/^[0-9]{4}-(1[012]|0[1-9])-(0[1-9]|[12][0-9]|3[01])_.+$/.test(body.filename)) {

                        res.status(400).json({ success: false, error: "Bad filename." });// Bad request

                    } else {

                        // Upload .md file
                        const uploadFileParams = {
                            Bucket: process.env.S3_BUCKET, // Bucket into which you want to upload file
                            Key: (body.enabled ? "posts/" : "disabled_posts/") + body.filename + ".md", // Name by which you want to save it
                            Body: body.file // File
                        };
                        const uploadImageParams = {
                            Bucket: process.env.S3_BUCKET, // Bucket into which you want to upload file
                            Key: "affiches/" + body.filename + ".png", // Name by which you want to save it
                            Body: Buffer.from(body.image, "base64") // Image from base64
                        };
                        s3.upload(uploadFileParams, function (err, data) {
                            if (err) {
                                console.log("Error", err);
                                res.status(400).json({ success: false, error: "Markdown upload error." });// Bad request
                            }
                            if (data) {
                                console.log("Markdown Upload Success", data.Location);

                                s3.upload(uploadImageParams, async function (err, data) {
                                    if (err) {
                                        console.log("Error", err);
                                        res.status(400).json({ success: false, error: "Image upload error." });// Bad request
                                    }
                                    if (data) {
                                        console.log("Image Upload Success", data.Location);

                                        console.log(body.file)//! DEBUG

                                        if (body.enabled) {
                                            // Use gray-matter to parse the post metadata section
                                            const matterResult = matter(body.file);

                                            // Add post to the posts array
                                            posts.push({
                                                id: body.filename,
                                                content: (await remark().use(html).process(matterResult.content)).toString(),
                                                head: { ...(matterResult.data as { date: string; title: string; img: string }) }
                                            })
                                        }

                                        res.status(200).json({
                                            success: true
                                        })
                                    }
                                });
                            }
                        });
                    }

                }

            } else if (body.type === 'remove') {
                //*---------------------------------------------------------------------
                //* Remove a post                                                    ---
                //*---------------------------------------------------------------------
                if (body.filename == undefined || typeof (body.filename) != 'string') {
                    res.status(400).json({ success: false, error: "Bad filename." });// Bad request
                } else {

                    // Check filename value
                    if (!/^[0-9]{4}-(1[012]|0[1-9])-(0[1-9]|[12][0-9]|3[01])_.+$/.test(body.filename)) {
                        res.status(400).json({ success: false, error: "Bad filename." });// Bad request
                    } else {

                        const post_id = posts.findIndex(function (post) {
                            return post.id == body.filename;
                        })

                        const deleteParams = {
                            Bucket: process.env.S3_BUCKET,
                            Delete: {
                                Objects: [
                                    {
                                        Key: (post_id != -1 ? "posts/" : "disabled_posts/") + body.filename + ".md"
                                    },
                                    {
                                        Key: "affiches/" + body.filename + ".png"
                                    }
                                ]
                            }
                        }
                        s3.deleteObjects(deleteParams, function (err, data) {
                            if (err) {
                                console.log(err, err.stack);
                                res.status(400).json({ success: false, error: "Files not in the S3 bucket." });
                            } else {
                                console.log(data);
                                if (data.Deleted.length == 2) {
                                    // Remove file from the posts array
                                    const post_id = posts.findIndex(function (post) {
                                        return post.id == body.filename;
                                    })

                                    if (post_id != -1) {
                                        posts.splice(post_id, 1);
                                    }

                                    res.status(200).json({
                                        success: true
                                    })
                                }
                            }
                        });
                    }

                }

            } else {
                res.status(400).json({ success: false, error: "HTTP bad request." });// Bad request
            }

        }

    } else {
        // Return 404 if not a POST
        res.status(405).send("HTTP method not allowed.");
    }

}
