import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from '../styles/utils.module.css'

export default function Projets() {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <h2 className={utilStyles.headingLg}>Projets :</h2>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    <li className={utilStyles.memberContainer}>
                        <div className={utilStyles.projectDiv}>
                            <p style={{ paddingLeft: "10px" }}>
                                Organisation de conf&eacute;rences
                            </p>
                            <p style={{ paddingRight: "10px", textAlign: "justify" }}><small>
                                Depuis 3 ans, nous organisons des cycles de conférence sur l&apos;astronomie avec le
                                 Dr. <a target={"_blank"} rel="noreferrer" href="https://www.youtube.com/watch?v=4Sa14WhPk78">Vivien Scottez</a> (matière noire,
                                 énergie sombre, trous noirs) mais aussi sur l&apos;aérospatiale avec <a target={"_blank"} rel="noreferrer" href="https://www.youtube.com/watch?v=Cdz9ZeUxLaU">Jacques Dupé</a> ou
                                 encore <a target={"_blank"} rel="noreferrer" href="https://www.youtube.com/watch?v=SaSoEtZ1eY0">Eric Bottlaender</a> !
                            </small></p>
                        </div>
                        <img className={utilStyles.projectImg} src="/images/projets/conferences.jpg" alt="Image Conferences"/>
                    </li>
                    <hr className={utilStyles.memberHr} />
                    <li className={utilStyles.memberContainer}>
                        <img className={utilStyles.projectImg} src="/images/projets/cafe_astro.jpg" alt="Image Cafe Astro"/>
                        <div className={utilStyles.projectDiv}>
                            <p style={{ paddingLeft: "20px" }}>
                                Ap&eacute;ros/Caf&eacute;s Astro
                            </p>
                            <p style={{ paddingLeft: "10px", textAlign: "justify" }}><small>
                                Discussions en petit commité sur l&apos;actualité scientifique (Prix nobels, James Webb...) ou certaines notions d&apos;astronomie
                                (Fond Diffus Cosmologique, constante de Hubble...) !
                            </small></p>
                        </div>
                    </li>
                    <hr className={utilStyles.memberHr} />
                    <li className={utilStyles.memberContainer}>
                        <div className={utilStyles.projectDiv}>
                            <p style={{ paddingLeft: "10px" }}>
                                Ballon Stratosph&eacute;rique
                            </p>
                            <p style={{ paddingRight: "10px", textAlign: "justify" }}><small>
                                Nous avons aussi comme objectif de réaliser des projets techniques comme un drone les années précédentes et un ballon
                                stratosphérique ces deux dernières années en collaboration avec l&apos;association <a target={"_blank"} rel="noreferrer" href="https://www.aran59.fr/lassociation-bhaf-ballons-haute-altitude-france/">Ballons Haute Altitude France</a>
                            </small></p>
                        </div>
                        <img className={utilStyles.projectImg} src="/images/projets/ballon.jpg" alt="Image Ballon"/>
                    </li>
                    <hr className={utilStyles.memberHr} />
                    <li className={utilStyles.memberContainer}>
                        <img className={utilStyles.projectImg} src="/images/projets/bourget.jpg" alt="Image Bourget"/>
                        <div className={utilStyles.projectDiv}>
                            <p style={{ paddingLeft: "20px" }}>
                                Visites
                            </p>
                            <p style={{ paddingLeft: "10px", textAlign: "justify" }}><small>
                                L&apos;association organisait des visites de tours de contrôle ou d&apos;aérodromes. Avec les mesures sanitaires s&apos;assouplissant
                                nous avons pu visiter le musée de l&apos;air et de l&apos;espace du Bourget.
                            </small></p>
                        </div>
                    </li>
                    <hr className={utilStyles.memberHr} />
                    <li className={utilStyles.memberContainer}>
                        <div className={utilStyles.projectDiv}>
                            <p style={{ paddingLeft: "10px" }}>
                                Fête de la Science
                            </p>
                            <p style={{ paddingRight: "10px", textAlign: "justify" }}><small>
                                Réalisations d&apos;affiches présentant les téléscopes Euclide et James Webb, les prix nobels de physique 2019/2020 et le rover Perseverance !
                            </small></p>
                        </div>
                        <img className={utilStyles.projectImg} src="/images/projets/fds.jpg" alt="Image Fete Science"/>
                    </li>
                    <hr className={utilStyles.memberHr} />
                    <li className={utilStyles.memberContainer}>
                        <img className={utilStyles.projectImg} src="/images/projets/idees.jpg" alt="Image Idees"/>
                        <div className={utilStyles.projectDiv}>
                            <p style={{ paddingLeft: "20px" }}>
                                Proposez-nous vos id&eacute;es !
                            </p>
                            <p style={{ paddingLeft: "10px", textAlign: "justify" }}><small>
                                N&apos;hésitez pas à nous envoyer une message sur les réseaux ou à venir nous voir lors de nos événements ou portes ouvertes de JUNIA !
                            </small></p>
                        </div>
                    </li>
                </ul>
            </section>
        </Layout >
    )
}
