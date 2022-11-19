
import fs, { writeFileSync } from 'fs'
import sha256 from 'crypto-js/sha256';
import { NextApiRequest, NextApiResponse } from 'next'
import { postsDirectory } from '../../lib/posts';

const auth_hash = process.env.auth_hash;

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {

        const body = JSON.parse(req.body);

        if (req.headers['jsa-auth-token'] == undefined) {
            res.status(400).json({success: false, error: "HTTP bad request."});// Bad request
        } else if (sha256(req.headers['jsa-auth-token'] as string).toString() !== auth_hash) {
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
                    posts: fs.readdirSync(postsDirectory).map(s => s.substring(0,s.length-3)),
                    success: true
                });

            } else {
                res.status(400).json({success: false, error: "HTTP bad request."});// Bad request
            }

        }

    } else {
        // Return 404 if not a POST
        res.status(405).send("HTTP method not allowed.");
    }

}
