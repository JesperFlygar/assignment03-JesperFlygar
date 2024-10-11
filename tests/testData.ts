import { faker } from '@faker-js/faker'; 

export const createRandomClient = () => {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        telephone: faker.phone.number()
    }
}

let billPaid = false;
if (faker.number.int({ min: 0, max: 1 }) == 1) {
    billPaid = true;
}

export const createRandomBill = () => {
    return {
        value: faker.helpers.rangeToNumber({ min: 1, max: 999999999 }),
        paid: billPaid
    }
}