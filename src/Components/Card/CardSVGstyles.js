const elipse3 = {
  zIndex: 0,
  position: "absolute",
  top: "10%",
  left: "30%",
  width: "174px",
  height: "179px",
  opacity: 0.48,
  filter: "blur(25px)",
}

const elipse3Laptop = {
  width: "368px",
  height: "369px",
  // left: "20%",
}

const elipse4 = {
  zIndex: 0,
  position: "absolute",
  top: "10%",
  left: "30%",
  width: "174px",
  height: "179px",
  opacity: 0.48,
  filter: "blur(25px)",
}

const elipse4Laptop = {
  width: "268px",
  height: "269px",
  left: "0%",
}

const arrow = {
  height: "2rem",
  width: "2rem",
  margin: "auto",
  zIndex: 5,
  transform: "rotate(90deg)"
}

const arrowLaptop = {
  height: "4rem",
  width: "4rem",
  transform: "rotate(0)"
}

const sideDots1 = {
  height: "5rem",
  width: "2.5rem",
  zIndex: 5,
  position: "absolute",
  top: "75%",
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
  top: "25%",

}

const sideDots2Laptop = {
  height: "8rem",
  width: "4rem",
  top: "inherit",

}

const rareIcon ={
  zIndex: 5,
  height: "2.5rem",
  left: "Calc(100% - 12vw)",
  top: "-10px",
  position: "absolute",
  transform: "skewX(-3deg)",
}

const rareIconLaptop = {
  left: "Calc(100% - 5vw)",
}

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

export const getSVGStyleElipse3 = getSVGStyle(elipse3, { laptop: elipse3Laptop, large: elipse3Laptop, extraLarge: elipse3Laptop })

export const getSVGStyleElipse4 = getSVGStyle(elipse4, { laptop: elipse4Laptop, large: elipse4Laptop, extraLarge: elipse4Laptop })

export const getSVGStyleArrow = getSVGStyle(arrow, { laptop: arrowLaptop, large: arrowLaptop, extraLarge: arrowLaptop })

export const getSVGStyleSideDots1 = getSVGStyle(sideDots1, { laptop: sideDots1Laptop, large: sideDots1Laptop, extraLarge: sideDots1Laptop })

export const getSVGStyleSideDots2 = getSVGStyle(sideDots2, { laptop: sideDots2Laptop, large: sideDots2Laptop, extraLarge: sideDots2Laptop })

export const getRareIconStyle = getSVGStyle(rareIcon, { laptop:rareIconLaptop})