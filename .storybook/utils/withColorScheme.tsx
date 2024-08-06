//TODO: Remove any types
export function withColorScheme(Story: any, context: any) {
  let { scheme } = context.globals

  function Flex(props: any) {
    return (
      <div
        {...props}
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '2rem 0 2rem',
          ...props
        }}
      />
    )
  }

  if (scheme === 'light') {
    return (
      <Flex className={'page light'}>
        <Story />
      </Flex>
    )
  }

  if (scheme === 'dark') {
    return (
      <Flex className={'page dark'}>
        <Story />
      </Flex>
    )
  }

  return (
    <div>
      <Flex className={'page dark'}>
        <Story />
      </Flex>
      <Flex className={'page light'}>
        <Story />
      </Flex>
    </div>
  )
}
