var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import scriptTitle from '../helpers/scriptTitle';
// This function only accepts a numbers and a string. The return value will be of type string
const onlyAcceptsNumberAndString = (passedNumber, passedString) => {
    return `My number is < ${passedNumber} > and my string is < "${passedString}" >`;
};
const basicTypescript = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        scriptTitle('Basic TypeScript');
        // myNumber must have a value with type number
        const myNumber = 2;
        // valueFromFunction must have a value of type string
        const valueFromFunction = onlyAcceptsNumberAndString(myNumber, 'Hi');
        console.log(valueFromFunction);
        // My status can only equal a value defined in the "DevStatus" type
        const myStatus = 'Approved';
        // myTaskList will be an array of object that follow the DevTask Interface
        const myTaskList = [
            {
                title: 'Task1',
                dueDate: new Date('September 22, 2022'),
                status: myStatus,
                tags: ['dev-only', 'quick-fix']
            }
        ];
        // The new pushed object must follow the DevTask Interface
        myTaskList.push({
            title: 'Task1',
            dueDate: new Date('September 24, 2022'),
            status: 'Not Started'
        });
        // Create a new new promise to wait for 100ms. Promise resolves a type booleon
        yield new Promise((resolve) => setTimeout(() => resolve(true), 100));
        console.log(myTaskList);
    }
    catch (err) {
        console.log(err);
    }
});
export default basicTypescript;
