import React from 'react/lib/ReactWithAddons'
import { shallow } from 'enzyme'
import { compClass } from '../../mock/button.js'
import Button from '../../../src/Button.js'

describe('Basic', () => {
  const defaultWrapper = shallow(<Button>
                                   Default
                                 </Button>)

  describe('For default one', () => {
    it('Should generate a button tag', () => {
      expect(defaultWrapper).to.have.tagName('button')
    })

    it('Should have type=button by default', () => {
      expect(defaultWrapper).to.have.prop('type', 'button')
    })
  })

  describe('For customize one', () => {
    it('Should show the type if passed button or submit', () => {
      const wrapper1 = shallow(
          <Button type='button'>
            Button1
          </Button>
        ),
        wrapper2 = shallow(
          <Button type='submit'>
            Button2
          </Button>
      )
      expect(wrapper1).to.have.prop('type', 'button')
      expect(wrapper2).to.have.prop('type', 'submit')
    })

    it('Should be disabled', () => {
      const wrapper1 = shallow(
        <Button disabled>
          Button
        </Button>
      )
      expect(wrapper1).to.be.disabled('disabled')
    })

    it('Should not apply rct-button class on default', () => {
      expect(defaultWrapper).to.have.className('rct-button')
    })

    it('Should apply rct-button-[status] class with status attr', () => {
      const wrapper1 = shallow(
          <Button status='error'>
            Button1
          </Button>
        ),
        wrapper2 = shallow(
          <Button status='primary'>
            Button2
          </Button>
      )

      expect(wrapper1).to.have.className(compClass.error)
      expect(wrapper2).to.have.className(compClass.primary)
    })

    it('Should ensure additional classes passed in, adding but not overriding', () => {
      const wrapper1 = shallow(
        <Button className='foo' status='error'>
          Button
        </Button>
      )
      expect(wrapper1).to.have.className('foo')
      expect(wrapper1).to.have.className(compClass.error)
    })
  })
})
