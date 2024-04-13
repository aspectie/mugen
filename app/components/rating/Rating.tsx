import { useRef, useState } from 'react'
import { CloseIcon, StarIcon } from '@/assets/icons'
import styles from './rating.module.scss'
import classNames from 'classnames'
import Button from '@/ui/button/Button'
import { ButtonJustify, ButtonType, FieldSize, Space } from '@/types/ui'

const formatValue = (value: number) => {
  return value > 0 && value < 10 ? value.toFixed(1) : value
}
// TODO: fix types
export default function Rating(props: any) {
  const { fractions = 2, totalSymbols = 10, direction = 'toRight' } = props

  const [isOpened, setIsOpened] = useState(false)
  const [score, setScore] = useState(null)

  const toggleIsOpened = () => {
    setIsOpened(!isOpened)
  }
  const onStarClick = (_score: any) => {
    setIsOpened(false)
    setScore(_score)
  }
  const onRemoveScore = (event: any) => {
    event.stopPropagation()
    setScore(null)
  }

  return (
    <div
      className={styles.rating}
      onClick={toggleIsOpened}
    >
      {isOpened ? (
        <Interactive
          fractions={fractions}
          totalSymbols={totalSymbols}
          direction={direction}
          onClick={onStarClick}
          onChange={(_score: any) => setScore(_score)}
          score={score || 0}
        />
      ) : (
        <Button
          type={ButtonType.transparent}
          size={FieldSize.smallest}
          gap={Space.s}
          justify={ButtonJustify.between}
          prefix={
            <Star
              isFilled={Boolean(score)}
              isHalf={false}
              score={score || 0}
            />
          }
          suffix={
            score && (
              <CloseIcon
                onClick={event => onRemoveScore(event)}
                className={styles.rating__remove}
              />
            )
          }
        >
          <>
            {score ? (
              <h3>{formatValue(score)}</h3>
            ) : (
              <h5 className={styles.rating__title}>Ваша оценка</h5>
            )}
          </>
        </Button>
      )}
    </div>
  )
}

function Interactive({
  fractions,
  totalSymbols,
  direction,
  onClick,
  onChange,
  score
}: {
  fractions: any
  totalSymbols: any
  direction: any
  onClick: any
  onChange: any
  score: number
}) {
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
    onChange(value)
  }

  const starNodes = []
  for (let i = 0; i < 10; i++) {
    const isFilled = score > i
    const isHalf = score > i && score < i + 1

    starNodes.push(
      <Star
        onMouseMove={(event: any) => onMouseMove(event, i)}
        key={i}
        isFilled={isFilled}
        isHalf={isHalf}
        score={score}
      />
    )
  }
  return (
    <>
      <div
        className={styles.rating__stars}
        onClick={() => onClick(score)}
      >
        {starNodes}
      </div>
      <div className="min-w-2xl">
        <h3 className={styles.rating__score}>{formatValue(score)}</h3>
      </div>
    </>
  )
}

function Star({
  isFilled,
  isHalf,
  score,
  onMouseMove
}: {
  isFilled: boolean
  isHalf: boolean
  score: number
  onMouseMove?: any
}) {
  const levels = [0, 2, 4, 6, 8]

  const getLevelByScore = (score: number) => {
    let res = 0
    levels.forEach((level, index) => {
      if (score > level) {
        if (!levels[index + 1] || score <= levels[index + 1]) {
          res = level
        }
      }
    })
    return res
  }
  const level = getLevelByScore(score)

  const starLayerClasses = classNames(styles.star__layer, {
    [styles['star__layer--hidden']]: !isFilled,
    [styles['star__layer--half']]: isHalf,
    [styles[`star__layer--level-${level}`]]: isFilled
  })

  return (
    <label
      className={styles.star}
      onMouseMove={onMouseMove}
    >
      <span className={starLayerClasses}>
        <StarIcon />
      </span>
      <StarIcon className={styles.star__background} />
    </label>
  )
}
