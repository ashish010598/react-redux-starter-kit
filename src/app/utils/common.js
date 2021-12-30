import EventManager from './event-manager.service';

export const showLoader = (show) => {
  EventManager.publish('loader', show);
};

export const setMetaTags = (data) => {
  if (data) {
    const title = document.querySelector('title');
    title.innerHTML = data.title ? data.title : '';
    const keywordsTag = document.querySelector('meta[name="keywords"]');
    setTagsAttribute(keywordsTag, 'content', data.keywords || '');

    const descriptionTag = document.querySelector('meta[name="description"]');
    setTagsAttribute(descriptionTag, 'content', data.desc || '');

    const canonicalTag = document.querySelector('link[rel="canonical"]');
    setTagsAttribute(canonicalTag, 'href', data.canonical || '');

    const ogUrlTag = document.querySelector('meta[property="og:url"]');
    setTagsAttribute(ogUrlTag, 'content', data.ogUrl || '');

    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    setTagsAttribute(ogTitleTag, 'content', data.ogTitle || '');

    const ogImageTag = document.querySelector('meta[property="og:image"]');
    setTagsAttribute(ogImageTag, 'content', data.ogTitleImage || '');

    const ogSiteNameTag = document.querySelector(
      'meta[property="og:site_name"]',
    );
    setTagsAttribute(ogSiteNameTag, 'content', data.ogSiteName || '');

    const ogDesc = document.querySelector('meta[property="og:description"]');
    setTagsAttribute(ogDesc, 'content', data.ogDesc || '');
  }
};

function setTagsAttribute(htmlElement, property, value) {
  if (htmlElement) {
    htmlElement.setAttribute(property, value);
  }
}

export const throwException = (err) => {
  throw err;
};
