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
import { describe, expect, test } from 'vitest'

import { mapStatusDataToConfig } from '@/lib/status-query'
import {
  DEFAULT_SYSTEM_NAME,
  resolveDisplayedSystemName,
} from '@/lib/system-name'

describe('resolveDisplayedSystemName', () => {
  test('uses the fork name when the stored name is missing', () => {
    expect(resolveDisplayedSystemName(undefined)).toBe(DEFAULT_SYSTEM_NAME)
    expect(resolveDisplayedSystemName(null)).toBe(DEFAULT_SYSTEM_NAME)
    expect(resolveDisplayedSystemName('   ')).toBe('电器亚瑟王的圣地')
  })

  test('replaces the upstream stock name and keeps an explicit brand', () => {
    expect(resolveDisplayedSystemName('New API')).toBe('电器亚瑟王的圣地')
    expect(resolveDisplayedSystemName('  New API  ')).toBe('电器亚瑟王的圣地')
    expect(resolveDisplayedSystemName('北窗')).toBe('北窗')
  })
})

describe('mapStatusDataToConfig brand', () => {
  test('maps a stock system name to the fork default and keeps a custom footer', () => {
    const config = mapStatusDataToConfig({
      system_name: 'New API',
      logo: '',
      footer_html: '<p>kept footer</p>',
    })

    expect(config.systemName).toBe('电器亚瑟王的圣地')
    expect(config.logo).toBe('/brand-mark.svg')
    expect(config.footerHtml).toBe('<p>kept footer</p>')
  })

  test('keeps an administrator brand and logo', () => {
    const config = mapStatusDataToConfig({
      system_name: '北窗',
      logo: 'https://example.com/mark.svg',
    })

    expect(config.systemName).toBe('北窗')
    expect(config.logo).toBe('https://example.com/mark.svg')
  })
})
