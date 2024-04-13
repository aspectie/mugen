import { useRef, useState } from 'react'
import { StarIcon } from '@/assets/icons'
import styles from './rating.module.scss'

const formatValue = (value: number) => {
  return value > 0 && value < 10 ? value.toFixed(1) : value
}

export default function Rating(props: any) {
  const { fractions = 2, totalSymbols = 10, direction = 'toRight' } = props

  const [isOpened, setIsOpened] = useState(false)
  const [score, setScore] = useState(null)
  const onLabelClick = (event: any) => {
    setIsOpened(!isOpened)
  }
  const onStarClick = _score => {
    setIsOpened(false)
    setScore(_score)
  }

  return (
    <div className={styles.rating}>
      {!isOpened ? (
        <Label
          onClick={onLabelClick}
          score={score}
        />
      ) : (
        <Interactive
          fractions={fractions}
          totalSymbols={totalSymbols}
          direction={direction}
          onClick={onStarClick}
        />
      )}
    </div>
  )
}

function Interactive({
  fractions,
  totalSymbols,
  direction,
  onClick
}: {
  fractions: any
  totalSymbols: any
  direction: any
  onClick: any
}) {
  const [score, setScore] = useState(0)

  const calculateValue = (index: any, event: any) => {
    const percentage = calculateHoverPercentage(event)
    const fraction = Math.ceil((percentage % 1) * fractions) / fractions
    const precision = 10 ** 3
    const displayValue =
      index +
      (Math.floor(percentage) + Math.floor(fraction * precision) / precision)

    // ensure the returned value is greater than 0 and lower than totalSymbols
    return displayValue > 0
      ? displayValue > totalSymbols
        ? totalSymbols
        : displayValue
      : 1 / fractions
  }

  const calculateHoverPercentage = (event: any) => {
    const clientX =
      event.nativeEvent.type.indexOf('touch') > -1
        ? event.nativeEvent.type.indexOf('touchend') > -1
          ? event.changedTouches[0].clientX
          : event.touches[0].clientX
        : event.clientX

    const targetRect = event.target.getBoundingClientRect()
    const delta =
      direction === 'toLeft'
        ? targetRect.right - clientX
        : clientX - targetRect.left

    return delta < 0 ? 0 : delta / targetRect.width
  }

  const onMouseMove = (event: any, index: any) => {
    const value = calculateValue(index, event)
    setScore(value)
  }

  const starNodes = []
  for (let i = 0; i < 10; i++) {
    starNodes.push(
      <StarIcon
        key={i}
        className={styles.rating__icon}
        onMouseMove={event => onMouseMove(event, i)}
        onClick={() => onClick(score)}
      />
    )
  }
  return (
    <>
      <div className={styles.rating__stars}>{starNodes}</div>
      <div className="min-w-[55px]">
        <h1 className={styles.rating__score}>{formatValue(score)}</h1>
      </div>
    </>
  )
}

function Label({ onClick, score }: { onClick: any; score: any }) {
  const title = useRef(null)

  return (
    <label
      ref={title}
      className={styles.label}
      onClick={onClick}
    >
      <StarIcon className={styles.label__icon} />
      {score ? (
        <h3 className={styles.label__score}>{formatValue(score)}</h3>
      ) : (
        <h5 className={styles.label__title}>Ваша оценка</h5>
      )}
    </label>
  )
}
