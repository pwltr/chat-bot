import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Image from 'next/image'
import { color } from '@styles/theme'

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: `1px solid ${color.monochrome[100]}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    padding: theme.spacing(4, 2, 6, 2),
    width: '100%',
  },
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root} component="footer">
      <Image src="/zurich-logo-desktop.svg" alt="Zurich Logo" width={150} height={70} />
    </Box>
  )
}

export default Footer
