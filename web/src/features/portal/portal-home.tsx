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

import { Button } from '@/components/ui/button'
import { RegistrationPolicyNote } from '@/features/auth/components/registration-policy-note'
import { useStatus } from '@/hooks/use-status'
import { useSystemConfig } from '@/hooks/use-system-config'
import { isPublicRegistrationOffered } from '@/lib/registration-access'

import { AccessGuide } from './access-guide'

type PortalHomeProps = {
  isAuthenticated: boolean
}

export function PortalHome(props: PortalHomeProps) {
  const { t } = useTranslation()
  const { systemName, logo } = useSystemConfig()
  const { status } = useStatus()
  const registrationOffered = isPublicRegistrationOffered(status)

  let primaryAction = (
    <Button
      className='bg-[#162033] text-[#f6f1e6] hover:bg-[#162033]/90 dark:bg-[#e4c98a] dark:text-[#1a1408] dark:hover:bg-[#e4c98a]/90'
      render={<Link to='/sign-in' />}
    >
      {t('Sign in')}
    </Button>
  )
  if (props.isAuthenticated) {
    primaryAction = (
      <Button
        className='bg-[#162033] text-[#f6f1e6] hover:bg-[#162033]/90 dark:bg-[#e4c98a] dark:text-[#1a1408] dark:hover:bg-[#e4c98a]/90'
        render={<Link to='/dashboard' />}
      >
        {t('Go to Dashboard')}
      </Button>
    )
  }

  return (
    <div>
      <section className='px-5 pt-28 pb-8 md:px-8 md:pt-36'>
        <div className='mx-auto max-w-5xl'>
          <img
            src={logo}
            alt=''
            className='size-12 rounded-xl object-contain ring-1 ring-[#c4a15a]/80'
          />
          <p className='mt-8 text-xs font-semibold tracking-[0.18em] text-[#6e4e1e] uppercase dark:text-[#e4c98a]'>
            {t('Personal gateway')}
          </p>
          <span
            aria-hidden='true'
            className='mt-4 block h-px w-10 bg-[#b6893d]'
          />
          <h1 className='mt-4 max-w-4xl text-[clamp(2rem,6vw,3.4rem)] leading-[1.18] font-semibold tracking-tight [overflow-wrap:anywhere] break-words'>
            {systemName}
          </h1>
          <p className='mt-5 max-w-2xl text-base leading-7 text-[#3e4a5c] dark:text-[#d5ccbf]'>
            {t(
              'A private entrance for the API clients you choose. This site forwards requests only through channels an administrator configures. It is not a model vendor, and it does not claim that any model is online or publish an official price.'
            )}
          </p>
          <div className='mt-8 flex flex-wrap gap-3'>
            {primaryAction}
            {!props.isAuthenticated && registrationOffered ? (
              <Button variant='outline' render={<Link to='/sign-up' />}>
                {t('Sign up')}
              </Button>
            ) : null}
            <Button variant='outline' render={<Link to='/guide' />}>
              {t('Read the guide')}
            </Button>
            <Button variant='outline' render={<Link to='/about' />}>
              {t('About')}
            </Button>
          </div>
          <RegistrationPolicyNote
            status={status}
            showSignUpLink={false}
            className='mt-6 max-w-2xl text-[#3e4a5c] dark:text-[#d5ccbf]'
          />
        </div>
      </section>

      <section
        className='px-5 py-6 md:px-8'
        aria-labelledby='portal-next-title'
      >
        <div className='mx-auto grid max-w-5xl gap-4 md:grid-cols-3'>
          <article className='bg-card text-card-foreground rounded-xl p-5 ring-1 ring-[#1a2332]/10 dark:ring-white/10'>
            <h2 id='portal-next-title' className='text-base font-medium'>
              {t('Accounts')}
            </h2>
            <p className='text-muted-foreground mt-2 text-sm leading-6'>
              {t('Sign in to manage your own keys and usage.')}
            </p>
          </article>
          <article className='bg-card text-card-foreground rounded-xl p-5 ring-1 ring-[#1a2332]/10 dark:ring-white/10'>
            <h2 className='text-base font-medium'>{t('API keys')}</h2>
            <p className='text-muted-foreground mt-2 text-sm leading-6'>
              {t(
                'After signing in, open Keys and create an API key. Copy it into the client as a normal bearer token.'
              )}
            </p>
            {props.isAuthenticated ? (
              <Link
                to='/keys'
                className='mt-3 inline-block text-sm font-medium underline underline-offset-4'
              >
                {t('Open Keys')}
              </Link>
            ) : (
              <Link
                to='/sign-in'
                search={{ redirect: '/keys' }}
                className='mt-3 inline-block text-sm font-medium underline underline-offset-4'
              >
                {t('Open Keys')}
              </Link>
            )}
          </article>
          <article className='bg-card text-card-foreground rounded-xl p-5 ring-1 ring-[#1a2332]/10 dark:ring-white/10'>
            <h2 className='text-base font-medium'>{t('Channels')}</h2>
            <p className='text-muted-foreground mt-2 text-sm leading-6'>
              {t(
                'A request goes through only after an administrator adds a channel.'
              )}
            </p>
          </article>
        </div>
      </section>

      <AccessGuide />
    </div>
  )
}
