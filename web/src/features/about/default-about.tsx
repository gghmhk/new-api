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
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { ProjectSourceNotice } from '@/components/project-source-notice'
import { useSystemConfig } from '@/hooks/use-system-config'

export function DefaultAbout() {
  const { t } = useTranslation()
  const { systemName } = useSystemConfig()

  return (
    <article className='mx-auto max-w-3xl px-5 pt-28 pb-16 md:px-8 md:pt-36'>
      <p className='text-xs font-semibold tracking-[0.18em] text-[#6e4e1e] uppercase dark:text-[#e4c98a]'>
        {t('About')}
      </p>
      <h1 className='mt-3 text-3xl leading-tight font-semibold tracking-tight [overflow-wrap:anywhere] break-words md:text-4xl'>
        {systemName}
      </h1>
      <div className='mt-6 space-y-4 text-sm leading-7 text-[#3e4a5c] dark:text-[#d5ccbf]'>
        <p>
          {t(
            'This is a personal API gateway for clients the administrator chooses. It is not a model vendor. Model lists, balances, and prices come only from settings an administrator saves.'
          )}
        </p>
        <p>
          {t(
            'This deployment changes the default presentation of New API. It does not change the project name, the license, or the upstream source.'
          )}
        </p>
        <p>
          <Link to='/guide' className='underline underline-offset-4'>
            {t('Read the guide')}
          </Link>
        </p>
      </div>
      <section className='mt-10' aria-labelledby='source-license-title'>
        <h2 id='source-license-title' className='text-base font-medium'>
          {t('Source and license')}
        </h2>
        <ProjectSourceNotice className='mt-3' />
        <p className='text-muted-foreground mt-3 text-sm leading-6'>
          {t('| Based on')}{' '}
          <a
            href='https://github.com/songquanpeng/one-api'
            target='_blank'
            rel='noopener noreferrer'
            className='underline underline-offset-4'
          >
            {t('One API')}
          </a>{' '}
          © 2023{' '}
          <a
            href='https://github.com/songquanpeng'
            target='_blank'
            rel='noopener noreferrer'
            className='underline underline-offset-4'
          >
            {t('JustSong')}
          </a>
        </p>
      </section>
    </article>
  )
}
