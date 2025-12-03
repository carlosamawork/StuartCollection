import { PortableTextComponents } from "@portabletext/react";


export const portableBlockComponents = (): PortableTextComponents => {
  return {
    block: {
        default: ({ children }) => <p >{children}</p>,
        normal: ({ children }) => <p >{children}</p>,
        h1: ({ children }) => <h1>{children}</h1>,
        h2: ({ children }) => <h2>{children}</h2>,
        h3: ({ children }) => <h3>{children}</h3>,
        h4: ({ children }) => <h4>{children}</h4>,
        h5: ({ children }) => <h5>{children}</h5>,
        h6: ({ children }) => <h6>{children}</h6>,
    },
    marks: {
      strong: ({ children }) => <strong>{children}</strong>,
      left: ({children}) => <span style={{textAlign: 'left'}}>{children}</span>,
      center: ({children}) => <span style={{textAlign: 'center'}}>{children}</span>,
      right: ({children}) => <span style={{textAlign: 'right'}}>{children}</span>,
      justify: ({children}) => <span style={{textAlign: 'justify'}}>{children}</span>,
      link: ({ value, children }:any) => {
        const { href } = value;
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      },
      annotationLinkExternal: ({value, children}) => {
        const {href, newWindow} = value
        return (
          <a href={href} target={newWindow ? "_blank" : "_self"} rel="noopener noreferrer">
            {children}
          </a>
        )
      },
      annotationLinkEmail: ({value, children}) => {
        const {email} = value
        let mailtoLink = `mailto:${email}`
        return (
          <a href={mailtoLink} rel="noopener noreferrer">
            {children}
          </a>
        )
      },
      annotationLinkPhone: ({value, children}) => {
        const {phone} = value
        let phoneLink = `tel:${phone}`
        return (
          <a href={phoneLink} rel="noopener noreferrer">
            {children}
          </a>
        )
      },
    },
    list: {
      bullet: ({ children }) => (
        <ul style={{ marginLeft: "calc(var(--margin) / 2)" }}>
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol style={{ marginLeft: "calc(var(--margin) / 2)" }}>
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li style={{ listStyle: "disc" }}>{children}</li>,
      number: ({ children }) => <li style={{ listStyle: "decimal" }}>{children}</li>,
    },
  };
};