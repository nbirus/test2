import Vue from 'vue';
import RequestMixin from '@/mixins/RequestMixin'
import AsyncDataWrapper from '@/components/data/AsyncDataWrapper'
import mockAxios from 'jest-mock-axios'
import waitForExpect from 'wait-for-expect'
import { requestResource } from '@/services/RequestService'
import { mount, createLocalVue } from '@vue/test-utils'

let localVue = createLocalVue()
localVue.mixin(RequestMixin)
const Test = Vue.component('Test', {
  name: 'Test',
  template: `<div></div>`
});

// these are more integration than unit
// test to verify using a `resouce` works accross all levels of abstraction

// service
describe('module:resource:service', () => {

  afterEach(mockAxios.reset)

  it('Creates resource config', () => {

    requestResource('test')
    expect(mockAxios.get).toHaveBeenCalledWith('test', { endpoint: 'test' })

    requestResource('testWithParams', { test: 'test' })
    expect(mockAxios.get).toHaveBeenCalledWith('testWithParams', { endpoint: 'testWithParams', test: 'test' })

  })

  it('Formats resouce response', () => {
    
  })

})

// mixin
describe('module:resource:mixin', () => {

  afterEach(mockAxios.reset)

  it('Creates resource config', () => {
    const wrapper = mount(Test, { localVue });
    wrapper.vm.$requestResource('test')
    expect(mockAxios.get).toHaveBeenCalledWith('test', { endpoint: 'test' })

    const wrapper2 = mount(Test, { localVue });
    wrapper2.vm.$requestResource('testWithParams', { test: 'test' })
    expect(mockAxios.get).toHaveBeenCalledWith('testWithParams', { endpoint: 'testWithParams', test: 'test' })

  })

  it('Formats resouce response', () => {
    
  })

})

// component
describe('module:resource:component', () => {

  afterEach(mockAxios.reset)

  it('Creates resource config', async () => {
    mount(AsyncDataWrapper, { localVue, 
      propsData: {
        resource: 'test'
      }
    })
    await waitForExpect(() => {
      expect(mockAxios.get).toHaveBeenCalledWith('test', { endpoint: 'test' })  
    })

    mount(AsyncDataWrapper, { localVue, 
      propsData: {
        resource: 'testWithParams',
        params: {
          test: 'test'
        }
      }
    })
    await waitForExpect(() => {
      expect(mockAxios.get).toHaveBeenCalledWith('testWithParams', { endpoint: 'testWithParams', test: 'test' })
    })
  })

  it('Formats resouce response', () => {
    
  })
  
})
