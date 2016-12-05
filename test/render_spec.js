import { describe, it } from 'mocha'
import { expect } from 'chai'
import MarkdownIt from 'markdown-it'
import render from '../src/renderer'

const md = new MarkdownIt()

describe('render', () => {
  it('should always return an array', () => {
    const result = render([])
    expect(result).to.eql([])
  })

  describe('Inline renderer', () => {
    describe('Emphasis', () => {
      it('should return an array with one text element which is italic', () => {
        const text = '*This is italic text*'
        const tokens = md.parseInline(text, {})
        const result = render(tokens)
        expect(result).to.eql([{ text: 'This is italic text', italics: true }])
      })
    })

    describe('Strong', () => {
      it('should return an array with one text element which is bold', () => {
        const text = '**This is bold text**'
        const tokens = md.parseInline(text, {})
        const result = render(tokens)
        expect(result).to.eql([{ text: 'This is bold text', bold: true }])
      })
    })

    describe('Emphasis and Strong combined', () => {
      it('should return an array with one text element which is italic', () => {
        const text = '*This is **italic** text*'
        const tokens = md.parseInline(text, {})
        const result = render(tokens)
        console.log(result)
        expect(result).to.eql(
          [
            {
              text: [
                'This is ',
                { text: 'italic', bold: true },
                ' text'
              ],
              italics: true
            }
          ]
        )
      })
    })
  })
  describe('List', () => {
    describe('Numbered list', () => {
      it('should return an array with one text element which is italic', () => {
        let text = '1. Lorem ipsum dolor sit amet\n'
        text += '2. Consectetur adipiscing elit\n'
        text += '3. Integer molestie lorem at massa\n'

        const tokens = md.parse(text, {})
        const result = render(tokens)
        expect(result).to.eql(
          [
            {
              ol: [
                'Lorem ipsum dolor sit amet',
                'Consectetur adipiscing elit',
                'Integer molestie lorem at massa'
              ]
            }
          ]
        )
      })
    })
  })
})
