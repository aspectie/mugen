import { useTranslation } from 'react-i18next'

import { TGetAnimeData } from 'shared/.server'

export function Information({
  info
}: {
  info: NonNullable<
    Pick<NonNullable<Awaited<ReturnType<TGetAnimeData>>>, 'info'>['info']
  >
}) {
  const { t } = useTranslation(['default'])

  return (
    <>
      <h4 className="font-bold mb-m text-black-80">
        {t('info', { ns: 'default' })}
      </h4>
      <ul className="lg:w-2/3 xl:w-2/3">
        {info.map((el, index) => (
          <li
            key={index}
            className="flex mb-s "
          >
            <span className="w-2/6 mr-xs bg-gray-40 py-xs px-s capitalize ">
              {el.title}
            </span>
            <span className="w-full mr-xs bg-gray-40 py-xs px-s capitalize">
              {el.value}
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}
