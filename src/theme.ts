import { createTheme } from '@material-ui/core/styles'

export const color = {
  primary: '#4066b3',
  secondary: '#337ab7',
  monochrome: '#DDDDDD',
}

const theme = createTheme({
  palette: {
    primary: {
      main: color.primary,
    },
  },
})

export default theme
