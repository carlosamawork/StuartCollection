import { image } from "../../fragments/image";

export const peopleQuery = `
    listOfPeople[]->{
        name,
        role,
        "slug": slug.current,
        featuredImage{
            ${image}
        },
        body
    }
`
    