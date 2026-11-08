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

import { PublicLayout } from '@/components/layout'
import { Footer } from '@/components/layout/components/footer'
import { ProjectSourceNotice } from '@/components/project-source-notice'
import { RegistrationPolicyNote } from '@/features/auth/components/registration-policy-note'
import { AccessGuide } from '@/features/portal/access-guide'
import { useStatus } from '@/hooks/use-status'

export function Guide() {
  const { t } = useTranslation()
  const { status } = useStatus()

  return (
    <PublicLayout className='portal-sanctuary' showMainContainer={false}>
      <article className='px-5 pt-28 pb-8 md:px-8 md:pt-36'>
        <div className='mx-auto max-w-3xl'>
          <p className='text-xs font-semibold tracking-[0.18em] text-[#6e4e1e] uppercase dark:text-[#e4c98a]'>
            {t('Guide')}
          </p>
          <h1 className='mt-3 text-3xl leading-tight font-semibold tracking-tight [overflow-wrap:anywhere] break-words md:text-4xl'>
            {t('Using this gateway')}
          </h1>
          <p className='mt-4 text-sm leading-6 text-[#3e4a5c] dark:text-[#d5ccbf]'>
            {t(
              'These steps use the existing console. They do not add a private header, change the account system, or publish a price.'
            )}
          </p>
          <ol className='mt-8 space-y-4'>
            <li className='bg-card text-card-foreground rounded-xl p-5 ring-1 ring-[#1a2332]/10 dark:ring-white/10'>
              <p className='text-xs font-semibold tracking-[0.14em] text-[#6e4e1e] uppercase dark:text-[#e4c98a]'>
                1
              </p>
              <h2 className='mt-2 text-base font-medium'>{t('Accounts')}</h2>
              <p className='text-muted-foreground mt-2 text-sm leading-6'>
                {t(
                  'Sign in with an account an administrator has created. Creating one or two ordinary accounts is an administrator action and is not done by this page.'
                )}
              </p>
            </li>
            <li className='bg-card text-card-foreground rounded-xl p-5 ring-1 ring-[#1a2332]/10 dark:ring-white/10'>
              <p className='text-xs font-semibold tracking-[0.14em] text-[#6e4e1e] uppercase dark:text-[#e4c98a]'>
                2
              </p>
              <h2 className='mt-2 text-base font-medium'>{t('API keys')}</h2>
              <p className='text-muted-foreground mt-2 text-sm leading-6'>
                {t(
                  'Open Keys and create an API key. Copy it into the client. The key stays a normal bearer token.'
                )}
              </p>
            </li>
            <li className='bg-card text-card-foreground rounded-xl p-5 ring-1 ring-[#1a2332]/10 dark:ring-white/10'>
              <p className='text-xs font-semibold tracking-[0.14em] text-[#6e4e1e] uppercase dark:text-[#e4c98a]'>
                3
              </p>
              <h2 className='mt-2 text-base font-medium'>
                {t('Request paths')}
              </h2>
              <p className='text-muted-foreground mt-2 text-sm leading-6'>
                {t(
                  'Point the client at this site. Chat, responses, streaming, and tool calls keep the standard paths below.'
                )}
              </p>
            </li>
            <li className='bg-card text-card-foreground rounded-xl p-5 ring-1 ring-[#1a2332]/10 dark:ring-white/10'>
              <p className='text-xs font-semibold tracking-[0.14em] text-[#6e4e1e] uppercase dark:text-[#e4c98a]'>
                4
              </p>
              <h2 className='mt-2 text-base font-medium'>{t('Channels')}</h2>
              <p className='text-muted-foreground mt-2 text-sm leading-6'>
                {t(
                  'A request can succeed only after an administrator adds an upstream channel. An empty channel list means there is nowhere to forward yet.'
                )}
              </p>
            </li>
          </ol>
          <div className='mt-6 flex flex-wrap gap-4 text-sm'>
            <Link to='/sign-in' className='underline underline-offset-4'>
              {t('Sign in')}
            </Link>
            <Link to='/keys' className='underline underline-offset-4'>
              {t('Open Keys')}
            </Link>
            <Link to='/about' className='underline underline-offset-4'>
              {t('About')}
            </Link>
          </div>
          <RegistrationPolicyNote
            status={status}
            className='mt-6 text-[#3e4a5c] dark:text-[#d5ccbf]'
          />
        </div>
      </article>
      <AccessGuide />
      <div className='mx-auto max-w-3xl px-5 pb-12 md:px-8'>
        <ProjectSourceNotice />
      </div>
      <Footer />
    </PublicLayout>
  )
}
