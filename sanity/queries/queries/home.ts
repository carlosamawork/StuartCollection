import { groq } from 'next-sanity'
import { client } from '..'
import { seo } from '../fragments/seo'
import {image} from '../fragments/image'

export async function getHome() {
    return client.fetch(
        groq`*[_type == "home"][0]{
                modules[]{
                    _type == 'hero.home' => {
                        _type,
                        subtitle,
                        image{
                            ${image},
                        },
                        videoUrl,
                        ctaButton{
                            title,
                            url,
                            newWindow
                        }
                    },
                    _type == 'module.featuredSlider' => {
                        _type,
                        title,
                        slides[]{
                            title,
                            subtitle,
                            description,
                            image{
                                ${image},
                            },
                            link{
                                href,
                                blank
                            }
                        }
                    },
                    _type == 'module.collection' => {
                        _type,
                        title,
                        titleLink{
                            href,
                            blank
                        },
                        subtitle,
                        description,
                        featuredArtwork->{
                            title,
                            slug{
                                current
                            },
                            featuredImage{
                                ${image}
                            },
                            body
                        }
                    },
                    _type == 'module.press' => {
                        _type,
                        title,
                        cta{
                           label,
                           href,
                           blank 
                        },
                        items[]->{
                            title,
                            publication,
                            image{
                                ${image}
                            },
                            url
                        },
                        options{
                            columnsDesktop
                        }
                    },
                    _type == 'module.visit' => {
                        _type,
                        title,
                        meta,
                        body,
                        media {
                            type,
                            internalVideo{
                                thumbnail{
                                    ${image}
                                },
                                videoUrl,
                                title
                            },
                            externalVideoUrl,
                            image{
                                ${image}
                            },
                            caption
                        },
                        cta{
                            title,
                            url,
                            newWindow
                        }
                    },
                    _type == 'module.support' => {
                        _type,
                        title,
                        description,
                        cta{
                            title,
                            url,
                            newWindow
                        },
                        image{
                            ${image}
                        },
                        cards[]{
                            title,
                            description,
                            link{
                                label,
                                href,
                                blank
                            }
                        }
                    },
                    _type == 'module.announcement' => {
                        _type,
                        title,
                        subtitle
                    }
                }
                   
            }`
    )
}

export async function getHomeSEO() {
    return client.fetch(
        groq`*[_type == "home"][0]{
                 seo{
                    ${seo}
                }
            }`
    )
}