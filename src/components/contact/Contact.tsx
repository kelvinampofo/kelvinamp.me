import { Fragment } from "react";

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
    <div data-animate data-delay="400ms">
      <Heading as="h2" className={styles.contactListHeading}>
        Connect
      </Heading>
      <ul className={styles.contactList}>
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
              <li className={styles.dot} aria-hidden="true">
                &middot;
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
