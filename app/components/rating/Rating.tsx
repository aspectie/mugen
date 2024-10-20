import {
  MouseEvent,
  TouchEvent,
  MouseEventHandler,
  useState,
  useRef
} from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { ButtonJustify, ButtonType, FieldSize, Space } from '@/types/ui'

import { useOutsideClick } from '@/hooks/useOutsideClick'
import { CloseIcon, StarIcon } from '@/assets/icons'
import styles from './rating.module.scss'

import { Button } from 'shared/ui'

type TDirection = 'toRight' | 'toLeft'
type TRatingProps = {
  fractions?: number
  totalSymbols?: number
  direction?: TDirection
}

const formatValue = (value: number) => {
  return value > 0 && value < 10 ? value.toFixed(1) : value
}

export default function Rating(props: TRatingProps) {
  const { fractions = 2, totalSymbols = 10, direction = 'toRight' } = props

  const [isOpened, setIsOpened] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const ratingRef = useRef(null)
  const { t } = useTranslation()

  const toggleIsOpened = () => {
    setIsOpened(!isOpened)
  }
  const onRemoveScore = (event: MouseEvent) => {
    event.stopPropagation()
    setScore(null)
  }

  useOutsideClick(ratingRef, () => setIsOpened(false))

  return (
    <div
      className={styles.rating}
      onClick={toggleIsOpened}
      ref={ratingRef}
    >
      {isOpened ? (
        <Interactive
          fractions={fractions}
          totalSymbols={totalSymbols}
          direction={direction}
          onChange={(_score: number) => setScore(_score)}
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
              <h5 className={styles.rating__title}>{t('your score')}</h5>
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
  onChange,
  score
}: {
  fractions: number
  totalSymbols: number
  direction: TDirection
  onChange: (value: number) => void
  score: number
}) {
  const calculateValue = (
    event: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>,
    index: number
  ) => {
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

  const calculateHoverPercentage = (
    event: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>
  ) => {
    const clientX =
      event.nativeEvent.type.indexOf('touch') > -1
        ? event.nativeEvent.type.indexOf('touchend') > -1
          ? (event as TouchEvent).changedTouches[0].clientX
          : (event as TouchEvent).touches[0].clientX
        : (event as MouseEvent).clientX

    const targetRect = (event.target as HTMLElement).getBoundingClientRect()
    const delta =
      direction === 'toLeft'
        ? targetRect.right - clientX
        : clientX - targetRect.left

    return delta < 0 ? 0 : delta / targetRect.width
  }

  const onScoreChange = (
    event: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>,
    index: number
  ) => {
    const value = calculateValue(event, index)
    onChange(value)
  }

  const starNodes = []
  for (let i = 0; i < 10; i++) {
    const isFilled = score > i
    const isHalf = score > i && score < i + 1

    starNodes.push(
      <Star
        onChange={(event: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) =>
          onScoreChange(event, i)
        }
        key={i}
        isFilled={isFilled}
        isHalf={isHalf}
        score={score}
      />
    )
  }
  return (
    <>
      <div className={styles.rating__stars}>{starNodes}</div>
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
  onChange
}: {
  isFilled: boolean
  isHalf: boolean
  score: number
  onChange?: MouseEventHandler<HTMLLabelElement>
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
      onMouseMove={onChange}
      onClick={onChange}
    >
      <span className={starLayerClasses}>
        <StarIcon />
      </span>
      <StarIcon className={styles.star__background} />
    </label>
  )
}
