/** @jsx jsx */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="deno.ns" />

import MarkdownIt from "https://esm.sh/markdown-it@12?bundle";
import mathjax from "https://esm.sh/markdown-it-mathjax3@4?bundle";
import anchor from "https://esm.sh/markdown-it-anchor@8?bundle";
import footnote from "https://esm.sh/markdown-it-footnote@3?bundle";
import highlightjs from "https://esm.sh/markdown-it-highlightjs@4?bundle";
import wikilinks from "https://esm.sh/markdown-it-wikilinks@1?bundle";
import frontmatter from "http://esm.sh/markdown-it-front-matter@0.2.3?bundle";
import YAML from "https://esm.sh/yaml@2?bundle"

import { serve } from "https://deno.land/std@0.147.0/http/server.ts";
import { Hono, jsx, serveStatic } from "https://deno.land/x/hono@v1.6.4/mod.ts";

function Layout(props: { children?: string, meta: Record<string, string | undefined> }) {
  return (
    `<!doctype html>` +
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={props.meta.description} />
        <title>Notebook/ {props.meta.title}</title>
        {/* https://freesvg.org/cup-of-coffee-black-and-white-vector */}
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
        <link rel="stylesheet" href="/assets/github.css" />
        <link rel="stylesheet" href="/assets/sakura.css" />
      </head>
      <body>
        <h1><a href="/">Notebook</a>/ {props.meta.title}</h1>
        <hr />
        {props.children}
      </body>
    </html>
  );
}

const app = new Hono();
app.get("/", (c) => (c.redirect("/index.html")));
app.get("/:filename{\\w+\\.html}", async (c) => {
  let meta: Record<string, string> = {}
  const markdownIt = MarkdownIt()
    .use(mathjax)
    .use(anchor)
    .use(footnote)
    .use(highlightjs)
    .use(wikilinks)
    .use(frontmatter, (fm: string) => { 
      meta = YAML.parse(fm)
    });
  const filename = c.req.param("filename").replace(/\.html$/, ".md");
  const markdown = await Deno.readTextFile(new URL(filename, import.meta.url));
  const html = markdownIt.render(markdown);
  return c.html(
    <Layout meta={meta}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>,
  );
});
app.get("/*", serveStatic({ root: '.' }));

serve((req) => app.fetch(req));
