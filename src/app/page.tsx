import TextPressure from '../components/TextPressure'

export default function Home() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-black px-4 text-white'>
      <div
        className='flex flex-col items-center justify-center space-y-12'
        style={{ width: '100%', height: '100vh' }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            flex: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TextPressure
            alpha={false}
            flex={true}
            italic={true}
            minFontSize={36}
            stroke={false}
            strokeColor='#ff0000'
            text='Monocode'
            textColor='#ffffff'
            weight={true}
            width={true}
          />
        </div>
        <div className='mb-4 animate-fade-in text-center'>
          <h2 className='mb-2 animate-pulse font-light text-gray-300 text-xl md:text-xl'>
            Coming Soon
          </h2>
          <a
            aria-label='LinkedIn da Monocode'
            className='inline-flex h-12 w-12 items-center justify-center text-gray-400 transition-colors duration-300 hover:scale-110 hover:text-white'
            href='https://www.linkedin.com/in/vandersonarruda/'
            rel='noopener noreferrer'
            target='_blank'
          >
            <svg
              className='h-8 w-8'
              fill='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <title>LinkedIn</title>
              <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
            </svg>
          </a>
        </div>
      </div>
    </main>
  )
}
