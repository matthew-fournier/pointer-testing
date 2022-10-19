import scriptTitle from '../helpers/scriptTitle'

class MyClass {
  constructor () {
    this.someValue = 'An Example Value'
  }
}

MyClass.prototype.someOtherValue = 'A second example value'

MyClass.prototype.logValue = function () {
  console.log(this.someValue, this.someOtherValue)
}

const prototype = () => {
  scriptTitle('Prototype')

  const myClass = new MyClass()
  myClass.logValue()
}

export default prototype
