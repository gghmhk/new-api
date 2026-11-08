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
import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, test } from 'vitest'

function readSvg(name: string): string {
  const bytes = readFileSync(path.resolve('public', name))
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes)
}

describe('brand mark files', () => {
  test('the default logo and favicon are well-formed SVG', () => {
    for (const name of ['brand-mark.svg', 'favicon.svg']) {
      const text = readSvg(name)
      const doc = new DOMParser().parseFromString(text, 'image/svg+xml')
      expect(doc.querySelector('parsererror'), name).toBeNull()
      expect(doc.querySelector('svg'), name).not.toBeNull()
    }
  })
})
