import MarkdownIt from "https://esm.sh/markdown-it@13"
import mathjax from "https://esm.sh/markdown-it-mathjax3@4?bundle"
import anchor from "https://esm.sh/markdown-it-anchor@8?bundle"
import footnote from "https://esm.sh/markdown-it-footnote@3?bundle"
import highlightjs from "https://esm.sh/markdown-it-highlightjs@4?bundle"
import wikilinks from "https://esm.sh/markdown-it-wikilinks@1?bundle"

import * as MediaType from "https://deno.land/x/media_types@v2.3.7/mod.ts";
import * as Yaml  from "https://deno.land/std@0.114.0/encoding/yaml.ts";
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { compile } from "https://pax.deno.dev/tani/deno-template"

const markdownIt = MarkdownIt()
    .use(mathjax)
    .use(anchor)
    .use(footnote)
    .use(highlightjs)
    .use(wikilinks)

const { pathname: dirname } = new URL('.', import.meta.url)

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url)
  let relativePathname = dirname + pathname.slice(1)
  if (relativePathname === dirname) {
    relativePathname = dirname + 'index.html'
  }
  try {
    const blob = await Deno.readFile(relativePathname)
    const contentType = MediaType.lookup(relativePathname) ?? 'text/plain'
    const options = { headers: { 'content-type': contentType } }
    return new Response(blob, options)
  } catch {
    try {
      const text = await Deno.readTextFile(relativePathname.replace(/\.html$/, '.md'))
      const yaml = text.replace(/---+/, '').replace(/---+[\s\S]*/, '')
      const header = Yaml.parse(yaml) as Record<string, unknown> 
      try {
        const layout = await Deno.readTextFile(dirname + header.layout + '.ejs')
        const markdown = text.replace(/---+[\s\S]+?---+/, '')
        const content = markdownIt.render(markdown) 
        const html = await compile(layout)({ ...header, content })
        const options = { headers: { 'content-type': 'text/html' } }
        return new Response(html as string, options )
      } catch (_) {
        return new Response('', { status: 500 })
      }
    } catch {
      return new Response('', { status: 404 })
    }
  }
}

serve(handleRequest)