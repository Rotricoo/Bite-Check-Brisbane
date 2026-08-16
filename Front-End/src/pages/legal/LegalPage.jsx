import { Link } from "react-router-dom";
import "./LegalPage.scss";

const legalPages = {
  privacy: {
    eyebrow: "Privacy policy",
    title: "Privacy Policy",
    intro:
      "Bite Check Brisbane is an academic student project created by Rodrigo Souza and Henrique Alves for the Web Development unit with Dr. Zia Loni, on the Bachelor of Information Technology at Victoria University - Brisbane Campus. This privacy policy explains how we handle personal information collected through the website.",
    sections: [
      {
        title: "What we collect",
        text: "The contact form may collect a visitor name, email address, subject, and message so the form can demonstrate a working database connection.",
      },
      {
        title: "How we use it",
        text: "Submitted contact details are used only for testing, assessment, and project demonstration. They are not used for marketing or shared with third parties.",
      },
      {
        title: "Project context",
        text: "This website is built for learning React, PHP, MySQL, responsive design, and basic full-stack workflows. Any sample restaurant content is used for demonstration purposes and all the images, videos and text are either created by the students or sourced from free-to-use stock media from the Unsplash.",
      },
    ],
  },
  terms: {
    eyebrow: "Terms of use",
    title: "Terms of Use",
    intro: "These terms explain how Bite Check Brisbane should be understood as a university portfolio and assessment project.",
    sections: [
      {
        title: "Educational purpose",
        text: "The site is provided as a student-built web development project and should not be treated as a professional restaurant publication or commercial service.",
      },
      {
        title: "Review content",
        text: "Reviews, ratings, prices, and restaurant details may include sample or demonstration content while the project is being developed and assessed.",
      },
      {
        title: "External links",
        text: "Where external restaurant or social links are included, they are provided for convenience. Bite Check Brisbane is not responsible for external website content.",
      },
    ],
  },
  accessibility: {
    eyebrow: "Accessibility",
    title: "Accessibility Statement",
    intro: "Bite Check Brisbane aims to be usable, readable, and responsive across desktop, tablet, and mobile screens.",
    sections: [
      {
        title: "What we considered",
        text: "The project includes responsive layouts, readable text sizes, image alt text, semantic page structure, and form labels where practical.",
      },
      {
        title: "Known limitations",
        text: "As this is a student project, some accessibility improvements may still be ongoing, especially as new content and backend features are added.",
      },
      {
        title: "Feedback",
        text: "Visitors can use the contact page to report accessibility issues or suggest improvements for future versions of the project.",
      },
    ],
  },
};

function LegalPage({ page }) {
  const content = legalPages[page];

  return (
    <main className="legal-page">
      <Link className="legal-page__back-link" to="/">
        ← Back to Home
      </Link>

      <section className="legal-page__hero">
        <p className="legal-page__eyebrow">{content.eyebrow}</p>
        <h1 className="legal-page__title">{content.title}</h1>
        <p className="legal-page__intro">{content.intro}</p>
      </section>

      <section className="legal-page__content">
        {content.sections.map((section) => (
          <article className="legal-page__section" key={section.title}>
            <h2 className="legal-page__section-title">{section.title}</h2>
            <p className="legal-page__section-text">{section.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default LegalPage;
