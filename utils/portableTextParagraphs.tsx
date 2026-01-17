import { PortableTextComponents } from "@portabletext/react";

export const portableBodyComponents = (): PortableTextComponents => {
  return {
    block: {
      normal: ({ children }) => <p className="p">{children}</p>,

      pSmall: ({ children }) => (
        <p className="p-small">{children}</p>
      ),

      pMedium: ({ children }) => (
        <p className="p-medium">{children}</p>
      ),

      pLarge: ({ children }) => (
        <p className="p-large">{children}</p>
      ),

      pXlarge: ({ children }) => (
        <p className="p-xlarge">{children}</p>
      ),
    },

    marks: {
      strong: ({ children }) => <strong>{children}</strong>,
      em: ({ children }) => <em>{children}</em>,

      annotationLinkExternal: ({ value, children }) => {
        const { url, newWindow } = value;

        return (
          <a
            href={url}
            target={newWindow ? "_blank" : "_self"}
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      },

      annotationLinkEmail: ({ value, children }) => {
        const { email } = value;
        return (
          <a href={`mailto:${email}`}>
            {children}
          </a>
        );
      },
    },

    list: {
      bullet: ({ children }) => (
        <ul className="list-bullet">
          {children}
        </ul>
      ),
    },

    listItem: {
      bullet: ({ children }) => (
        <li>{children}</li>
      ),
    },

    types: {
      ctaButton: ({ value }) => {
        const { title, url, newWindow } = value;

        return (
          <a
            href={url}
            target={newWindow ? "_blank" : "_self"}
            className="cta-button"
            rel="noopener noreferrer"
          >
            {title}
          </a>
        );
      },
    },
  };
};