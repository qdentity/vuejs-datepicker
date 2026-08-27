import PickerDay from '@/components/PickerDay.vue'
import {shallowMount} from '@vue/test-utils'
import {en} from '@/locale'

describe('PickerDay: changing months', () => {
  let wrapper
  const disabledDates = {
    customPredictor: date => ![1, 5, 8].includes(date.getMonth())
  }

  beforeEach(() => {
    wrapper = shallowMount(PickerDay, {
      propsData: {
        translation: en,
        allowedToShowView: () => true,
        selectedDate: new Date(2018, 2, 24),
        pageDate: new Date(2018, 1, 1)
      }
    })
  })

  it('can set the next month', () => {
    wrapper.vm.nextMonth()
    expect(wrapper.emitted().changedMonth).toBeTruthy()
    expect(wrapper.emitted().changedMonth[0][0].getMonth()).toEqual(2)
  })

  it('can set the previous month', () => {
    wrapper.vm.previousMonth()
    expect(wrapper.emitted().changedMonth).toBeTruthy()
    expect(wrapper.emitted().changedMonth[0][0].getMonth()).toEqual(0)
  })

  it('skips to an enabled month when moving backward from a disabled month', async () => {
    await wrapper.setProps({
      disabledDates,
      pageDate: new Date(2018, 3, 1),
      skipDisabledMonths: true
    })

    wrapper.vm.previousMonth()

    expect(wrapper.emitted().changedMonth[0][0]).toEqual(new Date(2018, 1, 1))
  })

  it('skips to an enabled month when moving forward from a disabled month', async () => {
    await wrapper.setProps({
      disabledDates,
      pageDate: new Date(2018, 3, 1),
      skipDisabledMonths: true
    })

    wrapper.vm.nextMonth()

    expect(wrapper.emitted().changedMonth[0][0]).toEqual(new Date(2018, 5, 1))
  })

  it('checks candidate months when leaving an enabled month', async () => {
    await wrapper.setProps({
      disabledDates,
      pageDate: new Date(2018, 5, 1),
      skipDisabledMonths: true
    })

    wrapper.vm.nextMonth()

    expect(wrapper.emitted().changedMonth[0][0]).toEqual(new Date(2018, 8, 1))
  })
})
