import React from 'react/lib/ReactWithAddons'
import { shallow, mount } from 'enzyme'
// import { compClass, compData, compSelector } from '../../mock/input.js'
import Textarea from '../../../src/Textarea'

describe('Textarea Spec', () => {
  const defaultWrapper = shallow(<Textarea value='foo' placeholder='bar' />)

  describe('Default', () => {
    it('should generate a textarea tag', () => {
      expect(defaultWrapper).to.have.tagName('textarea')
    })

    it('should generate correct placeholder', () => {
      expect(defaultWrapper).to.have.attr('placeholder', 'bar')
    })
  })

  describe('Custom', () => {
    it('should apply grid class by grid prop', () => {
      const wrapper = mount(<Textarea grid={1 / 4} />)

      expect(wrapper).to.have.className('rct-grid-md-25-000')
    })

    it('should apply addition style by style prop', () => {
      const wrapper = mount(<Textarea style={{foo: 'bar'}} />)

      expect(wrapper).to.have.style('foo', 'bar')
    })

    it('should apply addition class by className prop', () => {
      const wrapper = mount(<Textarea className='foo' />)

      expect(wrapper).to.have.className('foo')
    })

    it('should apply resize:none by autoHeight prop ', () => {
      const wrapper = mount(<Textarea autoHeight />)

      expect(wrapper).to.have.style('resize', 'none')
    })

    it('should apply height:auto when current rows > minimal rows', () => {
      const wrapper = mount(<Textarea autoHeight grid={1 / 2} rows={3} />)

      wrapper.simulate('change', {target: {value: 'foo\n\n\n\n'}})

      expect(wrapper).to.have.style('height', 'auto')
    })
  })

  describe('Behavior', () => {
    it('should call native event callback', (done) => {
      const cb = () => {
        done()
      }

      const wrapper = shallow(<Textarea onBlur={cb} />)

      wrapper.simulate('blur')
    })

    it('should call event callback by trigger prop', (done) => {
      const cb = () => {
        done()
      }

      const wrapper = shallow(<Textarea trigger='change' onChange={cb} />)

      wrapper.simulate('change', {target: {value: 'foo'}, nativeEvent: true})
    })
  })
})
