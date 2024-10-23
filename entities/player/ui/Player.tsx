import { useTranslation } from 'react-i18next'

export function Player({ link }: { link: string }) {
  const { t } = useTranslation(['default'])

  return (
    <>
      <h4 className="font-bold text-black-80 text-center">
        {t('watch', { ns: 'default' })}
      </h4>
      <iframe
        className="mt-m aspect-video"
        key="12"
        src={link}
        width="100%"
        height="100%"
        title="video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </>
  )
}
