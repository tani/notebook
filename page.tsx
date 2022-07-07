import MarkdownIt from "https://esm.sh/markdown-it@13";
import mathjax from "https://esm.sh/markdown-it-mathjax3@4?bundle";
import anchor from "https://esm.sh/markdown-it-anchor@8?bundle";
import footnote from "https://esm.sh/markdown-it-footnote@3?bundle";
import highlightjs from "https://esm.sh/markdown-it-highlightjs@4?bundle";
import wikilinks from "https://esm.sh/markdown-it-wikilinks@1?bundle";
import frontmatter from "http://esm.sh/markdown-it-front-matter@0.2.3?bundle";

import * as YAML from "https://deno.land/x/yaml@v2.1.1/src/index.ts"
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { Hono, jsx, serveStatic } from "https://deno.land/x/hono@v1.6.2/mod.ts";

function Layout(props: { children?: string, meta: Record<string, string | undefined> }) {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={props.meta.description} />
        <title>{props.meta.title}</title>
        <link rel="stylesheet" href="/assets/github.css" />
        <link rel="stylesheet" href="/assets/sakura.css" />
      </head>
      <body>
        {props.children}
      </body>
    </html>
  );
}

const app = new Hono();
app.get("/", (c) => (c.redirect("/docs/index.html")));
app.get("/assets/:filename", serveStatic({ root: "./" }));
app.get("/docs/:filename", async (c) => {
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
  const markdown = await Deno.readTextFile("./docs/" + filename);
  const html = markdownIt.render(markdown);
  return c.html(
    <Layout meta={meta}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>,
  );
});

serve((req) => app.fetch(req));
