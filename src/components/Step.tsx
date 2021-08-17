import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4, 3),
    marginTop: theme.spacing(3),
    minHeight: 165,
    width: '100%',

    '&.step--completed': {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(1),
      minHeight: 'auto',
      padding: theme.spacing(2, 3),
    },

    '&.step--final': {
      '& .MuiTypography-h5': {
        fontSize: '2.125rem',
      },
    },
  },
  button: {
    minWidth: 160,
    width: '100%',
  },
}))

type TOption = {
  nextId: number
  value: number | string | boolean
  text: string
}

type StepProps = {
  step: {
    id?: number
    name: string
    text: string
    uiType?: 'button'
    valueType?: 'number' | 'string' | 'boolean'
    valueOptions?: TOption[]
    valueChoice?: TOption
  }
  isCompleted?: boolean
  isFinal?: boolean
  onButtonClick?: (option: TOption) => void
}

const Step = ({ step, isCompleted, isFinal, onButtonClick }: StepProps) => {
  const classes = useStyles()

  return (
    <Paper
      id={`step-${step.name}`}
      className={`${classes.root} ${isCompleted ? 'step--completed' : ''} ${isFinal ? 'step--final' : ''}`}
      elevation={isCompleted ? 1 : 2}
    >
      <Typography variant="h5" component="h3" align="center">
        {step.text}
      </Typography>

      {step.uiType === 'button' && (
        <Box mt={isCompleted ? 1 : 4}>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            {step.valueOptions?.map((option, index) => (
              <Grid key={index} item xs={12} md={6}>
                {isCompleted ? (
                  <Button
                    className={classes.button}
                    color="primary"
                    disabled={option !== step.valueChoice}
                    disableRipple
                    style={{ backgroundColor: 'transparent', cursor: 'default' }}
                  >
                    {option.text}
                  </Button>
                ) : (
                  <Button
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    data-testid={`button-${step.name}-${option.text}`}
                    onClick={() => {
                      if (onButtonClick) {
                        onButtonClick(option)
                      }
                    }}
                  >
                    {option.text}
                  </Button>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Paper>
  )
}

export default Step
