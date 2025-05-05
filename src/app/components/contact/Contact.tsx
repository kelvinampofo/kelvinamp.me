import { Fragment } from "react";

import Heading from "../heading/Heading";

import styles from "./Contact.module.css";

const contactLinks = [
  {
    label: "Twitter",
    href: "https://x.com/_kelvinamp",
    ariaLabel: "twitter (X) profile",
  },
  {
    label: "GitHub",
    href: "https://github.com/kelvinampofo",
    ariaLabel: "github profile",
  },
  {
    label: "Are.na",
    href: "https://www.are.na/kelvin-ampofo/channels",
    ariaLabel: "are.na profile",
  },
  {
    label: "Email",
    href: "mailto:k@kelvinamp.me",
  },
];

export default function Contact() {
  return (
    <div data-animate data-delay="0.4s">
      <Heading as="h2" className={styles.contactListHeading}>
        Connect
      </Heading>
      <ul className={styles.contactList}>
        {contactLinks.map(({ label, href, ariaLabel }, index) => (
          <Fragment key={label}>
            <li>
              <a
                href={href}
                aria-label={ariaLabel}
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
