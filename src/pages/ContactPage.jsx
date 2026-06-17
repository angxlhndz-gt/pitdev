import Contact from '../components/Contact.jsx';
import PageHero from '../components/PageHero.jsx';
import useScrollAnimations from '../hooks/useScrollAnimations.js';

export default function ContactPage({ content }) {
  useScrollAnimations();

  return (
    <>
      <PageHero eyebrow={content.contactPage.eyebrow} title={content.contactPage.title}>
        {content.contactPage.description}
      </PageHero>
      <Contact content={content} showHeader={false} />
    </>
  );
}
