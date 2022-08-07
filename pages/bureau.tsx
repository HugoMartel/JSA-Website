import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from '../styles/utils.module.css'

export default function Bureau() {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <h2 className={utilStyles.headingLg}>Composition du bureau 2021/2022 :</h2>
                <ul style={{ listStyle: "none", padding: 0, width:"50%", margin: "auto" }}>
                    <li className={utilStyles.memberContainer}>
                        <img className={utilStyles.memberImg} src="/images/membres/ThibaultWARTEL.jpg" alt="Photo President"/>
                        <p style={{ paddingLeft: "10px" }}>
                            Thibault WARTEL - Pr&eacute;sident
                        </p>
                    </li>
                    <hr className={utilStyles.memberHr}/>
                    <li className={utilStyles.memberContainer}>
                        <p style={{ paddingRight: "10px" }}>
                            Alex DESBONNET - Vice Pr&eacute;sident
                        </p>
                        <img className={utilStyles.memberImg} src="/images/membres/AlexDESBONNET.jpg" alt="Photo Vice-President"/>
                    </li>
                    <hr className={utilStyles.memberHr}/>
                    <li className={utilStyles.memberContainer}>
                        <img className={utilStyles.memberImg} src="/images/membres/HugoMARTEL.jpg" alt="Photo Tresorier"/>
                        <p style={{ paddingLeft: "10px" }}>
                            Hugo MARTEL - Tr&eacute;sorier
                        </p>
                    </li>
                    <hr className={utilStyles.memberHr}/>
                    <li className={utilStyles.memberContainer}>
                        <p style={{ paddingRight: "10px" }}>
                            Maxence DUCOULOMBIER - Secr&eacute;taire
                        </p>
                        <img className={utilStyles.memberImg} src="/images/membres/MaxenceDUCOULOMBIER.jpg" alt="Photo Secretaire"/>
                    </li>
                    <hr className={utilStyles.memberHr}/>
                    <li className={utilStyles.memberContainer}>
                        <img className={utilStyles.memberImg} src="/images/membres/NicolasBOIZARD.jpg" alt="Photo Communication"/>
                        <p style={{ paddingLeft: "10px" }}>
                            Nicolas BOIZARD - Communication
                        </p>
                    </li>
                    <hr className={utilStyles.memberHr}/>
                    <li className={utilStyles.memberContainer}>
                        <p style={{ paddingRight: "10px" }}>
                            Adrien BEAUMONT - &Eacute;v&eacute;nements
                        </p>
                        <img className={utilStyles.memberImg} src="/images/membres/AdrienBEAUMONT.jpg" alt="Photo Evenements"/>
                    </li>
                </ul>
            </section>
        </Layout>
    )
}
