import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from '../styles/utils.module.css'

export default function Error404() {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <h2 className={utilStyles.headingLg}>Erreur 404</h2>
                <p>Je pense que vous êtes perdu... Revenir à l&apos;accueil ou en arrière peut-être une bonne idée !</p>
            </section>
        </Layout >
    )
}
