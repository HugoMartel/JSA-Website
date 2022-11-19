import Layout from '../../components/layout'
import { getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetServerSideProps } from 'next'

export default function Post({
  postData
}: {
  postData: {
    success: boolean
    title: string
    date: string
    img: string
    contentHtml: string
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div>
          <img
            src={"/images/affiches/"+postData.img}
            style={{margin: "auto"}}
            width="50%"
            alt={postData.title}
          />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  if (context.params == null)
    return {
      notFound: true
    }

  const postData = await getPostData(context.params.id as string)


  return {
    props: {
      postData
    }
  }
}
