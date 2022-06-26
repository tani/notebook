export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:file:beforeParse', (file) => {
    if (file._id.endsWith('md')) {
      file.body = file.body.replace(/```mermaid([\s\S]*?)```/g, '<mermaid>$1</mermaid>')
    }
  })
})
