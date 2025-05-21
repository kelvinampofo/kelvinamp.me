import { type CSSProperties, Fragment } from "react";

import Heading from "../heading/Heading";

import styles from "./Contact.module.css";

const contactLinks = [
  {
    label: "Twitter",
    href: "https://x.com/_kelvinamp",
  },
  {
    label: "GitHub",
    href: "https://github.com/kelvinampofo",
  },
  {
    label: "Email",
    href: "mailto:k@kelvinamp.me",
  },
];

export default function Contact() {
  return (
    <div data-animate style={{ "--stagger": "5" } as CSSProperties}>
      <Heading as="h2" className={styles.contactListHeading}>
        Connect
      </Heading>
      <ul
        className={styles.contactList}
        style={{ "--stagger": "2" } as CSSProperties}
      >
        {contactLinks.map(({ label, href }, index) => (
          <Fragment key={label}>
            <li>
              <a
                href={href}
                className="basic-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            </li>
            {index < contactLinks.length - 1 && (
              <span className={styles.dot} aria-hidden="true">
                &middot;
              </span>
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
