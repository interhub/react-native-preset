/**
 get shadow state for layout style
 */
export default function getShadow(size = 1, shadowColor = '#000000') {
  return {
    elevation: size * 2,
    shadowRadius: size * 2,
    shadowColor,
    shadowOpacity: size / 5,
    shadowOffset: {height: 1, width: 0},
    textShadowColor: shadowColor,
    textShadowRadius: 0,
    textShadowOffset: {width: 2, height: 2},
  };
}
