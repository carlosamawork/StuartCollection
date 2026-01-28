// Rich text annotations used in the block content editor
import annotationLinkEmail from './annotations/linkEmail'
import annotationLinkExternal from './annotations/linkExternal'
import annotationLinkInternal from './annotations/linkInternal'

const annotations = [
  annotationLinkEmail,
  annotationLinkExternal,
  annotationLinkInternal,
]

// Document types
import page from './documents/page'
import person from './documents/team'
import pressArticle from './documents/press'
import artwork from './documents/artwork'

const documents = [ page, person, pressArticle, artwork]

// Singleton document types
import home from './singletons/home'
import settings from './singletons/settings'

const singletons = [home, settings]

// Block content
import body from './blocks/bodytitles'
import bodyparagraphs from './blocks/bodyparagraphs'
import bodycaption from './blocks/bodycaption'

const blocks = [body, bodyparagraphs, bodycaption]

// Object types
import footer from './objects/global/footer'
import linkExternal from './objects/global/linkExternal'
import linkInternal from './objects/global/linkInternal'
import linkSocial from './objects/global/linkSocial'
import ctaButton from './objects/global/ctaButton'

// Home
import visit from './objects/module/home/visit'
import collection from './objects/module/home/collection'
import support from './objects/module/home/support'
import featuredSlider from './objects/module/home/featuredSlider'
import heroHome from './objects/module/home/hero'
import press from './objects/module/home/press'
import announcement from './objects/module/home/announcement'

import links from './objects/global/links'
import notFoundPage from './objects/global/notFoundPage'
import heroPage from './objects/hero/page'
import menu from './objects/global/menu'
import seo from './objects/seo/seo'
import seoHome from './objects/seo/home'
import seoPage from './objects/seo/page'
import seoDescription from './objects/seo/description'
import video from './objects/module/general/video'
import category from './taxonomies/categories'

import accordeon from './objects/module/general/accordeon'
import tabs from './objects/module/general/tabs'
import section from './objects/module/general/section'
import jumbotron from './objects/module/general/jumbotron'
import image from './objects/module/general/image'
import slider from './objects/module/general/slider'
import separator from './objects/module/general/separator'
import twoColumns from './objects/module/general/twocolumns'
import tileGroup from './objects/module/general/tileGroup'
import mediaList from './objects/module/general/mediaList'
import textParagraphs from './objects/module/general/textParagraphs'
import textTitles from './objects/module/general/textTitles'
import callout from './objects/module/general/callout'
import people from './objects/module/general/people'
import iframe from './objects/module/general/iframe'


const objects = [
  footer,
  links,
  linkExternal,
  linkInternal,
  linkSocial,
  notFoundPage,
  heroHome,
  heroPage,
  menu,
  seo,
  seoHome,
  seoPage,
  seoDescription,
  category,
  video,
  accordeon,
  tabs,
  section,
  jumbotron,
  image,
  slider,
  separator,
  twoColumns,
  tileGroup,
  mediaList,
  visit,
  collection,
  support,
  featuredSlider,
  press,
  ctaButton,
  announcement,
  textParagraphs,
  textTitles,
  callout,
  people,
  iframe,
]

export const schemaTypes = [...annotations, ...singletons, ...objects, ...blocks, ...documents]
