/**
 * Single source of truth for the structured data (schema.org JSON-LD)
 * describing Oliver Thylmann. Used on the homepage and on /about.
 *
 * Keep this consistent with LinkedIn, giantswarm.io and Wikidata:
 * Google only builds a knowledge panel when these sources agree.
 */

export const SITE = "https://thylmann.net";
export const PERSON_ID = `${SITE}/#person`;
export const GIANT_SWARM_ID = `${SITE}/#giantswarm`;

export const profiles = {
  linkedin: "https://www.linkedin.com/in/othylmann",
  x: "https://x.com/othylmann",
  medium: "https://medium.com/@othylmann",
  github: "https://github.com/othylmann",
  instagram: "https://www.instagram.com/othylmann/",
  giantSwarmAuthor: "https://giantswarm.io/blog/author/oliver-thylmann",
};

export const press = [
  {
    headline: "Microservice-Infrastruktur: Giant Swarm lässt mehr Entwickler ran",
    publisher: "Computerwoche",
    datePublished: "2014-12-04",
    url: "https://www.computerwoche.de/article/2704250/giant-swarm-laesst-mehr-entwickler-ran.html",
    inLanguage: "de",
  },
  {
    headline: "Wir ermöglichen es Entwicklern, sich auf ihr Produkt zu konzentrieren",
    publisher: "deutsche-startups.de",
    datePublished: "2014-12-03",
    url: "https://www.deutsche-startups.de/2014/12/03/entwickler-produkt-konzentrieren/",
    inLanguage: "de",
  },
  {
    headline: "Oliver Thylmann über die Kölner Gründerszene",
    publisher: "deutsche-startups.de",
    datePublished: "2014-04-20",
    url: "https://www.deutsche-startups.de/2014/04/20/oliver-thylmann-ueber-die-koelner-gruenderszene/",
    inLanguage: "de",
  },
  {
    headline: "Performance Marketing: Deutsche Post schluckt Adcloud",
    publisher: "Horizont",
    datePublished: "2011-04-04",
    url: "https://www.horizont.net/medien/nachrichten/-Performance-Marketing-Deutsche-Post-schluckt-Adcloud-99219",
    inLanguage: "de",
  },
];

const personRef = { "@id": PERSON_ID };

export const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Oliver Thylmann",
  givenName: "Oliver",
  familyName: "Thylmann",
  url: `${SITE}/`,
  mainEntityOfPage: `${SITE}/about/`,
  image: [
    `${SITE}/images/oliver-thylmann-portrait.jpg`,
    `${SITE}/images/oliver-thylmann-og.jpg`,
  ],
  description:
    "German serial entrepreneur based in Cologne and co-founder of Giant Swarm, a Kubernetes platform company. Previously co-founded Ormigo and adcloud (acquired by Deutsche Post DHL in 2011).",
  jobTitle: "Co-Founder & Co-CEO",
  worksFor: { "@id": GIANT_SWARM_ID },
  nationality: { "@type": "Country", name: "Germany" },
  homeLocation: {
    "@type": "Place",
    name: "Cologne, Germany",
    sameAs: "https://en.wikipedia.org/wiki/Cologne",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "RWTH Aachen University",
      sameAs: "https://en.wikipedia.org/wiki/RWTH_Aachen_University",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Open University Business School",
      sameAs: "https://en.wikipedia.org/wiki/Open_University",
    },
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "Diplom in Physics",
      recognizedBy: { "@type": "CollegeOrUniversity", name: "RWTH Aachen University" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "MBA",
      recognizedBy: { "@type": "CollegeOrUniversity", name: "Open University Business School" },
    },
  ],
  memberOf: [
    {
      "@type": "OrganizationRole",
      roleName: "Governing Board member (General Member Representative)",
      url: "https://neonephos.org/governing_board",
      memberOf: {
        "@type": "Organization",
        name: "NeoNephos Foundation",
        url: "https://neonephos.org/",
        parentOrganization: { "@type": "Organization", name: "Linux Foundation Europe" },
      },
    },
    { "@type": "Organization", name: "Cölner Club" },
  ],
  knowsAbout: [
    "Kubernetes",
    "Cloud-native infrastructure",
    "Platform engineering",
    "Open source",
    "Digital sovereignty",
    "Entrepreneurship",
    "Online advertising",
  ],
  knowsLanguage: ["de", "en", "fr"],
  sameAs: Object.values(profiles),
  subjectOf: press.map((p) => ({
    "@type": "NewsArticle",
    headline: p.headline,
    datePublished: p.datePublished,
    url: p.url,
    inLanguage: p.inLanguage,
    publisher: { "@type": "Organization", name: p.publisher },
  })),
};

/** Companies Oliver founded – each links back to him as founder. */
export const organizations = [
  {
    "@type": "Organization",
    "@id": GIANT_SWARM_ID,
    name: "Giant Swarm",
    legalName: "Giant Swarm GmbH",
    url: "https://giantswarm.io/",
    sameAs: ["https://github.com/giantswarm"],
    foundingDate: "2014",
    foundingLocation: { "@type": "Place", name: "Cologne, Germany" },
    founder: [
      personRef,
      { "@type": "Person", name: "Henning Lange" },
      { "@type": "Person", name: "Timo Derstappen" },
    ],
  },
  {
    "@type": "Organization",
    "@id": `${SITE}/#adcloud`,
    name: "adcloud",
    foundingDate: "2008",
    foundingLocation: { "@type": "Place", name: "Cologne, Germany" },
    founder: [personRef, { "@type": "Person", name: "Henning Lange" }],
    parentOrganization: {
      "@type": "Organization",
      name: "Deutsche Post DHL",
      sameAs: "https://en.wikipedia.org/wiki/DHL_Group",
    },
  },
  {
    "@type": "Organization",
    "@id": `${SITE}/#ormigo`,
    name: "Ormigo",
    legalName: "Ormigo GmbH",
    foundingDate: "2005",
    foundingLocation: { "@type": "Place", name: "Cologne, Germany" },
    founder: [personRef, { "@type": "Person", name: "Henning Lange" }],
  },
  {
    "@type": "Organization",
    "@id": `${SITE}/#statsnet`,
    name: "STATSnet",
    foundingDate: "1999",
    founder: personRef,
  },
];

export const podcast = {
  "@type": "PodcastSeries",
  "@id": `${SITE}/#dienerdshow`,
  name: "Die Nerd Show",
  url: "https://dienerdshow.de/",
  inLanguage: "de",
  startDate: "2020-10-30",
  sameAs: ["https://podcasts.apple.com/us/podcast/die-nerd-show/id1539169863"],
  actor: [
    personRef,
    { "@type": "Person", name: "Carlo Matic" },
    { "@type": "Person", name: "Manuel Koelman" },
    { "@type": "Person", name: "Sebastian Deutsch" },
  ],
};

export const website = {
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: `${SITE}/`,
  name: "Oliver Thylmann",
  inLanguage: "en",
  publisher: personRef,
  about: personRef,
};

export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [website, person],
  };
}

export function aboutSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE}/about/#profilepage`,
        url: `${SITE}/about/`,
        name: "About Oliver Thylmann",
        isPartOf: { "@id": `${SITE}/#website` },
        mainEntity: personRef,
        dateModified: new Date().toISOString().slice(0, 10),
      },
      website,
      person,
      ...organizations,
      podcast,
    ],
  };
}
