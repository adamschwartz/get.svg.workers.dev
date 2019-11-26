addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const params = new URL(request.url).searchParams

  const size = params.get('size') || params.get('s')
  const stroke = params.get('stroke')
  const fill = params.get('fill') || params.get('f') || (stroke ? 'transparent' : '')
  const height = size ? size : (params.get('height') || params.get('h'))
  const width = size ? size : (params.get('width') || params.get('w'))

  const svg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  width="${ width }"
  height="${ height }"
  viewBox="0 0 ${ width } ${ height }">
  ${ (!fill && !stroke) ? '' :
    '<rect width="' + width + '" height="' + height + '"' +
      (!fill ? '' : ' fill="' + fill + '"') +
      (!stroke ? '' : ' stroke="' + stroke + '"') +
    '></rect>'
  }
</svg>`

  if (url.pathname === '/' || url.pathname === '') {
    return new Response(svg, {
      headers: { 'content-type': 'image/svg+xml' }
    })
  }

  return new Response('Not found', { status: 404 })
}
