const createLinks = (
  list: string[],
  fragment: DocumentFragment | HTMLElement
) => {
  return list.map((src: string) => {
    return new Promise<HTMLLinkElement>(resolve => {
      const link = document.createElement('link')
      link.href = src
      link.onload = () => resolve()

      fragment.appendChild(link)
    })
  })
}

const createScripts = (
  list: string[],
  fragment: DocumentFragment | HTMLElement
) => {
  return list.map((src: string) => {
    return new Promise<HTMLScriptElement>(resolve => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => resolve()

      fragment.appendChild(script)
    })
  })
}

export const appendResourceToHeadElement = async (
  css?: string[],
  js?: string[]
) => {
  const tasks = () => {
    let list: Promise<HTMLLinkElement | HTMLScriptElement>[] = []
    const fragment = document.createDocumentFragment()

    if (css) {
      list = list.concat(createLinks(css, fragment))
    }

    if (js) {
      list = list.concat(createScripts(js, fragment))
    }

    document.head.appendChild(fragment)

    return list
  }

  await Promise.all(tasks())
}

export const appendResourceToBodyElement = async (js?: string[]) => {
  const tasks = () => {
    let list: Promise<HTMLLinkElement | HTMLScriptElement>[] = []
    const fragment = document.createDocumentFragment()

    if (js) {
      list = list.concat(createScripts(js, fragment))
    }

    document.body.appendChild(fragment)

    return list
  }

  await Promise.all(tasks())
}
