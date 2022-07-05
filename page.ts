import MarkdownIt from "https://esm.sh/markdown-it@13"
import mathjax from "https://esm.sh/markdown-it-mathjax@4"
import anchor from "https://esm.sh/markdown-it-anchor@8"
import footnote from "https://esm.sh/markdown-it-footnote@3"
import highlightjs from "https://esm.sh/markdown-it-highlightjs@4"
import wikilinks from "https://esm.sh/markdownit-it-wikilinks@1"

const markdownIt = MarkdownIt()
    .use(mathjax)
    .use(anchor)
    .use(footnote)
    .use(highlightjs)
    .use(wikilinks)

import * as MediaType from "https://deno.land/x/media_types@v2.3.7/mod.ts";
import * as Eta from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as Yaml  from "https://deno.land/std@0.114.0/encoding/yaml.ts";
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

const { pathname: dirname } = new URL('.', import.meta.url)

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url)
  const relativePathname = dirname + pathname.slice(1)
  try {
    const blob = await Deno.readFile(relativePathname)
    const contentType = MediaType.lookup(relativePathname) ?? 'text/plain'
    const options = { headers: { 'content-type': contentType } }
    return new Response(blob, options)
  } catch {
    try {
      const text = await Deno.readTextFile(relativePathname + '.md')
      const yaml = text.replace(/----+/, '').replace(/----+[\s\S]*/, '')
      const header = Yaml.parse(yaml) as Record<string, unknown> 
      try {
        const layout = await Deno.readTextFile(dirname + header.layout + '.ejs')
        const markdown = text.replace(/----+[\s\S]+?----+/, '')
        const content = markdownIt.render(markdown) 
        const html = await Eta.render(layout, { ...header, content })
        const options = { headers: { 'content-type': 'text/html' } }
        return new Response(html as string, options )
      } catch (err) {
        return new Response('', { status: 500 })
      }
    } catch {
      return new Response('', { status: 404 })
    }
  }
}

serve(handleRequest)