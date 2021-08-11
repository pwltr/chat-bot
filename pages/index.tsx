// @refresh reset

import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import type { InferGetServerSidePropsType } from 'next'

type TOption = {
  nextId: number
  value: number | string | boolean
  text: string
}

type TStep = {
  id: number
  name: string
  text: string
  uiType: 'button'
  valueType: 'number' | 'string' | 'boolean'
  valueOptions: TOption[]
}

// TODO: move this to .env
const FLOWDATA_URL = 'https://raw.githubusercontent.com/mzronek/task/main/flow.json'
const API_URL = 'https://virtserver.swaggerhub.com/L8475/task/1.0.0/conversation'

export const getServerSideProps = async () => {
  const res = await fetch(FLOWDATA_URL)
  const steps: TStep[] = await res.json()

  return {
    props: { steps },
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    paddingTop: theme.spacing(10),
  },
  content: {
    width: '100%',
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4, 3),
    minHeight: 165,
    width: '100%',
  },
  button: {
    minWidth: 160,
    width: '100%',
  },
  footer: {
    borderTop: '1px solid #eaeaea',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    padding: theme.spacing(4, 2, 6, 2),
    width: '100%',
  },
}))

export default function Home({ steps }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const classes = useStyles()

  const [activeStep, setActiveStep] = useState<TStep>(steps[0])
  const [isFinished, setIsFinished] = useState(false)

  const handleNext = (option: TOption) => {
    if (option.nextId) {
      const nextStep = steps.find((step) => step.id === option.nextId)

      if (nextStep) {
        sendAnswer(activeStep, option)
        setActiveStep(nextStep)
      }
    } else {
      setIsFinished(true)
    }
  }

  const sendAnswer = (step: TStep, option: TOption) => {
    fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: step.name, value: option.value }),
    })
  }

  return (
    <>
      <Head>
        <title>Chat Bot</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className={classes.root} maxWidth="sm" component="main">
        <Typography variant="h1" component="h1">
          Hallo,
        </Typography>

        <Box my={10} className={classes.content}>
          {isFinished ? (
            <Paper id="step-final" className={classes.step} elevation={2}>
              <Typography variant="h4" component="h2" align="center">
                Herzlichen Dank für Ihre Angaben!
              </Typography>
            </Paper>
          ) : (
            <Paper id={`step-${activeStep.name}`} className={classes.step} elevation={2}>
              <Typography variant="h5" component="h3" align="center">
                {activeStep.text}
              </Typography>

              <Box mt={4}>
                {activeStep.uiType === 'button' && (
                  <Grid container spacing={3} justifyContent="center" alignItems="center">
                    {activeStep.valueOptions.map((option, index) => (
                      <Grid key={index} item xs={12} md={6}>
                        <Button
                          className={classes.button}
                          variant="contained"
                          color="primary"
                          onClick={() => handleNext(option)}
                        >
                          {option.text}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            </Paper>
          )}
        </Box>

        <Box className={classes.footer} component="footer" mt={14}>
          <Image src="/zurich-logo-desktop.svg" alt="Zurich Logo" width={150} height={70} />
        </Box>

        {/* <Box my={4}>
          <Typography variant="inherit" component="code">
            {JSON.stringify(steps, null)}
          </Typography>
        </Box> */}
      </Container>
    </>
  )
}
