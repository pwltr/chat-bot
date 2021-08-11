import styled from 'styled-components'
import { motion, useSpring, useTransform } from 'framer-motion'
import { color } from '@src/theme'

const Wrapper = styled.div`
  background: ${color.monochrome};
  display: flex;
  height: 9px;
  width: 100%;
`

type ProgressBarProps = {
  percentage: number
}

const ProgressBar = ({ percentage, ...rest }: ProgressBarProps) => {
  const width = useSpring(percentage)
  const widthPercentage = useTransform(width, (value) => `${value}%`)

  width.set(percentage)

  return (
    <Wrapper {...rest}>
      <motion.div style={{ background: color.primary, width: widthPercentage }} />
    </Wrapper>
  )
}

export default ProgressBar
