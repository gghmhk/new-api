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

import { REQUIRED_FRONTEND_ATTRIBUTION } from '@/lib/system-name'
import { cn } from '@/lib/utils'

type ProjectSourceNoticeProps = {
  className?: string
}

/** Quiet AGPL attribution. The required English sentence is not translated. */
export function ProjectSourceNotice(props: ProjectSourceNoticeProps) {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <p
      className={cn(
        'text-muted-foreground text-xs leading-relaxed',
        props.className
      )}
    >
      <a
        href='https://github.com/QuantumNous/new-api'
        target='_blank'
        rel='noopener noreferrer'
        className='text-foreground/80 font-medium underline-offset-4 hover:underline'
      >
        {t('New API')}
      </a>{' '}
      © {currentYear}{' '}
      <a
        href='https://github.com/QuantumNous'
        target='_blank'
        rel='noopener noreferrer'
        className='text-foreground/80 font-medium underline-offset-4 hover:underline'
      >
        {t('QuantumNous')}
      </a>
      . <span>{REQUIRED_FRONTEND_ATTRIBUTION}</span>{' '}
      <a
        href='https://github.com/QuantumNous/new-api/blob/main/LICENSE'
        target='_blank'
        rel='noopener noreferrer'
        className='text-foreground/80 underline-offset-4 hover:underline'
      >
        {t('AGPL v3.0 License')}
      </a>
      .{' '}
      {t(
        'This interface is a modified personal deployment of New API. The program remains under the GNU Affero General Public License v3.0, and the original source stays available.'
      )}{' '}
      <a
        href='https://github.com/songquanpeng/one-api'
        target='_blank'
        rel='noopener noreferrer'
        className='text-foreground/80 underline-offset-4 hover:underline'
      >
        {t('One API')}
      </a>
      .
    </p>
  )
}
