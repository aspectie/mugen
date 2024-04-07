import { useTranslation } from 'react-i18next'

export default function Player({ link }: { link: string }) {
  const { t } = useTranslation(['default'])

  return (
    <>
      <h4 className="font-bold text-black-80">
        {t('trailer', { ns: 'default' })}
      </h4>
      <iframe
        className="mt-m"
        key="12"
        src={link}
        width="100%"
        height="588px"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </>
  )
}
