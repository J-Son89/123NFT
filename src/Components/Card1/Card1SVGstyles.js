
const elipse1 = {
  zIndex: 0,
  position: "absolute",
  top: 0,
  left: 0,
  width: "268px",
  height: "269px",
  opacity: 0.78,
  filter: "blur(25px)",
}

const elipse1Laptop = {
  width: "468px",
  height: "469px",
  // left: "50%",

}

const elipse2 = {
  zIndex: 0,
  position: "absolute",
  top: 0,
  left: 0,
  width: "298px",
  height: "369px",
  opacity: 0.78,
  filter: "blur(25px)",
}

const elipse2Laptop = {
  width: "308px",
  height: "369px",
}

const swirlsStyle = {
  width: "20em",
  height: "16rem",
  zIndex: 0,
  position: "absolute",
  top: "10%",
  left: "10%",
}

const swirlsStyleIpad = {
  width: '18rem',
  height: '22rem',
  top: '5%',
  left: '26%'
}


const swirlsStyleLaptop = {
  width: "17rem",
  height: "16rem",
  top: '10%',
  left: '15%',
}

const arrow = {
  height: "2rem",
  width: "2rem",
  margin: "auto",
  zIndex: 5,
}

const arrowLaptop = {
  height: "4rem",
  width: "4rem",
}

const sideDots1 = {
  height: "5rem",
  width: "2.5rem",
  zIndex: 5,
  position: "absolute",
  top: "40%",
  left: "Calc(100% - 3rem)",
  float: "left",
}
const sideDots1Laptop = {
  height: "8rem",
  width: "4rem",
  left: "Calc(100% - 4.5rem)",

}

const sideDots2 = {
  height: "5rem",
  width: "3rem",
  zIndex: 5,
  position: "absolute",
  left: "12px",
  top: "10%",

}

const sideDots2Laptop = {
  height: "8rem",
  width: "4rem",
  top: "inherit",

}

const pumpkin =  {
  width: "11rem",
  height: "14rem",
  zIndex: 1,
  position: "absolute",
  top: "0%",
  left: "20%",
}

const pumpkinLaptop =  {
  width: "8rem",
  height: "11rem",
  left: "30%",
}

const pumpkinCat = {
  width: "4rem",
  height: "4rem",
  zIndex: 1,
  position: "absolute",
  // bottom: "5%",
  top: "75%",
  left: "25%",
}

const pumpkinCatLaptop = {
  width: "2rem",
  height: "2rem",
  top: "95%",
  left: "30%",
}

const penguin = {
  width: "2rem",
  height: "2rem",
  zIndex: 0,
  position: "absolute",
  top: "65%",
  left: "30%",
}

const penguinLaptop ={
  width: "1.5rem",
  height: "1.5rem",
  zIndex: 0,
  position: "absolute",
  top: "85%",
  left: "35%",
}

const pumpkinGhost = {
  width: "3rem",
  height: "3rem",
  zIndex: 1,
  position: "absolute",
  top: "15%",
  left: "60%",
}

// const getSVGStyle = (defaults, { ipad = {}, laptop = {}, large = {}, extraLarge = {} }) => (matchMedia) => {
//   if (matchMedia('(min-width:261px)').matches) {
//     return defaults
//   }

//   if (matchMedia('(min-width:461px)').matches) {
//     return { ...defaults, ...ipad }
//   }
//   if (matchMedia('(min-width: 750px)').matches) {
//     return { ...defaults, ...ipad, ...laptop }
//   }
//   if (matchMedia('(min-width: 992px)').matches) {
//     return { ...defaults,  ...ipad,  ...laptop, ...large }
//   }
//   if (matchMedia('(min-width: 1400px)').matches) {
//     return { ...defaults,  ...ipad, ...laptop, ...large, ...extraLarge }
//   }

// }

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

export const getSVGStyleElipse1 = getSVGStyle(elipse1, { laptop: elipse1Laptop, large: elipse1Laptop, extraLarge: elipse1Laptop })

export const getSVGStyleElipse2 = getSVGStyle(elipse2, { laptop: elipse2Laptop, large: elipse2Laptop, extraLarge: elipse2Laptop })

export const getSVGStyleSwirl = getSVGStyle(swirlsStyle, { ipad:swirlsStyleIpad, laptop:swirlsStyleLaptop})

export const getSVGStyleArrow = getSVGStyle(arrow, { laptop: arrowLaptop, large: arrowLaptop, extraLarge: arrowLaptop })

export const getSVGStyleSideDots1 = getSVGStyle(sideDots1, { laptop: sideDots1Laptop, large: sideDots1Laptop, extraLarge: sideDots1Laptop })

export const getSVGStyleSideDots2 = getSVGStyle(sideDots2, { laptop: sideDots2Laptop, large: sideDots2Laptop, extraLarge: sideDots2Laptop })

export const getSVGStylePumpkin = getSVGStyle(pumpkin, { laptop:pumpkinLaptop})

export const getSVGStylePumpkinCat = getSVGStyle(pumpkinCat, { laptop:pumpkinCatLaptop})

export const getSVGStylePenguin = getSVGStyle(penguin, { laptop:penguinLaptop})

export const getSVGStylePumpkinGhost = getSVGStyle(pumpkinGhost, { laptop:{}})

