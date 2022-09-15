import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import aws from 'aws-sdk';

aws.config.region = "eu-west-3";
//aws.config.logger = console;

export const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


export const postsDirectory = process.env.S3_LOCATION + 'posts/';
export const disabledPostsDirectory = process.env.S3_LOCATION + 'disabled_posts/';
export const postImageDirectory = process.env.S3_LOCATION + 'affiches/';

export let posts: Array<{ id: string, content: string, head:{date:string,title:string,img:string} }> = new Array();
fetchAllPosts();// Start initializing the array ansynchronously

/**
 * 
 * @returns 
 */
export async function getSortedPostsData() {

  const tmp = posts.map(post => {
    return {
      date: post.head.date,
      img: post.head.img,
      title: post.head.title,
      id: post.id
    }
  })

  posts.sort((a,b) => {
    const x = new Date(a.head.date);
    const y = new Date(b.head.date);

    if (x > y)
      return -1;
    else if (x == y)
      return 0;
    else
      return 1;
  })

  return tmp;
}

/**
 * 
 * @returns 
 */
export function getAllPostIds() {
  return posts.map(post => {
    return {
      params: {
        id: post.id
      }
    }
  })
}


/**
 * 
 * @param id 
 * @returns 
 */
export async function getPostData(id: string) {

  //console.log(posts);//! DEBUG

  const post_id = posts.findIndex(function(post) {
    return post.id == id;
  })


  if (post_id == -1) {
    console.log("Unknown post: "+ id +"");
    return {
      success: false
    };
  } else {
    return {
      success: true,
      id: posts[post_id].id,
      date: posts[post_id].head.date,
      img: posts[post_id].head.img,
      title: posts[post_id].head.title,
      contentHtml: posts[post_id].content
    }
  }
}

/**
 * Initialize the `posts` array ansynchronously with the amazon S3 stored posts.
 */
export async function fetchAllPosts() {
  posts = [];// Empty the posts array to fill it again

  // Call S3 to obtain a list of the objects in the bucket
  const objectsList = await s3.listObjects({ Bucket: process.env.S3_BUCKET, Prefix: "posts" }).promise();

  objectsList.Contents.map(x => x.Key.split("/").pop()).forEach(postName => {
    // Remove ".md" from file name to get id
    const id = postName.replace(/\.md$/, '');

    // GET markdown file from server
    s3.getObject({ Bucket: process.env.S3_BUCKET, Key: "posts/" + postName }, async (err, data) => {

      if (err) {
        console.error(err);
      } else {

        console.log(data.Body.toString('utf-8'))//! DEBUG

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(data.Body.toString('utf-8'));

        // Combine the data with the id
        posts.push({
          id: id,
          content: (await remark().use(html).process(matterResult.content)).toString(),
          head: {...(matterResult.data as { date: string; title: string; img: string })}
        })

      }

    })

  })
}
