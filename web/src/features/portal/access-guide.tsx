/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useTranslation } from 'react-i18next'

import { CopyButton } from '@/components/copy-button'

function siteOrigin(): string {
  if (typeof window === 'undefined') return ''
  return window.location.origin
}

export function AccessGuide() {
  const { t } = useTranslation()
  const origin = siteOrigin()
  const baseUrl = origin || t('This site')
  const chatPath = `${baseUrl}/v1/chat/completions`
  const responsesPath = `${baseUrl}/v1/responses`

  return (
    <section
      className='px-5 py-14 md:px-8'
      aria-labelledby='access-guide-title'
    >
      <div className='mx-auto max-w-5xl min-w-0'>
        <h2
          id='access-guide-title'
          className='text-xl font-semibold tracking-tight'
        >
          {t('How a client connects')}
        </h2>
        <p className='mt-3 max-w-2xl text-sm leading-6 text-[#3e4a5c] dark:text-[#d5ccbf]'>
          {t(
            'Use this site address as the API base URL and a bearer API key. Phone apps use the same address and key.'
          )}
        </p>
        <div className='mt-6 grid gap-4 md:grid-cols-2'>
          <article className='bg-card text-card-foreground rounded-xl p-4 ring-1 ring-[#1a2332]/10 dark:ring-white/10'>
            <h3 className='text-sm font-medium'>{t('API base URL')}</h3>
            <div className='mt-3 flex items-start gap-2'>
              <code className='min-w-0 flex-1 text-sm break-all'>
                {baseUrl}
              </code>
              {origin ? (
                <CopyButton
                  value={origin}
                  aria-label={t('Copy API base URL')}
                />
              ) : null}
            </div>
          </article>
          <article className='bg-card text-card-foreground rounded-xl p-4 ring-1 ring-[#1a2332]/10 dark:ring-white/10'>
            <h3 className='text-sm font-medium'>{t('Authorization')}</h3>
            <p className='mt-3 text-sm break-all'>
              {t('Bearer token from an API key created in the console')}
            </p>
          </article>
        </div>
        <div className='mt-4 max-w-full min-w-0 overflow-x-auto rounded-xl bg-[#162033] text-[#f6f1e6]'>
          <p className='border-b border-white/10 px-4 py-2 text-xs tracking-wide text-[#e4c98a]'>
            {t('Request paths')}
          </p>
          <div className='space-y-3 px-4 py-4 font-mono text-sm leading-6'>
            <p>
              <span className='text-[#e4c98a]'>POST</span>
              <br />
              <span className='break-words'>{chatPath.replaceAll('/', '/\u200b')}</span>
            </p>
            <p>
              <span className='text-[#e4c98a]'>POST</span>
              <br />
              <span className='break-words'>
                {responsesPath.replaceAll('/', '/\u200b')}
              </span>
            </p>
          </div>
        </div>
        <p className='mt-4 max-w-2xl text-sm leading-6 text-[#3e4a5c] dark:text-[#d5ccbf]'>
          {t('Chat, responses, streaming, and tool calls use these paths.')}
        </p>
      </div>
    </section>
  )
}
