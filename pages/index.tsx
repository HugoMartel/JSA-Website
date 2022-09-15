import Head from 'next/head'
import Layout, { siteDesc, siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { fetchAllPosts, getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetServerSideProps, GetStaticProps } from 'next'


export default function Home({
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
    <Layout home index>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p style={{textAlign: "center"}}>Astronomie, A&eacute;ronautique et Espace !</p>
        <p style={{textAlign: "justify"}}>{siteDesc}</p>
        <iframe frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1535.512213345058!2d3.0486395583453834!3d50.6339978685771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2d578da129f7d%3A0xd134d73fb7f4c699!2sJunia%20Isen%20Lille!5e1!3m2!1sen!2sfr!4v1659191670698!5m2!1sen!2sfr"
          height="300"
          style={{ border: "1px solid black", width: "100%" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}> R&eacute;seaux Sociaux</h2>
        <a className={utilStyles.social_link} aria-label="JSA sur Instagram" target="_blank" rel="noreferrer"
          href="https://www.instagram.com/junia_space_association/" title="Instagram">
          <svg id="insta-logo" className={utilStyles.social_svg} width="40" data-name="Logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            fill="#000">
            <path
              d="M21.94,7.88a7.59,7.59,0,0,0-.46-2.43,4.85,4.85,0,0,0-1.16-1.77,4.85,4.85,0,0,0-1.77-1.16,7.59,7.59,0,0,0-2.43-.46C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.59,7.59,0,0,0-2.43.46A4.85,4.85,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.85,4.85,0,0,0,1.77,1.16,7.59,7.59,0,0,0,2.43.46C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.59,7.59,0,0,0,2.43-.46,5.19,5.19,0,0,0,2.93-2.93,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.33,3.33,0,0,1-1.9,1.9,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.61,5.61,0,0,1,6.1,19.8a3.33,3.33,0,0,1-1.9-1.9A5.61,5.61,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.61,5.61,0,0,1,4.2,6.1,3.33,3.33,0,0,1,6.1,4.2,5.61,5.61,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34,3.33,3.33,0,0,1,1.9,1.9A5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16Z" />
            <path
              d="M12,6.86A5.14,5.14,0,1,0,17.14,12,5.14,5.14,0,0,0,12,6.86Zm0,8.47A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z" />
            <path d="M17.34,5.46a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Z" />
          </svg>
        </a>
        <a className={utilStyles.social_link} aria-label="JSA sur YouTube" target="_blank" rel="noreferrer" href="https://www.youtube.com/channel/UCgF89fGVIMb0FKMkZOQTfHg"
          title="YouTube">
          <svg id="youtube-logo" className={utilStyles.social_svg} data-name="Logo" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24" fill="#000">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z" />
          </svg>
        </a>
        <a className={utilStyles.social_link} aria-label="JSA sur Facebook" target="_blank" rel="noreferrer"
          href="https://www.facebook.com/assoJSA/" title="Facebook">
          <svg id="facebook-logo" className={utilStyles.social_svg} data-name="Logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000">
            <path
              d="M22.06,11.987a10.061,10.061,0,1,0-11.633,9.939V14.9H7.872V11.987h2.555V9.771a3.551,3.551,0,0,1,3.8-3.915,15.427,15.427,0,0,1,2.252.2V8.529H15.211a1.454,1.454,0,0,0-1.64,1.571v1.887h2.791L15.915,14.9H13.571v7.03A10.064,10.064,0,0,0,22.06,11.987Z" />
          </svg>
        </a>
        <a className={utilStyles.social_link} aria-label="Contacter JSA par mail" target="_blank" rel="noreferrer"
          href="mailto:juniaspaceasso@gmail.com" title="Mail">
          <svg id="send-mail-logo" className={utilStyles.social_svg} data-name="Logo" xmlns="http://www.w3.org/2000/svg" fill="#000" viewBox="0 0 32 32">
            <g data-name="20-Email-Write">
              <path d="M29 3H3a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h13v-2H3a1 1 0 0 1-1-1V6.23l13.42 9.58a1 1 0 0 0 1.16 0L30 6.23V15h2V6a3 3 0 0 0-3-3zM16 13.77 3.72 5h24.56z"/>
              <path d="M26 15h-4a1 1 0 0 0-1 1v10a1 1 0 0 0 .29.71l2 2a1 1 0 0 0 1.41 0l2-2A1 1 0 0 0 27 26V16a1 1 0 0 0-1-1zm-1 10.59-1 1-1-1V21h2z"/>
            </g>
          </svg>
        </a>
        <h2 className={utilStyles.headingLg}>Pages utiles</h2>
        <div style={{ "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-around" }}>
          <Link href='/bureau' style={{ "color": "#3f2a56" }}>
            Bureau
          </Link>
          <a href='https://www.junia.com/' target={"_blank"} rel="noreferrer">
            <img src='/images/JUNIA-LOGO.png' height={"80px"} alt="JUNIA" />
          </a>
          <Link href='/projets' style={{ "color": "#3f2a56" }}>
            Projets
          </Link>
        </div>

        <h2 className={utilStyles.headingLg}>Actualit&eacute;s</h2>
        <ul className={utilStyles.list}>
          {allPostsData.slice(0,5).map(({ id, date, title, img }) => (
            <li className={utilStyles.listItem} key={id}>
              <img height={"65px"} src={"https://web-storage-jsa.s3.eu-west-3.amazonaws.com/affiches/"+img} alt={id} />
              <div style={{paddingLeft: "10px"}}>
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
        <Link href="/posts">
            <a>Toutes les actualit&eacute;s →</a>
          </Link>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const allPostsData = await getSortedPostsData();

  return {
    props: {
      allPostsData
    }
  }
}
