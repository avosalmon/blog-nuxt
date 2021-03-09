import MarkdownIt from 'markdown-it'
import MarkdownItLinkAttributes from 'markdown-it-link-attributes'
import MarkdownItTaskCheckbox from 'markdown-it-task-checkbox'

const config = {
  html: true, // Enable HTML tags in source
  breaks: true, // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be useful for external highlighters.
  linkify: true, // Autoconvert URL-like text to links
}

export default ({ app }, inject) => {
  const md = new MarkdownIt(config)
    .use(MarkdownItLinkAttributes, {
      attrs: { target: '_blank', rel: 'noopener' },
    })
    .use(MarkdownItTaskCheckbox)

  inject('md', md)
}
