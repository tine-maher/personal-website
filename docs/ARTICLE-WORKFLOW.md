# Article Publishing Workflow

## Where to write articles

Create or edit article files in:

- `public/articles/<your-slug>/index.html`

Example:

- `public/articles/why-you-should-not-trust-ai-companies-and-llms/index.html`

## Required metadata (SEO + social)

Inside each article page, keep these tags updated:

- `<title>`
- `<meta name="description" ...>`
- `<link rel="canonical" ...>`
- Open Graph tags (`og:title`, `og:description`, `og:type`, `og:url`)
- JSON-LD `Article` schema

## Tables and simple formatting

Yes, you can add simple tables directly in HTML:

```html
<div class="table-wrap">
  <table>
    <thead>
      <tr><th>Column A</th><th>Column B</th></tr>
    </thead>
    <tbody>
      <tr><td>Value 1</td><td>Value 2</td></tr>
    </tbody>
  </table>
</div>
```

The shared article styling file already supports this:

- `public/styles/content.css`

## Add a new article to homepage list

1. Add the new article link in `index.html` under the article list.
2. Add/update the JSON-LD `ItemList` in `index.html`.
3. (Optional) Add a tag label in the right-side tag list.
