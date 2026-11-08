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

import {
  isPublicRegistrationOffered,
  type RegistrationStatus,
} from '@/lib/registration-access'
import { cn } from '@/lib/utils'

type RegistrationPolicyNoteProps = {
  status: RegistrationStatus | undefined
  showSignUpLink?: boolean
  className?: string
}

/**
 * Describes the live registration flag. It does not hide sign-up while the
 * server still allows it, and it does not claim registration is closed before
 * the status payload arrives.
 */
export function RegistrationPolicyNote(props: RegistrationPolicyNoteProps) {
  const { t } = useTranslation()
  const offered = isPublicRegistrationOffered(props.status)
  const showLink = props.showSignUpLink !== false && offered

  return (
    <div className={cn('space-y-2 text-sm leading-6', props.className)}>
      {showLink ? (
        <p>
          {t("Don't have an account?")}{' '}
          <Link
            to='/sign-up'
            className='font-medium underline underline-offset-4'
          >
            {t('Sign up')}
          </Link>
        </p>
      ) : null}
      {props.status != null && offered ? (
        <p>{t('Registration is currently open.')}</p>
      ) : null}
      {props.status != null && !offered ? (
        <p>{t('Accounts are limited to ones an administrator authorizes.')}</p>
      ) : null}
    </div>
  )
}
