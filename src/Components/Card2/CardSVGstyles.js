


const getSVGStyle = (defaults, { ipad = {}, laptop = {}, large = {}, extraLarge = {} }) => (matchMedia) => {
  if (matchMedia('(min-width: 1400px)').matches) {
    return { ...defaults,  ...ipad, ...laptop, ...large, ...extraLarge }
  }
  if (matchMedia('(min-width: 992px)').matches) {
    return { ...defaults,  ...ipad,  ...laptop, ...large }
  }
  if (matchMedia('(min-width: 750px)').matches) {
    return { ...defaults, ...ipad, ...laptop }
  }
  if (matchMedia('(min-width:461px)').matches) {
    return { ...defaults, ...ipad }
  }
  if (matchMedia('(min-width:261px)').matches) {
    return defaults
  }

}

