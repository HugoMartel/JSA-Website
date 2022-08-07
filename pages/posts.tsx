import { GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import Date from '../components/date'
import Layout, { siteTitle } from "../components/layout"
import { getSortedPostsData } from "../lib/posts"
import utilStyles from '../styles/utils.module.css'


export default function Posts({
    allPostsData
}: {
    allPostsData: {
        date: string
        title: string,
        img: string,
        id: string
    }[]
}) {
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
            <h2 className={utilStyles.headingLg}>Toutes les actualit&eacute;s :</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title, img }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <img height={"65px"} src={img} alt={id} />
                            <div style={{ paddingLeft: "10px" }}>
                                <Link href={`/posts/${id}`}>
                                    <a>{title}</a>
                                </Link>
                                <br />
                                <small className={utilStyles.lightText}>
                                    <Date dateString={date} />
                                </small>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}
